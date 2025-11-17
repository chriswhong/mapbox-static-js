import React, { useContext } from 'react';
import type { StaticMapContextValue, MarkerPositionContextValue } from '../types';

// StaticMap context for coordinate system
export const StaticMapContext = React.createContext<StaticMapContextValue | null>(null);

export const useStaticMapContext = () => {
  const context = useContext(StaticMapContext);
  if (!context) {
    throw new Error('useStaticMapContext must be used within StaticMap component');
  }
  return context;
};

// Marker position context for Popup children
export const MarkerPositionContext = React.createContext<MarkerPositionContextValue | null>(null);

export const useMarkerPositionContext = () => {
  return useContext(MarkerPositionContext); // Can be null if not within a Marker
};