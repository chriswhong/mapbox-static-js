import { ReactNode } from 'react';

export interface ExampleMetadata {
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ExampleDefinition extends ExampleMetadata {
  id: string;
  component: React.ComponentType<{ accessToken: string }>;
  code: string;
}