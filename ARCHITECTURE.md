# CalmErrors Architecture

## System Overview

CalmErrors follows a modular, pipeline-based architecture:

```
┌─────────────────────┐
│ IDE Diagnostics API │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ Error Capture Layer │  ← Listens to diagnostic events
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ Error Normalizer    │  ← Converts to common format
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ Classification Engine│  ← Maps to error types
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ Explanation Engine  │  ← Generates friendly text
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│ UI Renderer         │  ← Displays in IDE
└─────────────────────┘
```

## Components

### 1. Error Capture (`errorCapture.ts`)

**Responsibility:** Listen to IDE diagnostic events and capture errors

**Key Functions:**

- `activate()` - Start listening to diagnostics
- `normalizeDiagnostic()` - Convert VS Code diagnostic to NormalizedError
- `detectLanguage()` - Identify programming language
- `extractErrorCode()` - Parse error codes

**Performance:** Real-time, event-driven

### 2. Error Classifier (`classifier.ts`)

**Responsibility:** Classify normalized errors into known types

**Classification Types:**

- NullOrUndefinedReference
- TypeMismatch
- UndeclaredIdentifier
- MissingImport
- SyntaxError
- AsyncAwaitIssue
- OutOfBounds

**Strategy:**

- Language-specific rules first
- Generic fallback patterns
- Regex-based matching
- Error code lookup

**Performance Target:** <10ms per classification

### 3. Explanation Engine (`explanationEngine.ts`)

**Responsibility:** Generate human-friendly explanations

**Process:**

1. Find matching template
2. Apply user configuration
3. Adjust verbosity
4. Return FriendlyExplanation

**Template Matching:**

- Filters by language + error type
- Checks error code patterns
- Checks message patterns
- Sorts by priority

**Performance Target:** <50ms per explanation

### 4. UI Renderer (`uiRenderer.ts`)

**Responsibility:** Display explanations in the IDE

**Formats:**

- Markdown (for hovers)
- Plain text (for output channel)
- Notifications (for commands)

**Design Principles:**

- Non-blocking
- Minimal UI footprint
- Original error always visible

### 5. Hover Provider (`hoverProvider.ts`)

**Responsibility:** Integrate with VS Code hover system

**Flow:**

1. User hovers over error
2. Get diagnostics at position
3. Normalize → Classify → Explain
4. Render as hover tooltip

**Performance:** Must return within VS Code's hover timeout (~100ms)

## Data Flow

### 1. Error Detection

```typescript
Diagnostic Event
  → ErrorCapture.handleDiagnosticsChange()
  → ErrorCapture.normalizeDiagnostic()
  → NormalizedError
```

### 2. Hover Interaction

```typescript
User Hover
  → HoverProvider.provideHover()
  → Get diagnostics at position
  → ErrorCapture.normalizeDiagnostic()
  → ErrorClassifier.classify()
  → ExplanationEngine.explain()
  → UIRenderer.formatAsMarkdown()
  → VS Code displays hover
```

### 3. Command Interaction

```typescript
User runs "Explain Error" command
  → Get diagnostic at cursor
  → Normalize → Classify → Explain
  → UIRenderer.showNotification()
  → Show in output channel
```

## Template System

### Template Structure

```typescript
interface ErrorTemplate {
    language: string;
    errorType: string | string[];
    errorCodePattern?: string; // Regex
    messagePattern?: string; // Regex
    template: FriendlyExplanation;
    priority?: number;
}
```

### Template Storage

- Organized by language: `templates/typescript.ts`, `templates/java.ts`
- Exported as arrays
- Aggregated in `templates/index.ts`

### Template Matching Algorithm

1. Filter by language
2. Filter by error type
3. Check error code pattern (if specified)
4. Check message pattern (if specified)
5. Sort by priority (descending)
6. Return first match

### Adding New Templates

1. Add to appropriate language file
2. Define all required fields
3. Set priority (10 = high, 5 = medium, 1 = low)
4. Test with real code examples

## Configuration

### User Settings

```typescript
interface CalmErrorsConfig {
    enableReassurance: boolean; // Show calm messages
    verbosity: "short" | "detailed"; // Detail level
    enabledLanguages: string[]; // Active languages
    experimentalAI: boolean; // Future feature
}
```

### Configuration Loading

- Loaded from VS Code workspace settings
- Real-time updates via `vscode.workspace.onDidChangeConfiguration`
- Per-workspace or global

## Performance Considerations

### Targets

- Classification: <10ms
- Explanation: <50ms
- Total (classify + explain): <100ms
- Hover display: within VS Code timeout

### Optimizations

1. **Caching** (future):
    - Cache explanations for same error
    - Cache by (language + errorType + errorCode)

2. **Lazy Loading**:
    - Templates loaded on first use per language
    - Classifier rules loaded per language

3. **Async Operations**:
    - Hover provider is async
    - No blocking operations

4. **Memory Management**:
    - Templates are static (loaded once)
    - No growing data structures
    - Disposables properly cleaned up

## Extensibility

### Adding New Languages

1. Create `templates/[language].ts`
2. Add classification rules to `classifier.ts`
3. Add to `enabledLanguages` default
4. Register hover provider for language

### Adding New Error Types

1. Define new errorType string
2. Add classification rules
3. Create template
4. Test with examples

### Future: Plugin API

```typescript
// Potential API for community extensions
calmerrors.registerTemplate(template);
calmerrors.registerClassifier(language, classifier);
calmerrors.registerExplanationProvider(provider);
```

## Testing Strategy

### Unit Tests

- Test each classifier function
- Test template matching
- Test configuration application
- Test normalization

### Integration Tests

- Test full pipeline: capture → classify → explain
- Test hover provider with mock diagnostics
- Test command execution

### Manual Testing

- Test with real code in each language
- Verify explanations make sense
- Check performance in large files
- Test configuration changes

## Privacy & Security

### Data Handling

- **No external calls** in MVP
- All processing local
- No code sent to servers
- No telemetry by default

### Future AI Mode (opt-in)

- Explicit user consent required
- Clear indication when AI is used
- Option to review before sending
- Configurable endpoints

## Error Handling

### Graceful Degradation

1. If template not found → show nothing
2. If classification fails → use "Unknown" type
3. If explanation fails → show original error only
4. Extension errors → logged, never crash IDE

### Logging

- Debug mode for development
- Error logs to output channel
- No PII in logs

## Future Architecture Considerations

### Phase 2 Features

- **Error History Panel**: WebView-based panel
- **AST Analysis**: For deeper context
- **Fix Suggestions**: Code action provider
- **Community Templates**: Remote template registry

### Scalability

- Current design supports 100+ languages
- Template system can hold 1000+ templates
- Classification engine is O(n) where n = templates for language
- Could optimize to O(1) with hash maps if needed

---

This architecture is designed to be:

- **Fast**: <100ms response time
- **Modular**: Easy to extend and test
- **Maintainable**: Clear separation of concerns
- **Privacy-first**: No external dependencies in MVP
- **Scalable**: Can grow to many languages and error types
