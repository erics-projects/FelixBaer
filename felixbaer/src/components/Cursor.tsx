import React, { useState, useEffect } from 'react';
import { colors, spacing, borderRadius, effects } from '@/styles/tokens';

export interface CursorProps {
  state?: 'default' | 'hover' | 'focus';
  className?: string;
}

const Cursor: React.FC<CursorProps> = ({
  state = 'default',
  className = '',
}) => {
  const [currentState, setCurrentState] = useState(state);

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  const getCursorStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      borderRadius: '50%',
      transition: effects.transitions.default,
      pointerEvents: 'none',
      position: 'relative',
    };

    switch (currentState) {
      case 'hover':
        return {
          ...baseStyles,
          width: '20px',
          height: '20px',
          background: effects.gradients.accent,
          filter: effects.shadows.focus,
          transform: 'translate(-10px, -10px)',
        };
      
      case 'focus':
        return {
          ...baseStyles,
          width: '12px',
          height: '12px',
          background: effects.gradients.accent,
          filter: effects.shadows.focus,
          transform: 'translate(-6px, -6px)',
        };
      
      default: // 'default'
        return {
          ...baseStyles,
          width: '2px',
          height: '2px',
          backgroundColor: 'transparent',
          transform: 'translate(-1px, -1px)',
        };
    }
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '2px',
    height: '2px',
    display: 'inline-block',
  };

  return (
    <div className={className} style={containerStyles}>
      <div style={getCursorStyles()} />
    </div>
  );
};

export default Cursor;