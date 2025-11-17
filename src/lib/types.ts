import type { ReactNode } from 'react';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Bounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface StaticMapProps {
  accessToken: string;
  mapStyle: string;
  center?: LatLng;
  zoom?: number;
  bounds?: Bounds;
  size: Size;
  bearing?: number;
  pitch?: number;
  retina?: boolean;
  attribution?: boolean;
  logo?: boolean;
  children?: ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface MarkerProps {
  position: LatLng;
  scale?: number;
  symbol?: string;
  color?: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface CustomMarkerProps {
  position: LatLng;
  imageUrl: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface CircleMarkerProps {
  position: LatLng;
  radius?: number;
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
  strokeOpacity?: number;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export type PopupAnchor = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type PopupOffset = number | { x: number; y: number } | {
  [key in PopupAnchor]?: { x: number; y: number };
};

export interface PopupProps {
  position?: LatLng; // Optional when used as child of Marker
  children: ReactNode;
  anchor?: PopupAnchor;
  offset?: PopupOffset;
  className?: string;
  closeButton?: boolean;
  closeOnClick?: boolean;
  focusAfterOpen?: boolean;
  maxWidth?: string;
  visible?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onClose?: () => void;
  style?: React.CSSProperties;
}

export interface StaticMapContextValue {
  bounds: Bounds | null;
  size: Size;
  latLngToPixel: (latLng: LatLng) => { x: number; y: number };
  accessToken: string;
  isLoaded: boolean;
}

export interface MarkerPositionContextValue {
  position: LatLng;
  dimensions?: {
    width: number;
    height: number;
  };
}