import type { LatLng, Bounds, Size } from '../types';

/**
 * Generate Mapbox Static Images API URL
 */
export function generateStaticMapUrl({
  accessToken,
  mapStyle,
  center,
  zoom,
  bounds,
  size,
  bearing = 0,
  pitch = 0,
  retina = false,
  attribution = true,
  logo = true,
}: {
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
}): string {
  const baseUrl = 'https://api.mapbox.com/styles/v1';
  const [username, styleId] = mapStyle.includes('/') 
    ? mapStyle.split('/')
    : ['mapbox', mapStyle];

  // Position parameter - prefer center/zoom over bounds for efficiency
  let position: string;
  if (center && zoom !== undefined) {
    // Use center/zoom format - more efficient and precise
    position = `${center.lng},${center.lat},${zoom},${bearing},${pitch}`;
  } else if (bounds) {
    // Use bounds format
    const { west, south, east, north } = bounds;
    position = `[${west},${south},${east},${north}]`;
  } else {
    throw new Error('Either bounds or center+zoom must be provided');
  }

  // Construct URL
  const retinaParam = retina ? '@2x' : '';
  const url = `${baseUrl}/${username}/${styleId}/static/${position}/${size.width}x${size.height}${retinaParam}`;

  // Add query parameters
  const params = new URLSearchParams({
    access_token: accessToken,
    attribution: 'false',
    logo: logo.toString(),
  });

  return `${url}?${params.toString()}`;
}