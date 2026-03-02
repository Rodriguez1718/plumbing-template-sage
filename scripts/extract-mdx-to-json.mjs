/**
 * Script to extract MDX page content into external JSON data files.
 * 
 * For each MDX file in src/content/pages/:
 * 1. Extracts all component section props into a "sections" array in JSON
 * 2. Stores frontmatter in JSON as "meta" 
 * 3. Writes a corresponding JSON file to src/data/pages/
 * 4. Rewrites the MDX to import and spread data from the JSON file
 *    while keeping frontmatter and component imports intact
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT, 'src', 'content', 'pages');
const DATA_DIR = path.join(ROOT, 'src', 'data', 'pages');

// We need the ORIGINAL MDX files. Since we already overwrote them,
// we'll use git to restore them first, then re-run.

// Recursively find all .mdx files
function findMdxFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdxFiles(full));
    } else if (entry.name.endsWith('.mdx')) {
      results.push(full);
    }
  }
  return results;
}

// Parse frontmatter from MDX content
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, rest: content };
  
  const fmBlock = match[1];
  const frontmatter = {};
  
  for (const line of fmBlock.split('\n')) {
    // Match key: value where value can be quoted or unquoted
    const m = line.match(/^(\w+):\s*(.*)/);
    if (m) {
      let val = m[2].trim();
      // Handle quoted strings - find matching quote
      if (val.startsWith('"')) {
        // Extract content between first and last double quote
        const lastQuote = val.lastIndexOf('"');
        if (lastQuote > 0) {
          val = val.slice(1, lastQuote);
        }
      } else if (val.startsWith("'")) {
        const lastQuote = val.lastIndexOf("'");
        if (lastQuote > 0) {
          val = val.slice(1, lastQuote);
        }
      }
      // Parse booleans
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      frontmatter[m[1]] = val;
    }
  }
  
  const rest = content.slice(match[0].length).trim();
  return { frontmatter, fmRaw: match[0], rest };
}

// Extract import lines and the rest of the body
function parseBody(body) {
  const lines = body.split('\n');
  const imports = [];
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.startsWith('import ')) {
      imports.push(lines[i]);
      i++;
    } else if (line === '') {
      i++;
    } else {
      break;
    }
  }
  
  const remaining = lines.slice(i).join('\n');
  const sections = extractSections(remaining);
  
  return { imports, sections };
}

function extractSections(text) {
  const sections = [];
  let pos = 0;
  
  while (pos < text.length) {
    while (pos < text.length && /\s/.test(text[pos])) pos++;
    if (pos >= text.length) break;
    
    if (text[pos] !== '<') { pos++; continue; }
    
    const tagStart = pos;
    pos++;
    let componentName = '';
    while (pos < text.length && /[A-Za-z0-9_]/.test(text[pos])) {
      componentName += text[pos];
      pos++;
    }
    
    if (!componentName) continue;
    
    const blockContent = findSelfClosingEnd(text, tagStart);
    if (blockContent) {
      sections.push({ component: componentName, raw: blockContent.content });
      pos = blockContent.endPos;
    } else {
      pos++;
    }
  }
  
  return sections;
}

function findSelfClosingEnd(text, startPos) {
  let pos = startPos;
  let braceDepth = 0;
  let inString = false;
  let stringChar = '';
  let inTemplateLiteral = false;
  
  while (pos < text.length) {
    const ch = text[pos];
    
    if (inString) {
      if (ch === '\\') { pos += 2; continue; }
      if (ch === stringChar) inString = false;
      pos++;
      continue;
    }
    
    if (inTemplateLiteral) {
      if (ch === '\\') { pos += 2; continue; }
      if (ch === '`') inTemplateLiteral = false;
      pos++;
      continue;
    }
    
    if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
      pos++;
      continue;
    }
    
    if (ch === '`') {
      inTemplateLiteral = true;
      pos++;
      continue;
    }
    
    if (ch === '{') { braceDepth++; pos++; continue; }
    if (ch === '}') { braceDepth--; pos++; continue; }
    
    if (braceDepth === 0 && ch === '/' && pos + 1 < text.length && text[pos + 1] === '>') {
      return { content: text.slice(startPos, pos + 2), endPos: pos + 2 };
    }
    
    pos++;
  }
  
  return null;
}

function parseProps(raw, componentName) {
  const openTag = `<${componentName}`;
  let inner = raw.slice(raw.indexOf(openTag) + openTag.length);
  inner = inner.slice(0, inner.lastIndexOf('/>'));
  
  const props = {};
  let pos = 0;
  
  while (pos < inner.length) {
    while (pos < inner.length && /\s/.test(inner[pos])) pos++;
    if (pos >= inner.length) break;
    
    let propName = '';
    while (pos < inner.length && /[A-Za-z0-9_:]/.test(inner[pos])) {
      propName += inner[pos];
      pos++;
    }
    
    if (!propName) { pos++; continue; }
    
    // Skip Astro directives like client:visible, client:load, client:idle
    if (propName.includes(':')) {
      // Store as-is (these are Astro directives, not data)
      props[propName] = true;
      continue;
    }
    
    while (pos < inner.length && /\s/.test(inner[pos])) pos++;
    
    if (pos < inner.length && inner[pos] === '=') {
      pos++;
      while (pos < inner.length && /\s/.test(inner[pos])) pos++;
      
      if (pos >= inner.length) break;
      
      const ch = inner[pos];
      
      if (ch === '"') {
        pos++;
        let val = '';
        while (pos < inner.length && inner[pos] !== '"') {
          if (inner[pos] === '\\') {
            val += inner[pos] + inner[pos + 1];
            pos += 2;
          } else {
            val += inner[pos];
            pos++;
          }
        }
        pos++;
        props[propName] = val;
      } else if (ch === '{') {
        const exprResult = extractJSXExpression(inner, pos);
        if (exprResult) {
          const expr = exprResult.content.slice(1, -1).trim();
          props[propName] = parseJSValue(expr);
          pos = exprResult.endPos;
        } else {
          pos++;
        }
      } else if (ch === "'") {
        pos++;
        let val = '';
        while (pos < inner.length && inner[pos] !== "'") {
          val += inner[pos];
          pos++;
        }
        pos++;
        props[propName] = val;
      }
    } else {
      props[propName] = true;
    }
  }
  
  return props;
}

function extractJSXExpression(text, startPos) {
  if (text[startPos] !== '{') return null;
  
  let pos = startPos;
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let inTemplate = false;
  
  while (pos < text.length) {
    const ch = text[pos];
    
    if (inString) {
      if (ch === '\\') { pos += 2; continue; }
      if (ch === stringChar) inString = false;
      pos++;
      continue;
    }
    
    if (inTemplate) {
      if (ch === '\\') { pos += 2; continue; }
      if (ch === '`') inTemplate = false;
      pos++;
      continue;
    }
    
    if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
      pos++;
      continue;
    }
    
    if (ch === '`') {
      inTemplate = true;
      pos++;
      continue;
    }
    
    if (ch === '{') { depth++; pos++; continue; }
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        return { content: text.slice(startPos, pos + 1), endPos: pos + 1 };
      }
      pos++;
      continue;
    }
    
    pos++;
  }
  
  return null;
}

function parseJSValue(expr) {
  try {
    let normalized = expr;
    normalized = replaceTemplateLiterals(normalized);
    
    try { return JSON.parse(normalized); } catch {}
    
    normalized = normalized.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
    normalized = replaceSingleQuotes(normalized);
    
    try { return JSON.parse(normalized); } catch {}
    
    return expr;
  } catch {
    return expr;
  }
}

function replaceTemplateLiterals(str) {
  let result = '';
  let i = 0;
  
  while (i < str.length) {
    if (str[i] === '`') {
      i++;
      let content = '';
      while (i < str.length && str[i] !== '`') {
        if (str[i] === '\\') {
          content += str[i + 1];
          i += 2;
        } else if (str[i] === '$' && str[i + 1] === '{') {
          content += '${';
          i += 2;
          let depth = 1;
          while (i < str.length && depth > 0) {
            if (str[i] === '{') depth++;
            if (str[i] === '}') depth--;
            if (depth > 0) content += str[i];
            i++;
          }
        } else {
          content += str[i];
          i++;
        }
      }
      i++;
      result += '"' + content.replace(/"/g, '\\"') + '"';
    } else {
      result += str[i];
      i++;
    }
  }
  
  return result;
}

function replaceSingleQuotes(str) {
  let result = '';
  let i = 0;
  let inDouble = false;
  
  while (i < str.length) {
    if (str[i] === '\\') {
      result += str[i] + (str[i + 1] || '');
      i += 2;
      continue;
    }
    
    if (str[i] === '"' && !inDouble) { inDouble = true; result += str[i]; i++; continue; }
    if (str[i] === '"' && inDouble) { inDouble = false; result += str[i]; i++; continue; }
    
    if (str[i] === "'" && !inDouble) {
      i++;
      let content = '';
      while (i < str.length && str[i] !== "'") {
        if (str[i] === '\\') {
          content += str[i + 1];
          i += 2;
        } else {
          content += str[i];
          i++;
        }
      }
      i++;
      result += '"' + content.replace(/"/g, '\\"') + '"';
      continue;
    }
    
    result += str[i];
    i++;
  }
  
  return result;
}

function buildPageData(frontmatter, sections) {
  const data = {
    meta: { ...frontmatter },
    sections: []
  };
  
  const sectionMeta = []; // Store astro directives separately
  
  for (const section of sections) {
    const allProps = parseProps(section.raw, section.component);
    
    // Separate Astro directives (client:*, etc.) from regular props
    const props = {};
    const astroDirectives = [];
    
    for (const [key, value] of Object.entries(allProps)) {
      if (key.includes(':')) {
        // Astro directive - keep as static attribute
        astroDirectives.push(key);
      } else {
        props[key] = value;
      }
    }
    
    data.sections.push({
      component: section.component,
      props
    });
    
    sectionMeta.push({ astroDirectives });
  }
  
  return { data, sectionMeta };
}

function buildNewMdx(fmRaw, imports, sections, jsonImportPath) {
  const lines = [];
  
  // Keep original frontmatter exactly as-is
  lines.push(fmRaw);
  lines.push('');
  
  // Keep all component imports (deduplicated)
  const seen = new Set();
  for (const imp of imports) {
    if (!seen.has(imp)) {
      seen.add(imp);
      lines.push(imp);
    }
  }
  
  // Add JSON data import
  lines.push(`import pageData from "${jsonImportPath}"`);
  lines.push('');
  lines.push('');
  
  // Sections reference data from JSON
  // Astro directives (client:*) must be static attributes, not spread from JSON
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const directives = section.astroDirectives || [];
    const directiveStr = directives.length > 0 ? ' ' + directives.join(' ') : '';
    lines.push(`<${section.component}${directiveStr} {...pageData.sections[${i}].props} />`);
    lines.push('');
  }
  
  return lines.join('\n');
}

function computeJsonImportPath(mdxFile, jsonFile) {
  const mdxDir = path.dirname(mdxFile);
  let rel = path.relative(mdxDir, jsonFile).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

function main() {
  const mdxFiles = findMdxFiles(PAGES_DIR);
  console.log(`Found ${mdxFiles.length} MDX files`);
  
  let processed = 0;
  let errors = 0;
  
  for (const mdxFile of mdxFiles) {
    const relPath = path.relative(PAGES_DIR, mdxFile);
    const jsonRelPath = relPath.replace(/\.mdx$/, '.json');
    const jsonFile = path.join(DATA_DIR, jsonRelPath);
    
    try {
      const rawContent = fs.readFileSync(mdxFile, 'utf-8');
      const content = rawContent.replace(/\r\n/g, '\n');
      const { frontmatter, fmRaw, rest } = parseFrontmatter(content);
      const { imports, sections } = parseBody(rest);
      
      const { data: pageData, sectionMeta } = buildPageData(frontmatter, sections);
      
      // Attach astro directives to sections for MDX generation
      const sectionsWithMeta = sections.map((s, i) => ({
        ...s,
        astroDirectives: sectionMeta[i].astroDirectives
      }));
      
      fs.mkdirSync(path.dirname(jsonFile), { recursive: true });
      fs.writeFileSync(jsonFile, JSON.stringify(pageData, null, 2) + '\n');
      
      const jsonImportPath = computeJsonImportPath(mdxFile, jsonFile);
      const newMdx = buildNewMdx(fmRaw, imports, sectionsWithMeta, jsonImportPath);
      
      fs.writeFileSync(mdxFile, newMdx);
      
      processed++;
      console.log(`✓ ${relPath}`);
    } catch (err) {
      errors++;
      console.error(`✗ ${relPath}: ${err.message}`);
    }
  }
  
  console.log(`\nDone: ${processed} processed, ${errors} errors`);
}

main();
