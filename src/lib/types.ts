import type { ReactNode } from 'react';

export type LngLatLike = 
  | { lng: number; lat: number }
  | { lon: number; lat: number }
  | [number, number];

export interface Bounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export type LngLatBoundsLike = 
  | Bounds
  | [LngLatLike, LngLatLike]
  | [number, number, number, number];

export interface Size {
  width: number;
  height: number;
}

export interface StaticMapProps {
  /** Your Mapbox access token from https://account.mapbox.com/ */
  accessToken: string;
  /** Mapbox style ID (e.g., "mapbox/streets-v12", "mapbox/satellite-v9") */
  mapStyle: string;
  /** Map center coordinates in latitude and longitude @default { lat: 0, lng: 0 } */
  center?: LngLatLike;
  /** Zoom level from 0 (world) to 22 (building level) @default 0 */
  zoom?: number;
  /** Alternative to center/zoom: fit map to geographic bounds */
  bounds?: LngLatBoundsLike;
  /** Map dimensions in pixels */
  size: Size;
  /** Map rotation in degrees (0-360) @default 0 */
  bearing?: number;
  /** 3D tilt angle in degrees (0-60) @default 0 */
  pitch?: number;
  /** Generate high-DPI/retina image (@2x) @default true */
  retina?: boolean;
  /** Show Mapbox attribution and logo @default true */
  attribution?: boolean;
  /** Show Mapbox logo @default true */
  logo?: boolean;
  /** Marker, CircleMarker, and other overlay components */
  children?: ReactNode;
  /** Callback fired when the map image loads successfully */
  onLoad?: () => void;
  /** Callback fired when the map image fails to load */
  onError?: (error: Error) => void;
  /** Custom CSS class name for the map container */
  className?: string;
  /** Custom CSS styles for the map container */
  style?: React.CSSProperties;
}

export interface MarkerProps {
  /** Marker position coordinates */
  position: LngLatLike;
  /** Marker size scale factor @default 1 */
  scale?: number;
  /** Icon symbol (emoji, letter, or symbol) */
  symbol?: string;
  /** Marker color (hex, rgb, or named color) @default #FF0000 */
  color?: string;
  /** Popup component or custom overlay content */
  children?: ReactNode;
  /** Click event handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Custom CSS class name for styling */
  className?: string;
  /** Custom CSS styles for the marker */
  style?: React.CSSProperties;
}

export interface CustomMarkerProps {
  position: LngLatLike;
  imageUrl: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface CircleMarkerProps {
  /** Circle marker position coordinates */
  position: LngLatLike;
  /** Circle radius in pixels @default 10 */
  radius?: number;
  /** Fill color (hex, rgb, or named color) @default #3498db */
  color?: string;
  /** Stroke/border color @default #ffffff */
  strokeColor?: string;
  /** Stroke width in pixels @default 2 */
  strokeWidth?: number;
  /** Circle opacity (0-1) @default 1 */
  opacity?: number;
  /** Stroke opacity (0-1) @default 1 */
  strokeOpacity?: number;
  /** Popup component or custom overlay content */
  children?: ReactNode;
  /** Click event handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Custom CSS class name for styling */
  className?: string;
  /** Custom CSS styles for the circle */
  style?: React.CSSProperties;
}

export type PopupAnchor = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type PopupOffset = number | { x: number; y: number } | {
  [key in PopupAnchor]?: { x: number; y: number };
};

export interface PopupProps {
  /** Popup position coordinates (optional when used as child of Marker) */
  position?: LngLatLike;
  /** Popup content (text, HTML, or React components) */
  children: ReactNode;
  /** Popup anchor position relative to marker @default "bottom" */
  anchor?: PopupAnchor;
  /** Popup position offset in pixels @default { x: 0, y: 0 } */
  offset?: PopupOffset;
  /** Custom CSS class name for styling */
  className?: string;
  /** Show close button @default false */
  closeButton?: boolean;
  /** Close popup when clicking outside @default true */
  closeOnClick?: boolean;
  /** Focus popup after opening @default true */
  focusAfterOpen?: boolean;
  /** Maximum width of the popup @default "240px" */
  maxWidth?: string;
  /** Control popup visibility @default false */
  visible?: boolean;
  /** Click event handler */
  onClick?: (event: React.MouseEvent) => void;
  /** Close event handler */
  onClose?: () => void;
  /** Custom CSS styles for the popup */
  style?: React.CSSProperties;
}

export interface StaticMapContextValue {
  bounds: LngLatBoundsLike | null;
  size: Size;
  latLngToPixel: (latLng: LngLatLike) => { x: number; y: number };
  accessToken: string;
  isLoaded: boolean;
}

export interface MarkerPositionContextValue {
  position: LngLatLike;
  dimensions?: {
    width: number;
    height: number;
  };
}