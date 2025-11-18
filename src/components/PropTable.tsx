import React from 'react';

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

interface PropTableProps {
  props: PropDefinition[];
}

export const PropTable: React.FC<PropTableProps> = ({ props }) => {
  return (
    <div style={{
      overflowX: 'auto',
      marginBottom: '24px',
      border: '1px solid #e9ecef',
      borderRadius: '8px'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.9rem'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: '1px solid #e9ecef',
              minWidth: '120px'
            }}>Prop</th>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: '1px solid #e9ecef',
              minWidth: '150px'
            }}>Type</th>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: '1px solid #e9ecef',
              minWidth: '100px'
            }}>Required</th>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: '1px solid #e9ecef'
            }}>Description</th>
            <th style={{
              padding: '12px 16px',
              textAlign: 'left',
              fontWeight: 600,
              borderBottom: '1px solid #e9ecef',
              minWidth: '100px'
            }}>Default</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, index) => (
            <tr key={prop.name} style={{
              borderBottom: index < props.length - 1 ? '1px solid #f1f3f4' : 'none'
            }}>
              <td style={{
                padding: '12px 16px',
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                fontSize: '0.85rem',
                color: '#d73a49',
                fontWeight: 600
              }}>
                {prop.name}
                {prop.required && (
                  <span style={{ color: '#e74c3c', marginLeft: '4px' }}>*</span>
                )}
              </td>
              <td style={{
                padding: '12px 16px',
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                fontSize: '0.85rem',
                color: '#005cc5'
              }}>
                {prop.type}
              </td>
              <td style={{
                padding: '12px 16px',
                color: prop.required ? '#e74c3c' : '#28a745',
                fontWeight: 500
              }}>
                {prop.required ? 'Yes' : 'No'}
              </td>
              <td style={{
                padding: '12px 16px',
                color: '#495057',
                lineHeight: 1.4
              }}>
                {prop.description}
              </td>
              <td style={{
                padding: '12px 16px',
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                fontSize: '0.85rem',
                color: '#6f42c1'
              }}>
                {prop.defaultValue || '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};