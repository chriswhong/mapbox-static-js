import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { StaticMap, Marker, Popup, CircleMarker } from './lib';

// Replace this with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'your_mapbox_access_token_here';

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
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
        </div>
      </div>

      {/* 50/50 layout: Implementation left, Code right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '300px' }}>
        {/* Implementation */}
        <div style={{ padding: '20px', borderRight: '1px solid #e9ecef' }}>
          {children}
        </div>
        
        {/* Code */}
        <div style={{ backgroundColor: '#2d3748' }}>
          <CodeMirror
            value={code}
            theme={oneDark}
            extensions={[javascript({ jsx: true })]}
            editable={false}
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: false
            }}
            style={{
              fontSize: '0.875rem',
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function App() {

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
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7128, lng: -74.0060 }}
  zoom={12}
  size={{ width: 400, height: 300 }}
  attribution={true}
  style={{ border: '1px solid #ccc', borderRadius: '8px' }}
/>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v12"
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
          code={`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
  <div>
    <h5>Streets</h5>
    <StaticMap
      accessToken={MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox/streets-v12"
      center={{ lat: 40.7128, lng: -74.0060 }}
      zoom={12}
      size={{ width: 250, height: 180 }}
      attribution={true}
      style={{ border: '1px solid #ccc', borderRadius: '6px' }}
    />
  </div>
  <div>
    <h5>Satellite</h5>
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
    <h5>Dark</h5>
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
</div>`}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <h5 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', fontWeight: 600 }}>Streets</h5>
              <StaticMap
                accessToken={MAPBOX_ACCESS_TOKEN}
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

        <Example
          title="Advanced Map with Pitch and Rotation"
          description="3D perspective map with custom pitch, rotation, and high zoom for dramatic effect"
          category="StaticMap"
          difficulty="advanced"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7589, lng: -73.9851 }}
  zoom={16}
  pitch={45}
  bearing={-17.6}
  size={{ width: 600, height: 400 }}
  attribution={true}
  style={{ border: '1px solid #ccc', borderRadius: '8px' }}
/>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v12"
            center={{ lat: 40.7589, lng: -73.9851 }}
            zoom={16}
            pitch={45}
            bearing={-17.6}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          />
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
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7428, lng: -74.0060 }}
  zoom={11}
  size={{ width: 600, height: 400 }}
  attribution={true}
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
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
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
        </Example>

        <Example
          title="Custom Styled Markers"
          description="Various marker customizations with colors, symbols, and scales"
          category="Marker"
          difficulty="intermediate"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/light-v11"
  center={{ lat: 40.7528, lng: -74.0060 }}
  zoom={12}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  {/* Large marker with custom symbol */}
  <Marker 
    position={{ lat: 40.7728, lng: -74.0160 }}
    color="#e74c3c"
    symbol="🎯"
    scale={2.0}
  />
  
  {/* Medium marker with text symbol */}
  <Marker
    position={{ lat: 40.7528, lng: -73.9960 }}
    color="#2ecc71"
    symbol="A"
    scale={1.2}
  />
  
  {/* Small marker cluster */}
  <Marker position={{ lat: 40.7328, lng: -74.0260 }} color="#3498db" scale={0.8} />
  <Marker position={{ lat: 40.7308, lng: -74.0240 }} color="#9b59b6" scale={0.8} />
  <Marker position={{ lat: 40.7348, lng: -74.0240 }} color="#f39c12" scale={0.8} />
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/light-v11"
            center={{ lat: 40.7528, lng: -74.0060 }}
            zoom={12}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Marker 
              position={{ lat: 40.7728, lng: -74.0160 }}
              color="#e74c3c"
              symbol="🎯"
              scale={2.0}
            />
            
            <Marker
              position={{ lat: 40.7528, lng: -73.9960 }}
              color="#2ecc71"
              symbol="A"
              scale={1.2}
            />
            
            <Marker position={{ lat: 40.7328, lng: -74.0260 }} color="#3498db" scale={0.8} />
            <Marker position={{ lat: 40.7308, lng: -74.0240 }} color="#9b59b6" scale={0.8} />
            <Marker position={{ lat: 40.7348, lng: -74.0240 }} color="#f39c12" scale={0.8} />
          </StaticMap>
        </Example>

        <Example
          title="Zillow-Style Price Markers"
          description="Real estate inspired pill-shaped markers with shadow effects and price displays"
          category="Marker"
          difficulty="advanced"
          code={`// Custom pill-shaped price marker component
const PriceMarker = ({ position, price, color = '#ffffff', textColor = '#333' }) => (
  <Marker 
    position={position}
    color="transparent"
    symbol=""
    scale={1}
  >
    <div style={{
      position: 'absolute',
      top: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: color,
      color: textColor,
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      whiteSpace: 'nowrap',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {price}
    </div>
  </Marker>
);

<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7628, lng: -73.9678 }}
  zoom={14}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  <PriceMarker 
    position={{ lat: 40.7728, lng: -73.9778 }}
    price="$3.2M"
    color="#ffffff"
    textColor="#333"
  />
  
  <PriceMarker 
    position={{ lat: 40.7628, lng: -73.9578 }}
    price="$2.8M"
    color="#e8f5e8"
    textColor="#2d7d2d"
  />
  
  <PriceMarker 
    position={{ lat: 40.7528, lng: -73.9678 }}
    price="$4.1M"
    color="#fff3e0"
    textColor="#bf6900"
  />
  
  <PriceMarker 
    position={{ lat: 40.7728, lng: -73.9578 }}
    price="$1.9M"
    color="#f3e5f5"
    textColor="#7b1fa2"
  />
  
  <PriceMarker 
    position={{ lat: 40.7628, lng: -73.9778 }}
    price="$5.5M"
    color="#e3f2fd"
    textColor="#1976d2"
  />
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
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
            
            <Marker 
              position={{ lat: 40.7728, lng: -73.9578 }}
              color="transparent"
              symbol=""
              scale={1}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#f3e5f5',
                color: '#7b1fa2',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                $1.9M
              </div>
            </Marker>
            
            <Marker 
              position={{ lat: 40.7628, lng: -73.9778 }}
              color="transparent"
              symbol=""
              scale={1}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                whiteSpace: 'nowrap',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                $5.5M
              </div>
            </Marker>
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
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/light-v11"
  center={{ lat: 40.7128, lng: -74.0060 }}
  zoom={11}
  size={{ width: 500, height: 350 }}
  attribution={true}
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
</StaticMap>`}
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
          title="Circle Markers with Opacity and Effects"
          description="Advanced circle styling with opacity, gradients, and shadow effects"
          category="CircleMarker"
          difficulty="intermediate"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/dark-v11"
  center={{ lat: 40.7428, lng: -74.0060 }}
  zoom={12}
  size={{ width: 500, height: 350 }}
  attribution={true}
>
  {/* Large semi-transparent circles */}
  <CircleMarker 
    position={{ lat: 40.7528, lng: -74.0160 }} 
    radius={25} 
    color="rgba(231, 76, 60, 0.6)" 
    strokeColor="#e74c3c" 
    strokeWidth={3}
  />
  <CircleMarker 
    position={{ lat: 40.7328, lng: -73.9960 }} 
    radius={20} 
    color="rgba(52, 152, 219, 0.7)" 
    strokeColor="#3498db" 
    strokeWidth={2}
  />
  
  {/* Overlapping effect */}
  <CircleMarker 
    position={{ lat: 40.7428, lng: -74.0060 }} 
    radius={18} 
    color="rgba(46, 204, 113, 0.5)" 
    strokeColor="#2ecc71" 
    strokeWidth={4}
  />
  <CircleMarker 
    position={{ lat: 40.7408, lng: -74.0040 }} 
    radius={15} 
    color="rgba(155, 89, 182, 0.8)" 
    strokeColor="#9b59b6" 
    strokeWidth={2}
  />
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/dark-v11"
            center={{ lat: 40.7428, lng: -74.0060 }}
            zoom={12}
            size={{ width: 500, height: 350 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <CircleMarker 
              position={{ lat: 40.7528, lng: -74.0160 }} 
              radius={25} 
              color="rgba(231, 76, 60, 0.6)" 
              strokeColor="#e74c3c" 
              strokeWidth={3}
            />
            <CircleMarker 
              position={{ lat: 40.7328, lng: -73.9960 }} 
              radius={20} 
              color="rgba(52, 152, 219, 0.7)" 
              strokeColor="#3498db" 
              strokeWidth={2}
            />
            
            <CircleMarker 
              position={{ lat: 40.7428, lng: -74.0060 }} 
              radius={18} 
              color="rgba(46, 204, 113, 0.5)" 
              strokeColor="#2ecc71" 
              strokeWidth={4}
            />
            <CircleMarker 
              position={{ lat: 40.7408, lng: -74.0040 }} 
              radius={15} 
              color="rgba(155, 89, 182, 0.8)" 
              strokeColor="#9b59b6" 
              strokeWidth={2}
            />
          </StaticMap>
        </Example>

        <Example
          title="Circle Markers with Automatic Popups"
          description="Circle markers that show popups when clicked - no state management needed"
          category="CircleMarker"
          difficulty="intermediate"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/streets-v12"
  center={{ lat: 40.7428, lng: -74.0060 }}
  zoom={12}
  size={{ width: 500, height: 350 }}
  attribution={true}
>
  <CircleMarker 
    position={{ lat: 40.7528, lng: -74.0060 }} 
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
    position={{ lat: 40.7328, lng: -74.0060 }} 
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
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/streets-v12"
            center={{ lat: 40.7428, lng: -74.0060 }}
            zoom={12}
            size={{ width: 500, height: 350 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <CircleMarker 
              position={{ lat: 40.7528, lng: -74.0060 }} 
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
              position={{ lat: 40.7328, lng: -74.0060 }} 
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
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/outdoors-v12"
  center={{ lat: 37.8049, lng: -122.4194 }}
  zoom={12}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  <Popup 
    position={{ lat: 37.8149, lng: -122.4094 }} 
    anchor="bottom"
    closeButton
  >
    <strong>Financial District</strong><br />
    Downtown San Francisco<br />
    <em>Standalone popup with bottom anchor</em>
  </Popup>

  <Popup 
    position={{ lat: 37.7949, lng: -122.4294 }} 
    anchor="top-right"
    closeButton
  >
    <strong>Golden Gate Bridge Area</strong><br />
    Famous suspension bridge<br />
    <em>Top-right anchor positioning</em>
  </Popup>
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/outdoors-v12"
            center={{ lat: 37.8049, lng: -122.4194 }}
            zoom={12}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Popup 
              position={{ lat: 37.8149, lng: -122.4094 }} 
              anchor="bottom"
              closeButton
            >
              <strong>Financial District</strong><br />
              Downtown San Francisco<br />
              <em>Standalone popup with bottom anchor</em>
            </Popup>

            <Popup 
              position={{ lat: 37.7949, lng: -122.4294 }} 
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
          title="Advanced Popup Configurations"
          description="Custom popup styling, offsets, and rich content examples"
          category="Popup"
          difficulty="advanced"
          code={`<StaticMap
  accessToken={MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox/dark-v11"
  center={{ lat: 40.7628, lng: -73.9678 }}
  zoom={13}
  size={{ width: 600, height: 400 }}
  attribution={true}
>
  {/* Custom styled popup with offset */}
  <Popup 
    position={{ lat: 40.7728, lng: -73.9778 }} 
    anchor="left"
    offset={{ x: 20, y: 0 }}
    maxWidth="300px"
  >
    <div style={{ padding: '8px' }}>
      <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>🎨 Custom Styled</h4>
      <p style={{ margin: 0, fontSize: '14px' }}>Rich HTML content with custom styling</p>
    </div>
  </Popup>

  {/* Large popup with close button */}
  <Popup 
    position={{ lat: 40.7528, lng: -73.9578 }} 
    anchor="bottom"
    closeButton
    maxWidth="250px"
  >
    <div>
      <strong>📍 Location Details</strong><br/>
      <img src="https://picsum.photos/200/100" 
           alt="Sample" style={{ width: '100%', marginTop: '8px' }} />
      <p style={{ margin: '8px 0 0', fontSize: '12px' }}>Sample image content</p>
    </div>
  </Popup>
</StaticMap>`}
        >
          <StaticMap
            accessToken={MAPBOX_ACCESS_TOKEN}
            mapStyle="mapbox/dark-v11"
            center={{ lat: 40.7628, lng: -73.9678 }}
            zoom={13}
            size={{ width: 600, height: 400 }}
            attribution={true}
            style={{ border: '1px solid #ccc', borderRadius: '8px' }}
          >
            <Popup 
              position={{ lat: 40.7728, lng: -73.9778 }} 
              anchor="left"
              offset={{ x: 20, y: 0 }}
              maxWidth="300px"
            >
              <div style={{ padding: '8px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>🎨 Custom Styled</h4>
                <p style={{ margin: 0, fontSize: '14px' }}>Rich HTML content with custom styling</p>
              </div>
            </Popup>

            <Popup 
              position={{ lat: 40.7528, lng: -73.9578 }} 
              anchor="bottom"
              closeButton
              maxWidth="250px"
            >
              <div>
                <strong>📍 Location Details</strong><br/>
                <img src="https://picsum.photos/200/100" 
                     alt="Sample" style={{ width: '100%', marginTop: '8px' }} />
                <p style={{ margin: '8px 0 0', fontSize: '12px' }}>Sample image content</p>
              </div>
            </Popup>
          </StaticMap>
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