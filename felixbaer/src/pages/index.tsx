'use client';

import { memo, useMemo, useCallback, startTransition, use } from 'react';
import { cn } from '@/lib/utils';
import { Keyvisual } from '@/components';

// Modern Section component with viewport-aware sizing
const Section = memo<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  'aria-label'?: string;
  fullHeight?: boolean;
}>((props) => {
  const { children, className, id, 'aria-label': ariaLabel, fullHeight = false } = props;
  
  const heightClass = fullHeight ? 'min-h-screen' : 'min-h-[50vh]';
  
  return (
    <section
      id={id}
      className={cn(
        heightClass,
        "py-[2vh] sm:py-[3vh] lg:py-[4vh]",
        "px-[2vw] sm:px-[3vw] lg:px-[4vw] xl:px-[5vw]",
        "max-w-[100vw]",
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

// Modern Container component with viewport-constrained design
const Container = memo<{
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}>(({ children, size = 'lg', className }) => {
  const sizeClasses = useMemo(() => ({
    sm: 'max-w-[min(90vw,1200px)]',
    md: 'max-w-[min(92vw,1400px)]',
    lg: 'max-w-[min(95vw,1600px)]',
    xl: 'max-w-[min(98vw,1920px)]',
    full: 'max-w-none'
  }), []);

  return (
    <div className={cn(
      sizeClasses[size],
      "mx-auto w-full",
      "px-[2vw] sm:px-[3vw] lg:px-[4vw]",
      className
    )}>
      {children}
    </div>
  );
});

Container.displayName = 'Container';

// Modern Placeholder component with better accessibility
const Placeholder = memo<{
  children: React.ReactNode;
  variant?: 'button' | 'image' | 'text' | 'input';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}>(({ children, variant = 'text', size = 'md', className, onClick }) => {
  const baseClasses = "bg-gray-300 rounded flex items-center justify-center text-sm transition-colors";
  
  const variantClasses = useMemo(() => ({
    button: "rounded-full cursor-pointer hover:bg-gray-400 focus:ring-2 focus:ring-blue-500",
    image: "rounded-lg bg-gray-200",
    text: "rounded p-4",
    input: "rounded border border-gray-300"
  }), []);

  const sizeClasses = useMemo(() => ({
    sm: "h-8 w-24",
    md: "h-12 w-32",
    lg: "h-16 w-40"
  }), []);

  const handleClick = useCallback(() => {
    if (onClick) {
      startTransition(() => {
        onClick();
      });
    }
  }, [onClick]);

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </div>
  );
});

Placeholder.displayName = 'Placeholder';

// Modern Grid component with viewport-aware auto-fit
const ResponsiveGrid = memo<{
  children: React.ReactNode;
  minItemWidth?: string;
  gap?: string;
  className?: string;
}>(({ children, minItemWidth = "clamp(200px, 25vw, 350px)", gap = "clamp(1rem, 3vw, 2rem)", className }) => {
  const gridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
    gap,
    width: '100%'
  }), [minItemWidth, gap]);

  return (
    <div
      className={cn("w-full", className)}
      style={gridStyle}
    >
      {children}
    </div>
  );
});

ResponsiveGrid.displayName = 'ResponsiveGrid';

// Timeline component with modern array rendering
const Timeline = memo<{ items: number[] }>(({ items }) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      {items.map((item) => (
        <article
          key={item}
          className="space-y-3 lg:space-y-4 p-4 lg:p-6 border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
        >
          <time className="font-bold text-sm lg:text-base text-gray-600">Year</time>
          <h3 className="text-base lg:text-lg font-medium">Timeline Title</h3>
          <Placeholder variant="text" className="h-12 lg:h-16">
            Timeline Content
          </Placeholder>
        </article>
      ))}
    </div>
  );
});

Timeline.displayName = 'Timeline';

// Main HomePage component with modern React patterns
const HomePage = () => {
  // Memoized gallery items
  const galleryItems = useMemo(() => Array.from({ length: 7 }, (_, i) => i + 1), []);
  const timelineItems = useMemo(() => [1, 2, 3, 4], []);
  const exhibitionItems = useMemo(() => [1, 2], []);

  // Modern event handlers with useCallback
  const handleButtonClick = useCallback(() => {
    startTransition(() => {
      console.log('Button clicked');
    });
  }, []);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      console.log('Form submitted');
    });
  }, []);

  const handleSubmitClick = useCallback(() => {
    startTransition(() => {
      console.log('Submit button clicked');
    });
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Keyvisual Component */}
      <Section
        fullHeight={true}
        className="flex items-center justify-center"
        aria-label="Hero section"
        id="hero"
      >
        <Container size="xl">
          <Keyvisual onButtonClick={handleButtonClick} />
        </Container>
      </Section>

      {/* Artist Section */}
      <Section
        className="bg-gray-50"
        aria-label="Artist information"
        id="artist"
        fullHeight={true}
      >
        <Container size="xl">
          <div className="flex flex-col lg:flex-row gap-[4vw] lg:gap-[6vw] items-center h-full">
            <div className="w-full lg:flex-1 space-y-[3vh] lg:space-y-[4vh]">
              <h2 className="text-[clamp(1.125rem,2.5vw,2rem)] font-medium">Artist Name</h2>
              <h3 className="text-[clamp(1.5rem,5vw,3rem)] leading-tight font-bold">
                Artist Description
              </h3>
              <Placeholder variant="text" className="h-[clamp(6rem,12vh,8rem)]">
                Text Content
              </Placeholder>
              <Placeholder variant="button" onClick={handleButtonClick}>
                Button
              </Placeholder>
              <Placeholder className="w-[clamp(6rem,15vw,8rem)] h-[clamp(2rem,4vh,3rem)]">
                Signature
              </Placeholder>
            </div>
            
            <div className="w-full lg:flex-1">
              <Placeholder
                variant="image"
                className="w-full h-[clamp(20rem,50vh,40rem)]"
              >
                Artist image will be here
              </Placeholder>
            </div>
          </div>

          {/* Biography Section - Hidden but structured */}
          <details className="max-w-4xl mx-auto mt-[8vh]">
            <summary className="cursor-pointer text-[clamp(1.25rem,3vw,1.5rem)] font-medium">Biography</summary>
            <div className="space-y-[3vh] mt-[3vh]">
              <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-bold">Biography Title</h3>
              <h4 className="text-[clamp(1.5rem,4vw,2.5rem)]">Biography Subtitle</h4>
              <Timeline items={timelineItems} />
              <Placeholder variant="button" onClick={handleButtonClick}>
                Back Button
              </Placeholder>
            </div>
          </details>
        </Container>
      </Section>

      {/* Image Gallery Section */}
      <Section aria-label="Image gallery" id="gallery" fullHeight={true}>
        <Container size="xl">
          <div className="h-full flex flex-col justify-center">
            <h2 className="text-[clamp(1.5rem,5vw,3rem)] text-center mb-[6vh] font-bold">
              Gallery Title
            </h2>
            
            <ResponsiveGrid minItemWidth="clamp(200px, 25vw, 350px)" gap="clamp(1rem, 3vw, 2rem)">
              {/* Featured Image */}
              <div className="space-y-4">
                <Placeholder
                  variant="image"
                  className="w-full h-[clamp(16rem,30vh,24rem)]"
                >
                  Main image will be here
                </Placeholder>
                <p className="text-center text-[clamp(0.875rem,2vw,1rem)]">Description</p>
              </div>
              
              {/* Gallery Images */}
              {galleryItems.map((item) => (
                <article key={item} className="space-y-4">
                  <Placeholder
                    variant="image"
                    className="w-full h-[clamp(12rem,25vh,16rem)]"
                  >
                    Image {item}
                  </Placeholder>
                  <p className="text-center text-[clamp(0.875rem,2vw,1rem)]">Description</p>
                </article>
              ))}
            </ResponsiveGrid>
          </div>
        </Container>
      </Section>

      {/* Exhibitions Section */}
      <Section
        className="bg-gray-50"
        aria-label="Exhibitions"
        id="exhibitions"
        fullHeight={true}
      >
        <Container size="xl">
          <div className="flex flex-col lg:flex-row gap-[4vw] lg:gap-[8vw] h-full">
            <header className="w-full lg:w-auto space-y-[3vh]">
              <h2 className="text-[clamp(1.125rem,2.5vw,2rem)] font-medium">Section Title</h2>
              <h3 className="text-[clamp(1.5rem,5vw,3rem)] max-w-full lg:max-w-2xl leading-tight font-bold">
                Section Subtitle
              </h3>
            </header>
            
            <div className="flex-1 space-y-[4vh] lg:space-y-[6vh] flex flex-col justify-center">
              <Placeholder variant="text" className="h-[clamp(4rem,8vh,6rem)]">
                Intro Text
              </Placeholder>
              
              {exhibitionItems.map((item) => (
                <article key={item} className="space-y-[2vh] p-[2vh] border border-gray-300 rounded-lg">
                  <header className="space-y-2">
                    <h4 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-bold">Exhibition Title</h4>
                    <time className="text-[clamp(0.875rem,2vw,1rem)] text-gray-600">Date</time>
                  </header>
                  <Placeholder variant="text" className="h-[clamp(3rem,6vh,4rem)]">
                    Description
                  </Placeholder>
                  <Placeholder variant="button" onClick={handleButtonClick}>
                    Link Button
                  </Placeholder>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section
        className="bg-gray-100"
        aria-label="Contact form"
        id="contact"
        fullHeight={true}
      >
        <Container size="md">
          <div className="h-full flex flex-col justify-center">
            <header className="text-center space-y-[3vh] mb-[6vh]">
              <h2 className="text-[clamp(1.125rem,2.5vw,2rem)] font-medium">Contact Title</h2>
              <h3 className="text-[clamp(1.5rem,5vw,3rem)] font-bold">Contact Subtitle</h3>
            </header>
            
            <form onSubmit={handleFormSubmit} className="space-y-[3vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2vw]">
                <Placeholder variant="input" className="h-[clamp(3rem,6vh,4rem)]">
                  Name Field
                </Placeholder>
                <Placeholder variant="input" className="h-[clamp(3rem,6vh,4rem)]">
                  Email Field
                </Placeholder>
              </div>
              
              <Placeholder variant="input" className="h-[clamp(6rem,12vh,8rem)]">
                Message Field
              </Placeholder>
              
              <Placeholder className="h-[clamp(1.5rem,3vh,2rem)]">
                Checkbox
              </Placeholder>
              
              <div className="flex justify-center sm:justify-end">
                <Placeholder variant="button" onClick={handleSubmitClick}>
                  Submit
                </Placeholder>
              </div>
            </form>
          </div>
        </Container>
        
        {/* Footer */}
        <Container className="mt-[6vh] pt-[4vh]">
          <footer className="flex flex-col sm:flex-row justify-between gap-[4vw]">
            <div className="space-y-3">
              <h4 className="font-bold text-[clamp(0.875rem,2vw,1rem)]">Contact Info</h4>
              <Placeholder className="h-[clamp(1rem,2vh,1.5rem)] w-[clamp(8rem,20vw,12rem)]">
                Email
              </Placeholder>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-bold text-[clamp(0.875rem,2vw,1rem)]">Legal</h4>
              <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-[3vw]">
                {['Link 1', 'Link 2', 'Link 3'].map((link) => (
                  <Placeholder key={link} className="h-[clamp(1rem,2vh,1.5rem)] w-[clamp(4rem,10vw,5rem)]">
                    {link}
                  </Placeholder>
                ))}
              </nav>
            </div>
          </footer>
        </Container>
      </Section>
    </main>
  );
};

// Export with displayName for better debugging
HomePage.displayName = 'HomePage';

export default memo(HomePage);
