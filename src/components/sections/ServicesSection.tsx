import { useState } from 'react';

interface Service {
  title: string;
  description: string;
  href?: string;
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

export function ServicesSection({ title, description, categories }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">{description}</p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold inline-block">
                  {category.title}
                </h3>
                <div className="w-16 h-0.5 bg-accent mx-auto mt-2 rounded-full"></div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {category.services.map((service, serviceIndex) => {
                  const Tag = service.href ? 'a' : 'div';
                  return (
                    <Tag
                      key={serviceIndex}
                      {...(service.href ? { href: service.href } : {})}
                      className={`group bg-card border rounded-lg p-5 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 ${service.href ? 'hover:shadow-md hover:border-accent/30 cursor-pointer' : 'cursor-default'}`}
                      style={{ animationDelay: `${serviceIndex * 50}ms` }}
                    >
                      <h4 className={`font-semibold mb-1 ${service.href ? 'group-hover:text-accent' : ''} transition-colors`}>
                        {service.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
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
