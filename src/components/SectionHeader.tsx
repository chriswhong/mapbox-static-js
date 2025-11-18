import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div style={{ 
      marginBottom: '24px',
      marginTop: '48px',
      paddingBottom: '16px',
      borderBottom: '2px solid #e9ecef'
    }}>
      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: 700, 
        margin: '0 0 8px 0',
        color: '#212529'
      }}>
        {title}
      </h2>
      <p style={{ 
        fontSize: '1.1rem', 
        color: '#6c757d', 
        margin: 0,
        lineHeight: 1.5
      }}>
        {description}
      </p>
    </div>
  );
};