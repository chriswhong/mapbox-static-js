import React, { useMemo, useState, useCallback } from 'react';
import type { MarkerProps, CustomMarkerProps } from '../types';
import { useStaticMapContext, MarkerPositionContext } from './context';

const DefaultMarkerIcon: React.FC<{
  scale?: number;
  color?: string;
  symbol?: string;
}> = ({ scale = 1, color = '#3b82f6', symbol }) => {
  const markerSize = 30 * scale;
  const shadowRx = 12 * scale;
  const shadowRy = 6 * scale;
  const fontSize = 14 * scale;

  return (
    <div style={{ position: 'relative' }}>
      <svg 
        width={markerSize} 
        height={markerSize + 10}
        style={{ 
          position: 'relative',
          overflow: 'visible',
        }}
      >
        <defs>
          {/* Shadow gradient */}
          <radialGradient id="markerShadowGradient">
            <stop offset="10%" stopOpacity="0.4" />
            <stop offset="100%" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        
        {/* Drop shadow ellipse */}
        <ellipse 
          cx={markerSize / 2} 
          cy={markerSize + 5} 
          rx={shadowRx} 
          ry={shadowRy} 
          fill="url(#markerShadowGradient)"
        />
        
        {/* Main marker shape - rounder teardrop/pin shape */}
        <path
          d={`M ${markerSize/2} ${markerSize} 
              C ${markerSize/2 - markerSize*0.35} ${markerSize - markerSize*0.4}
                ${markerSize*0.1} ${markerSize*0.55}
                ${markerSize*0.1} ${markerSize*0.35}
              C ${markerSize*0.1} ${markerSize*0.16}
                ${markerSize*0.28} 0
                ${markerSize/2} 0
              C ${markerSize*0.72} 0
                ${markerSize*0.9} ${markerSize*0.16}
                ${markerSize*0.9} ${markerSize*0.35}
              C ${markerSize*0.9} ${markerSize*0.55}
                ${markerSize/2 + markerSize*0.35} ${markerSize - markerSize*0.4}
                ${markerSize/2} ${markerSize} Z`}
          fill={color}
          stroke="#fff"
          strokeWidth="2"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
        />
        
        {/* Symbol text */}
        {symbol && (
          <text
            x={markerSize / 2}
            y={markerSize * 0.45}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={fontSize}
            fontWeight="bold"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {symbol}
          </text>
        )}
      </svg>
    </div>
  );
};

export const Marker: React.FC<MarkerProps> = ({
  position,
  scale = 1,
  symbol,
  color = '#3b82f6',
  children,
  onClick,
  className,
  style,
}) => {
  const { latLngToPixel, isLoaded } = useStaticMapContext();
  const markerSize = 30 * scale;
  
  // Internal state for popup visibility when popups are children
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { x, y } = useMemo(() => {
    if (!isLoaded) return { x: 0, y: 0 };
    return latLngToPixel(position);
  }, [position, latLngToPixel, isLoaded]);

  const markerPositionContext = useMemo(() => ({
    position,
    dimensions: {
      width: markerSize,
      height: markerSize + 10 // Include the pin point extension
    }
  }), [position, markerSize]);

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

  const markerStyle: React.CSSProperties = {
    left: x,
    top: y,
    cursor: (onClick || popupChildren.length > 0) ? 'pointer' : 'default',
    ...style,
  };

  // Marker content: either non-popup children or default icon
  const markerContent = markerChildren || (
    <DefaultMarkerIcon
      scale={scale}
      color={color}
      symbol={symbol}
    />
  );

  // Filter popup children based on visibility state
  const visiblePopupChildren = popupChildren.length > 0 && isPopupVisible ? popupChildren : [];

  return (
    <MarkerPositionContext.Provider value={markerPositionContext}>
      <div
        className={`mapbox-static-marker ${(onClick || popupChildren.length > 0) ? 'static-map-interactive' : ''} ${className || ''}`}
        style={markerStyle}
        onClick={handleMarkerClick}
      >
        {markerContent}
      </div>
      {/* Render popup children outside marker div to avoid positioning issues */}
      {visiblePopupChildren}
    </MarkerPositionContext.Provider>
  );
};

export const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  imageUrl,
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
      width: 40, // Default max width from CSS
      height: 40 // Default max height from CSS
    }
  }), [position]);

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

  const markerStyle: React.CSSProperties = {
    left: x,
    top: y,
    cursor: (onClick || popupChildren.length > 0) ? 'pointer' : 'default',
    ...style,
  };

  // Filter popup children based on visibility state
  const visiblePopupChildren = popupChildren.length > 0 && isPopupVisible ? popupChildren : [];

  return (
    <MarkerPositionContext.Provider value={markerPositionContext}>
      <div
        className={`mapbox-static-custom-marker ${(onClick || popupChildren.length > 0) ? 'static-map-interactive' : ''} ${className || ''}`}
        style={markerStyle}
        onClick={handleMarkerClick}
      >
        <img
          src={imageUrl}
          alt="Custom marker"
          style={{
            display: 'block',
            maxWidth: '40px',
            maxHeight: '40px',
          }}
        />
        {markerChildren}
      </div>
      {/* Render popup children outside marker div */}
      {visiblePopupChildren}
    </MarkerPositionContext.Provider>
  );
};