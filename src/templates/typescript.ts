import { ErrorTemplate } from '../types';

/**
 * TypeScript error templates
 */
export const typescriptTemplates: ErrorTemplate[] = [
  {
    language: 'typescript',
    errorType: 'NullOrUndefinedReference',
    errorCodePattern: '^(TS)?(2531|2532|18047)$',
    priority: 10,
    template: {
      title: "You're trying to use something that might not exist yet",
      calmMessage: "This is one of the most common errors in programming. You're in good company.",
      explanation: "You're trying to access a property or call a method on a value that could be null or undefined at this point in your code.",
      likelyCauses: [
        "The variable hasn't been initialized yet",
        "A function returned null or undefined",
        "An optional property wasn't provided",
        "An API call failed or returned no data"
      ],
      nextSteps: [
        "Check where the variable is assigned — is it always given a value?",
        "Add a null check before using it: `if (variable !== null) { ... }`",
        "Use optional chaining: `object?.property` instead of `object.property`",
        "Use nullish coalescing: `value ?? defaultValue`",
        "Log the value right before this line to see what it actually is"
      ],
      confidenceBoost: "Once you spot the pattern, these become quick fixes.",
      confidence: 0.95
    }
  },
  
  {
    language: 'typescript',
    errorType: 'TypeMismatch',
    errorCodePattern: '^(TS)?(2322|2345|2339)$',
    priority: 10,
    template: {
      title: "The types don't match up here",
      calmMessage: "TypeScript is just trying to help you catch bugs early. This is a good thing.",
      explanation: "You're trying to assign a value of one type to a variable that expects a different type, or you're accessing a property that doesn't exist on this type.",
      likelyCauses: [
        "You're passing the wrong type of argument to a function",
        "A variable's type changed somewhere in your code",
        "You're accessing a property that only exists on a different type",
        "The function return type doesn't match what you declared"
      ],
      nextSteps: [
        "Look at the type that's expected vs. what you're providing",
        "Check if you need to convert or transform the value first",
        "Verify the property name is spelled correctly",
        "Consider using type guards to narrow the type: `if (typeof x === 'string')`",
        "Hover over variables to see their inferred types"
      ],
      confidenceBoost: "Type errors are easier to fix than runtime bugs!",
      confidence: 0.9
    }
  },
  
  {
    language: 'typescript',
    errorType: 'UndeclaredIdentifier',
    errorCodePattern: '^(TS)?(2304|2305)$',
    priority: 10,
    template: {
      title: "TypeScript can't find this name",
      calmMessage: "Usually just a missing import or typo — quick fix incoming.",
      explanation: "You're using a variable, function, or type that TypeScript doesn't know about yet.",
      likelyCauses: [
        "You forgot to import it from another file",
        "There's a typo in the name",
        "The variable isn't declared yet",
        "You're using it before it's defined in the file"
      ],
      nextSteps: [
        "Check if you need to add an import statement at the top",
        "Verify the spelling matches the actual declaration",
        "Make sure the variable is declared before this line",
        "Use your IDE's auto-import feature (Cmd+. or Ctrl+.)",
        "Check if it needs to be imported from a package you haven't installed"
      ],
      confidence: 0.95
    }
  },
  
  {
    language: 'typescript',
    errorType: 'MissingImport',
    errorCodePattern: '^(TS)?(2307|2306)$',
    priority: 10,
    template: {
      title: "Can't find this module",
      calmMessage: "Module resolution can be tricky — let's figure it out.",
      explanation: "TypeScript can't locate the module or file you're trying to import.",
      likelyCauses: [
        "The package isn't installed (need to run `npm install`)",
        "The file path is incorrect",
        "Missing file extension in the import",
        "The module doesn't have TypeScript types"
      ],
      nextSteps: [
        "Check if the package is in your `package.json`",
        "Run `npm install [package-name]` if it's missing",
        "Verify the import path is correct (relative imports need `./` or `../`)",
        "Install type definitions: `npm install --save-dev @types/[package-name]`",
        "Check for typos in the module name"
      ],
      confidence: 0.9
    }
  },
  
  {
    language: 'typescript',
    errorType: 'AsyncAwaitIssue',
    errorCodePattern: '^(TS)?2794$',
    priority: 10,
    template: {
      title: "Promise handling issue",
      calmMessage: "Async code is confusing at first, but you'll get the hang of it.",
      explanation: "You're either forgetting to await a Promise, or you're trying to await something that isn't a Promise.",
      likelyCauses: [
        "Forgot to use `await` before an async function call",
        "Using `await` outside an async function",
        "Trying to await a non-Promise value",
        "Missing `async` keyword on the function"
      ],
      nextSteps: [
        "Add `await` before the function call if it returns a Promise",
        "Make sure the containing function is marked as `async`",
        "Use `.then()` and `.catch()` if you can't use async/await",
        "Check the function's return type — is it actually a Promise?"
      ],
      confidenceBoost: "Async patterns take practice, but they're worth learning.",
      confidence: 0.85
    }
  },
  
  {
    language: 'typescript',
    errorType: 'SyntaxError',
    errorCodePattern: '^(TS)?1.*$',
    priority: 5,
    template: {
      title: "Syntax issue detected",
      calmMessage: "Everyone writes syntax errors. It's part of the process.",
      explanation: "There's a problem with how the code is written — TypeScript can't parse it.",
      likelyCauses: [
        "Missing or extra bracket, parenthesis, or brace",
        "Missing semicolon or comma",
        "Typo in a keyword",
        "Mixing up different syntax styles"
      ],
      nextSteps: [
        "Check for matching brackets: `()`, `{}`, `[]`",
        "Look at the line mentioned and the line right before it",
        "Your IDE might highlight the exact issue — look for red underlines",
        "Try formatting the code (Shift+Alt+F) to spot the problem",
        "Count your opening and closing braces"
      ],
      confidence: 0.8
    }
  },
  
  {
    language: 'typescript',
    errorType: 'Unknown',
    priority: 1,
    template: {
      title: "Something needs attention here",
      calmMessage: "Take a breath. Let's figure this out together.",
      explanation: "There's an issue in your code that needs to be addressed. Check the error message below for details.",
      likelyCauses: [
        "The error message below will give you specific details",
        "This might be a linting issue or code style problem",
        "Could be a TypeScript configuration issue"
      ],
      nextSteps: [
        "Read the original error message carefully",
        "Try hovering over the problematic code to see type information",
        "Check if there are any quick fixes available (look for the lightbulb icon)",
        "Search for the error code online if you need more context"
      ],
      confidence: 0.5
    }
  }
];
