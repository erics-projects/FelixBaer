export const spacing = {
  // Base spacing units
  xs: '4px',
  sm: '8px',
  base: '16px',
  lg: '20px',
  xl: '32px',
  '2xl': '48px',
  
  // Specific spacing from Figma components
  button: {
    padding: '16px 32px',
    gap: '10px',
  },
  
  textfield: {
    padding: '20px 0px',
    horizontalPadding: '16px',
    gap: '8px',
  },
  
  checkbox: {
    gap: '8px',
  },
  
  menu: {
    padding: '12px',
    gap: '16px',
  },
  
  navigation: {
    padding: '8px 8px 4px',
    gap: '10px',
  },
} as const;

export const borderRadius = {
  none: '0px',
  sm: '4px',
  base: '5px',
  full: '100px',
} as const;

export const effects = {
  shadows: {
    button: '0px 0px 8px 1px rgba(229, 115, 115, 1)',
    focus: 'blur(3px)',
    click: 'blur(8px)',
  },
  
  transitions: {
    default: 'all 0.2s ease-in-out',
    fast: 'all 0.1s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },
  
  gradients: {
    accent: 'linear-gradient(180deg, rgba(229, 115, 115, 1) 0%, rgba(255, 169, 169, 1) 100%)',
  },
} as const;

export type SpacingToken = typeof spacing;
export type BorderRadiusToken = typeof borderRadius;
export type EffectsToken = typeof effects;