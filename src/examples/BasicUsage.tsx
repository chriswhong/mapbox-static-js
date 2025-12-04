import React from 'react';
import { StaticMap } from '../lib';

/**
 * @title Basic Usage
 * @description Simple map with center coordinates and zoom level
 * @category StaticMap
 */
export function BasicUsageExample({ accessToken }: { accessToken: string }) {
  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 40.7128, lng: -74.0060 }}
      zoom={12}
      size={{ width: 400, height: 300 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    />
  );
}
