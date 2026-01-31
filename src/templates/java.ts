import { ErrorTemplate } from '../types';

/**
 * Java error templates
 */
export const javaTemplates: ErrorTemplate[] = [
  {
    language: 'java',
    errorType: 'NullReference',
    messagePattern: 'NullPointerException',
    priority: 10,
    template: {
      title: "You're accessing something that's null",
      calmMessage: "NullPointerException is Java's most common error. Welcome to the club.",
      explanation: "You're trying to use an object (calling a method or accessing a field) but the object is null at this point.",
      likelyCauses: [
        "The object wasn't initialized",
        "A method returned null",
        "An optional value is missing",
        "Array or collection element is null"
      ],
      nextSteps: [
        "Add a null check: `if (object != null) { ... }`",
        "Check where the object is created — is it always initialized?",
        "Use Optional<T> for values that might be null",
        "Add debug logging to see when the value becomes null",
        "Look for the exact line number in the stack trace"
      ],
      confidenceBoost: "After a few of these, you'll develop a sixth sense for null checks.",
      confidence: 0.95
    }
  },
  
  {
    language: 'java',
    errorType: 'UndeclaredIdentifier',
    messagePattern: 'cannot find symbol',
    priority: 10,
    template: {
      title: "Java can't find this symbol",
      calmMessage: "Usually a missing import or typo — easy to fix.",
      explanation: "You're using a class, method, or variable that Java doesn't know about.",
      likelyCauses: [
        "Missing import statement",
        "Typo in the class or variable name",
        "The class is in a different package",
        "Haven't declared the variable yet"
      ],
      nextSteps: [
        "Add the import: `import package.name.ClassName;`",
        "Check spelling — Java is case-sensitive",
        "Verify the variable is declared before this line",
        "Use your IDE's quick fix (Alt+Enter / Cmd+1)",
        "Make sure the class is in your classpath"
      ],
      confidence: 0.95
    }
  },
  
  {
    language: 'java',
    errorType: 'TypeMismatch',
    messagePattern: 'incompatible types|cannot be converted to',
    priority: 10,
    template: {
      title: "Type mismatch in your code",
      calmMessage: "Java's strong typing is helping you avoid bugs. This is good.",
      explanation: "You're trying to assign or pass a value of one type where a different type is expected.",
      likelyCauses: [
        "Passing wrong type to a method",
        "Trying to assign incompatible types",
        "Mixing int with double, or String with int",
        "Need to cast or convert the value"
      ],
      nextSteps: [
        "Check the expected type vs. what you're providing",
        "Add a type cast if appropriate: `(TargetType) value`",
        "Convert the value: `Integer.parseInt()`, `String.valueOf()`, etc.",
        "Verify method signatures match what you're calling",
        "Look at both sides of the assignment or comparison"
      ],
      confidence: 0.9
    }
  },
  
  {
    language: 'java',
    errorType: 'MissingImport',
    messagePattern: 'cannot be resolved to a type',
    priority: 10,
    template: {
      title: "Can't resolve this type",
      calmMessage: "Missing imports are super common when writing Java.",
      explanation: "Java can't find the class you're referencing, usually because it's not imported.",
      likelyCauses: [
        "Need to add an import statement",
        "Class is in a different package",
        "Library isn't in your dependencies",
        "Typo in the class name"
      ],
      nextSteps: [
        "Add import at the top: `import com.example.ClassName;`",
        "Use IDE's organize imports (Ctrl+Shift+O / Cmd+Shift+O)",
        "Check if the library is in your pom.xml or build.gradle",
        "Verify the class name and package are correct",
        "Make sure the dependency is downloaded"
      ],
      confidence: 0.95
    }
  },
  
  {
    language: 'java',
    errorType: 'OutOfBounds',
    messagePattern: 'ArrayIndexOutOfBoundsException',
    priority: 10,
    template: {
      title: "Array index is out of bounds",
      calmMessage: "Off-by-one errors happen to everyone, even experienced developers.",
      explanation: "You're trying to access an array element at an index that doesn't exist.",
      likelyCauses: [
        "Using an index >= array.length",
        "Using a negative index",
        "Off-by-one error in a loop",
        "Array is empty or smaller than expected"
      ],
      nextSteps: [
        "Check your array bounds: valid indices are 0 to length-1",
        "Add bounds checking: `if (index >= 0 && index < array.length)`",
        "Print array.length to see the actual size",
        "Review your loop conditions (< vs <=)",
        "Check if the array is being populated correctly"
      ],
      confidenceBoost: "Array indexing becomes second nature with practice.",
      confidence: 0.9
    }
  },
  
  {
    language: 'java',
    errorType: 'SyntaxError',
    messagePattern: 'expected|illegal start|not a statement',
    priority: 5,
    template: {
      title: "Syntax error in your code",
      calmMessage: "Syntax errors are easy to make and usually easy to fix.",
      explanation: "There's a problem with how your code is written — Java can't parse it.",
      likelyCauses: [
        "Missing or extra semicolon",
        "Mismatched brackets or braces",
        "Typo in a keyword",
        "Missing closing quote or parenthesis"
      ],
      nextSteps: [
        "Check the line mentioned and the line right before it",
        "Count your brackets: `()`, `{}`, `[]`",
        "Look for the red underline in your IDE",
        "Make sure all statements end with semicolons",
        "Format your code to see the structure better"
      ],
      confidence: 0.8
    }
  }
];
