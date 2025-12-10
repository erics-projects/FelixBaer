// noinspection TypeScriptValidateTypes

'use client';

import { memo, useCallback, startTransition, useState } from 'react';
import { cn } from '@/lib/utils';
// 
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
  const [animationClass, setAnimationClass] = useState("");

  const handleAnimation = (show: boolean) => {
    setAnimationClass(show ? "slide-in" : "slide-out");
    setTimeout(() => {
      setShowBiography(show);
      if (!show) {
        setAnimationClass(""); // Reset animation class after hiding biography
      }
    }, 300); // Match animation duration
  };

  const handleMoreAboutClick = useCallback(() => {
    startTransition(() => {
      handleAnimation(true);
      if (onMoreAboutClick) {
        onMoreAboutClick();
      }
    });
  }, [onMoreAboutClick]);

  const handleBackClick = useCallback(() => {
    startTransition(() => {
      handleAnimation(false);
      if (onBackClick) {
        onBackClick();
      }
    });
  }, [onBackClick]);

  return (
    <div className={cn("w-full h-full flex justify-center items-center", className)}>
      <div
        className="flex justify-center items-center h-full max-w-[min(100vw,1800px)] mx-auto overflow-hidden"
        style={{ marginLeft: '5%', marginRight: '5%' }}
      >
        {/* Wrapper for Image and Text */}
        <div className="flex flex-col lg:flex-row-reverse w-full h-full gap-[6vw] lg:gap-[10vw] items-stretch items-center lg:items-stretch">
          {/* Image Section */}
          <div
            className="w-full lg:flex-1 flex-shrink-0 sticky top-0 order-first"
            style={{ maxWidth: '700px' }}
          >
            <div
              className="w-full overflow-hidden shadow-lg"
              style={{
                margin: '0 auto',
                aspectRatio: '4 / 5',
                width: '100%',
                maxWidth: '700px',
              }}
            >
              <img
                src="/assets/images/2025_U-Kurfürstendamm_56x38cm.jpg"
                alt="Felix Bär - Artist Portrait"
                className="w-full h-full object-cover"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          </div>

          {/* Text Section */}
<div
             className={cn(
               "w-full lg:flex-1 flex-shrink-0 overflow-y-auto",
               animationClass
             )}
             style={{
               aspectRatio: '4 / 5',
               width: '100%',
               padding: '1rem',
             }}
          >
            {showBiography ? (
              <>
                <h2                  className="leading-tight"
                  style={{
                    fontSize: 'clamp(1.25rem, 2.8vw, 2rem)',
                    fontFamily: 'Nanum Myeongjo',
                    fontWeight: 600,
                    color: '#111111',
                    lineHeight: '1.3',
                    marginTop: '2rem',
                  }}
                >
                  Über mich
                </h2>
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
                    fontFamily: 'Public Sans',
                    fontWeight: 400,
                    color: '#505C7F',
                    lineHeight: '1.6',
                  }}
                >
                  Über die Zeichenkurse während meines Architekturstudiums habe ich 2018 zum Malen gefunden - dank eines inspirierenden Professors, der mit seiner Geschwindigkeit, Präzision und Gestaltung ein tolles Vorbild für seine Studierenden war. Auf der Basis von technischen, architektonischen Zeichnungen experimentierte ich mehr und mehr mit reinen Aquarellmalereien. Die Atmosphäre, Tiefe, Farbgebung und Freiheit des Aquarells faszinieren mich.
                </p>
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
                    fontFamily: 'Public Sans',
                    fontWeight: 400,
                    color: '#505C7F',
                    lineHeight: '1.6',
                  }}
                >
                  Neben meinem Beruf als Architekt in Berlin arbeite ich zuhause an meinen Aquarellen. Nach der Arbeit und an Wochenenden setze ich Ideen um, die ich aus meinem Alltag, Reisen und Schwarzweißbildern gewinne. Letztere reizen mich mit ihrem Charme, ihrer Atmosphäre und dem gewissen Etwas der Vergangenheit. Gerade durch die oft verwaschene Charakteristik jener Bilder eignen sie sich hervorragend als Einfluss & Vorbild für Aquarelle.
                </p>
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
                    fontFamily: 'Public Sans',
                    fontWeight: 400,
                    color: '#505C7F',
                    lineHeight: '1.6',
                  }}
                >
                  Im Sommer zieht es mich häufig in die Berliner Innenstadt, um dort Plein Air zu malen. Gerade weil Aquarell ein schnelles Medium ist, eignet es sich gut, um ein Bild vor Ort anzufertigen. Ich schätze es wert, wenn die Menschen für einen Moment anhalten und dem Entstehen eines Bildes zusehen. Für komplexere Werke oder um Skizzen von Reisen umzusetzen, bevorzuge ich es, zuhause in Ruhe an einem Bild zu arbeiten.
                </p>
                <div>
                  <Button onClick={handleBackClick} variant="primary">
                    Zurück
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h2
                  className="leading-tight"
                  style={{
                    fontSize: 'clamp(1.125rem, 2.5vw, 2rem)',
                    fontFamily: 'Public Sans',
                    fontWeight: 600,
                    color: '#505C7F',
                    lineHeight: '1.175',
                  }}
                >
                  Felix Bär
                </h2>
                <h3
                  className="leading-tight"
                  style={{
                    fontSize: 'clamp(2rem, 6vw, 5.5rem)',
                    fontFamily: 'Nanum Myeongjo',
                    fontWeight: 400,
                    color: '#111111',
                    lineHeight: '1.15',
                  }}
                >
                  Willkommen in meiner Welt der Kunst
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.75rem)',
                    fontFamily: 'Public Sans',
                    fontWeight: 400,
                    color: '#505C7F',
                    lineHeight: '1.6',
                  }}
                >
                  Entdecken Sie die Schönheit und Tiefe meiner Aquarellmalereien, die Atmosphäre, Stimmung und Raum schaffen.
                </p>
                <div className="mt-6">
                  <Button onClick={handleMoreAboutClick} variant="primary">
                    Mehr Über mich
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ArtistSection.displayName = 'ArtistSection';

export default ArtistSection;