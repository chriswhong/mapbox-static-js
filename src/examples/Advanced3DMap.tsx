import React from 'react';
import { StaticMap } from '../lib';

/**
 * @title Advanced Map with Pitch and Rotation
 * @description 3D perspective map with custom pitch, rotation, and high zoom for dramatic effect
 * @category StaticMap
 */
export function Advanced3DMapExample({ accessToken }: { accessToken: string }) {
  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 40.7589, lng: -73.9851 }}
      zoom={16}
      pitch={45}
      bearing={-17.6}
      size={{ width: 600, height: 400 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    />
  );
}
