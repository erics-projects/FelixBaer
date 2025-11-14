'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { colors, typography } from '@/styles/tokens';

export interface Exhibition {
  id: string;
  date: string;
  title: string;
  location: string;
}

export interface ExhibitionsProps {
  className?: string;
}

const Exhibitions = memo<ExhibitionsProps>(({ className }) => {
  // Sample exhibitions data
  const exhibitions: Exhibition[] = [
    {
      id: '1',
      date: '14. Oktober 2024',
      title: 'Wintererwachen',
      location: 'Potsdamer Platz, Berlin'
    },
    {
      id: '2',
      date: '22. November 2024',
      title: 'Aquarell Reflexionen',
      location: 'Galerie Moderne, München'
    },
    {
      id: '3',
      date: '15. Dezember 2024',
      title: 'Städtische Impressionen',
      location: 'Kunsthaus Dresden'
    },
    {
      id: '4',
      date: '8. Januar 2025',
      title: 'Neue Horizonte',
      location: 'Art Space Hamburg'
    }
  ];

  return (
    <section 
      className={cn("w-full py-16", className)}
      aria-label="Ausstellungen"
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
          Meine Ausstellungen
        </h2>
        <p 
          className="text-gray-600 max-w-2xl mx-auto"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            fontFamily: typography.textStyles.body.fontFamily,
            lineHeight: '1.6'
          }}
        >
          Wo's bald was zu sehen gibt
        </p>
      </div>

      {/* Exhibition Cards - Gallery Style */}
      <div className="flex justify-center gap-12 px-6 perspective-1000">
        {exhibitions.map((exhibition, index) => (
          <div
            key={exhibition.id}
            className="group cursor-pointer"
            style={{
              transform: `rotateY(${(index - 1.5) * 3}deg)`,
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
              {/* Card with same dimensions as gallery */}
              <div className="relative w-80 h-[500px] bg-gradient-to-br from-gray-900/50 to-gray-800/50 overflow-hidden">
                {/* Background Image */}
                <img
                  src="/assets/images/backgroundCards1.png"
                  alt="Exhibition Background"
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

                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Date Badge */}
                  <div className="flex justify-center">
                    <div
                      className="inline-flex items-center px-4 py-2 rounded-full transition-all duration-500 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                      }}
                    >
                      <span
                        className="text-sm font-medium text-white tracking-wider"
                        style={{
                          fontFamily: 'ui-monospace, SF Mono, Monaco, monospace',
                          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        }}
                      >
                        {exhibition.date}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="text-center space-y-4">
                    {/* Title */}
                    <h3
                      className="text-white font-bold transition-all duration-300"
                      style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontFamily: typography.fontFamilies.decorative,
                        textShadow: '0 4px 20px rgba(0,0,0,0.7)',
                        lineHeight: '1.2',
                      }}
                    >
                      {exhibition.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center justify-center">
                      <div
                        className="w-2 h-2 rounded-full mr-3 transition-all duration-300 group-hover:scale-125"
                        style={{
                          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%)',
                          boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                        }}
                      />
                      <span
                        className="text-white/90 font-medium"
                        style={{
                          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                          fontFamily: typography.textStyles.body.fontFamily,
                          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        }}
                      >
                        {exhibition.location}
                      </span>
                    </div>
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
  );
});

Exhibitions.displayName = 'Exhibitions';

export default Exhibitions;