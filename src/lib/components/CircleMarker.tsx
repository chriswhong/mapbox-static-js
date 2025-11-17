import React, { useMemo, useState, useCallback } from 'react';
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
  
  // Internal state for popup visibility when popups are children
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { x, y } = useMemo(() => {
    if (!isLoaded) return { x: 0, y: 0 };
    return latLngToPixel(position);
  }, [position, latLngToPixel, isLoaded]);

  const markerPositionContext = useMemo(() => ({
    position,
    dimensions: {
      width: radius * 2,
      height: radius * 2
    }
  }), [position, radius]);

  // Separate popup children from marker content
  const { popupChildren, markerChildren } = useMemo(() => {
    const popups: React.ReactElement[] = [];
    const others: React.ReactNode[] = [];
    
    React.Children.forEach(children, (child) => {
      // Skip null, undefined, false, etc.
      if (!child) return;
      
      if (React.isValidElement(child) && 
          child.type &&
          typeof child.type === 'function' &&
          (child.type as React.FunctionComponent).displayName === 'Popup') {
        // This is a Popup component
        popups.push(child as React.ReactElement);
      } else {
        others.push(child);
      }
    });
    
    return { 
      popupChildren: popups, 
      markerChildren: others.length > 0 ? others : null 
    };
  }, [children]);

  // Handle click events - toggle popup if popup children exist, otherwise use provided onClick
  const handleMarkerClick = useCallback((e: React.MouseEvent) => {
    if (popupChildren.length > 0) {
      setIsPopupVisible(!isPopupVisible);
    }
    if (onClick) {
      onClick(e);
    }
  }, [popupChildren, isPopupVisible, onClick]);

  if (!isLoaded) return null;

  const circleStyle: React.CSSProperties = {
    left: x - radius,
    top: y - radius,
    width: radius * 2,
    height: radius * 2,
    backgroundColor: color,
    border: strokeWidth > 0 ? `${strokeWidth}px solid ${strokeColor}` : 'none',
    opacity: opacity,
    cursor: (onClick || popupChildren.length > 0) ? 'pointer' : 'default',
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

  // Filter popup children based on visibility state
  const visiblePopupChildren = popupChildren.length > 0 && isPopupVisible ? popupChildren : [];

  return (
    <MarkerPositionContext.Provider value={markerPositionContext}>
      <div
        className={`static-map-circle-marker ${(onClick || popupChildren.length > 0) ? 'static-map-interactive' : ''} ${className || ''}`}
        style={circleStyle}
        onClick={handleMarkerClick}
      >
        {markerChildren}
      </div>
      {/* Render popup children outside marker div to avoid positioning issues */}
      {visiblePopupChildren}
    </MarkerPositionContext.Provider>
  );
};

// Add displayName for component identification
CircleMarker.displayName = 'CircleMarker';