import * as vscode from 'vscode';
import { ErrorCapture } from './errorCapture';
import { ErrorClassifier } from './classifier';
import { ExplanationEngine } from './explanationEngine';
import { UIRenderer } from './uiRenderer';
import { CalmErrorsConfig } from './types';

/**
 * Hover Provider
 * Shows friendly explanations when hovering over errors
 */
export class ErrorHoverProvider implements vscode.HoverProvider {
  private errorCapture: ErrorCapture;
  private classifier: ErrorClassifier;
  private explanationEngine: ExplanationEngine;
  private uiRenderer: UIRenderer;
  
  constructor(
    errorCapture: ErrorCapture,
    classifier: ErrorClassifier,
    explanationEngine: ExplanationEngine,
    uiRenderer: UIRenderer
  ) {
    this.errorCapture = errorCapture;
    this.classifier = classifier;
    this.explanationEngine = explanationEngine;
    this.uiRenderer = uiRenderer;
  }
  
  /**
   * Provide hover information
   */
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Hover> {
    try {
      // Get ALL diagnostics for this document
      const diagnostics = vscode.languages.getDiagnostics(document.uri);
      
      console.log(`[CalmErrors] ========================================`);
      console.log(`[CalmErrors] Hover triggered at line ${position.line}, char ${position.character}`);
      console.log(`[CalmErrors] Document: ${document.fileName}`);
      console.log(`[CalmErrors] Language: ${document.languageId}`);
      console.log(`[CalmErrors] Total diagnostics in file: ${diagnostics.length}`);
      
      if (diagnostics.length > 0) {
        console.log(`[CalmErrors] All diagnostics:`, diagnostics.map(d => ({
          message: d.message.substring(0, 50),
          range: `${d.range.start.line}:${d.range.start.character}-${d.range.end.line}:${d.range.end.character}`,
          severity: d.severity,
          code: d.code
        })));
      }
      
      // Find diagnostic at cursor position
      const errorDiagnostic = diagnostics.find((d: vscode.Diagnostic) => {
        const contains = d.range.contains(position);
        console.log(`[CalmErrors] Checking diagnostic at line ${d.range.start.line}: contains=${contains}`);
        return contains;
      });
      
      if (!errorDiagnostic) {
        console.log(`[CalmErrors] No diagnostic found at cursor position`);
        return null;
      }
      
      console.log(`[CalmErrors] ✓ Found diagnostic:`, errorDiagnostic.message);
      const code = this.extractCode(errorDiagnostic);
      console.log(`[CalmErrors] ✓ Error code:`, code);
      console.log(`[CalmErrors] ✓ Severity:`, errorDiagnostic.severity);
      console.log(`[CalmErrors] ✓ Source:`, errorDiagnostic.source);
      
      // Get configuration
      const config = this.getConfig();
      console.log(`[CalmErrors] Config enabled languages:`, config.enabledLanguages);
      
      // Check if this language is enabled
      const language = document.languageId;
      if (!config.enabledLanguages.includes(language)) {
        console.log(`[CalmErrors] ✗ Language '${language}' not in enabled list`);
        return null;
      }
      
      console.log(`[CalmErrors] ✓ Language '${language}' is enabled`);
      
      // Normalize the error
      const normalized = this.errorCapture.normalizeDiagnostic(
        document.uri,
        errorDiagnostic
      );
      
      console.log(`[CalmErrors] Normalized error:`, {
        language: normalized.language,
        errorCode: normalized.errorCode,
        rawMessage: normalized.rawMessage.substring(0, 100)
      });
      
      // Classify the error
      normalized.errorType = this.classifier.classify(normalized);
      console.log(`[CalmErrors] ✓ Classified as: '${normalized.errorType}'`);
      
      // Generate explanation
      const explanation = this.explanationEngine.explain(normalized, config);
      
      if (!explanation) {
        console.log(`[CalmErrors] ✗ No explanation template found for error type: '${normalized.errorType}'`);
        // Return a fallback hover with just the original error
        const fallback = new vscode.MarkdownString();
        fallback.appendMarkdown(`### CalmErrors\n\n`);
        fallback.appendMarkdown(`No explanation available yet for this error type.\n\n`);
        fallback.appendMarkdown(`**Error type:** ${normalized.errorType}\n\n`);
        fallback.appendMarkdown(`**Original error:** ${errorDiagnostic.message}`);
        return new vscode.Hover(fallback, errorDiagnostic.range);
      }
      
      console.log(`[CalmErrors] ✓ Generated explanation: "${explanation.title}"`);
      
      // Format as hover
      const markdown = this.uiRenderer.formatAsMarkdown(explanation);
      
      // Add separator and original error
      markdown.appendMarkdown('\n\n---\n\n');
      markdown.appendMarkdown(`**Original error:** ${errorDiagnostic.message}`);
      
      console.log(`[CalmErrors] ✓ Returning hover`);
      console.log(`[CalmErrors] ========================================`);
      
      return new vscode.Hover(markdown, errorDiagnostic.range);
    } catch (error) {
      console.error(`[CalmErrors] ERROR in provideHover:`, error);
      return null;
    }
  }
  
  /**
   * Get configuration
   */
  private getConfig(): CalmErrorsConfig {
    const config = vscode.workspace.getConfiguration('calmerrors');
    
    return {
      enableReassurance: config.get('enableReassurance', true),
      verbosity: config.get('verbosity', 'detailed'),
      enabledLanguages: config.get('enabledLanguages', ['typescript', 'javascript', 'java']),
      experimentalAI: config.get('experimentalAI', false)
    };
  }
  
  /**
   * Extract error code from diagnostic
   */
  private extractCode(diagnostic: vscode.Diagnostic): string | undefined {
    if (typeof diagnostic.code === 'string') {
      return diagnostic.code;
    }
    if (typeof diagnostic.code === 'number') {
      return diagnostic.code.toString();
    }
    if (diagnostic.code && typeof diagnostic.code === 'object' && 'value' in diagnostic.code) {
      return String(diagnostic.code.value);
    }
    return undefined;
  }
}
