export const typography = {
  fontFamilies: {
    decorative: 'Nanum Myeongjo, serif',
    primary: 'Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  },
  
  fontSizes: {
    xs: '14px',
    sm: '16px',
    base: '20px',
    lg: '24px',
    xl: '48px',
    '2xl': '52px',
    '3xl': '56px',
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
  },
  
  lineHeights: {
    tight: '1.15',
    normal: '1.175',
    relaxed: '1.3',
    loose: '1.583',
  },
  
  letterSpacing: {
    normal: '0',
    wide: '0.015em', // 1.5%
  },
  
  textStyles: {
    // Heading styles from Figma
    heading: {
      fontFamily: 'Public Sans, sans-serif',
      fontWeight: 600,
      fontSize: '52px',
      lineHeight: '1.175',
    },
    
    decorativeHeading: {
      fontFamily: 'Nanum Myeongjo, serif',
      fontWeight: 400,
      fontSize: '48px',
      lineHeight: '1.15',
    },
    
    decorativeLarge: {
      fontFamily: 'Nanum Myeongjo, serif',
      fontWeight: 400,
      fontSize: '56px',
      lineHeight: '1.15',
    },
    
    // Button text
    button: {
      fontFamily: 'Public Sans, sans-serif',
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '1.175',
      textTransform: 'uppercase' as const,
    },
    
    // Body text styles
    body: {
      fontFamily: 'Public Sans, sans-serif',
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '1.3',
    },
    
    bodyMedium: {
      fontFamily: 'Public Sans, sans-serif',
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '1.3',
    },
    
    bodyLight: {
      fontFamily: 'Public Sans, sans-serif',
      fontWeight: 300,
      fontSize: '20px',
      lineHeight: '1.3',
    },
    
    // Label styles
    label: {
      fontFamily: 'Public Sans, sans-serif',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '1.17',
    },
    
    // Small text
    small: {
      fontFamily: 'Public Sans, sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '1.175',
    },
    
    smallMedium: {
      fontFamily: 'Public Sans, sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '1.3',
    },
    
    // Checkbox text
    checkbox: {
      fontFamily: 'Public Sans, sans-serif',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '1.583',
      letterSpacing: '0.015em',
    },
  },
} as const;

export type TypographyToken = typeof typography;