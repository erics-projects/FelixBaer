import React, { useState } from 'react';
import { colors, typography, spacing, borderRadius, effects } from '@/styles/tokens';

export interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.checkbox.gap,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    position: 'relative',
  };

  const checkboxStyles: React.CSSProperties = {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px', // Slight alignment adjustment
  };

  const iconStyles: React.CSSProperties = {
    width: '36px',
    height: '36px',
    backgroundColor: checked ? colors.primary.medium : 'transparent',
    border: checked ? 'none' : `2px solid ${colors.primary.medium}`,
    borderRadius: borderRadius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: effects.transitions.default,
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: typography.textStyles.checkbox.fontFamily,
    fontWeight: typography.textStyles.checkbox.fontWeight,
    fontSize: typography.textStyles.checkbox.fontSize,
    lineHeight: typography.textStyles.checkbox.lineHeight,
    letterSpacing: typography.textStyles.checkbox.letterSpacing,
    color: colors.text.primary,
    flex: 1,
    userSelect: 'none',
  };

  const checkmarkStyles: React.CSSProperties = {
    color: colors.text.inverse,
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: 1,
  };

  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
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
    if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      onChange(!checked);
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
      tabIndex={disabled ? -1 : 0}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
    >
      {/* Checkbox Icon */}
      <div style={checkboxStyles}>
        <div
          style={{
            ...iconStyles,
            transform: isHovered && !disabled ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {checked && (
            <span style={checkmarkStyles}>✓</span>
          )}
        </div>
      </div>

      {/* Label */}
      <label style={labelStyles} htmlFor="">
        {label}
      </label>

      {/* Hover Effect Overlay */}
      {isHovered && !disabled && (
        <>
          {/* Large hover area - matches Figma design */}
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              left: '180px', // Approximate position from Figma
              width: '254px',
              height: '28px',
              backgroundColor: 'rgba(229, 115, 115, 0.1)',
              borderRadius: borderRadius.sm,
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />
          {/* Small hover area around checkbox */}
          <div
            style={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              width: '36px',
              height: '36px',
              backgroundColor: 'rgba(229, 115, 115, 0.1)',
              borderRadius: borderRadius.sm,
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Checkbox;