# 🔍 CalmErrors - Troubleshooting Guide

## Issue: Hover explanations not showing

### Step 1: Verify Extension is Loaded

1. In the Extension Host window (the new window that opened), press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
2. Type "Developer: Show Running Extensions"
3. Look for "CalmErrors" in the list
4. **Status should be:** ✅ Activated

### Step 2: Check Developer Console

1. In the Extension Host window, press `Cmd+Option+I` (Mac) or `Ctrl+Shift+I` (Windows)
2. Click the "Console" tab
3. You should see: `CalmErrors extension is now active`
4. When you hover over an error, you should see:
    ```
    [CalmErrors] Hover triggered at line:column
    [CalmErrors] Found X diagnostics
    [CalmErrors] Error diagnostic found: [error message]
    ```

### Step 3: Verify File Has Errors

1. Open `examples/sample-typescript.ts`
2. You should see **red squiggly lines** under some code
3. If you don't see red squiggles:
    - The TypeScript language server might not be running
    - Wait 5-10 seconds for it to load
    - Check bottom right corner for "TypeScript" status

### Step 4: Hover Correctly

1. Move your mouse cursor **directly over the red squiggle**
2. **Wait 1-2 seconds** for the hover to appear
3. You should see:
    - Original TypeScript error
    - **Then** CalmErrors friendly explanation below it

### Step 5: Test with Command

If hover still doesn't work, try the command:

1. Place cursor on an error (red squiggle)
2. Press `Cmd+Shift+P` or `Ctrl+Shift+P`
3. Type: "CalmErrors: Explain This Error"
4. Press Enter
5. Should show notification + output channel

## Common Issues

### Issue: "CalmErrors extension is now active" not in console

**Problem:** Extension didn't load
**Solution:**

1. Close the Extension Host window
2. In main VS Code window, press `Cmd+Shift+P` / `Ctrl+Shift+P`
3. Type: "Developer: Reload Window"
4. Press F5 again

### Issue: No red squiggles in TypeScript file

**Problem:** TypeScript language server not running
**Solution:**

1. Look at bottom right corner for "TypeScript" or "TS"
2. Click it and select "TypeScript Version"
3. Make sure it's using workspace version
4. If still no errors, the example file might need to be re-opened

### Issue: Hover shows original error but not CalmErrors

**Problem:** Classification or template matching failed
**Solution:**

1. Check console for `[CalmErrors]` logs
2. Look for the error message being processed
3. The error might not be in our template database yet

### Issue: "Cannot find module" errors in console

**Problem:** Compilation issue
**Solution:**

```bash
cd /Users/adems/projects/calmerrors
rm -rf out node_modules
npm install
npm run compile
# Then press F5 again
```

## Testing Checklist

- [ ] Extension appears in "Show Running Extensions"
- [ ] Console shows "CalmErrors extension is now active"
- [ ] File has red squiggly lines (errors)
- [ ] Hovering shows original error
- [ ] Hovering shows CalmErrors explanation below
- [ ] Console shows `[CalmErrors] Hover triggered...` when hovering

## Quick Test

Try this in a new .ts file in the Extension Host window:

```typescript
// Create new file: test.ts
const user: { name: string } | null = null;
console.log(user.name); // Should show red squiggle

// Hover over "user.name"
// Should see friendly explanation
```

## Still Not Working?

### Check VS Code Version

CalmErrors requires VS Code 1.85.0 or higher

- Check: Code menu → About Visual Studio Code

### Check Output Panel

1. View → Output
2. Select "Extension Host" from dropdown
3. Look for errors related to CalmErrors

### Enable Verbose Logging

Open `src/extension.ts` and add more console.log statements:

```typescript
console.log("Hover provider registered for:", ["typescript", "javascript"]);
```

## Debug Mode

To run in full debug mode:

1. Set breakpoint in `src/hoverProvider.ts` line 35 (provideHover function)
2. Press F5
3. Hover over error
4. VS Code should stop at breakpoint
5. Inspect variables to see what's happening

---

**If none of this works, please:**

1. Copy console output
2. Copy any error messages
3. Note which step failed
4. We can debug further!
