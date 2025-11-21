# AGENTS.md

## Build, Lint, and Test Commands

- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Test**: No test files were found. Add test files to enable testing.

## Code Style Guidelines

### Imports
- Use absolute imports for clarity.
- Group imports by libraries, utilities, and components.

### Formatting
- Follow Prettier defaults:
  - 2-space indentation
  - Single quotes
  - Trailing commas

### Types
- Use TypeScript for type safety.
- Prefer `interface` over `type` for object shapes.

### Naming
- Use PascalCase for components.
- Use camelCase for variables.
- Use SCREAMING_SNAKE_CASE for constants.

### Error Handling
- Use `try-catch` blocks for async operations.
- Log errors for debugging.