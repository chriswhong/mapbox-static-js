import React from 'react';
import { StaticMap, Marker, Popup } from '../lib';

/**
 * @title Quick Start
 * @description A complete example to get you started with Mapbox Static React
 * @category LandingPage
 */
export function QuickStartExample({ accessToken }: { accessToken: string }) {
  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 40.7128, lng: -74.0060 }}
      zoom={12}
      size={{ width: 600, height: 400 }}
      attribution={true}
    >
      <Marker position={{ lat: 40.7128, lng: -74.0060 }} color="red">
        <Popup anchor="bottom">
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>New York City</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>The Big Apple!</p>
        </Popup>
      </Marker>
    </StaticMap>
  );
}