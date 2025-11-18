import { StaticMap, CircleMarker } from '../lib';

/**
 * @title Basic Circle Markers
 * @description Simple circle markers with different sizes and colors
 * @category CircleMarker
 * @difficulty beginner
 */
export function BasicCircleMarkerExample({ accessToken }: { accessToken: string }) {
  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/light-v11"
      center={{ lat: 37.7749, lng: -122.4194 }}
      zoom={12}
      size={{ width: 500, height: 350 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    >
      <CircleMarker
        position={{ lat: 37.7849, lng: -122.4094 }}
        radius={15}
        color="#e74c3c"
        strokeColor="#c0392b"
        strokeWidth={2}
        opacity={0.8}
      />
      
      <CircleMarker
        position={{ lat: 37.7649, lng: -122.4294 }}
        radius={20}
        color="#3498db"
        strokeColor="#2980b9"
        strokeWidth={3}
        opacity={0.7}
      />
      
      <CircleMarker
        position={{ lat: 37.7749, lng: -122.4394 }}
        radius={12}
        color="#2ecc71"
        strokeColor="#27ae60"
        strokeWidth={2}
        opacity={0.9}
      />
    </StaticMap>
  );
}