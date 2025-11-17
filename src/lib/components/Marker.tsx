import React, { useMemo } from 'react';
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
          
          {/* Main marker gradient for depth */}
          <linearGradient id="markerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={`${color}dd`} />
          </linearGradient>
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
          fill="url(#markerGradient)"
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

  if (!isLoaded) return null;

  const markerStyle: React.CSSProperties = {
    left: x,
    top: y,
    cursor: onClick ? 'pointer' : 'default',
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

  return (
    <MarkerPositionContext.Provider value={markerPositionContext}>
      <div
        className={`mapbox-static-marker ${onClick ? 'static-map-interactive' : ''} ${className || ''}`}
        style={markerStyle}
        onClick={onClick}
      >
        {markerContent}
      </div>
      {/* Render popup children outside marker div to avoid positioning issues */}
      {popupChildren}
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

  const { x, y } = useMemo(() => {
    if (!isLoaded) return { x: 0, y: 0 };
    return latLngToPixel(position);
  }, [position, latLngToPixel, isLoaded]);

  const markerPositionContext = useMemo(() => ({ position }), [position]);

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

  if (!isLoaded) return null;

  const markerStyle: React.CSSProperties = {
    left: x,
    top: y,
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  };

  return (
    <MarkerPositionContext.Provider value={markerPositionContext}>
      <div
        className={`mapbox-static-custom-marker ${onClick ? 'static-map-interactive' : ''} ${className || ''}`}
        style={markerStyle}
        onClick={onClick}
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
      {popupChildren}
    </MarkerPositionContext.Provider>
  );
};