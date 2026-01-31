import { NormalizedError } from './types';

/**
 * Classification Engine
 * Maps errors to known error categories using regex patterns and metadata
 */
export class ErrorClassifier {
  /**
   * Classify an error into a known type
   */
  public classify(error: NormalizedError): string {
    // Try language-specific classification first
    const languageClassifier = this.getLanguageClassifier(error.language);
    if (languageClassifier) {
      const classified = languageClassifier(error);
      if (classified !== 'Unknown') {
        return classified;
      }
    }
    
    // Fall back to generic classification
    return this.genericClassify(error);
  }
  
  /**
   * Get language-specific classifier
   */
  private getLanguageClassifier(
    language: string
  ): ((error: NormalizedError) => string) | null {
    const classifiers: Record<string, (error: NormalizedError) => string> = {
      typescript: this.classifyTypeScript.bind(this),
      javascript: this.classifyJavaScript.bind(this),
      java: this.classifyJava.bind(this)
    };
    
    return classifiers[language] || null;
  }
  
  /**
   * Classify TypeScript errors
   */
  private classifyTypeScript(error: NormalizedError): string {
    const { errorCode, rawMessage } = error;
    
    // Normalize error code to string for comparison - handle various formats
    let code = '';
    if (errorCode) {
      code = errorCode.toString().replace(/^TS/, ''); // Remove TS prefix if present
    }
    
    console.log(`[CalmErrors Classifier] TypeScript error code: '${errorCode}' -> normalized: '${code}'`);
    console.log(`[CalmErrors Classifier] Message: ${rawMessage.substring(0, 100)}`);
    
    // Null/Undefined reference
    if (code === '2531' || code === '2532' || code === '18047' ||
        rawMessage.includes('possibly null') || 
        rawMessage.includes('possibly undefined')) {
      console.log(`[CalmErrors Classifier] -> NullOrUndefinedReference`);
      return 'NullOrUndefinedReference';
    }
    
    // Type mismatch
    if (code === '2322' || code === '2345' || code === '2339' ||
        rawMessage.includes('not assignable to type') ||
        rawMessage.includes('does not exist on type')) {
      console.log(`[CalmErrors Classifier] -> TypeMismatch`);
      return 'TypeMismatch';
    }
    
    // Cannot find name/module
    if (code === '2304' || code === '2305' ||
        rawMessage.includes('Cannot find name')) {
      console.log(`[CalmErrors Classifier] -> UndeclaredIdentifier`);
      return 'UndeclaredIdentifier';
    }
    
    // Missing import
    if (code === '2307' || code === '2306' ||
        rawMessage.includes('Cannot find module')) {
      console.log(`[CalmErrors Classifier] -> MissingImport`);
      return 'MissingImport';
    }
    
    // Async/Promise issues
    if (code === '2794' || rawMessage.includes('Promise')) {
      console.log(`[CalmErrors Classifier] -> AsyncAwaitIssue`);
      return 'AsyncAwaitIssue';
    }
    
    // Syntax errors
    if (code.startsWith('1') || rawMessage.includes('expected')) {
      console.log(`[CalmErrors Classifier] -> SyntaxError`);
      return 'SyntaxError';
    }
    
    console.log(`[CalmErrors Classifier] -> Unknown (no match)`);
    return 'Unknown';
  }
  
  /**
   * Classify JavaScript errors
   */
  private classifyJavaScript(error: NormalizedError): string {
    const { rawMessage } = error;
    
    // Null/undefined
    if (
      rawMessage.includes('Cannot read propert') ||
      rawMessage.includes('undefined') ||
      rawMessage.includes('null')
    ) {
      return 'NullOrUndefinedReference';
    }
    
    // Reference errors
    if (rawMessage.includes('is not defined') || rawMessage.includes('ReferenceError')) {
      return 'UndeclaredIdentifier';
    }
    
    // Type errors
    if (rawMessage.includes('is not a function') || rawMessage.includes('TypeError')) {
      return 'TypeMismatch';
    }
    
    // Syntax errors
    if (rawMessage.includes('SyntaxError') || rawMessage.includes('Unexpected')) {
      return 'SyntaxError';
    }
    
    return 'Unknown';
  }
  
  /**
   * Classify Java errors
   */
  private classifyJava(error: NormalizedError): string {
    const { rawMessage } = error;
    
    // NullPointerException
    if (rawMessage.includes('NullPointerException')) {
      return 'NullReference';
    }
    
    // Cannot find symbol
    if (rawMessage.includes('cannot find symbol')) {
      return 'UndeclaredIdentifier';
    }
    
    // Type mismatch
    if (
      rawMessage.includes('incompatible types') ||
      rawMessage.includes('cannot be converted to')
    ) {
      return 'TypeMismatch';
    }
    
    // Missing import
    if (rawMessage.includes('cannot be resolved to a type')) {
      return 'MissingImport';
    }
    
    // Array index out of bounds
    if (rawMessage.includes('ArrayIndexOutOfBoundsException')) {
      return 'OutOfBounds';
    }
    
    // Syntax errors
    if (
      rawMessage.includes('expected') ||
      rawMessage.includes('illegal start') ||
      rawMessage.includes('not a statement')
    ) {
      return 'SyntaxError';
    }
    
    return 'Unknown';
  }
  
  /**
   * Generic classification based on common patterns
   */
  private genericClassify(error: NormalizedError): string {
    const msg = error.rawMessage.toLowerCase();
    
    if (msg.includes('null') || msg.includes('undefined')) {
      return 'NullOrUndefinedReference';
    }
    
    if (msg.includes('type') || msg.includes('mismatch')) {
      return 'TypeMismatch';
    }
    
    if (msg.includes('not found') || msg.includes('cannot find')) {
      return 'UndeclaredIdentifier';
    }
    
    if (msg.includes('import') || msg.includes('module')) {
      return 'MissingImport';
    }
    
    if (msg.includes('syntax') || msg.includes('expected')) {
      return 'SyntaxError';
    }
    
    return 'Unknown';
  }
}
