import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import type { ExampleDefinition } from '../examples/types';

interface QuickStartExampleProps {
  example: ExampleDefinition;
  accessToken: string;
}

export const QuickStartExampleComponent: React.FC<QuickStartExampleProps> = ({ example, accessToken }) => {
  const { title, description, component: Component, code } = example;
  const [isCodeExpanded, setIsCodeExpanded] = React.useState(true); // Start expanded
  const [isCopied, setIsCopied] = React.useState(false);
  
  // For quick start, we show all code by default but still provide collapse option
  const shouldShowButton = true; // Always show button for consistency

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="mb-10">
      <style>
        {`
          .mapbox-static-map {
            max-width: 100% !important;
            height: auto !important;
          }
          .mapbox-static-map img {
            max-width: 100%;
            height: auto;
            display: block;
          }
        `}
      </style>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Unified Example Box */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Component Preview */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex justify-center">
            <div className="w-full max-w-full flex justify-center overflow-hidden">
              <div className="inline-block max-w-full">
                <Component accessToken={accessToken} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Code Section */}
        <div className="relative max-w-full">
          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 z-10 bg-gray-700/90 hover:bg-gray-600/90 text-white p-2 rounded border border-gray-600/50 transition-all duration-200"
            title={isCopied ? 'Copied!' : 'Copy code'}
          >
            {isCopied ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            )}
          </button>
          
          <div className="bg-gray-900 text-white overflow-x-auto">
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
                indentOnInput: false,
                searchKeymap: false
              }}
              className="text-sm font-mono max-w-full"
              style={!isCodeExpanded && shouldShowButton ? { maxHeight: '200px', overflow: 'hidden' } : undefined}
            />
            
            {/* Expand/Collapse Button */}
            {shouldShowButton && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pt-6 pb-3 flex justify-center">
                <button
                  onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                  className="bg-gray-800/90 hover:bg-gray-700/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded border border-gray-600/50 transition-all duration-200 font-medium"
                >
                  {isCodeExpanded ? 'Collapse code' : 'Expand code'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};