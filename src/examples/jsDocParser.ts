/**
 * Simple JSDoc parser to extract metadata from component files
 */
export interface JSDocMetadata {
  title: string;
  description: string;
  category: string;
}

export function parseJSDocFromCode(code: string): JSDocMetadata | null {
  // Find JSDoc comment block
  const jsDocMatch = code.match(/\/\*\*\s*([\s\S]*?)\*\//);
  if (!jsDocMatch) {
    return null;
  }

  const jsDocContent = jsDocMatch[1];
  
  // Extract individual tags
  const titleMatch = jsDocContent.match(/@title\s+(.+)/);
  const descriptionMatch = jsDocContent.match(/@description\s+(.+)/);
  const categoryMatch = jsDocContent.match(/@category\s+(.+)/);

  if (!titleMatch || !descriptionMatch || !categoryMatch) {
    console.warn('Incomplete JSDoc metadata found');
    return null;
  }

  return {
    title: titleMatch[1].trim(),
    description: descriptionMatch[1].trim(),
    category: categoryMatch[1].trim()
  };
}

/**
 * Extract the component source code for display in the documentation
 */
export function extractComponentCode(sourceCode: string): string {
  // Remove imports at the top
  const withoutImports = sourceCode.replace(/^import[\s\S]*?from[\s\S]*?;\s*\n/gm, '');
  
  // Find the JSDoc comment and function
  const componentMatch = withoutImports.match(/\/\*\*[\s\S]*?\*\/\s*\n(export function[\s\S]*?^})\s*$/m);
  
  if (componentMatch) {
    // Extract just the component JSX return content
    const functionContent = componentMatch[1];
    const returnMatch = functionContent.match(/return \(\s*(<[\s\S]*?)\s*\);\s*$/m);
    
    if (returnMatch) {
      // Clean up the JSX and format it nicely
      return returnMatch[1]
        .trim()
        .replace(/^    /gm, '') // Remove 4-space indentation
        .replace(/accessToken={accessToken}/g, 'accessToken={MAPBOX_ACCESS_TOKEN}'); // Replace prop with constant
    }
  }
  
  // Fallback: try to extract everything after the function declaration
  const fallbackMatch = sourceCode.match(/export function[\s\S]*?return \(\s*(<[\s\S]*?)\s*\);/);
  if (fallbackMatch) {
    return fallbackMatch[1]
      .trim()
      .replace(/^    /gm, '')
      .replace(/accessToken={accessToken}/g, 'accessToken={MAPBOX_ACCESS_TOKEN}');
  }
  
  return '// Could not extract component code';
}