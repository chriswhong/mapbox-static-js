import { StaticMap, Marker, Popup } from '../lib';

/**
 * @title Rich Content Popup
 * @description Popup with images, links, and formatted content
 * @category Popup
 */
export function RichContentPopupExample({ accessToken }: { accessToken: string }) {
  return (
    <StaticMap
      accessToken={accessToken}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 37.7749, lng: -122.4194 }}
      zoom={14}
      size={{ width: 600, height: 400 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '8px' }}
    >
      <Marker 
        position={{ lat: 37.7749, lng: -122.4194 }}
        color="#3498db"
      >
        <Popup>
          <div style={{ 
            padding: '16px', 
            maxWidth: '250px',
            fontFamily: 'system-ui, sans-serif'
          }}>
            <div style={{ 
              width: '100%', 
              height: '120px', 
              backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px'
            }}>
              🌉
            </div>
            
            <h3 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '18px',
              color: '#2c3e50'
            }}>
              San Francisco
            </h3>
            
            <p style={{ 
              margin: '0 0 12px 0', 
              color: '#7f8c8d', 
              fontSize: '14px',
              lineHeight: '1.4'
            }}>
              The City by the Bay, known for its iconic Golden Gate Bridge, 
              steep hills, and vibrant tech culture.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '8px',
              marginBottom: '12px'
            }}>
              <span style={{ 
                background: '#e8f5e8', 
                color: '#27ae60', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Tech Hub
              </span>
              <span style={{ 
                background: '#fff3e0', 
                color: '#f39c12', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Tourism
              </span>
            </div>
            
            <a 
              href="#" 
              style={{ 
                display: 'inline-block',
                background: '#3498db',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Learn More
            </a>
          </div>
        </Popup>
      </Marker>
    </StaticMap>
  );
}