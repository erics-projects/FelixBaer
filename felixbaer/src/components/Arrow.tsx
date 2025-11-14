import React, { useState } from 'react';
import { colors, spacing, borderRadius, effects } from '@/styles/tokens';

export interface ArrowProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  state?: 'default' | 'hover';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Arrow: React.FC<ArrowProps> = ({
  direction = 'down',
  state = 'default',
  onClick,
  disabled = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentState = isHovered ? 'hover' : state;

  const containerStyles: React.CSSProperties = {
    width: '10px',
    height: '74px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
    opacity: disabled ? 0.5 : 1,
    transition: effects.transitions.default,
    position: 'relative',
  };

  const getArrowStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      width: '0px',
      height: '74px',
      borderLeft: `2px solid ${currentState === 'hover' ? colors.accent.primary : colors.primary.medium}`,
      borderRadius: '1px',
      transition: effects.transitions.default,
    };

    // Apply rotation based on direction
    let rotation = 0;
    switch (direction) {
      case 'up':
        rotation = 180;
        break;
      case 'left':
        rotation = 90;
        break;
      case 'right':
        rotation = -90;
        break;
      default: // 'down'
        rotation = 0;
    }

    return {
      ...baseStyles,
      transform: `rotate(${rotation}deg)`,
    };
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
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
      tabIndex={onClick && !disabled ? 0 : -1}
      role={onClick ? 'button' : undefined}
      aria-disabled={disabled}
    >
      <div style={getArrowStyles()} />
    </div>
  );
};

export default Arrow;