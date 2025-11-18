import type { PropDefinition } from '../components/PropTable';

/**
 * Parses TypeScript interface with JSDoc comments to extract prop definitions
 */
export function parsePropsFromTypeScript(sourceCode: string, interfaceName: string): PropDefinition[] {
  const props: PropDefinition[] = [];
  
  // Find the interface definition - handle multiline interfaces
  const interfaceStart = sourceCode.indexOf(`export interface ${interfaceName}`);
  if (interfaceStart === -1) {
    console.warn(`Interface ${interfaceName} not found`);
    return props;
  }
  
  // Find the opening brace
  const openBrace = sourceCode.indexOf('{', interfaceStart);
  if (openBrace === -1) return props;
  
  // Find the matching closing brace
  let braceCount = 1;
  let pos = openBrace + 1;
  let closeBrace = -1;
  
  while (pos < sourceCode.length && braceCount > 0) {
    if (sourceCode[pos] === '{') braceCount++;
    else if (sourceCode[pos] === '}') braceCount--;
    if (braceCount === 0) closeBrace = pos;
    pos++;
  }
  
  if (closeBrace === -1) return props;
  
  const interfaceBody = sourceCode.slice(openBrace + 1, closeBrace);
  
  // Parse individual properties with JSDoc comments
  const lines = interfaceBody.split('\n');
  let currentComment = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for JSDoc comment
    if (line.startsWith('/**') || line.startsWith('/*')) {
      currentComment = line;
      // Handle multi-line comments
      if (!line.endsWith('*/')) {
        for (let j = i + 1; j < lines.length; j++) {
          const commentLine = lines[j].trim();
          currentComment += ' ' + commentLine;
          if (commentLine.endsWith('*/')) {
            i = j;
            break;
          }
        }
      }
    } 
    // Check for property definition
    else if (line.includes(':') && !line.startsWith('//') && currentComment) {
      const propMatch = line.match(/^(\w+)(\?)?\s*:\s*(.+?);?\s*$/);
      if (propMatch) {
        const [, propName, optional, propType] = propMatch;
        
        // Parse the JSDoc comment
        const description = currentComment
          .replace(/\/\*\*|\*\/|\*/g, '')
          .replace(/@default\s+.+/g, '')
          .trim();
          
        // Extract default value
        const defaultMatch = currentComment.match(/@default\s+(.+?)(?:\s|$)/);
        const defaultValue = defaultMatch ? defaultMatch[1] : undefined;
        
        props.push({
          name: propName,
          type: propType.replace(/;$/, ''),
          required: !optional,
          description,
          defaultValue
        });
        
        currentComment = ''; // Reset for next property
      }
    }
  }
  
  return props;
}

/**
 * Fallback parser for interfaces without detailed JSDoc - extracts basic info
 */
export function parseBasicPropsFromInterface(sourceCode: string, interfaceName: string): PropDefinition[] {
  const props: PropDefinition[] = [];
  
  const interfaceRegex = new RegExp(`interface\\s+${interfaceName}\\s*\\{([^}]+)\\}`, 's');
  const interfaceMatch = sourceCode.match(interfaceRegex);
  
  if (!interfaceMatch) {
    return props;
  }
  
  const interfaceBody = interfaceMatch[1];
  
  // Match individual properties
  const propRegex = /(\w+)(\?)?\s*:\s*([^;]+);?/g;
  let match;
  
  while ((match = propRegex.exec(interfaceBody)) !== null) {
    const [, propName, optional, propType] = match;
    
    props.push({
      name: propName.trim(),
      type: propType.trim(),
      required: !optional,
      description: `${propName} property` // Basic fallback description
    });
  }
  
  return props;
}