import { StaticMap, Marker, Popup } from '../lib';

/**
 * @title Basic Popup
 * @description Simple popup with text content displayed on marker click
 * @category Popup
 * @difficulty beginner
 */
export function BasicPopupExample({ accessToken }: { accessToken: string }) {
  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 40.7589, lng: -73.9851 }}
      zoom={15}
      size={{ width: 500, height: 350 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    >
      <Marker 
        position={{ lat: 40.7589, lng: -73.9851 }}
        color="#e74c3c"
        size="large"
      >
        <Popup>
          <div style={{ padding: '8px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Times Square</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              The bustling heart of New York City
            </p>
          </div>
        </Popup>
      </Marker>
    </StaticMap>
  );
}