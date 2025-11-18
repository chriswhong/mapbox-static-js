import type { LngLatLike, Bounds, LngLatBoundsLike, Size } from '../types';

/**
 * Normalize LngLatLike to a consistent { lng, lat } format
 */
function normalizeLngLat(lngLat: LngLatLike): { lng: number; lat: number } {
  if (Array.isArray(lngLat)) {
    return { lng: lngLat[0], lat: lngLat[1] };
  }
  if ('lon' in lngLat) {
    return { lng: lngLat.lon, lat: lngLat.lat };
  }
  return { lng: lngLat.lng, lat: lngLat.lat };
}

/**
 * Convert a latitude/longitude coordinate to pixel coordinates within the map bounds
 */
export function latLngToPixel(
  latLng: LngLatLike,
  bounds: Bounds,
  size: Size
): { x: number; y: number } {
  const { lat, lng } = normalizeLngLat(latLng);
  const { north, south, east, west } = bounds;
  const { width, height } = size;

  // Convert to normalized coordinates (0-1)
  const x = (lng - west) / (east - west);
  const y = (north - lat) / (north - south);

  // Convert to pixel coordinates
  return {
    x: x * width,
    y: y * height,
  };
}

/**
 * Convert pixel coordinates back to latitude/longitude coordinates
 */
export function pixelToLatLng(
  pixel: { x: number; y: number },
  bounds: Bounds,
  size: Size
): LngLatLike {
  const { x, y } = pixel;
  const { north, south, east, west } = bounds;
  const { width, height } = size;

  // Convert to normalized coordinates (0-1)
  const normalizedX = x / width;
  const normalizedY = y / height;

  // Convert to lat/lng
  const lng = west + normalizedX * (east - west);
  const lat = north - normalizedY * (north - south);

  return { lat, lng };
}

/**
 * Calculate bounds from center point and zoom level
 */
export function calculateBoundsFromCenterZoom(
  center: LngLatLike,
  zoom: number,
  size: Size
): Bounds {
  // Calculate the number of 256px tiles at this zoom level
  const tilesAtZoom = Math.pow(2, zoom);
  
  // Calculate degrees per pixel using the standard Web Mercator formula
  const degreesPerPixel = 360 / (256 * tilesAtZoom);
  
  // Calculate the span in degrees for the map dimensions
  const lngSpan = degreesPerPixel * size.width;
  const latSpan = degreesPerPixel * size.height;
  
  // Apply latitude correction for Mercator projection
  const normalizedCenter = normalizeLngLat(center);
  const latCorrection = Math.cos(normalizedCenter.lat * Math.PI / 180);
  const correctedLngSpan = lngSpan / latCorrection;
  
  // Calculate bounds with normalization
  let west = normalizedCenter.lng - correctedLngSpan / 2;
  let east = normalizedCenter.lng + correctedLngSpan / 2;
  let south = normalizedCenter.lat - latSpan / 2;
  let north = normalizedCenter.lat + latSpan / 2;
  
  // Normalize longitude to stay within [-180, 180]
  west = normalizeLongitude(west);
  east = normalizeLongitude(east);
  
  // Clamp latitude to Mercator limits [-85, 85]
  south = normalizeLatitude(south);
  north = normalizeLatitude(north);
  
  // Handle edge case where longitude spans more than 360 degrees
  if (correctedLngSpan > 360) {
    west = -180;
    east = 180;
  }
  
  return { north, south, east, west };
}

/**
 * Calculate center and zoom from bounds and map size
 */
export function calculateCenterZoomFromBounds(
  bounds: Bounds,
  size: Size
): { center: LngLatLike; zoom: number } {
  const { north, south, east, west } = bounds;
  
  // Calculate center
  const center: LngLatLike = {
    lat: (north + south) / 2,
    lng: (east + west) / 2,
  };
  
  // Calculate zoom level to fit bounds
  const latSpan = north - south;
  const lngSpan = east - west;
  
  // Apply latitude correction
  const latCorrection = Math.cos(center.lat * Math.PI / 180);
  const correctedLngSpan = lngSpan * latCorrection;
  
  // Calculate zoom based on the larger span
  const latZoom = Math.log2(360 * size.height / (latSpan * 256));
  const lngZoom = Math.log2(360 * size.width / (correctedLngSpan * 256));
  
  const zoom = Math.min(latZoom, lngZoom, 22); // Cap at max zoom level
  
  return { center, zoom: Math.floor(zoom * 100) / 100 }; // Round to 2 decimal places
}

/**
 * Ensure longitude is within valid range [-180, 180]
 */
export function normalizeLongitude(lng: number): number {
  while (lng > 180) lng -= 360;
  while (lng < -180) lng += 360;
  return lng;
}

/**
 * Ensure latitude is within valid range [-85, 85] (Mercator limits)
 */
export function normalizeLatitude(lat: number): number {
  return Math.max(-85, Math.min(85, lat));
}