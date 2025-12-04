import React from 'react';
import { StaticMap, Marker, Popup } from '../lib';

/**
 * @title Automatic Popup Management
 * @description The new pattern: simply add a Popup as a child of a Marker - no state management required!
 * @category Marker
 */
export function AutomaticPopupsExample({ accessToken }: { accessToken: string }) {
  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 40.7428, lng: -74.0060 }}
      zoom={11}
      size={{ width: 600, height: 400 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    >
      <Marker 
        position={{ lat: 40.7589, lng: -73.9851 }}
        color="#ff6b6b"
        symbol="🏢"
        scale={1.5}
      >
        <Popup anchor="bottom-left">
          <strong>New York City</strong><br/>
          The Big Apple<br/>
          <em>Click marker to toggle - no state management needed!</em>
        </Popup>
      </Marker>

      <Marker
        position={{ lat: 40.6892, lng: -74.0445 }}
        color="#4ecdc4"
        symbol="🗽"
        scale={1}
      >
        <Popup anchor="top" offset={{ x: 0, y: -15 }}>
          <strong>Statue of Liberty</strong><br />
          Liberty Island<br />
          <em>Automatically shows/hides on click!</em>
        </Popup>
      </Marker>

      <Marker
        position={{ lat: 40.7061, lng: -74.0089 }}
        color="#ffa726"
        symbol="⭐"
        scale={0.7}
      />
    </StaticMap>
  );
}
