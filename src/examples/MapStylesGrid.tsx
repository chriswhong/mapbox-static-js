import React from 'react';
import { StaticMap } from '../lib';

/**
 * @title Different Map Styles
 * @description Showcase different Mapbox map styles in a grid layout
 * @category StaticMap
 * @difficulty beginner
 */
export function MapStylesGridExample({ accessToken }: { accessToken: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      <div>
        <h5 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 600 }}>Streets</h5>
        <StaticMap
          accessToken={accessToken}
          mapStyle="mapbox/streets-v12"
          center={{ lat: 40.7128, lng: -74.0060 }}
          zoom={12}
          size={{ width: 250, height: 180 }}
          attribution={true}
          style={{ border: '1px solid #ccc', borderRadius: '6px' }}
        />
      </div>
      <div>
        <h5 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 600 }}>Satellite</h5>
        <StaticMap
          accessToken={accessToken}
          mapStyle="mapbox/satellite-v9"
          center={{ lat: 40.7128, lng: -74.0060 }}
          zoom={12}
          size={{ width: 250, height: 180 }}
          attribution={true}
          style={{ border: '1px solid #ccc', borderRadius: '6px' }}
        />
      </div>
      <div>
        <h5 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 600 }}>Dark</h5>
        <StaticMap
          accessToken={accessToken}
          mapStyle="mapbox/dark-v11"
          center={{ lat: 40.7128, lng: -74.0060 }}
          zoom={12}
          size={{ width: 250, height: 180 }}
          attribution={true}
          style={{ border: '1px solid #ccc', borderRadius: '6px' }}
        />
      </div>
    </div>
  );
}
