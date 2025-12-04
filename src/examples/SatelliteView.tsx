import React from 'react';
import { StaticMap } from '../lib';

/**
 * @title Satellite View
 * @description High-resolution satellite imagery perfect for geographical analysis
 * @category StaticMap
 */
export function SatelliteViewExample({ accessToken }: { accessToken: string }) {
  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/satellite-streets-v12"
      center={{ lat: 37.7749, lng: -122.4194 }}
      zoom={14}
      size={{ width: 500, height: 400 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    />
  );
}
