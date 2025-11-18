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
 * Normalize LngLatBoundsLike to a consistent Bounds format
 */
function normalizeBounds(bounds: LngLatBoundsLike): Bounds {
  if (Array.isArray(bounds)) {
    if (bounds.length === 4 && typeof bounds[0] === 'number') {
      // [west, south, east, north] format
      const [west, south, east, north] = bounds as [number, number, number, number];
      return { west, south, east, north };
    } else {
      // [LngLatLike, LngLatLike] format - [southwest, northeast]
      const [sw, ne] = bounds as [LngLatLike, LngLatLike];
      const swNorm = normalizeLngLat(sw);
      const neNorm = normalizeLngLat(ne);
      return {
        west: swNorm.lng,
        south: swNorm.lat,
        east: neNorm.lng,
        north: neNorm.lat
      };
    }
  }
  // Already in Bounds format
  return bounds as Bounds;
}

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
  center?: LngLatLike;
  zoom?: number;
  bounds?: LngLatBoundsLike;
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
    const normalizedCenter = normalizeLngLat(center);
    position = `${normalizedCenter.lng},${normalizedCenter.lat},${zoom},${bearing},${pitch}`;
  } else if (bounds) {
    // Use bounds format
    const normalizedBounds = normalizeBounds(bounds);
    const { west, south, east, north } = normalizedBounds;
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