import { useState, useEffect, useRef } from 'react';
import { Wrench } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  href?: string;
  icon?: string;
}

interface ServiceCategory {
  title: string;
  services: Service[];
}

interface Props {
  title: string;
  description: string;
  categories: ServiceCategory[];
}

// Map category titles to banner images
const CATEGORY_IMAGES: Record<string, string> = {
  'Residential Plumbing Services': 'https://img.freepik.com/free-photo/male-plumber-working-fix-problems-client-s-house_23-2150990700.jpg?t=st=1771554058~exp=1771557658~hmac=70bda38cc308ec76dbbbc26ebd49f349d3937ee69d95003ff1b0274174832fbb',
  'Commercial Plumbing Services':  'https://img.freepik.com/free-photo/man-installs-heating-system-house-checks-pipes-with-wrench_169016-55834.jpg?t=st=1771554128~exp=1771557728~hmac=5f7f397bf2be86cea0dcbcd1d300e04321de78f81ce1760b57de665e059aa5c2',
  'Specialty Plumbing Services':   'https://img.freepik.com/free-photo/female-plumber-working-fix-problems-client-s-house_23-2150990725.jpg?t=st=1771554168~exp=1771557768~hmac=850854d4b59501de954307a15b86e7dfe2cfc0fa05030415c9df3397f7c6ea0e',
  'Maintenance Services':          'https://happyplumbing.com/wp-content/uploads/2023/02/plumber-at-work-in-a-bathroom.jpg',
};

export function ServicesSection({ title, description, categories }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-10 transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        <div className={`flex flex-wrap justify-center gap-2 mb-8 transition-all duration-600 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === index
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
              }`}
            >
              {category.title.replace(' Services', '').replace(' Plumbing', '')}
            </button>
          ))}
        </div>

        {/* Active category content */}
        <div className="relative">
          {categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`transition-opacity duration-300 ${
                activeTab === categoryIndex
                  ? 'opacity-100'
                  : 'opacity-0 absolute inset-0 pointer-events-none'
              }`}
            >
              {/* Category image banner */}
              {CATEGORY_IMAGES[category.title] && (
                <div className="relative w-full max-w-5xl mx-auto mb-8 rounded-xl overflow-hidden h-48 md:h-64">
                  <img
                    src={CATEGORY_IMAGES[category.title]}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{category.title}</h3>
                      <div className="w-12 h-0.5 bg-accent mt-2 rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {category.services.map((service, serviceIndex) => {
                  const Tag = service.href ? 'a' : 'div';
                  return (
                    <Tag
                      key={serviceIndex}
                      {...(service.href ? { href: service.href } : {})}
                      className={`group bg-card border rounded-lg p-6 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col items-center text-center gap-3 ${service.href ? 'hover:shadow-md hover:border-accent/30 cursor-pointer' : 'cursor-default'}`}
                      style={{ animationDelay: `${serviceIndex * 50}ms` }}
                    >
                      <div className="shrink-0 w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center overflow-hidden">
                        {service.icon ? (
                          <img src={service.icon} alt="" className="w-10 h-10 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(10%) sepia(90%) saturate(5000%) hue-rotate(340deg) brightness(80%)' }} />
                        ) : (
                          <Wrench size={24} className="text-accent" />
                        )}
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-1 ${service.href ? 'group-hover:text-accent' : ''} transition-colors`}>
                          {service.title}
                        </h4>
                        <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: service.description }} />
                      </div>
                    </Tag>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
