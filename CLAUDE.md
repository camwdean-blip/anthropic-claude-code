# Claude Code - Project Instructions for AI Assistants

> This file provides context for AI assistants working on the Claude Code project.

## Project Overview

Claude Code is Anthropic's official agentic coding tool that lives in the terminal. It helps developers:
- Execute routine coding tasks through natural language commands
- Understand and explain complex codebases
- Handle git workflows and pull requests
- Debug issues and fix bugs
- Write and run tests

**Key Links:**
- Documentation: https://code.claude.com/docs/en/overview
- Repository: https://github.com/anthropics/claude-code
- Issues: https://github.com/anthropics/claude-code/issues

## Directory Structure

```
claude-code/
├── .claude/                 # Claude Code configuration
│   ├── commands/           # Custom slash commands
│   ├── agents/             # Subagent definitions
│   ├── rules/              # Modular rule files
│   └── settings.json       # Project settings
├── .claude-plugin/         # Plugin configuration
├── .devcontainer/          # Development container setup
├── .github/                # GitHub workflows and actions
├── .vscode/                # VS Code workspace settings
├── Script/                 # Build and utility scripts
├── examples/               # Usage examples and demos
├── plugins/                # Extensible plugin system
├── scripts/                # Automation scripts
├── CHANGELOG.md            # Version history
├── LICENSE.md              # License information
├── README.md               # Project documentation
└── SECURITY.md             # Security policy
```

## Technology Stack

- **Primary Languages:** Shell (48.2%), Python (32.7%), TypeScript (12.5%), PowerShell (4.5%)
- **Runtime:** Node.js 18+
- **Package Management:** npm
- **Testing:** Project-specific test suites

## Development Setup

### Prerequisites
- Node.js 18 or later
- Git
- A Claude subscription (Pro, Max, Teams, or Enterprise) or Claude Console account

### Installation Methods

**Native Install (Recommended):**
```bash
# macOS/Linux/WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
```

**Homebrew:**
```bash
brew install --cask claude-code
```

**WinGet:**
```bash
winget install Anthropic.ClaudeCode
```

### Development Container
Use the `.devcontainer/` configuration for a consistent development environment.

## Common Commands

### Running Claude Code
```bash
# Start interactive REPL
claude

# Start with initial prompt
claude "explain this project"

# Non-interactive query
claude -p "analyze this function"

# Continue most recent conversation
claude -c

# Resume specific session
claude -r "session-name" "continue working"
```

### Useful CLI Flags
- `--model sonnet|opus` - Specify model
- `--permission-mode plan` - Start in read-only plan mode
- `--verbose` - Enable detailed logging
- `--output-format json|text|stream-json` - Control output format
- `--add-dir <path>` - Add additional working directories

### Slash Commands
- `/help` - Get help
- `/init` - Initialize CLAUDE.md for a project
- `/memory` - Edit memory files
- `/config` - View/edit configuration
- `/agents` - View available subagents
- `/resume` - Resume a previous session
- `/bug` - Report an issue

## Code Conventions

### File Naming
- Use kebab-case for file names: `my-component.ts`
- Use PascalCase for class files: `MyClass.ts`
- Configuration files: lowercase with dots: `settings.json`, `.mcp.json`

### Code Style
- Follow existing patterns in the codebase
- Use TypeScript strict mode where applicable
- Include JSDoc comments for public APIs
- Write meaningful variable and function names

### Git Workflow
1. Create feature branches from main
2. Use descriptive commit messages
3. Create PRs for review before merging
4. Follow conventional commit format when appropriate

## Configuration Files

### Memory Hierarchy (precedence order)
1. **Managed policy** - Organization-wide (`/etc/claude-code/CLAUDE.md`)
2. **Project memory** - Team-shared (`./CLAUDE.md` or `./.claude/CLAUDE.md`)
3. **Project rules** - Modular rules (`./.claude/rules/*.md`)
4. **User memory** - Personal preferences (`~/.claude/CLAUDE.md`)
5. **Project local** - Personal project-specific (`./CLAUDE.local.md`)

### Settings Files
- `.claude/settings.json` - Project settings (committed)
- `.claude/settings.local.json` - Personal overrides (gitignored)
- `~/.claude/settings.json` - User settings
- `.mcp.json` - MCP server configuration

### CLAUDE.md Imports
Import other files using `@path/to/file` syntax:
```markdown
See @README for project overview.
Git workflow: @docs/git-instructions.md
```

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test.ts

# Run with coverage
npm run test:coverage
```

### Writing Tests
- Place tests near the code they test or in a `__tests__` directory
- Follow existing test patterns in the project
- Include tests for edge cases and error conditions

## Security Considerations

- Never commit sensitive files (`.env`, credentials, API keys)
- Review generated code for security vulnerabilities
- Follow OWASP guidelines for web-related code
- Use `.claude/settings.json` to deny access to sensitive files:
```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  }
}
```

## Working with Subagents

### Available Subagents
- **code-reviewer** - Reviews code for quality and security
- **debugger** - Analyzes errors and identifies root causes
- **Explore** - Fast codebase exploration
- **Plan** - Architecture and implementation planning

### Creating Custom Subagents
Place subagent definitions in `.claude/agents/`:
```yaml
# .claude/agents/my-agent.md
---
description: "Description for when to use this agent"
tools:
  - Read
  - Grep
  - Glob
---

You are a specialized agent for [task]. Focus on [specific behaviors].
```

## MCP (Model Context Protocol)

Configure MCP servers in `.mcp.json` for external integrations:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}
```

## Troubleshooting

### Common Issues
- **Permission errors:** Check `.claude/settings.json` permissions
- **MCP connection issues:** Verify server configuration in `.mcp.json`
- **Session resumption:** Use `claude --resume` to pick from available sessions

### Debug Mode
```bash
claude --debug "api,mcp"
claude --verbose
```

### Getting Help
- Use `/help` command in Claude Code
- Check documentation: https://code.claude.com/docs
- Report bugs: `/bug` command or GitHub issues

## Best Practices for AI Assistants

### When Working on This Codebase
1. **Read before modifying** - Always read files before suggesting changes
2. **Understand context** - Explore related files to understand patterns
3. **Follow existing conventions** - Match the style of surrounding code
4. **Test changes** - Run tests after making modifications
5. **Keep changes minimal** - Only change what's necessary for the task

### Code Quality
- Avoid introducing security vulnerabilities
- Don't over-engineer solutions
- Keep changes focused and simple
- Don't add unnecessary features or abstractions

### Git Operations
- Create descriptive commit messages
- Don't commit sensitive files
- Create new commits rather than amending unless requested
- Stage specific files rather than using `git add -A`

### Documentation
- Update documentation when changing behavior
- Don't create unnecessary documentation files
- Keep comments minimal but meaningful

## Additional Resources

- [Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Agent SDK Documentation](https://platform.claude.com/docs/en/agent-sdk/overview)
- [MCP Documentation](https://code.claude.com/docs/en/mcp)
- [Security Guidelines](https://code.claude.com/docs/en/security)
