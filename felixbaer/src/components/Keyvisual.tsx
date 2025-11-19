'use client';

import { memo, useCallback, startTransition } from 'react';
import { cn } from '@/lib/utils';
import { colors, typography, spacing, borderRadius, effects } from '@/styles/tokens';

export interface KeyvisualProps {
  className?: string;
}

const Keyvisual = memo<KeyvisualProps>(({ className }) => {
  // Modern event handler with startTransition

  return (
    <div
      className={cn("w-full h-full flex justify-center items-center", className)}
      aria-label="Hero section"
    >
        <div
            className="flex flex-col justify-between lg:flex-row items-center gap-[4vw] lg:gap-[2vw] h-full max-w-[min(100vw,1800px)] mx-auto"
            style={{marginLeft: '5%', marginRight: '5%'}}>
            {/* Left Content - viewport-aware sizing */}
            <div
                className="w-full lg:flex-1 flex-shrink-0 space-y-[3vh] lg:space-y-[4vh] text-center lg:text-left"
                style={{maxWidth: 'min(100%, 1000px)'}}
            >
                {/* Subtitle */}
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
                    Aquarellekunst ipsum
                </h2>

                {/* Main Title */}
                <h1
                    className="leading-tight lg:leading-none"
                    style={{
                        fontSize: 'clamp(2rem, 8vw, 7rem)',
                        fontFamily: typography.fontFamilies.decorative,
                        fontWeight: typography.textStyles.decorativeHeading.fontWeight,
                        color: colors.text.dark,
                        lineHeight: '1.15',
                    }}
                >
                    Plein air painting in berlin
                </h1>
            </div>

            {/* Right Video - fully responsive */}
            <div
                className="w-full lg:flex-1 flex-shrink-0"
                style={{maxWidth: 'min(100%, 700px)'}}
            >
                <div
                    className="w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative"
                    style={{
                        margin: '0 auto',
                        aspectRatio: '4 / 5', // Maintain 800x1000 aspect ratio
                    }}
                >

                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        controls={false}
                        onError={(e) => {
                            console.log('Video error:', e);
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallback) {
                                e.currentTarget.style.display = 'none';
                                fallback.style.display = 'flex';
                            }
                        }}
                        onLoadStart={() => console.log('Video loading started')}
                        onCanPlay={() => console.log('Video can play')}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    >
                        <source src="/assets/videos/output.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Fallback content - hidden by default */}
                    <div
                        className="absolute inset-0 w-full h-full hidden items-center justify-center text-gray-500 bg-gradient-to-br from-gray-100 to-gray-200"
                        style={{display: 'none'}}
                    >
                        <div className="text-center p-[2vw]">
                            <div
                                className="font-medium mb-2"
                                style={{fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'}}
                            >
                                Artist at Work
                            </div>
                            <div
                                className="opacity-75"
                                style={{fontSize: 'clamp(0.875rem, 2vw, 1rem)'}}
                            >
                                Video content will appear here
                            </div>
                            <div
                                className="opacity-50 mt-2"
                                style={{fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'}}
                            >
                                (Video format may need conversion for web compatibility)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
});

Keyvisual.displayName = 'Keyvisual';

export default Keyvisual;