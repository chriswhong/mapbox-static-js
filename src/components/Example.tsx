import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import type { ExampleDefinition } from '../examples/types';

interface ExampleProps {
  example: ExampleDefinition;
  accessToken: string;
}

export const Example: React.FC<ExampleProps> = ({ example, accessToken }) => {
  const { title, description, category, difficulty, component: Component, code } = example;
  
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
          <Component accessToken={accessToken} />
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