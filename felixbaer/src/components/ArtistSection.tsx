// noinspection TypeScriptValidateTypes

'use client';

import { memo, useCallback, startTransition, useState } from 'react';
import { cn } from '@/lib/utils';
import { colors, typography } from '@/styles/tokens';
import { Button } from '@/components';

export interface ArtistSectionProps {
  className?: string;
  onMoreAboutClick?: () => void;
  onBackClick?: () => void;
}

const ArtistSection = memo(function ArtistSectionProps({
  className,
  onMoreAboutClick,
  onBackClick,
}: ArtistSectionProps) {
  const [showBiography, setShowBiography] = useState(false);

  // Modern event handlers with startTransition
  const handleMoreAboutClick = useCallback(() => {
    startTransition(() => {
      setShowBiography(true);
      if (onMoreAboutClick) {
        onMoreAboutClick();
      }
    });
  }, [onMoreAboutClick]);

  const handleBackClick = useCallback(() => {
    startTransition(() => {
      setShowBiography(false);
      if (onBackClick) {
        onBackClick();
      }
    });
  }, [onBackClick]);

  const timelineItems = [
    {
      year: "2024",
      title: "Erste große Einzelausstellung",
      description: [
        "Breakthrough exhibition in Berlin",
        "Featured in Contemporary Art Magazine", 
        "Sold out opening night",
        "Critical acclaim from major galleries"
      ]
    },
    {
      year: "2023", 
      title: "Internationale Anerkennung",
      description: [
        "Selected for Venice Art Fair",
        "Winner of Young Artist Award",
        "Collaboration with Tate Modern",
        "Featured in Artforum magazine"
      ]
    },
    {
      year: "2022",
      title: "Durchbruch in der Kunstszene", 
      description: [
        "First gallery representation",
        "Participation in group exhibitions",
        "Development of signature style",
        "Building collector base"
      ]
    },
    {
      year: "2021",
      title: "Künstlerische Entwicklung",
      description: [
        "Master's degree completion",
        "Studio practice establishment", 
        "First art fair participation",
        "Community engagement projects"
      ]
    }
  ];

  if (showBiography) {
    return (
      <section
        className={cn("w-full h-full", className)}
        aria-label="Artist biography"
      >
        <div className="flex flex-col h-full min-h-[90vh] justify-center">
          <div className="w-full max-w-[min(95vw,1200px)] mx-auto px-[2vw] sm:px-[3vw] lg:px-[4vw]">
            
            {/* Biography Header */}
            <div className="space-y-[3vh] lg:space-y-[4vh] mb-[6vh]">
              <h2 
                className="leading-tight"
                style={{
                  fontSize: 'clamp(1.125rem, 2.5vw, 1.75rem)',
                  fontFamily: typography.textStyles.heading.fontFamily,
                  fontWeight: typography.textStyles.heading.fontWeight,
                  color: colors.primary.medium,
                }}
              >
                Mehr über mich
              </h2>
              
              <h3 
                className="leading-tight"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  fontFamily: typography.fontFamilies.decorative,
                  fontWeight: typography.textStyles.decorativeHeading.fontWeight,
                  color: colors.text.dark,
                }}
              >
                Lebenslauf ipsum
              </h3>
            </div>

            {/* Timeline */}
            <div className="space-y-[4vh] lg:space-y-[6vh] mb-[6vh]">
              {timelineItems.map((item, index) => (
                <article 
                  key={item.year}
                  className="space-y-[2vh] p-[2vh] lg:p-[3vh] border border-gray-300 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <time 
                      className="font-bold"
                      style={{
                        fontSize: 'clamp(1rem, 2.2vw, 1.375rem)',
                        color: colors.text.primary,
                        letterSpacing: '1.5%'
                      }}
                    >
                      {item.year}
                    </time>
                    <h4 
                      className="font-medium"
                      style={{
                        fontSize: 'clamp(1.125rem, 2.5vw, 1.75rem)',
                        color: colors.text.primary,
                        letterSpacing: '1.5%'
                      }}
                    >
                      {item.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-1">
                    {item.description.map((line, lineIndex) => (
                      <p 
                        key={lineIndex}
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1.375rem)',
                          color: colors.text.primary,
                          lineHeight: '1.545',
                          letterSpacing: '1.5%'
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* Back Button */}
            <div className="flex justify-center lg:justify-start">
              <Button
                onClick={handleBackClick}
                variant="primary"
              >
                Zurück
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      className={cn("w-full h-full flex justify-center items-center", className)}
      aria-label="Artist information"
    >
      <div
          className="flex justify-between flex-col lg:flex-row gap-[4vw] lg:gap-[8vw] items-center h-full max-w-[min(100vw,1800px)] mx-auto"
          style={{marginLeft: '5%', marginRight: '5%'}}>

        {/* Left Content */}
        <div
            className="w-full lg:flex-1 flex-shrink-0 space-y-[3vh] lg:space-y-[4vh] text-center lg:text-left"
            style={{maxWidth: 'min(100%, 1000px)'}}
        >
          {/* Artist Name */}
          <h2
              className="leading-tight"
              style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 2rem)',
                fontFamily: typography.textStyles.heading.fontFamily,
                fontWeight: typography.textStyles.heading.fontWeight,
                color: colors.primary.medium,
                lineHeight: '1.175',
              }}
          >
            Felix Bär
          </h2>

          {/* Artist Description */}
          <h3
              className="leading-tight"
              style={{
                fontSize: 'clamp(2rem, 6vw, 5.5rem)',
                fontFamily: typography.fontFamilies.decorative,
                fontWeight: typography.textStyles.decorativeHeading.fontWeight,
                color: colors.text.dark,
                lineHeight: '1.15',
              }}
          >
            Lorem ipsum dolor sit amet consetetur
          </h3>

          {/* Description Text */}
          <p
              className="leading-relaxed"
              style={{
                fontSize: 'clamp(0.875rem, 2.2vw, 1.5rem)',
                fontFamily: typography.textStyles.body.fontFamily,
                fontWeight: typography.textStyles.body.fontWeight,
                color: colors.text.primary,
                lineHeight: '1.583',
                letterSpacing: '1.5%',
              }}
          >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
            vero eos et
          </p>

          {/* More About Button */}
          <div className="pt-[4vh] flex justify-center lg:justify-start">
            <Button
                onClick={handleMoreAboutClick}
                variant="primary"
            >
              Mehr Über mich
            </Button>
          </div>

          {/* Signature */}
          <div className="pt-[5vh] flex justify-center lg:justify-start">
            <div
                className="bg-gray-200 rounded flex items-center justify-center text-gray-600"
                style={{
                  width: 'clamp(8rem, 15vw, 10rem)',
                  height: 'clamp(2rem, 4vh, 3rem)',
                  fontSize: 'clamp(0.75rem, 1.5vw, 1rem)'
                }}
            >
              unterschrift-baer
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div
            className="w-full lg:flex-1 flex-shrink-0"
            style={{maxWidth: 'min(100%, 700px)'}}
        >
          <div
              className="w-full overflow-hidden shadow-lg"
              style={{
                margin: '0 auto',
                aspectRatio: '4 / 5', // Maintain 800x1000 aspect ratio
              }}
          >
            <img
                src="/assets/images/2025_U-Kurfürstendamm_56x38cm.jpg"
                alt="Felix Bär - Artist Portrait"
                className="w-full h-full object-cover"
                style={{
                  width: '800px',
                  height: '1000px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                onError={(e) => {
                  // Fallback if image doesn't load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
            />
            {/* Fallback content - hidden by default */}
            <div
                className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 hidden items-center justify-center text-gray-500"
                style={{display: 'none'}}
            >
              <div className="text-center p-[2vw]">
                <div
                    className="font-medium mb-2"
                    style={{fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'}}
                >
                  Artist Portrait
                </div>
                <div
                    className="opacity-75"
                    style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}
                >
                  Professional photo will be here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ArtistSection.displayName = 'ArtistSection';

export default ArtistSection;