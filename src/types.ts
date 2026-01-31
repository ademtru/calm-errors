/**
 * Normalized error structure shared across all languages
 */
export interface NormalizedError {
  /** Programming language (e.g., "typescript", "java") */
  language: string;
  
  /** Classified error type (e.g., "NullReference", "TypeMismatch") */
  errorType: string;
  
  /** Original raw error message from compiler/runtime */
  rawMessage: string;
  
  /** File path where error occurred */
  file: string;
  
  /** Line number (1-indexed) */
  line: number;
  
  /** Column number (1-indexed, optional) */
  column?: number;
  
  /** Symbol/identifier involved (optional) */
  symbol?: string;
  
  /** Error code from compiler (e.g., "TS2322", "CS0103") */
  errorCode?: string;
  
  /** Severity level */
  severity: 'error' | 'warning' | 'info';
}

/**
 * Human-friendly explanation structure
 */
export interface FriendlyExplanation {
  /** Short, calm title */
  title: string;
  
  /** Reassuring message (optional, controlled by settings) */
  calmMessage?: string;
  
  /** Plain-English explanation of what's happening */
  explanation: string;
  
  /** List of likely causes */
  likelyCauses: string[];
  
  /** Actionable next steps */
  nextSteps: string[];
  
  /** Optional confidence-boosting message */
  confidenceBoost?: string;
  
  /** Confidence level (0-1) in this explanation */
  confidence: number;
}

/**
 * Template for rule-based explanations
 */
export interface ErrorTemplate {
  /** Language this template applies to */
  language: string;
  
  /** Error type(s) this template handles */
  errorType: string | string[];
  
  /** Optional error code matcher (regex) */
  errorCodePattern?: string;
  
  /** Optional message matcher (regex) */
  messagePattern?: string;
  
  /** The explanation template */
  template: FriendlyExplanation;
  
  /** Priority (higher = checked first) */
  priority?: number;
}

/**
 * Configuration settings
 */
export interface CalmErrorsConfig {
  enableReassurance: boolean;
  verbosity: 'short' | 'detailed';
  enabledLanguages: string[];
  experimentalAI: boolean;
}
