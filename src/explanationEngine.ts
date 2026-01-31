import { NormalizedError, FriendlyExplanation, ErrorTemplate, CalmErrorsConfig } from './types';
import { allTemplates } from './templates';

/**
 * Explanation Engine
 * Generates human-friendly explanations for classified errors
 */
export class ExplanationEngine {
  private templates: ErrorTemplate[];
  
  constructor() {
    this.templates = allTemplates;
  }
  
  /**
   * Generate explanation for an error
   */
  public explain(
    error: NormalizedError,
    config: CalmErrorsConfig
  ): FriendlyExplanation | null {
    console.log('[CalmErrors] ExplanationEngine.explain called with:', {
      language: error.language,
      errorType: error.errorType,
      errorCode: error.errorCode
    });
    console.log('[CalmErrors] Total templates available:', this.templates.length);
    console.log('[CalmErrors] Templates by language:', 
      this.templates.reduce((acc, t) => {
        acc[t.language] = (acc[t.language] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    );
    
    // Find matching template
    const template = this.findTemplate(error);
    
    if (!template) {
      console.log('[CalmErrors] No template found after filtering');
      return null;
    }
    
    console.log('[CalmErrors] Found template:', template.template.title);
    
    // Apply configuration
    return this.applyConfig(template.template, config);
  }
  
  /**
   * Find the best matching template for an error
   */
  private findTemplate(error: NormalizedError): ErrorTemplate | null {
    console.log(`[CalmErrors Engine] ========================================`);
    console.log(`[CalmErrors Engine] Finding template for:`);
    console.log(`[CalmErrors Engine]   Language: '${error.language}'`);
    console.log(`[CalmErrors Engine]   Error Type: '${error.errorType}'`);
    console.log(`[CalmErrors Engine]   Error Code: '${error.errorCode}'`);
    console.log(`[CalmErrors Engine]   Message: ${error.rawMessage.substring(0, 80)}`);
    
    // Filter by language and error type
    const candidates = this.templates.filter(t => {
      // Check language match
      if (t.language !== error.language) {
        return false;
      }
      
      // Check error type match
      const errorTypes = Array.isArray(t.errorType) ? t.errorType : [t.errorType];
      const typeMatches = errorTypes.includes(error.errorType);
      
      if (!typeMatches) {
        return false;
      }
      
      console.log(`[CalmErrors Engine] Candidate template: "${t.template.title}" (priority: ${t.priority || 0})`);
      
      // Check error code pattern if specified
      if (t.errorCodePattern && error.errorCode) {
        const pattern = new RegExp(t.errorCodePattern);
        const codeMatches = pattern.test(error.errorCode);
        console.log(`[CalmErrors Engine]   Code pattern '${t.errorCodePattern}' vs '${error.errorCode}': ${codeMatches}`);
        if (!codeMatches) {
          return false;
        }
      }
      
      // Check message pattern if specified
      if (t.messagePattern) {
        const pattern = new RegExp(t.messagePattern, 'i');
        const msgMatches = pattern.test(error.rawMessage);
        console.log(`[CalmErrors Engine]   Message pattern '${t.messagePattern}': ${msgMatches}`);
        if (!msgMatches) {
          return false;
        }
      }
      
      return true;
    });
    
    console.log(`[CalmErrors Engine] Found ${candidates.length} matching templates`);
    
    if (candidates.length === 0) {
      console.log(`[CalmErrors Engine] ✗ No templates found`);
      console.log(`[CalmErrors Engine] ========================================`);
      return null;
    }
    
    // Sort by priority (higher first)
    candidates.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    
    const selected = candidates[0];
    console.log(`[CalmErrors Engine] ✓ Selected template: "${selected.template.title}"`);
    console.log(`[CalmErrors Engine] ========================================`);
    
    return selected;
  }
  
  /**
   * Apply user configuration to template
   */
  private applyConfig(
    template: FriendlyExplanation,
    config: CalmErrorsConfig
  ): FriendlyExplanation {
    const result = { ...template };
    
    // Remove calm message if reassurance is disabled
    if (!config.enableReassurance) {
      result.calmMessage = undefined;
      result.confidenceBoost = undefined;
    }
    
    // Adjust verbosity
    if (config.verbosity === 'short') {
      // Take only first 2 causes and steps for short version
      result.likelyCauses = result.likelyCauses.slice(0, 2);
      result.nextSteps = result.nextSteps.slice(0, 3);
      result.explanation = this.shortenExplanation(result.explanation);
    }
    
    return result;
  }
  
  /**
   * Shorten explanation text for brief mode
   */
  private shortenExplanation(text: string): string {
    // Take first sentence only
    const firstSentence = text.split('.')[0];
    return firstSentence + '.';
  }
  
  /**
   * Add a custom template
   */
  public addTemplate(template: ErrorTemplate): void {
    this.templates.push(template);
  }
  
  /**
   * Get all templates for a language
   */
  public getTemplatesForLanguage(language: string): ErrorTemplate[] {
    return this.templates.filter(t => t.language === language);
  }
}
