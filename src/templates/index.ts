import { typescriptTemplates } from './typescript';
import { javaTemplates } from './java';
import { javascriptTemplates } from './javascript';
import { ErrorTemplate } from '../types';

/**
 * Registry of all error templates
 */
export const allTemplates: ErrorTemplate[] = [
  ...typescriptTemplates,
  ...javaTemplates,
  ...javascriptTemplates
];

/**
 * Get templates for a specific language
 */
export function getTemplatesForLanguage(language: string): ErrorTemplate[] {
  return allTemplates.filter(t => t.language === language);
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(): string[] {
  return Array.from(new Set(allTemplates.map(t => t.language)));
}
