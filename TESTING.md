# Testing CalmErrors

## Quick Test

### 1. Compile and Run
```bash
npm run compile
# Press F5 in VS Code to launch Extension Development Host
```

### 2. Test with TypeScript
Create a test file:
```typescript
const x: number = "hello"; // TS2322
```

Hover over the error to see the friendly explanation.

### 3. Check Debug Console
In the main VS Code window:
- View > Debug Console (Cmd+Shift+Y)
- Look for `[CalmErrors]` messages

## Expected Result

You should see:
- ✓ Extension activated
- ✓ Hover triggered
- ✓ Diagnostic found
- ✓ Classified correctly
- ✓ Template found
- ✓ Hover displayed with friendly explanation

## Troubleshooting

**No hover appears:**
- Check that TypeScript extension is active
- Verify red squiggles appear on errors
- Check Debug Console for activation errors

**Hover shows but no explanation:**
- Check Debug Console logs
- Look for classification type
- Verify language is enabled in settings

## Test Files

Use the example files in `examples/`:
- `sample-typescript.ts` - Multiple TypeScript errors
- `SampleJava.java` - Java errors

## Configuration Testing

Test different settings:
- Toggle reassurance: Cmd+Shift+P > "CalmErrors: Toggle Emotional Reassurance"
- Change verbosity in Settings > CalmErrors
- Enable/disable languages
