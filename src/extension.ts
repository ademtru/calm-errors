import * as vscode from 'vscode';
import { ErrorCapture } from './errorCapture';
import { ErrorClassifier } from './classifier';
import { ExplanationEngine } from './explanationEngine';
import { UIRenderer } from './uiRenderer';
import { ErrorHoverProvider } from './hoverProvider';
import { CalmErrorsConfig } from './types';

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('CalmErrors extension is now active');
  
  // Initialize components
  const errorCapture = new ErrorCapture();
  const classifier = new ErrorClassifier();
  const explanationEngine = new ExplanationEngine();
  const uiRenderer = new UIRenderer();
  
  // Activate error capture
  errorCapture.activate(context);
  
  // Register hover provider for all supported languages
  const hoverProvider = new ErrorHoverProvider(
    errorCapture,
    classifier,
    explanationEngine,
    uiRenderer
  );
  
  // Register for TypeScript/JavaScript
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      ['typescript', 'javascript', 'typescriptreact', 'javascriptreact'],
      hoverProvider
    )
  );
  
  // Register for Java
  context.subscriptions.push(
    vscode.languages.registerHoverProvider('java', hoverProvider)
  );
  
  // Register commands
  
  // Command: Explain Error
  const explainErrorCommand = vscode.commands.registerCommand(
    'calmerrors.explainError',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage('No active editor');
        return;
      }
      
      const position = editor.selection.active;
      const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
      
      // Find error at cursor
      const errorDiag = diagnostics.find((d: vscode.Diagnostic) => {
        return (
          d.severity === vscode.DiagnosticSeverity.Error &&
          d.range.contains(position)
        );
      });
      
      if (!errorDiag) {
        vscode.window.showInformationMessage(
          'No error found at cursor position. Move your cursor to an error and try again.'
        );
        return;
      }
      
      // Get config
      const config = vscode.workspace.getConfiguration('calmerrors');
      const calmConfig: CalmErrorsConfig = {
        enableReassurance: config.get('enableReassurance', true),
        verbosity: config.get('verbosity', 'detailed') as 'short' | 'detailed',
        enabledLanguages: config.get('enabledLanguages', ['typescript', 'javascript', 'java']),
        experimentalAI: config.get('experimentalAI', false)
      };
      
      // Normalize and classify
      const normalized = errorCapture.normalizeDiagnostic(
        editor.document.uri,
        errorDiag
      );
      normalized.errorType = classifier.classify(normalized);
      
      // Generate explanation
      const explanation = explanationEngine.explain(normalized, calmConfig);
      
      if (!explanation) {
        vscode.window.showInformationMessage(
          `No explanation available for this error type yet. Original error: ${errorDiag.message}`
        );
        return;
      }
      
      // Show in notification and output
      uiRenderer.showNotification(explanation);
    }
  );
  
  context.subscriptions.push(explainErrorCommand);
  
  // Command: Toggle Reassurance
  const toggleReassuranceCommand = vscode.commands.registerCommand(
    'calmerrors.toggleReassurance',
    async () => {
      const config = vscode.workspace.getConfiguration('calmerrors');
      const current = config.get('enableReassurance', true);
      
      await config.update(
        'enableReassurance',
        !current,
        vscode.ConfigurationTarget.Global
      );
      
      const status = !current ? 'enabled' : 'disabled';
      vscode.window.showInformationMessage(
        `CalmErrors reassurance messages ${status}`
      );
    }
  );
  
  context.subscriptions.push(toggleReassuranceCommand);
  
  // Show welcome message on first activation
  const hasShownWelcome = context.globalState.get('calmerrors.hasShownWelcome');
  if (!hasShownWelcome) {
    vscode.window
      .showInformationMessage(
        'CalmErrors is now active! Hover over errors to see calm, friendly explanations.',
        'Got it',
        'Settings'
      )
      .then((selection: string | undefined) => {
        if (selection === 'Settings') {
          vscode.commands.executeCommand('workbench.action.openSettings', 'calmerrors');
        }
      });
    
    context.globalState.update('calmerrors.hasShownWelcome', true);
  }
}

/**
 * Extension deactivation
 */
export function deactivate() {
  console.log('CalmErrors extension is now deactivated');
}
