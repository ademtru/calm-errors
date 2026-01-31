# Development Guide

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/calm-errors.git
cd calm-errors
npm install
```

## Development Workflow

### Compile
```bash
npm run compile
```

### Watch Mode (auto-recompile)
```bash
npm run watch
```

### Run Extension
Press **F5** in VS Code to launch Extension Development Host

### Lint
```bash
npm run lint
```

## Project Structure

```
src/
├── extension.ts          # Entry point
├── types.ts             # TypeScript interfaces
├── errorCapture.ts      # Captures diagnostics
├── classifier.ts        # Classifies error types
├── explanationEngine.ts # Generates explanations
├── hoverProvider.ts     # Provides hover tooltips
├── uiRenderer.ts        # Formats markdown output
└── templates/           # Error explanation templates
    ├── index.ts
    ├── typescript.ts
    ├── javascript.ts
    └── java.ts
```

## Adding New Error Templates

1. Open `src/templates/[language].ts`
2. Add new template:

```typescript
{
  language: 'typescript',
  errorType: 'NewErrorType',
  errorCodePattern: '^(TS)?1234$',
  priority: 10,
  template: {
    title: "Friendly title",
    calmMessage: "Reassuring message",
    explanation: "What's happening",
    likelyCauses: ["Cause 1", "Cause 2"],
    nextSteps: ["Step 1", "Step 2"],
    confidence: 0.9
  }
}
```

3. Update classifier in `src/classifier.ts` if needed
4. Test with real code

## Adding New Language Support

1. Create `src/templates/[language].ts`
2. Add classification logic in `src/classifier.ts`
3. Update `package.json` activation events
4. Add to default enabled languages
5. Test thoroughly

## Debugging

### View Debug Output
- Open Debug Console (Cmd+Shift+Y)
- Look for `[CalmErrors]` prefixed messages

### Set Breakpoints
1. Open source file in main VS Code window
2. Click in gutter to set breakpoint
3. Press F5 to debug
4. Trigger hover in Extension Development Host

### Common Debug Points
- `hoverProvider.ts:provideHover()` - Entry point
- `classifier.ts:classify()` - Error classification
- `explanationEngine.ts:explain()` - Template matching

## Testing

See [TESTING.md](TESTING.md) for detailed testing instructions.

Quick test:
```bash
npm run compile
# Press F5
# Open .ts file with errors
# Hover over error
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for system design details.
