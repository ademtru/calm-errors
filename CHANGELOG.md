# CalmErrors - Changelog

All notable changes to the "calmerrors" extension will be documented in this file.

## [0.1.0] - 2026-01-31

### Added

- Initial release of CalmErrors
- Hover provider for friendly error explanations
- Support for TypeScript/JavaScript errors
- Support for Java errors
- Rule-based error classification engine
- Explanation templates for common errors:
    - Null/Undefined references
    - Type mismatches
    - Missing imports
    - Undeclared identifiers
    - Syntax errors
    - Async/Promise issues (TypeScript)
    - Array out of bounds (Java)
- Configuration options:
    - Toggle emotional reassurance
    - Adjust verbosity (short/detailed)
    - Enable/disable per language
- Commands:
    - "Explain This Error" command
    - "Toggle Emotional Reassurance" command
- Offline-first, privacy-respecting design
- Comprehensive documentation

### Technical

- TypeScript-based VS Code extension
- Modular architecture (capture, classify, explain, render)
- Extensible template system
- Performance optimized (<50ms explanation generation)

## [Unreleased]

### Planned

- Python language support
- Error history panel
- Community-contributed explanations
- AST-aware suggestions
- Optional AI-assisted mode (opt-in)
