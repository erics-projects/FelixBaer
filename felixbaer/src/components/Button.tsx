import React, { useState } from 'react';
import { colors, typography, spacing, borderRadius, effects } from '@/styles/tokens';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  className = '',
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseStyles: React.CSSProperties = {
    fontFamily: typography.textStyles.button.fontFamily,
    fontWeight: typography.textStyles.button.fontWeight,
    fontSize: typography.textStyles.button.fontSize,
    lineHeight: typography.textStyles.button.lineHeight,
    textTransform: typography.textStyles.button.textTransform,
    padding: spacing.button.padding,
    borderRadius: borderRadius.full,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: effects.transitions.default,
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.button.gap,
    userSelect: 'none',
  };

  const getVariantStyles = (): React.CSSProperties => {
    if (disabled) {
      return {
        backgroundColor: colors.primary.medium,
        color: colors.text.inverse,
        opacity: 0.5,
      };
    }

    if (isPressed) {
      // Click state from Figma
      return {
        backgroundColor: colors.accent.primary,
        color: colors.text.inverse,
        filter: effects.shadows.click,
      };
    }

    if (variant === 'primary') {
      return {
        backgroundColor: colors.primary.medium,
        color: colors.text.inverse,
      };
    }

    return {
      backgroundColor: colors.background.primary,
      color: colors.text.primary,
      border: `1px solid ${colors.border.default}`,
    };
  };

  const getHoverStyles = (): React.CSSProperties => {
    if (disabled || isPressed) return {};

    if (variant === 'primary') {
      return {
        backgroundColor: colors.accent.primary,
        boxShadow: effects.shadows.button,
      };
    }

    return {
      backgroundColor: colors.background.hover,
      borderColor: colors.accent.primary,
    };
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={className}
      style={{
        ...baseStyles,
        ...getVariantStyles(),
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        Object.assign(target.style, getHoverStyles());
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        Object.assign(target.style, getVariantStyles());
        handleMouseLeave();
      }}
    >
      {children}
    </button>
  );
};

export default Button;