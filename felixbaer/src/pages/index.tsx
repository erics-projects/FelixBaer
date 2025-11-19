'use client';

import { memo, useMemo, useCallback, startTransition, use } from 'react';
import { cn } from '@/lib/utils';
import { Keyvisual, ArtistSection, Gallery, Exhibitions, Contact } from '@/components';

// Modern Section component with viewport-aware sizing and backdrop support
const Section = memo<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  'aria-label'?: string;
  fullHeight?: boolean;
  withBackdrop?: boolean;
  darkBackdrop?: boolean;
  compact?: boolean;
}>((props) => {
  const {
    children,
    className,
    id,
    'aria-label': ariaLabel,
    fullHeight = false,
    withBackdrop = false,
    darkBackdrop = false,
    compact = false
  } = props;
  
  const heightClass = fullHeight ? 'min-h-screen' : 'min-h-[50vh]';
  const backdropClass = withBackdrop ? (darkBackdrop ? 'content-backdrop-dark' : 'content-backdrop') : '';
  
  return (
    <section
      id={id}
      className={cn(
        heightClass,
        "w-full",
        "p-0 m-0",
        backdropClass,
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
});

Section.displayName = 'Section';

// Modern Container component with centered layout and smart spacing
const Container = memo<{
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  centered?: boolean;
}>(({ children, size = 'lg', className, centered = false }) => {
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
      centered ? "flex items-center justify-center min-h-full" : "",
      "px-[2vw] sm:px-[3vw] lg:px-[4vw]",
      // Add responsive spacing for large screens
      "2xl:px-[8vw] 3xl:px-[12vw]",
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


  // Modern event handlers with useCallback
  const handleButtonClick = useCallback(() => {
    startTransition(() => {
      console.log('Button clicked');
    });
  }, []);

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Combined Hero and Artist Section - full window width */}
      <Section
        fullHeight={true}
        aria-label="Hero and Artist section"
        id="hero-artist"
        className="w-full"
      >
        <div className="w-full flex flex-col">
          {/* Keyvisual Component - 100% window width */}
          <div className="w-full">
            <Keyvisual className={"m-0 p-0"}/>
            <ArtistSection className={"m-0 p-0"}
                onMoreAboutClick={handleButtonClick}
                onBackClick={handleButtonClick}
            />
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section
        aria-label="Gallery section"
        id="gallery"
        className="w-full"
      >
        <Gallery />
      </Section>


      {/* Exhibitions Section */}
      <Section
        aria-label="Exhibitions"
        id="exhibitions"
        className="w-full"
      >
        <Exhibitions />
      </Section>

      {/* Contact Section */}
      <Section
        aria-label="Contact form"
        id="contact"
        className="w-full"
      >
        <Contact
          onSubmit={(data) => {
            console.log('Form submitted:', data);
          }}
        />
      </Section>
    </main>
  );
};

// Export with displayName for better debugging
HomePage.displayName = 'HomePage';

export default memo(HomePage);
