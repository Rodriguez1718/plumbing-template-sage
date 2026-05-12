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
  'Residential Plumbing Services': '/images/photos/freepik-male-plumber-working-fix-problems-client-s-house_23-2150990700.jpg',
  'Commercial Plumbing Services': '/images/photos/freepik-man-installs-heating-system-house-checks-pipes-with-wrench_169016-55834.jpg',
  'Specialty Plumbing Services': '/images/photos/freepik-female-plumber-working-fix-problems-client-s-house_23-2150990725.jpg',
  'Maintenance Services': '/images/photos/plumber-bathroom.jpg',
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-card relative overflow-hidden">
      {/* Background Geometric Accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 -translate-x-1/2 -translate-y-1/2 rotate-12 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`mb-16 md:mb-24 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-3xl">
            <span className="inline-block bg-accent text-accent-foreground text-[10px] font-black px-3 py-1 uppercase tracking-[0.2em] mb-4">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground leading-[1.1] tracking-tighter uppercase mb-6">
              Full Spectrum <br /><span className="text-primary">Plumbing</span> Services
            </h2>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Vertical Tabs - Left Side */}
          <div className={`md:col-span-4 lg:col-span-3 space-y-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`relative w-full p-5 text-left border-2 transition-all duration-300 group overflow-hidden ${activeTab === index
                  ? 'bg-primary border-primary text-white shadow-[8px_8px_0px_var(--accent)] z-10 hover:shadow-[12px_12px_0px_var(--accent)] hover:-translate-y-1'
                  : 'bg-card border-primary/20 text-foreground hover:border-primary hover:bg-primary/5 hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:-translate-y-0.5'
                  }`}
              >
                <div className={`absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10 ${activeTab === index ? 'hidden' : ''}`}></div>

                <span className={`block text-[10px] font-black uppercase tracking-widest mb-1 transition-colors duration-300 ${activeTab === index ? 'text-white/70' : 'text-muted-foreground group-hover:text-primary'}`}>
                  Category {index + 1}
                </span>
                <span className="block text-sm font-black uppercase tracking-tight">
                  {category.title.replace(' Services', '').replace(' Plumbing', '')}
                </span>

                {activeTab === index && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-accent"></div>
                )}
              </button>
            ))}
          </div>

          {/* Active Category Content - Right Side */}
          <div className={`md:col-span-8 lg:col-span-9 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              {categories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className={`transition-all duration-500 ${activeTab === categoryIndex
                    ? 'opacity-100 scale-100 relative z-10 pointer-events-auto'
                    : 'opacity-0 scale-[0.98] absolute inset-0 z-0 pointer-events-none'
                    }`}
                >
                  {/* Category Image Banner - Sharp */}
                  {CATEGORY_IMAGES[category.title] && (
                    <div className="relative w-full mb-10 border-4 border-primary overflow-hidden h-48 md:h-72 shadow-xl">
                      <img
                        src={CATEGORY_IMAGES[category.title]}
                        alt={category.title}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-8">
                        <div>
                          <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">{category.title}</h3>
                          <div className="w-16 h-1.5 bg-accent mt-4"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    {category.services.map((service, serviceIndex) => {
                      const Tag = service.href ? 'a' : 'div';
                      return (
                        <Tag
                          key={serviceIndex}
                          {...(service.href ? { href: service.href } : {})}
                          className={`group relative bg-card border-2 border-primary p-6 transition-all duration-300 flex items-start gap-5 shadow-[8px_8px_0px_rgba(0,0,0,0.05)] ${service.href ? 'hover:shadow-[12px_12px_0px_var(--accent)] hover:-translate-y-1 cursor-pointer' : 'cursor-default'}`}
                        >
                          <div className="shrink-0 w-12 h-12 bg-primary text-white flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                            {service.icon ? (
                              <img src={service.icon} alt="" className="w-7 h-7 object-contain group-hover:invert-0 transition-all" style={{ filter: 'brightness(0) invert(1)' }} />
                            ) : (
                              <Wrench size={20} />
                            )}
                          </div>
                          <div>
                            <h4 className={`text-base font-black uppercase tracking-tight mb-2 ${service.href ? 'group-hover:text-primary' : ''} transition-colors`}>
                              {service.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: service.description }} />
                          </div>
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
