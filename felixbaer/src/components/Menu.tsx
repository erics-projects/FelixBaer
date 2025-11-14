import React, { useState } from 'react';
import { colors, typography, spacing, borderRadius, effects } from '@/styles/tokens';

export interface MenuProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
}

const Menu: React.FC<MenuProps> = ({
  isOpen: controlledIsOpen,
  onToggle,
  className = '',
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.menu.gap,
    padding: spacing.menu.padding,
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    width: '64px',
    height: '56px',
  };

  const lineStyles: React.CSSProperties = {
    backgroundColor: colors.text.dark,
    height: '4px',
    borderRadius: borderRadius.sm,
    transition: effects.transitions.default,
  };

  const getLine1Styles = (): React.CSSProperties => {
    if (isOpen) {
      return {
        ...lineStyles,
        width: '28.28px',
        transform: 'rotate(45deg) translate(10px, 10px)',
      };
    }
    return {
      ...lineStyles,
      width: '40px',
    };
  };

  const getLine2Styles = (): React.CSSProperties => {
    if (isOpen) {
      return {
        ...lineStyles,
        width: '28.28px',
        transform: 'rotate(-45deg) translate(10px, -10px)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: '-14.14px',
        marginTop: '-2px',
      };
    }
    return {
      ...lineStyles,
      width: '40px',
    };
  };

  const getHoverDotsStyles = (isVisible: boolean): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2px',
      pointerEvents: 'none',
      opacity: isVisible ? 1 : 0,
      transition: effects.transitions.default,
    };

    if (isOpen) {
      return {
        ...baseStyles,
        top: '10px',
        left: '10px',
        width: '46px',
        height: '37px',
      };
    } else {
      return {
        ...baseStyles,
        top: '9px',
        left: '6px',
        width: '54px',
        height: '36px',
      };
    }
  };

  const dotStyles: React.CSSProperties = {
    width: '2px',
    height: '2px',
    backgroundColor: colors.accent.primary,
    borderRadius: '50%',
  };

  // Generate dots for hover effect
  const generateDots = (count: number) => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      dots.push(
        <div
          key={i}
          style={{
            ...dotStyles,
            animationDelay: `${Math.random() * 0.3}s`,
          }}
        />
      );
    }
    return dots;
  };

  const handleClick = () => {
    const newIsOpen = !isOpen;
    
    if (onToggle) {
      onToggle(newIsOpen);
    } else {
      setInternalIsOpen(newIsOpen);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={className}
      style={containerStyles}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {/* Menu Lines */}
      <div style={getLine1Styles()} />
      <div style={getLine2Styles()} />

      {/* Hover Dots Effect */}
      <div style={getHoverDotsStyles(isHovered)}>
        {generateDots(isOpen ? 30 : 35)}
      </div>
    </div>
  );
};

export default Menu;