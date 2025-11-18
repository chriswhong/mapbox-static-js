import React from 'react';

export const InstallationSection: React.FC = () => {
  const npmInstall = 'npm install mapbox-static-react';
  const yarnInstall = 'yarn add mapbox-static-react';
  const pnpmInstall = 'pnpm add mapbox-static-react';

  return (
    <div style={{ marginBottom: '64px' }}>

      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* NPM */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#dc3545', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>📦</span>
            NPM
          </h4>
          <code style={{
            display: 'block',
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
            padding: '12px',
            borderRadius: '4px',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '0.9rem'
          }}>
            {npmInstall}
          </code>
        </div>

        {/* Yarn */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#2188b6', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>🧶</span>
            Yarn
          </h4>
          <code style={{
            display: 'block',
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
            padding: '12px',
            borderRadius: '4px',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '0.9rem'
          }}>
            {yarnInstall}
          </code>
        </div>

        {/* PNPM */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#f69220', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>⚡</span>
            PNPM
          </h4>
          <code style={{
            display: 'block',
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
            padding: '12px',
            borderRadius: '4px',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '0.9rem'
          }}>
            {pnpmInstall}
          </code>
        </div>
      </div>
      
      {/* Requirements */}
      <div style={{
        marginTop: '32px',
        padding: '20px',
        backgroundColor: '#e8f5e8',
        border: '1px solid #c3e6c3',
        borderRadius: '8px',
        borderLeft: '4px solid #28a745'
      }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#155724', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>✅</span>
          Requirements
        </h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#155724' }}>
          <li>React 16.8+</li>
          <li>A <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#0056b3' }}>free Mapbox account</a> and access token</li>
          <li>Modern browser with ES2015+ support</li>
        </ul>
      </div>
    </div>
  );
};