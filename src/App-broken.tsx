import React, { useState, useCallback } from 'react';
import { StaticMap, Marker, Popup, CircleMarker, CustomMarker } from './lib';

// Replace this with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'your_mapbox_access_token_here';

// Component for section headers
interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => (
  <div style={{ marginTop: '48px', marginBottom: '32px' }}>
    <h2 style={{ 
      margin: '0 0 8px 0', 
      fontSize: '2rem', 
      fontWeight: 700,
      color: '#212529'
    }}>
      {title}
    </h2>
    <p style={{ 
      margin: 0, 
      fontSize: '1.1rem', 
      color: '#6c757d',
      lineHeight: 1.5
    }}>
      {description}
    </p>
  </div>
);

// Component for individual examples
interface ExampleProps {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  code: string;
  children: React.ReactNode;
}

const Example: React.FC<ExampleProps> = ({ 
  title, 
  description, 
  category, 
  difficulty, 
  code, 
  children 
}) => {
  const [showCode, setShowCode] = useState(false);

  const difficultyColors = {
    beginner: '#28a745',
    intermediate: '#ffc107',
    advanced: '#dc3545'
  };

  return (
    <div style={{
      marginBottom: '32px',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 600 }}>
              {title}
            </h3>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.95rem', color: '#6c757d' }}>
              {description}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{
                backgroundColor: difficultyColors[difficulty],
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                {difficulty}
              </span>
              <span style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: 500
              }}>
                {category}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowCode(!showCode)}
            style={{
              background: showCode ? '#dc3545' : '#007bff',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </div>
      </div>

      {/* Code display */}
      {showCode && (
        <div style={{
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e9ecef'
        }}>
          <pre style={{
            margin: 0,
            padding: '16px 20px',
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
            fontSize: '0.875rem',
            overflow: 'auto'
          }}>
            <code>{code}</code>
          </pre>
        </div>
      )}

      {/* Example content */}
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default function App() {
  const [popupVisible, setPopupVisible] = useState<string | null>(null);

  const togglePopup = useCallback((popupId: string) => {
    setPopupVisible(current => current === popupId ? null : popupId);
  }, []);

  return (
    <div style={{ 
      padding: '40px 20px', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <div>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Mapbox Static React
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#6c757d', 
            margin: '0 0 24px 0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6
          }}>
            A comprehensive React library for creating beautiful static maps with markers, popups, and automatic interaction management.
          </p>
          <div style={{
            display: 'inline-flex',
            gap: '16px',
            backgroundColor: '#e3f2fd',
            padding: '16px 24px',
            borderRadius: '8px',
            borderLeft: '4px solid #2196f3'
          }}>
            <span style={{ fontSize: '1.5rem' }}>✨</span>
            <div>
              <strong style={{ color: '#1976d2' }}>New in v2.0:</strong> Automatic popup management! 
              Simply add a Popup as a child of any Marker - no state management required.
            </div>
          </div>
        </div>

        {/* StaticMap Examples */}
        <SectionHeader 
          title="StaticMap Examples" 
          description="Learn the basics of creating static maps with different configurations"
        />
        
        <Example
          title="Basic Usage"
          description="Simple map with center coordinates and zoom level"
          category="StaticMap"
          difficulty="beginner"
          code={`<StaticMap
  accessToken="YOUR_MAPBOX_TOKEN"
  mapStyle="mapbox/streets-v11"
  center={{ lat: 40.7128, lng: -74.0060 }}
  zoom={12}
  size={{ width: 400, height: 300 }}
  attribution={true}
/>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v11"
            center={{ lat: 40.7128, lng: -74.0060 }}
            zoom={12}
            size={{ width: 400, height: 300 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          />
        </Example>
        
        <Example
          title="Different Map Styles"
          description="Showcase different Mapbox map styles in a grid layout"
          category="StaticMap"
          difficulty="beginner"
          code={`// Streets Style
<StaticMap mapStyle="mapbox/streets-v11" ... />

// Satellite Style
<StaticMap mapStyle="mapbox/satellite-v9" ... />

// Dark Style  
<StaticMap mapStyle="mapbox/dark-v11" ... />`}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <h5 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 600 }}>Streets</h5>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/streets-v11"
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
                accessToken={MAPBOX_ACCESS_TOKEN}
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
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/dark-v11"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={12}
                size={{ width: 250, height: 180 }}
                attribution={true}
                style={{ border: '1px solid #ccc', borderRadius: '6px' }}
              />
            </div>
          </div>
        </Example>

        {/* Marker Examples */}
        <SectionHeader 
          title="Marker Examples" 
          description="Learn how to add and customize markers with automatic popup management"
        />

        <Example
          title="Automatic Popup Management (NEW!)"
          description="The new pattern: simply add a Popup as a child of a Marker - no state management required!"
          category="Marker"
          difficulty="beginner"
          code={`<Marker 
  position={{ lat: 40.7589, lng: -73.9851 }}
  color="#ff6b6b"
  symbol="🏢"
  scale={1.5}
>
  <Popup anchor="bottom-left">
    <strong>New York City</strong><br/>
    Click marker to toggle!
  </Popup>
</Marker>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v11"
            center={{ lat: 40.7128, lng: -74.0060 }}
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
        </Example>

        {/* CircleMarker Examples */}
        <SectionHeader 
          title="CircleMarker Examples" 
          description="Circular markers with customizable radius, colors, and strokes"
        />

        <Example
          title="Basic Circle Markers"
          description="Simple circular markers with different sizes and colors"
          category="CircleMarker"
          difficulty="beginner"
          code={`<CircleMarker 
  position={{ lat: 40.7328, lng: -74.0160 }} 
  radius={8} 
  color="#e74c3c" 
  strokeColor="#ffffff" 
  strokeWidth={2}
/>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/light-v11"
            center={{ lat: 40.7128, lng: -74.0060 }}
            zoom={11}
            size={{ width: 500, height: 350 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <CircleMarker 
              position={{ lat: 40.7328, lng: -74.0160 }} 
              radius={8} 
              color="#e74c3c" 
              strokeColor="#ffffff" 
              strokeWidth={2}
            />
            <CircleMarker 
              position={{ lat: 40.7128, lng: -73.9960 }} 
              radius={12} 
              color="#3498db" 
              strokeColor="#2c3e50" 
              strokeWidth={3}
            />
            <CircleMarker 
              position={{ lat: 40.6928, lng: -74.0260 }} 
              radius={6} 
              color="#2ecc71" 
              strokeColor="#ffffff" 
              strokeWidth={1}
            />
            <CircleMarker 
              position={{ lat: 40.7228, lng: -73.9860 }} 
              radius={15} 
              color="#f39c12" 
              strokeColor="#e67e22" 
              strokeWidth={4}
            />
          </StaticMap>
        </Example>

        <Example
          title="Circle Markers with Automatic Popups"
          description="Circle markers that show popups when clicked - no state management needed"
          category="CircleMarker"
          difficulty="intermediate"
          code={`<CircleMarker 
  position={{ lat: 40.7228, lng: -74.0060 }} 
  radius={10} 
  color="#9b59b6"
>
  <Popup anchor="bottom">
    <strong>Circle Marker 1</strong><br />
    Click me to toggle!
  </Popup>
</CircleMarker>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v11"
            center={{ lat: 40.7128, lng: -74.0060 }}
            zoom={12}
            size={{ width: 500, height: 350 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <CircleMarker 
              position={{ lat: 40.7228, lng: -74.0060 }} 
              radius={10} 
              color="#9b59b6" 
              strokeColor="#ffffff" 
              strokeWidth={2}
            >
              <Popup anchor="bottom">
                <strong>Circle Marker 1</strong><br />
                Radius: 10px<br />
                Color: Purple
              </Popup>
            </CircleMarker>
            
            <CircleMarker 
              position={{ lat: 40.7028, lng: -74.0060 }} 
              radius={15} 
              color="#1abc9c" 
              strokeColor="#16a085" 
              strokeWidth={3}
            >
              <Popup anchor="top">
                <strong>Circle Marker 2</strong><br />
                Radius: 15px<br />
                Color: Teal
              </Popup>
            </CircleMarker>
          </StaticMap>
        </Example>

        {/* Popup Examples */}
        <SectionHeader 
          title="Popup Examples" 
          description="Flexible popup components with various anchoring and styling options"
        />

        <Example
          title="Standalone Popups"
          description="Popups positioned independently with their own coordinates"
          category="Popup"
          difficulty="intermediate"
          code={`<Popup 
  position={{ lat: 37.7849, lng: -122.4094 }} 
  anchor="bottom"
  closeButton
>
  <strong>Financial District</strong><br />
  Standalone popup with close button
</Popup>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/outdoors-v12"
            center={{ lat: 37.7749, lng: -122.4194 }}
            zoom={12}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Popup 
              position={{ lat: 37.7849, lng: -122.4094 }} 
              anchor="bottom"
              closeButton
            >
              <strong>Financial District</strong><br />
              Downtown San Francisco<br />
              <em>Standalone popup with bottom anchor</em>
            </Popup>

            <Popup 
              position={{ lat: 37.7649, lng: -122.4294 }} 
              anchor="top-right"
              closeButton
            >
              <strong>Golden Gate Bridge Area</strong><br />
              Famous suspension bridge<br />
              <em>Top-right anchor positioning</em>
            </Popup>
          </StaticMap>
        </Example>

        <Example
          title="Comparison: New vs Old Popup Patterns"
          description="Side-by-side comparison of automatic vs manual popup management"
          category="Popup"
          difficulty="advanced"
          code={`// NEW: Automatic (Recommended)
<Marker position={pos}>
  <Popup>Content</Popup>
</Marker>

// OLD: Manual (Still Supported)
<Marker onClick={toggle} />
{visible && <Popup position={pos}>Content</Popup>}`}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <h5 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 600 }}>✨ NEW: Automatic Management</h5>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px' }}>
                Simply add a Popup as a child - no onClick or state management needed!
              </p>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/streets-v11"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={13}
                size={{ width: 300, height: 200 }}
                attribution={true}
                style={{ border: '1px solid #ccc', borderRadius: '6px' }}
              >
                <Marker
                  position={{ lat: 40.7128, lng: -74.0060 }}
                  color="#e74c3c"
                  symbol="📍"
                >
                  <Popup anchor="bottom" offset={{ x: 0, y: -30 }}>
                    <strong>Auto Popup</strong><br />
                    Click marker to toggle!<br />
                    <em>No code required</em>
                  </Popup>
                </Marker>
              </StaticMap>
            </div>

            <div>
              <h5 style={{ margin: '0 0 12px 0', fontSize: '1rem', fontWeight: 600 }}>🔧 OLD: Manual Management</h5>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px' }}>
                Requires onClick handlers and state management (still supported)
              </p>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox/streets-v11"
                center={{ lat: 40.7128, lng: -74.0060 }}
                zoom={13}
                size={{ width: 300, height: 200 }}
                attribution={true}
                style={{ border: '1px solid #ccc', borderRadius: '6px' }}
              >
                <Marker
                  position={{ lat: 40.7128, lng: -74.0060 }}
                  color="#3498db"
                  symbol="📍"
                  onClick={() => togglePopup('manual-popup')}
                />
                {popupVisible === 'manual-popup' && (
                  <Popup
                    position={{ lat: 40.7128, lng: -74.0060 }}
                    anchor="bottom"
                    offset={{ x: 0, y: -30 }}
                  >
                    <strong>Manual Popup</strong><br />
                    Requires state management<br />
                    <em>More flexible positioning</em>
                  </Popup>
                )}
              </StaticMap>
            </div>
          </div>
        </Example>

        {/* Getting Started Section */}
        <div style={{ 
          marginTop: '64px', 
          padding: '32px', 
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.5rem', fontWeight: 700, color: '#212529' }}>
            🚀 Getting Started
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#495057', marginBottom: '20px' }}>
            To use this library with your own maps:
          </p>
          <ol style={{ fontSize: '1rem', color: '#495057', lineHeight: 1.6 }}>
            <li>Sign up for a free Mapbox account at <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>https://account.mapbox.com/</a></li>
            <li>Get your access token from the Mapbox dashboard</li>
            <li>Replace <code style={{ backgroundColor: '#e9ecef', padding: '2px 4px', borderRadius: '3px' }}>MAPBOX_ACCESS_TOKEN</code> in this demo with your token</li>
            <li>Start building amazing static map experiences!</li>
          </ol>
        </div>

      </div>
    </div>
  );
}