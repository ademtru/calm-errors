import { ErrorTemplate } from '../types';

/**
 * JavaScript error templates
 */
export const javascriptTemplates: ErrorTemplate[] = [
  {
    language: 'javascript',
    errorType: 'NullOrUndefinedReference',
    messagePattern: 'Cannot read propert|undefined|null',
    priority: 10,
    template: {
      title: "Trying to use something that's undefined or null",
      calmMessage: "This is the classic JavaScript error. Literally everyone sees this.",
      explanation: "You're trying to access a property or call a method on undefined or null.",
      likelyCauses: [
        "Variable wasn't initialized",
        "Function returned undefined",
        "Typo in property name",
        "Object doesn't have that property"
      ],
      nextSteps: [
        "Add a check: `if (variable) { ... }` or `variable?.property`",
        "Use optional chaining: `object?.property?.method?.()`",
        "Provide a default: `const value = obj?.prop || defaultValue`",
        "Log the variable to see what it actually is",
        "Check where the variable is assigned"
      ],
      confidenceBoost: "Once you learn optional chaining, these become much easier.",
      confidence: 0.95
    }
  },
  
  {
    language: 'javascript',
    errorType: 'UndeclaredIdentifier',
    messagePattern: 'is not defined|ReferenceError',
    priority: 10,
    template: {
      title: "This variable or function isn't defined",
      calmMessage: "Usually just a missing declaration or import.",
      explanation: "You're using a variable or function that JavaScript doesn't know about.",
      likelyCauses: [
        "Forgot to declare the variable (let, const, var)",
        "Typo in the name",
        "Missing import or require statement",
        "Variable is out of scope"
      ],
      nextSteps: [
        "Check if you need to import it: `import { name } from 'module'`",
        "Declare the variable: `const variableName = ...`",
        "Verify the spelling — JavaScript is case-sensitive",
        "Make sure it's declared before you use it",
        "Check if it's in the right scope"
      ],
      confidence: 0.95
    }
  },
  
  {
    language: 'javascript',
    errorType: 'TypeMismatch',
    messagePattern: 'is not a function|TypeError',
    priority: 10,
    template: {
      title: "Type error — not what you expected",
      calmMessage: "JavaScript's flexible types can be confusing, but you'll get it.",
      explanation: "You're trying to use a value in a way that doesn't match its actual type.",
      likelyCauses: [
        "Trying to call something that's not a function",
        "Variable is a different type than expected",
        "Array vs object confusion",
        "Value is null or undefined"
      ],
      nextSteps: [
        "Check the type: `console.log(typeof value)`",
        "Verify it's actually a function before calling it",
        "Look at where the value comes from",
        "Use Array.isArray() to check if it's an array",
        "Add type checking before using the value"
      ],
      confidence: 0.9
    }
  },
  
  {
    language: 'javascript',
    errorType: 'SyntaxError',
    messagePattern: 'SyntaxError|Unexpected',
    priority: 5,
    template: {
      title: "Syntax error detected",
      calmMessage: "Syntax errors are part of coding. Quick fix coming up.",
      explanation: "There's something wrong with how your JavaScript is written.",
      likelyCauses: [
        "Missing or extra bracket/parenthesis",
        "Missing comma in object or array",
        "Unclosed string or template literal",
        "Invalid use of reserved word"
      ],
      nextSteps: [
        "Check for matching brackets: (), {}, []",
        "Look for missing commas in objects and arrays",
        "Make sure strings are properly closed",
        "Check the line mentioned and the line before it",
        "Your editor might highlight the exact spot"
      ],
      confidence: 0.8
    }
  }
];
