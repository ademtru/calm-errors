import * as vscode from 'vscode';
import { NormalizedError } from './types';

/**
 * Error Capture Layer
 * Listens to IDE diagnostic events and captures errors
 */
export class ErrorCapture {
  private disposables: vscode.Disposable[] = [];
  
  /**
   * Start listening for diagnostics
   */
  public activate(context: vscode.ExtensionContext): void {
    // Listen for diagnostic changes
    const diagnosticsListener = vscode.languages.onDidChangeDiagnostics(
      (event: vscode.DiagnosticChangeEvent) => {
        this.handleDiagnosticsChange(event);
      }
    );
    
    this.disposables.push(diagnosticsListener);
    context.subscriptions.push(...this.disposables);
  }
  
  /**
   * Handle diagnostic changes
   */
  private handleDiagnosticsChange(event: vscode.DiagnosticChangeEvent): void {
    for (const uri of event.uris) {
      const diagnostics = vscode.languages.getDiagnostics(uri);
      
      // Filter for errors only (not warnings or info)
      const errors = diagnostics.filter(
        (d: vscode.Diagnostic) => d.severity === vscode.DiagnosticSeverity.Error
      );
      
      // Process each error (this is where we'd trigger explanation)
      // For now, we just capture them
      errors.forEach((diagnostic: vscode.Diagnostic) => {
        // Normalize the diagnostic
        this.normalizeDiagnostic(uri, diagnostic);
        // The actual explanation happens in the hover provider
      });
    }
  }
  
  /**
   * Convert VS Code diagnostic to our normalized format
   */
  public normalizeDiagnostic(
    uri: vscode.Uri,
    diagnostic: vscode.Diagnostic
  ): NormalizedError {
    const language = this.detectLanguage(uri);
    const errorCode = this.extractErrorCode(diagnostic);
    
    return {
      language,
      errorType: 'Unknown', // Will be classified later
      rawMessage: diagnostic.message,
      file: uri.fsPath,
      line: diagnostic.range.start.line + 1, // Convert to 1-indexed
      column: diagnostic.range.start.character + 1,
      errorCode,
      severity: this.mapSeverity(diagnostic.severity),
      symbol: this.extractSymbol(diagnostic)
    };
  }
  
  /**
   * Detect programming language from file URI
   */
  private detectLanguage(uri: vscode.Uri): string {
    const ext = uri.fsPath.split('.').pop()?.toLowerCase() || '';
    
    const languageMap: Record<string, string> = {
      'ts': 'typescript',
      'tsx': 'typescript',
      'js': 'javascript',
      'jsx': 'javascript',
      'java': 'java',
      'py': 'python',
      'go': 'go',
      'rs': 'rust',
      'cpp': 'cpp',
      'c': 'c',
      'cs': 'csharp'
    };
    
    return languageMap[ext] || ext;
  }
  
  /**
   * Extract error code from diagnostic
   */
  private extractErrorCode(diagnostic: vscode.Diagnostic): string | undefined {
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
  
  /**
   * Map VS Code severity to our format
   */
  private mapSeverity(
    severity: vscode.DiagnosticSeverity | undefined
  ): 'error' | 'warning' | 'info' {
    switch (severity) {
      case vscode.DiagnosticSeverity.Error:
        return 'error';
      case vscode.DiagnosticSeverity.Warning:
        return 'warning';
      default:
        return 'info';
    }
  }
  
  /**
   * Try to extract symbol name from error message
   */
  private extractSymbol(diagnostic: vscode.Diagnostic): string | undefined {
    // Try to extract quoted symbols
    const quoted = diagnostic.message.match(/['"`]([^'"`]+)['"`]/);
    if (quoted && quoted[1]) {
      return quoted[1];
    }
    
    // Try to extract TypeScript-style symbols
    const tsSymbol = diagnostic.message.match(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b/);
    if (tsSymbol && tsSymbol[1]) {
      return tsSymbol[1];
    }
    
    return undefined;
  }
  
  /**
   * Clean up
   */
  public dispose(): void {
    this.disposables.forEach(d => d.dispose());
    this.disposables = [];
  }
}
