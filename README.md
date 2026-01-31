# CalmErrors

> **Translates compiler and runtime errors into clear, calm, human-friendly explanations**

CalmErrors is a developer-first VS Code extension that makes error messages less stressful and more actionable. Instead of cryptic compiler errors that make you feel bad, you get calm, clear explanations with practical next steps.

<!-- ![CalmErrors Demo](https://via.placeholder.com/800x400.png?text=CalmErrors+Demo) -->
<!-- TODO: Add real screenshot here -->

## 🌟 Features

- **Calm, Human-Friendly Explanations**: Every error is explained in plain English
- **Actionable Next Steps**: Clear guidance on how to fix the issue
- **Emotional Support**: Optional reassuring messages that remind you errors are normal
- **Hover Tooltips**: Just hover over any error to see a friendly explanation
- **Multi-Language Support**: TypeScript, JavaScript, and Java (more coming soon)
- **Privacy-First**: Works completely offline, no code sent anywhere
- **Customizable**: Toggle reassurance, adjust verbosity, choose languages

## 🚀 Quick Start

1. Install the extension from VS Code Marketplace
2. Open a TypeScript, JavaScript, or Java file
3. When you see an error (red squiggle), hover over it
4. Read the calm, friendly explanation
5. Follow the suggested steps to fix it

## 💡 How It Works

When you encounter an error:

1. **You see the error** (unchanged from normal VS Code)
2. **Hover over it** (or use Command Palette: "CalmErrors: Explain This Error")
3. **Get a friendly explanation** including:
    - A calm, reassuring title
    - Plain-English explanation
    - Why this happens
    - What to do next
4. **Fix the issue** without leaving the IDE

## 📖 Example

**Before (Original Error):**

```
TS2531: Object is possibly 'null'.
```

**After (CalmErrors Explanation):**

```
You're trying to use something that might not exist yet

This is one of the most common errors in programming. You're in good company.

You're trying to access a property or call a method on a value that could be
null or undefined at this point in your code.

Why this happens:
• The variable hasn't been initialized yet
• A function returned null or undefined
• An optional property wasn't provided
• An API call failed or returned no data

Try this:
• Check where the variable is assigned — is it always given a value?
• Add a null check before using it: if (variable !== null) { ... }
• Use optional chaining: object?.property instead of object.property
• Use nullish coalescing: value ?? defaultValue
• Log the value right before this line to see what it actually is

💡 Once you spot the pattern, these become quick fixes.
```

## ⚙️ Configuration

Access settings via `Code > Preferences > Settings` and search for "CalmErrors":

| Setting                        | Description                              | Default                                |
| ------------------------------ | ---------------------------------------- | -------------------------------------- |
| `calmerrors.enableReassurance` | Show calm, reassuring messages           | `true`                                 |
| `calmerrors.verbosity`         | Detail level: "short" or "detailed"      | `"detailed"`                           |
| `calmerrors.enabledLanguages`  | Languages to support                     | `["typescript", "javascript", "java"]` |
| `calmerrors.experimentalAI`    | Enable AI-assisted explanations (future) | `false`                                |

## 🎯 Supported Languages & Errors

### TypeScript/JavaScript

- ✅ Null/Undefined references
- ✅ Type mismatches
- ✅ Missing imports/modules
- ✅ Undeclared identifiers
- ✅ Async/Promise issues
- ✅ Syntax errors

### Java

- ✅ NullPointerException
- ✅ Type mismatches
- ✅ Missing imports
- ✅ Cannot find symbol
- ✅ Array out of bounds
- ✅ Syntax errors

### Coming Soon

- Python
- Go
- Rust
- C/C++
- C#

## 🎨 Commands

- **CalmErrors: Explain This Error** - Show explanation for error at cursor
- **CalmErrors: Toggle Emotional Reassurance** - Enable/disable reassuring messages

## 🛠️ Development

Want to contribute or customize? Here's how to set up:

```bash
# Clone the repository
git clone https://github.com/calmerrors/calmerrors.git
cd calmerrors

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Run in VS Code Extension Host
# Press F5 in VS Code to launch
```

### Project Structure

```
calmerrors/
├── src/
│   ├── extension.ts          # Main extension entry point
│   ├── types.ts               # Type definitions
│   ├── errorCapture.ts        # Captures IDE diagnostics
│   ├── classifier.ts          # Classifies error types
│   ├── explanationEngine.ts   # Generates explanations
│   ├── uiRenderer.ts          # Renders UI
│   ├── hoverProvider.ts       # Hover tooltip provider
│   └── templates/             # Error explanation templates
│       ├── typescript.ts
│       ├── java.ts
│       └── javascript.ts
├── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Add New Error Templates**: Add explanations for more error types
2. **Support New Languages**: Extend to Python, Go, Rust, etc.
3. **Improve Explanations**: Make existing explanations clearer
4. **Report Issues**: Found a bug or unclear explanation? Let us know!

## 🎯 Design Philosophy

CalmErrors is built on these principles:

1. **Never hide technical details** - Original errors are always visible
2. **Be calm, not condescending** - Respectful, supportive tone
3. **Teach, don't fix** - Help developers learn and understand
4. **Stay offline** - No code sent externally, privacy-first
5. **Be deterministic** - Rule-based, explainable, no "black box AI"

## 📊 Success Metrics

We measure success by:

- Reduced time searching for error solutions online
- Improved developer confidence when encountering errors
- Faster time-to-fix for common errors
- Positive user feedback sentiment

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Built with love for developers who've ever felt overwhelmed by error messages.

Inspired by the frustration of cryptic compiler errors and the belief that technology should be kinder to humans.

---

**Made with ❤️ for developers by developers**

[Report Issue](https://github.com/calmerrors/calmerrors/issues) • [Request Feature](https://github.com/calmerrors/calmerrors/issues) • [Contribute](CONTRIBUTING.md)
