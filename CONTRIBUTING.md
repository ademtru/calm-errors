# Contributing to CalmErrors

Thank you for your interest in contributing to CalmErrors! We're building a tool to make developers' lives better, and we'd love your help.

## 🎯 Ways to Contribute

### 1. Add New Error Templates

The easiest way to contribute is by adding explanations for more error types.

**Where:** `src/templates/[language].ts`

**Example:**

```typescript
{
  language: 'typescript',
  errorType: 'NewErrorType',
  errorCodePattern: 'TS1234',
  priority: 10,
  template: {
    title: "Clear, calm title",
    calmMessage: "Reassuring message",
    explanation: "Plain-English explanation",
    likelyCauses: [
      "First possible cause",
      "Second possible cause"
    ],
    nextSteps: [
      "First action to try",
      "Second action to try"
    ],
    confidence: 0.9
  }
}
```

**Guidelines for writing templates:**

- Use calm, supportive language
- Never be condescending or patronizing
- Explain the "why" not just the "what"
- Provide actionable steps
- Keep it concise but complete

### 2. Support New Languages

Want to add Python, Go, Rust, or another language?

**Steps:**

1. Create a new template file: `src/templates/[language].ts`
2. Add classification rules in `src/classifier.ts`
3. Add language to default config in `package.json`
4. Test with real code examples
5. Update README with supported errors

### 3. Improve Existing Explanations

Found an explanation that's unclear or could be better?

1. Edit the template in `src/templates/`
2. Test the change
3. Submit a PR with before/after examples

### 4. Report Issues

Found a bug or an error that's not explained well?

[Open an issue](https://github.com/calmerrors/calmerrors/issues) with:

- The error message (original)
- What language you're using
- What explanation you got (if any)
- What you expected

## 🛠️ Development Setup

```bash
# Clone the repo
git clone https://github.com/calmerrors/calmerrors.git
cd calmerrors

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch mode (auto-recompile on changes)
npm run watch

# Run extension in VS Code
# Press F5 in VS Code to open Extension Development Host
```

## 🧪 Testing

Before submitting a PR:

1. **Test your changes manually**
    - Open a file with the error type you're addressing
    - Hover over the error
    - Verify the explanation shows correctly

2. **Check TypeScript compilation**

    ```bash
    npm run compile
    ```

3. **Run linting**

    ```bash
    npm run lint
    ```

4. **Test in multiple scenarios**
    - Different error contexts
    - With reassurance enabled/disabled
    - In short and detailed verbosity modes

## 📝 Code Style

- Use TypeScript strict mode
- Follow existing code structure
- Add comments for complex logic
- Keep functions focused and small
- Use meaningful variable names

## 🎨 Writing Guidelines

When writing error explanations:

### ✅ Do:

- Use "you" language (second person)
- Be specific about what's happening
- Provide concrete examples
- Explain the underlying concept
- Offer multiple solutions
- Acknowledge that errors are normal

### ❌ Don't:

- Use jargon without explanation
- Be condescending ("You just need to...")
- Blame the developer
- Make assumptions about skill level
- Use overly casual language or excessive emojis
- Hide or sugarcoat technical details

### Tone Examples:

**Good:**

> "You're trying to access a property on null. This happens when a variable hasn't been initialized yet."

**Too harsh:**

> "Error: You accessed a null value. Fix it."

**Too casual:**

> "Oopsie! Looks like you got a null thingy! 😅"

**Too patronizing:**

> "Don't worry, even senior developers make this simple mistake!"

## 🔄 Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add explanation for Python TypeError'`)
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

**PR Description should include:**

- What you changed and why
- What error types are affected
- Screenshots if UI changed
- Testing you performed

## 🤔 Questions?

Not sure about something? Have an idea you want to discuss first?

- Open a [discussion](https://github.com/calmerrors/calmerrors/discussions)
- Comment on an existing issue
- Reach out to maintainers

## 📜 Code of Conduct

Be kind, respectful, and constructive. We're all here to make development better for everyone.

## 🙏 Thank You!

Every contribution, no matter how small, makes CalmErrors better for developers everywhere. Thank you for being part of this!

---

**Happy Contributing! 🎉**
