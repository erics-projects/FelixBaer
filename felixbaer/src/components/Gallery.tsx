'use client';

import { memo, useState, useCallback, startTransition, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { colors, typography } from '@/styles/tokens';
import { Arrow } from '@/components';

export interface GalleryImage {
  src: string;
  title: string;
  description?: string;
}

export interface GalleryFolder {
  year: string;
  title: string;
  coverImage: string;
  images: GalleryImage[];
}

export interface GalleryProps {
  className?: string;
}

// Revolutionary Drag-to-Rotate Modal with Blurred Side Images
const ImageModal = memo<{
  isOpen: boolean;
  folder: GalleryFolder | null;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}>(({ isOpen, folder, currentIndex, onClose, onNext, onPrevious }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [velocity, setVelocity] = useState(0);
  const [lastDragTime, setLastDragTime] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      setDragOffset(0);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setDirection('left');
        onPrevious();
      }
      if (e.key === 'ArrowRight') {
        setDirection('right');
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, onPrevious, onNext]);

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    setDragOffset(deltaX);
  }, [isDragging, dragStart.x]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    const threshold = 100; // Minimum drag distance to trigger navigation
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0) {
        setDirection('right');
        onNext();
      } else {
        setDirection('left');
        onPrevious();
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, onNext, onPrevious]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - dragStart.x;
    setDragOffset(deltaX);
  }, [isDragging, dragStart.x]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    const threshold = 100;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0) {
        setDirection('right');
        onNext();
      } else {
        setDirection('left');
        onPrevious();
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, onNext, onPrevious]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleTouchMove, handleTouchEnd]);

  const handleNext = useCallback(() => {
    setDirection('right');
    onNext();
  }, [onNext]);

  const handlePrevious = useCallback(() => {
    setDirection('left');
    onPrevious();
  }, [onPrevious]);

  if (!isOpen || !folder) return null;

  const currentImage = folder.images[currentIndex];
  const previousIndex = currentIndex === 0 ? folder.images.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === folder.images.length - 1 ? 0 : currentIndex + 1;
  const previousImage = folder.images[previousIndex];
  const nextImage = folder.images[nextIndex];
  const progress = ((currentIndex + 1) / folder.images.length) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)',
      }}
    >
      {/* Animated backdrop blur */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.8) 100%)',
        }}
        onClick={onClose}
      />

      {/* Floating Close Button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-30 w-14 h-14 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center group"
        aria-label="Close gallery"
      >
        <span className="text-xl group-hover:rotate-90 transition-transform duration-300">×</span>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-8 right-20 z-30">
        <div className="flex items-center gap-4">
          <div className="text-white/60 text-sm font-mono">
            {String(currentIndex + 1).padStart(2, '0')} / {String(folder.images.length).padStart(2, '0')}
          </div>
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white/80 text-sm font-medium tracking-wider">
            {folder.year}
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative z-20 w-full h-full flex items-center justify-center px-4"
        onClick={(e) => {
          // Only close if clicking on the container itself, not on images
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* 3D Carousel Layout */}
        <div
          className="relative flex items-center justify-center"
          style={{
            perspective: '1200px',
            width: '100%',
            height: '80vh',
          }}
          onClick={(e) => {
            // Close if clicking on the 3D container background
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* Generate infinite carousel items */}
          {(() => {
            const totalImages = folder.images.length;
            const visibleRange = 4; // Show 2 images on each side of center
            const items = [];
            
            // Generate visible items with infinite loop logic
            for (let i = -visibleRange; i <= visibleRange; i++) {
              // Calculate actual image index with infinite wrapping
              let actualIndex = (currentIndex + i + totalImages) % totalImages;
              const image = folder.images[actualIndex];
              const offset = i;
              const isCenter = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              
              items.push(
                <div
                  key={`${actualIndex}-${offset}`} // Unique key for infinite scrolling
                  className={cn(
                    "absolute cursor-pointer select-none",
                    isCenter && "z-20",
                    isAdjacent && "z-10",
                    !isCenter && !isAdjacent && "z-0",
                    // Dynamic transition duration based on interaction
                    isDragging ? "transition-none" : "transition-all duration-300 ease-out"
                  )}
                  style={{
                    transform: (() => {
                      // Dynamic transform for infinite carousel
                      const baseX = offset * 400; // Wider spacing for larger images
                      const baseZ = isCenter ? 0 : -150; // Less depth for better visibility
                      const baseY = isCenter ? 0 : 15; // Minimal vertical offset
                      const scale = isCenter ? 1 : 0.9; // Larger side items for better preview
                      const rotateY = offset * 8; // Minimal rotation for cleaner look
                      
                      // Enhanced drag response for dynamic navigation
                      const dragMultiplier = isCenter ? 1.2 : 0.8; // More dramatic center movement
                      const effectiveDragOffset = dragOffset * dragMultiplier;
                      
                      // Dynamic scaling during interaction
                      const elasticScale = isDragging && isCenter ? 1.03 : (isCenter ? 1 : 0.9);
                      
                      return `
                        translateX(${baseX + effectiveDragOffset}px)
                        translateZ(${baseZ}px)
                        translateY(${baseY}px)
                        rotateY(${rotateY}deg)
                        scale(${elasticScale})
                      `;
                    })(),
                    opacity: (() => {
                      if (isCenter) return 1;
                      if (isAdjacent) return 0.7;
                      return 0.4;
                    })(),
                    filter: (() => {
                      if (isCenter) return 'blur(0px)';
                      if (isAdjacent) return 'blur(2px)';
                      return 'blur(6px)';
                    })(),
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isCenter) {
                      // Navigate to clicked image
                      if (offset > 0) {
                        setDirection('right');
                        onNext();
                      } else {
                        setDirection('left');
                        onPrevious();
                      }
                    }
                    // Center image clicks are handled by drag system, don't close
                  }}
                  onMouseDown={isCenter ? handleMouseDown : undefined}
                  onTouchStart={isCenter ? handleTouchStart : undefined}
                >
                  {/* Image Container */}
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl transition-all duration-500",
                      isCenter && "cursor-grab active:cursor-grabbing",
                      !isCenter && "hover:scale-105",
                      isCenter && isDragging && "scale-105"
                    )}
                    style={{
                      width: isCenter ? '700px' : '600px',
                      height: isCenter ? '800px' : '720px',
                      background: isCenter
                        ? 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)'
                        : 'rgba(0,0,0,0.3)',
                      border: isCenter
                        ? '2px solid rgba(255,255,255,0.2)'
                        : '1px solid rgba(255,255,255,0.1)',
                      boxShadow: isCenter
                        ? '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 100px rgba(59, 130, 246, 0.2)'
                        : '0 10px 25px -5px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Loading skeleton for center image */}
                    {isLoading && isCenter && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl animate-pulse" />
                    )}
                    
                    {/* Image */}
                    <img
                      src={image.src}
                      alt={image.title}
                      className={cn(
                        "w-full h-full object-contain transition-all duration-500 pointer-events-none",
                        isCenter && !isLoading && "scale-100 opacity-100",
                        isCenter && isLoading && "scale-95 opacity-0"
                      )}
                      onLoad={() => isCenter && setIsLoading(false)}
                    />
                    
                    {/* Center image overlay effects */}
                    {isCenter && (
                      <>
                        {/* Enhanced drag indicator with progress */}
                        {isDragging && (
                          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/30 backdrop-blur-md text-white text-sm z-10 transition-all duration-150">
                            <div className="flex items-center gap-2">
                              {Math.abs(dragOffset) > 30 && (
                                <div className={cn(
                                  "w-2 h-2 rounded-full transition-all duration-150",
                                  dragOffset > 30 ? "bg-green-400" : "bg-blue-400"
                                )} />
                              )}
                              <span className="font-medium">
                                {dragOffset > 30 ? '← Release to go back' :
                                 dragOffset < -30 ? 'Release to go forward →' :
                                 'Drag to navigate'}
                              </span>
                              {Math.abs(dragOffset) > 30 && (
                                <div className={cn(
                                  "w-2 h-2 rounded-full transition-all duration-150",
                                  dragOffset > 30 ? "bg-green-400" : "bg-blue-400"
                                )} />
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Info card */}
                        <div
                          className="absolute bottom-6 left-6 right-6 p-4 rounded-xl transition-all duration-500 opacity-0 hover:opacity-100 translate-y-4 hover:translate-y-0"
                          style={{
                            background: 'rgba(0,0,0,0.8)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        >
                          <h3 className="text-white text-lg font-light mb-2 tracking-wide">
                            {image.title}
                          </h3>
                          {image.description && (
                            <p className="text-gray-300 text-sm leading-relaxed opacity-80">
                              {image.description}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    {/* Enhanced side image interaction */}
                    {!isCenter && (
                      <div
                        className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-all duration-200 flex items-center justify-center cursor-pointer"
                      >
                        <div className="text-white text-lg font-medium px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-lg">
                          <div className="flex items-center gap-2">
                            {offset < 0 ? '←' : '→'}
                            <span>View</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            
            return items;
          })()}
        </div>
      </div>

      {/* Ambient light effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at 50% 50%, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      />
    </div>
  );
});

ImageModal.displayName = 'ImageModal';

const Gallery = memo<GalleryProps>(({ className }) => {
  const [selectedFolder, setSelectedFolder] = useState<GalleryFolder | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery folders data
  const galleryFolders: GalleryFolder[] = [
    {
      year: '2025',
      title: 'Neue Werke 2025',
      coverImage: '/assets/images/2025/2025_Kunstmarkt_56x38cm.jpg',
      images: [
        {
          src: '/assets/images/2025/2025_Alter-Fritz_56x38cm.jpg',
          title: 'Alter Fritz',
          description: 'Aquarell auf Papier'
        },
        {
          src: '/assets/images/2025/2025_Gendarmenmarkt III_56x38cm.jpg',
          title: 'Gendarmenmarkt III',
          description: 'Marktszene in Aquarell'
        },
        {
          src: '/assets/images/2025/2025_Kunstmarkt_56x38cm.jpg',
          title: 'Kunst verbindet',
          description: 'Ein Werk über die verbindende Kraft der Kunst'
        },
        {
          src: '/assets/images/2025/2025_Schiller_56x38cm.jpg',
          title: 'Schiller',
          description: 'Schillerstatur in Aquarellform'
        },
        {
          src: '/assets/images/2025/2025_Schlossbruecke_56x38cm.jpg',
          title: 'Schlossbrücke',
          description: 'Brücke vor dem Schloss'
        },
        {
          src: '/assets/images/2025/2025_U-Kurfürstendamm_56x38cm.jpg',
          title: 'U-Kurfürstendamm',
          description: 'U-Bahneingang U-Kuhdamm in Aquarell'
        },
        {
          src: '/assets/images/2025/2025_U-Zoologischer_Garten_56x38cm.jpg',
          title: 'U-Zoologischer Garten',
          description: 'U-Bahneingang U-Zoo in Aquarell'
        }
      ]
    },
    {
      year: '2024',
      title: 'Meisterwerke 2024',
      coverImage: '/assets/images/2024/2024_Allein am Markusplatz_56x38.jpg',
      images: [
        {
          src: '/assets/images/2024/2024_Allein am Markusplatz_56x38.jpg',
          title: 'Allein am Markusplatz',
          description: 'Venedig - 56x38cm Aquarell'
        },
        {
          src: '/assets/images/2024/2024_Central Park_56x38.jpg',
          title: 'Central Park',
          description: 'New York - 56x38cm Aquarell'
        },
        {
          src: '/assets/images/2024/2024_Feiertag_56x38cm.jpg',
          title: 'Feiertag',
          description: 'Festliche Stimmung - 56x38cm'
        },
        {
          src: '/assets/images/2024/2024_Großes Schaffen_56x38.jpg',
          title: 'Großes Schaffen',
          description: 'Kreative Energie - 56x38cm'
        },
        {
          src: '/assets/images/2024/2024_Letztes Licht_56x38cm.jpg',
          title: 'Letztes Licht',
          description: 'Abendstimmung - 56x38cm'
        },
        {
          src: '/assets/images/2024/2024_Schiffe in Stavanger_56x38cm.jpg',
          title: 'Schiffe in Stavanger',
          description: 'Norwegischer Hafen - 56x38cm'
        },
        {
          src: '/assets/images/2024/2024_Winter am Broadway_56x38.jpg',
          title: 'Winter am Broadway',
          description: 'New York im Winter - 56x38cm'
        },
        {
          src: '/assets/images/2024/2024_Winterspaziergang in Dresden_56x38.jpg',
          title: 'Winterspaziergang in Dresden',
          description: 'Sächsische Winterlandschaft - 56x38cm'
        }
      ]
    },
    {
      year: '2023',
      title: 'Klassiker 2023',
      coverImage: '/assets/images/2023/2023_Berlin von oben__56x38cm.jpg',
      images: [
        {
          src: '/assets/images/2023/2023_Berlin von oben__56x38cm.jpg',
          title: 'Berlin von oben',
          description: 'Hauptstadtpanorama - 56x38cm'
        },
        {
          src: '/assets/images/2023/2023_Berliner Rathaus_56x38cm.jpg',
          title: 'Berliner Rathaus',
          description: 'Historische Architektur - 56x38cm'
        },
        {
          src: '/assets/images/2023/2023_Dreifaltigkeitskirche Berlin_56x38.jpg',
          title: 'Dreifaltigkeitskirche Berlin',
          description: 'Sakrale Architektur - 56x38cm'
        },
        {
          src: '/assets/images/2023/2023_Erster am Hafen_40x30cm.jpg',
          title: 'Erster am Hafen',
          description: 'Hafenszene - 40x30cm'
        },
        {
          src: '/assets/images/2023/2023_Fließende Schatten_40x30.jpg',
          title: 'Fließende Schatten',
          description: 'Licht und Schatten - 40x30cm'
        },
        {
          src: '/assets/images/2023/2023_Seerosen_47x23cm.jpg',
          title: 'Seerosen',
          description: 'Naturstudium - 47x23cm'
        },
        {
          src: '/assets/images/2023/2023_Zoo Berlin_56x38cm.jpg',
          title: 'Zoo Berlin',
          description: 'Tiergarten Impressionen - 56x38cm'
        }
      ]
    }
  ];

  const openGallery = useCallback((folder: GalleryFolder) => {
    startTransition(() => {
      setSelectedFolder(folder);
      setCurrentImageIndex(0);
    });
  }, []);

  const closeGallery = useCallback(() => {
    startTransition(() => {
      setSelectedFolder(null);
      setCurrentImageIndex(0);
    });
  }, []);

  const goToNext = useCallback(() => {
    if (selectedFolder) {
      startTransition(() => {
        setCurrentImageIndex(prev => 
          prev === selectedFolder.images.length - 1 ? 0 : prev + 1
        );
      });
    }
  }, [selectedFolder]);

  const goToPrevious = useCallback(() => {
    if (selectedFolder) {
      startTransition(() => {
        setCurrentImageIndex(prev => 
          prev === 0 ? selectedFolder.images.length - 1 : prev - 1
        );
      });
    }
  }, [selectedFolder]);

  return (
    <>
      <section 
        className={cn("w-full py-16", className)}
        aria-label="Kunstwerke Galerie"
      >
        {/* Header */}
        <div className="text-center mb-12 px-6">
          <h2 
            className="mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontFamily: typography.fontFamilies.decorative,
              fontWeight: typography.textStyles.decorativeHeading.fontWeight,
              color: colors.text.primary,
            }}
          >
            Galerie
          </h2>
          <p 
            className="text-gray-600 max-w-2xl mx-auto"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontFamily: typography.textStyles.body.fontFamily,
              lineHeight: '1.6'
            }}
          >
            Entdecken Sie Felix Bärs Kunstwerke aus den Jahren 2023 bis 2025
          </p>
        </div>

        {/* Ultra-Modern Gallery Cards */}
        <div className="flex justify-center gap-12 px-6 perspective-1000">
          {galleryFolders.map((folder, index) => (
            <div
              key={folder.year}
              className="group cursor-pointer"
              onClick={() => openGallery(folder)}
              style={{
                transform: `rotateY(${(index - 1) * 5}deg)`,
                animationDelay: `${index * 200}ms`,
              }}
            >
              <div
                className="relative overflow-hidden transition-all duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-4"
                style={{
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 80px rgba(59, 130, 246, 0.1)',
                }}
              >
                {/* Futuristic card with glassmorphism */}
                <div className="relative w-80 h-[500px] bg-gradient-to-br from-gray-900/50 to-gray-800/50 overflow-hidden">
                  {/* Image */}
                  <img
                    src={folder.coverImage}
                    alt={folder.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    style={{
                      filter: 'contrast(1.1) saturate(1.2)',
                    }}
                  />
                  
                  {/* Advanced gradient overlay */}
                  <div
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 100%)',
                      opacity: 0.9,
                    }}
                  />
                  
                  {/* Animated border effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.3) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 3s ease-in-out infinite',
                    }}
                  />

                  {/* Floating year display */}
                  <div className="absolute bottom-8 left-0 right-0 text-center">
                    <div
                      className="inline-flex items-center justify-center w-24 h-24 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                      }}
                    >
                      <span
                        className="text-3xl font-extralight text-white tracking-wider"
                        style={{
                          fontFamily: 'ui-monospace, SF Mono, Monaco, monospace',
                          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        }}
                      >
                        {folder.year}
                      </span>
                    </div>
                  </div>
                  

                  {/* Particle effect overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                    style={{
                      background: `
                        radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
                      `,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <ImageModal
        isOpen={selectedFolder !== null}
        folder={selectedFolder}
        currentIndex={currentImageIndex}
        onClose={closeGallery}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;