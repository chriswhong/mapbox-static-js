import type { PropDefinition } from '../components/PropTable';
import { parsePropsFromTypeScript } from './propsParser';

// Import the raw TypeScript source code
import typesSource from '../lib/types.ts?raw';

// Parse props from TypeScript interfaces with JSDoc comments
const parsedStaticMapProps = parsePropsFromTypeScript(typesSource, 'StaticMapProps');
const parsedMarkerProps = parsePropsFromTypeScript(typesSource, 'MarkerProps');
const parsedCircleMarkerProps = parsePropsFromTypeScript(typesSource, 'CircleMarkerProps');
const parsedPopupProps = parsePropsFromTypeScript(typesSource, 'PopupProps');

// Fallback props if parsing fails
const fallbackStaticMapProps: PropDefinition[] = [
  { name: 'accessToken', type: 'string', required: true, description: 'Your Mapbox access token' },
  { name: 'mapStyle', type: 'string', required: true, description: 'Mapbox style ID' },
  { name: 'size', type: 'Size', required: true, description: 'Map dimensions' }
];

const fallbackMarkerProps: PropDefinition[] = [
  { name: 'position', type: 'LatLng', required: true, description: 'Marker position' },
  { name: 'color', type: 'string', required: false, description: 'Marker color' }
];

const fallbackCircleMarkerProps: PropDefinition[] = [
  { name: 'position', type: 'LatLng', required: true, description: 'Circle position' },
  { name: 'radius', type: 'number', required: false, description: 'Circle radius' }
];

const fallbackPopupProps: PropDefinition[] = [
  { name: 'children', type: 'ReactNode', required: true, description: 'Popup content' }
];

// Use parsed props if available, fallback otherwise
export const staticMapProps: PropDefinition[] = parsedStaticMapProps.length > 0 ? parsedStaticMapProps : fallbackStaticMapProps;
export const markerProps: PropDefinition[] = parsedMarkerProps.length > 0 ? parsedMarkerProps : fallbackMarkerProps;
export const circleMarkerProps: PropDefinition[] = parsedCircleMarkerProps.length > 0 ? parsedCircleMarkerProps : fallbackCircleMarkerProps;
export const popupProps: PropDefinition[] = parsedPopupProps.length > 0 ? parsedPopupProps : fallbackPopupProps;
