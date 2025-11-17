// Import library styles
import './styles.css';

// Main library exports
export { StaticMap } from './components/StaticMap';
export { Marker, CustomMarker } from './components/Marker';
export { CircleMarker } from './components/CircleMarker';
export { Popup } from './components/Popup';
export { useStaticMapContext, useMarkerPositionContext } from './components/context';

// Type exports
export type {
  LatLng,
  Bounds,
  Size,
  StaticMapProps,
  MarkerProps,
  CustomMarkerProps,
  CircleMarkerProps,
  PopupProps,
  PopupAnchor,
  StaticMapContextValue,
  MarkerPositionContextValue,
} from './types';

// Utility exports
export {
  latLngToPixel,
  pixelToLatLng,
  calculateBoundsFromCenterZoom,
  calculateCenterZoomFromBounds,
  normalizeLongitude,
  normalizeLatitude,
} from './utils/projection';

export { generateStaticMapUrl } from './utils/mapbox';