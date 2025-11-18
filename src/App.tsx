import { examplesByCategory } from './examples';
import { Example } from './components/Example';
import { SectionHeader } from './components/SectionHeader';

// Replace this with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'your_mapbox_access_token_here';

// Section information for different categories
const sectionInfo = {
  StaticMap: {
    title: 'StaticMap Examples',
    description: 'Learn the basics of creating static maps with different configurations'
  },
  Marker: {
    title: 'Marker Examples',
    description: 'Learn how to add and customize markers with automatic popup management'
  },
  CircleMarker: {
    title: 'CircleMarker Examples',
    description: 'Circular markers with customizable radius, colors, and strokes'
  },
  Popup: {
    title: 'Popup Examples',
    description: 'Flexible popup components with various anchoring and styling options'
  }
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

        {/* Render examples by category */}
        {Object.entries(examplesByCategory).map(([category, examples]) => {
          const section = sectionInfo[category as keyof typeof sectionInfo];
          if (!section) return null;

          return (
            <div key={category}>
              <SectionHeader 
                title={section.title} 
                description={section.description}
              />
              
              {examples.map((example) => (
                <Example
                  key={example.id}
                  example={example}
                  accessToken={MAPBOX_ACCESS_TOKEN}
                />
              ))}
            </div>
          );
        })}

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