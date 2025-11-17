import React, { useMemo } from 'react';
import type { CircleMarkerProps } from '../types';
import { useStaticMapContext } from './context';
import { MarkerPositionContext } from './context';

export const CircleMarker: React.FC<CircleMarkerProps> = ({
  position,
  radius = 10,
  color = '#3498db',
  strokeColor = '#ffffff',
  strokeWidth = 2,
  opacity = 1,
  strokeOpacity = 1,
  children,
  onClick,
  className,
  style,
}) => {
  const { latLngToPixel, isLoaded } = useStaticMapContext();

  const { x, y } = useMemo(() => {
    if (!isLoaded) return { x: 0, y: 0 };
    return latLngToPixel(position);
  }, [position, latLngToPixel, isLoaded]);

  if (!isLoaded) return null;

  const circleStyle: React.CSSProperties = {
    left: x - radius,
    top: y - radius,
    width: radius * 2,
    height: radius * 2,
    backgroundColor: color,
    border: strokeWidth > 0 ? `${strokeWidth}px solid ${strokeColor}` : 'none',
    opacity: opacity,
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  // Apply stroke opacity by adjusting the border color if it's different from fill opacity
  if (strokeOpacity !== 1 && strokeWidth > 0) {
    // Convert hex color to rgba for opacity
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    
    if (strokeColor.startsWith('#')) {
      circleStyle.borderColor = hexToRgba(strokeColor, strokeOpacity);
    }
  }

  const contextValue = {
    position,
  };

  return (
    <MarkerPositionContext.Provider value={contextValue}>
      <div
        className={`static-map-circle-marker ${onClick ? 'static-map-interactive' : ''} ${className || ''}`}
        style={circleStyle}
        onClick={onClick}
      >
        {children}
      </div>
    </MarkerPositionContext.Provider>
  );
};

// Add displayName for component identification
CircleMarker.displayName = 'CircleMarker';