import React, { useState, useRef } from 'react';
import { colors, typography, spacing, borderRadius, effects } from '@/styles/tokens';

export interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'number';
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  error,
  disabled = false,
  required = false,
  type = 'text',
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = value.length > 0;
  const hasError = Boolean(error);

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.textfield.gap,
    width: '100%',
  };

  const labelStyles: React.CSSProperties = {
    fontFamily: typography.textStyles.label.fontFamily,
    fontWeight: typography.textStyles.label.fontWeight,
    fontSize: typography.textStyles.label.fontSize,
    lineHeight: typography.textStyles.label.lineHeight,
    color: hasError ? colors.text.error : colors.text.primary,
  };

  const getInputContainerStyles = (): React.CSSProperties => {
    let backgroundColor: string = colors.background.primary;
    let borderColor: string = colors.border.default;
    let borderWidth = '0px 0px 2px';

    if (hasError) {
      borderColor = colors.border.error;
    } else if (isFocused) {
      borderColor = colors.border.default;
      borderWidth = '1px';
    } else if (isHovered) {
      backgroundColor = colors.background.hover;
    }

    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: `0px ${spacing.textfield.horizontalPadding}`,
      backgroundColor,
      border: `${borderWidth} solid ${borderColor}`,
      borderRadius: borderRadius.sm,
      transition: effects.transitions.default,
      minHeight: '60px',
    };
  };

  const getInputStyles = (): React.CSSProperties => {
    const fontWeight = hasValue ? 
      typography.textStyles.bodyMedium.fontWeight : 
      typography.textStyles.bodyLight.fontWeight;

    return {
      fontFamily: typography.textStyles.body.fontFamily,
      fontWeight,
      fontSize: typography.textStyles.body.fontSize,
      lineHeight: typography.textStyles.body.lineHeight,
      color: colors.text.primary,
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      padding: spacing.textfield.padding,
      width: '100%',
    };
  };

  const errorStyles: React.CSSProperties = {
    fontFamily: typography.textStyles.smallMedium.fontFamily,
    fontWeight: typography.textStyles.smallMedium.fontWeight,
    fontSize: typography.textStyles.smallMedium.fontSize,
    lineHeight: typography.textStyles.smallMedium.lineHeight,
    color: colors.text.error,
    marginTop: spacing.xs,
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={className} style={containerStyles}>
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={labelStyles}>
          {label}
          {required && <span style={{ color: colors.text.error }}>*</span>}
        </label>
      </div>

      {/* Input Container */}
      <div
        style={getInputContainerStyles()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: spacing.textfield.gap,
          padding: spacing.textfield.padding,
          width: '100%'
        }}>
          <input
            ref={inputRef}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            style={getInputStyles()}
            aria-invalid={hasError}
            aria-describedby={error ? `${label}-error` : undefined}
          />
          
          {/* Error Icon Container */}
          {hasError && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: spacing.textfield.gap,
              flexShrink: 0,
              width: '48px',
              justifyContent: 'flex-end'
            }}>
              {/* Error icon placeholder - in a real implementation, you'd use an SVG icon */}
              <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: colors.text.error,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: colors.text.inverse,
                fontWeight: 'bold',
              }}>
                !
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {hasError && error && (
        <div style={errorStyles} id={`${label}-error`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default TextField;