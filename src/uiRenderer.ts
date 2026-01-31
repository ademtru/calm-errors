import * as vscode from 'vscode';
import { FriendlyExplanation } from './types';

/**
 * UI Renderer
 * Displays friendly explanations in the IDE
 */
export class UIRenderer {
  /**
   * Format explanation as Markdown for hover
   */
  public formatAsMarkdown(explanation: FriendlyExplanation): vscode.MarkdownString {
    const md = new vscode.MarkdownString();
    md.isTrusted = true;
    md.supportHtml = true;
    
    // Title
    md.appendMarkdown(`### ${explanation.title}\n\n`);
    
    // Calm message (if present)
    if (explanation.calmMessage) {
      md.appendMarkdown(`*${explanation.calmMessage}*\n\n`);
      md.appendMarkdown('---\n\n');
    }
    
    // Explanation
    md.appendMarkdown(`${explanation.explanation}\n\n`);
    
    // Likely causes
    if (explanation.likelyCauses.length > 0) {
      md.appendMarkdown(`**Why this happens:**\n`);
      explanation.likelyCauses.forEach(cause => {
        md.appendMarkdown(`- ${cause}\n`);
      });
      md.appendMarkdown('\n');
    }
    
    // Next steps
    if (explanation.nextSteps.length > 0) {
      md.appendMarkdown(`**Try this:**\n`);
      explanation.nextSteps.forEach(step => {
        md.appendMarkdown(`- ${step}\n`);
      });
      md.appendMarkdown('\n');
    }
    
    // Confidence boost (if present)
    if (explanation.confidenceBoost) {
      md.appendMarkdown('---\n\n');
      md.appendMarkdown(`*💡 ${explanation.confidenceBoost}*\n`);
    }
    
    return md;
  }
  
  /**
   * Format explanation as plain text for quick peek
   */
  public formatAsText(explanation: FriendlyExplanation): string {
    let text = `${explanation.title}\n\n`;
    
    if (explanation.calmMessage) {
      text += `${explanation.calmMessage}\n\n`;
    }
    
    text += `${explanation.explanation}\n\n`;
    
    if (explanation.likelyCauses.length > 0) {
      text += `Why this happens:\n`;
      explanation.likelyCauses.forEach(cause => {
        text += `• ${cause}\n`;
      });
      text += '\n';
    }
    
    if (explanation.nextSteps.length > 0) {
      text += `Try this:\n`;
      explanation.nextSteps.forEach(step => {
        text += `• ${step}\n`;
      });
    }
    
    return text;
  }
  
  /**
   * Show explanation in a notification
   */
  public showNotification(explanation: FriendlyExplanation): void {
    const message = `${explanation.title}: ${explanation.explanation}`;
    vscode.window.showInformationMessage(message, 'Learn More').then((selection: string | undefined) => {
      if (selection === 'Learn More') {
        this.showDetailedView(explanation);
      }
    });
  }
  
  /**
   * Show detailed explanation in a webview or output channel
   */
  private showDetailedView(explanation: FriendlyExplanation): void {
    const text = this.formatAsText(explanation);
    
    // Create output channel for detailed view
    const channel = vscode.window.createOutputChannel('CalmErrors Explanation');
    channel.clear();
    channel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    channel.appendLine(text);
    channel.appendLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    channel.show(true);
  }
}
