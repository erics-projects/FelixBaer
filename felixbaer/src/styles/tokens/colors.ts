export const colors = {
  // Primary colors from Figma design system
  primary: {
    dark: '#333333',
    medium: '#505C7F', 
    light: '#FFFFFF',
  },
  
  // Accent colors
  accent: {
    primary: '#E57373',
    light: '#FFA9A9',
    lightest: '#FADCD9',
  },
  
  // State colors
  error: '#C30000',
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    hover: 'rgba(255, 255, 255, 0.7)',
  },
  
  // Text colors
  text: {
    primary: '#333333',
    secondary: '#505C7F',
    inverse: '#FFFFFF',
    error: '#C30000',
    dark: '#111111',
  },
  
  // Border colors
  border: {
    default: '#505C7F',
    error: '#C30000',
    light: '#FADCD9',
  },
} as const;

export type ColorToken = typeof colors;