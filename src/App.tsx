import React from 'react';
import { examplesByCategory, examples } from './examples';
import { Example } from './components/Example';
import { QuickStartExampleComponent } from './components/QuickStartExample';
import { SectionHeader } from './components/SectionHeader';
import { PropTable } from './components/PropTable';
import { InstallationSection } from './components/InstallationSection';
import { TableOfContents } from './components/TableOfContents';
import { staticMapProps, markerProps, circleMarkerProps, popupProps } from './data/componentProps';

// Replace this with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'your_mapbox_access_token_here';

// Table of contents data
const tocItems = [
  { id: 'installation', title: 'Installation', level: 1 },
  { id: 'quick-start', title: 'Quick Start', level: 2 },
  { id: 'staticmap', title: 'StaticMap Component', level: 1 },
  { id: 'staticmap-props', title: 'Props', level: 2 },
  { id: 'staticmap-examples', title: 'Examples', level: 2 },
  { id: 'marker', title: 'Marker Component', level: 1 },
  { id: 'marker-props', title: 'Props', level: 2 },
  { id: 'marker-examples', title: 'Examples', level: 2 },
  { id: 'popup', title: 'Popup Component', level: 1 },
  { id: 'popup-props', title: 'Props', level: 2 },
  { id: 'popup-examples', title: 'Examples', level: 2 },
  { id: 'circlemarker', title: 'CircleMarker Component', level: 1 },
  { id: 'circlemarker-props', title: 'Props', level: 2 },
  { id: 'circlemarker-examples', title: 'Examples', level: 2 },
  { id: 'features', title: 'Key Features', level: 1 },
  { id: 'support', title: 'Support', level: 1 }
];

export default function App() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            🗺️ Mapbox Static React
          </h1>
          <p className="text-lg md:text-2xl mb-8 opacity-95 max-w-4xl mx-auto leading-relaxed">
            A React library for creating beautiful static maps with markers and popups. <br/>Powered by the Mapbox Static Images API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#installation" 
              className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Get Started
            </a>
            <a 
              href="#staticmap-examples"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors"
            >
              View Examples
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative">
        <div className="px-5 py-10">
          <div className="max-w-6xl mx-auto">
            <div className={`${isMobile ? 'block' : 'flex gap-10'}`}>
              
              {/* Sidebar - Table of Contents */}
              {!isMobile && (
                <aside 
                  className="w-[280px] flex-shrink-0"
                  style={{ 
                    position: 'sticky',
                    top: '2rem',
                    alignSelf: 'flex-start',
                    maxHeight: 'calc(100vh - 2rem)'
                  }}
                >
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">On this page</h4>
                    <TableOfContents items={tocItems} />
                  </div>
                </aside>
              )}

              {/* Main Documentation */}
              <main className="flex-1 min-w-0 space-y-16">
              
              {/* Installation */}
              <section id="installation">
                <SectionHeader 
                  title="Installation"
                  description="Get started with Mapbox Static React in your project"
                />
                <InstallationSection />
              </section>

              {/* Quick Start */}
              <section id="quick-start">
                <SectionHeader 
                  title="Quick Start"
                  description="A complete example to get you started quickly"
                />
                {(() => {
                  const quickStartExample = examples.find(ex => ex.id === 'quick-start');
                  return quickStartExample ? (
                    <QuickStartExampleComponent
                      example={quickStartExample}
                      accessToken={MAPBOX_ACCESS_TOKEN}
                    />
                  ) : null;
                })()}
              </section>

              {/* StaticMap Component */}
              <section id="staticmap">
                <SectionHeader 
                  title="StaticMap Component"
                  description="The core component for rendering static maps"
                />
                
                <div id="staticmap-props" className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Props</h3>
                  <PropTable props={staticMapProps} />
                </div>

                <div id="staticmap-examples" className="space-y-12">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Examples</h3>
                  {(examplesByCategory.StaticMap || []).map((example) => (
                    <Example
                      key={example.id}
                      example={example}
                      accessToken={MAPBOX_ACCESS_TOKEN}
                    />
                  ))}
                </div>
              </section>

              {/* Marker Component */}
              <section id="marker">
                <SectionHeader 
                  title="Marker Component"
                  description="Use the default marker pin or make custom markers using React components"
                />
                
                <div id="marker-props" className="mb-12">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Props</h3>
                  <PropTable props={markerProps} />
                </div>

                <div id="marker-examples" className="space-y-12">
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800">Examples</h3>
                  {(examplesByCategory.Marker || []).map((example) => (
                    <Example
                      key={example.id}
                      example={example}
                      accessToken={MAPBOX_ACCESS_TOKEN}
                    />
                  ))}
                </div>
              </section>

               {/* CircleMarker Component - only show if examples exist */}
              {(examplesByCategory.CircleMarker || []).length > 0 && (
                <section id="circlemarker">
                  <SectionHeader 
                    title="CircleMarker Component"
                    description="Create circular markers with customizable styling"
                  />
                  
                  <div id="circlemarker-props" className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">Props</h3>
                    <PropTable props={circleMarkerProps} />
                  </div>

                  <div id="circlemarker-examples" className="space-y-12">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">Examples</h3>
                    {(examplesByCategory.CircleMarker || []).map((example) => (
                      <Example
                        key={example.id}
                        example={example}
                        accessToken={MAPBOX_ACCESS_TOKEN}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Popup Component - only show if examples exist */}
              {(examplesByCategory.Popup || []).length > 0 && (
                <section id="popup">
                  <SectionHeader 
                    title="Popup Component"
                    description="Display rich content in interactive popups"
                  />
                  
                  <div id="popup-props" className="mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">Props</h3>
                    <PropTable props={popupProps} />
                  </div>

                  <div id="popup-examples" className="space-y-12">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">Examples</h3>
                    {(examplesByCategory.Popup || []).map((example) => (
                      <Example
                        key={example.id}
                        example={example}
                        accessToken={MAPBOX_ACCESS_TOKEN}
                      />
                    ))}
                  </div>
                </section>
              )}

             

              {/* Key Features */}
              <section id="features">
                <SectionHeader 
                  title="Key Features"
                  description="What makes Mapbox Static React special"
                />
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-800 mb-3">🔗 Automatic Popup Management</h4>
                    <p className="text-green-700 text-sm leading-relaxed">
                      Markers automatically handle their popup visibility state. No need for complex state management.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">⚡ Lightweight & Fast</h4>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      Built specifically for static maps with minimal bundle size and optimal performance.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-purple-800 mb-3">🎨 Highly Customizable</h4>
                    <p className="text-purple-700 text-sm leading-relaxed">
                      Full control over styling, positioning, and behavior of all map components.
                    </p>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-orange-800 mb-3">📱 Mobile Responsive</h4>
                    <p className="text-orange-700 text-sm leading-relaxed">
                      Components work seamlessly across all device sizes with responsive design patterns.
                    </p>
                  </div>
                </div>
              </section>

              {/* Support */}
              <section id="support">
                <SectionHeader 
                  title="Support"
                  description="Get help and contribute to the project"
                />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <h4 className="text-lg font-semibold text-blue-800 mb-3">🐛 Issues</h4>
                    <p className="text-blue-700 mb-4">Found a bug?</p>
                    <span className="text-gray-600 text-sm">Report it on GitHub Issues</span>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-3">💡 Feature Requests</h4>
                    <p className="text-yellow-700 mb-4">Have an idea?</p>
                    <span className="text-gray-600 text-sm">Share it with the community</span>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="mt-20 pt-10 border-t border-gray-200 text-center text-gray-600">
                <p className="mb-4">
                  Built with ❤️ for the React and Mapbox community
                </p>
                <p className="text-sm">
                  Powered by <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Mapbox</a> • 
                  Made with <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">React</a> • 
                  Written in <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">TypeScript</a>
                </p>
              </footer>

              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}