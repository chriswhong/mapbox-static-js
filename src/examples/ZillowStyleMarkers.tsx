import React from 'react';
import { StaticMap, Marker } from '../lib';

/**
 * @title Zillow-Style Price Markers
 * @description Real estate inspired pill-shaped markers with shadow effects and price displays
 * @category Marker
 * @difficulty advanced
 */
export function ZillowStyleMarkersExample({ accessToken }: { accessToken: string }) {
  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 40.7628, lng: -73.9678 }}
      zoom={14}
      size={{ width: 600, height: 400 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    >
      <Marker 
        position={{ lat: 40.7728, lng: -73.9778 }}
        color="transparent"
        symbol=""
        scale={1}
      >
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ffffff',
          color: '#333',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          $3.2M
        </div>
      </Marker>
      
      <Marker 
        position={{ lat: 40.7628, lng: -73.9578 }}
        color="transparent"
        symbol=""
        scale={1}
      >
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#e8f5e8',
          color: '#2d7d2d',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          $2.8M
        </div>
      </Marker>
      
      <Marker 
        position={{ lat: 40.7528, lng: -73.9678 }}
        color="transparent"
        symbol=""
        scale={1}
      >
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#fff3e0',
          color: '#bf6900',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          $4.1M
        </div>
      </Marker>
    </StaticMap>
  );
}
