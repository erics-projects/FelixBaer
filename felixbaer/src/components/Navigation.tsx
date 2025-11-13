import React, { useState } from 'react';
import { colors, typography, spacing, borderRadius, effects } from '@/styles/tokens';

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NavigationProps {
  items: NavigationItem[];
  activeItemId?: string;
  onItemClick?: (itemId: string) => void;
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  items,
  activeItemId,
  onItemClick,
  className = '',
}) => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.navigation.gap,
    width: 'fit-content',
  };

  const getItemStyles = (item: NavigationItem, isActive: boolean, isHovered: boolean): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      fontFamily: typography.textStyles.decorativeLarge.fontFamily,
      fontWeight: typography.textStyles.decorativeLarge.fontWeight,
      fontSize: typography.textStyles.decorativeLarge.fontSize,
      lineHeight: typography.textStyles.decorativeLarge.lineHeight,
      color: colors.text.dark,
      padding: spacing.navigation.padding,
      textDecoration: 'none',
      display: 'block',
      transition: effects.transitions.default,
      cursor: 'pointer',
      userSelect: 'none',
      position: 'relative',
      borderBottom: isActive ? `2px solid ${colors.text.dark}` : 'none',
    };

    return baseStyles;
  };

  const getHoverDotStyles = (isVisible: boolean): React.CSSProperties => {
    return {
      position: 'absolute',
      top: '9px',
      left: '8px',
      width: '151px',
      height: '55px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2px',
      pointerEvents: 'none',
      opacity: isVisible ? 1 : 0,
      transition: effects.transitions.default,
    };
  };

  const dotStyles: React.CSSProperties = {
    width: '2px',
    height: '2px',
    backgroundColor: colors.accent.primary,
    borderRadius: '50%',
  };

  // Generate dots for hover effect (based on Figma design)
  const generateDots = () => {
    const dots = [];
    for (let i = 0; i < 150; i++) { // Approximate number of dots from Figma
      dots.push(
        <div
          key={i}
          style={{
            ...dotStyles,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      );
    }
    return dots;
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick(item.id);
    }
  };

  const handleMouseEnter = (itemId: string) => {
    setHoveredItemId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <nav className={className} style={containerStyles}>
      {items.map((item) => {
        const isActive = activeItemId === item.id;
        const isHovered = hoveredItemId === item.id;

        return (
          <div key={item.id} style={{ position: 'relative' }}>
            {/* Navigation Item */}
            <div
              style={getItemStyles(item, isActive, isHovered)}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleItemClick(item);
                }
              }}
            >
              {item.label}
            </div>

            {/* Hover Dots Effect */}
            <div style={getHoverDotStyles(isHovered && !isActive)}>
              {generateDots()}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;