# Contributing to Wanderly Nepal

Thank you for your interest in contributing to Wanderly Nepal! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

1. **Check existing issues** first to avoid duplicates
2. **Use clear, descriptive titles** for new issues
3. **Provide detailed descriptions** including:
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Browser and device information

### Suggesting Features

1. **Open a feature request** issue
2. **Explain the use case** and how it benefits users
3. **Provide mockups or examples** if possible
4. **Discuss implementation approaches** if you have ideas

### Code Contributions

#### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/[your-username]/travel-App.git
   cd travel-App
   ```

2. **Set up development environment**
   ```bash
   npm install
   cp .env.example .env.local
   npm run dev
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Guidelines

##### Code Style

- **TypeScript**: Use strict TypeScript with proper type definitions
- **Components**: Follow functional component patterns with hooks
- **Naming**: Use descriptive, self-documenting names
- **File Structure**: Organize files logically and consistently

##### Component Standards

```tsx
// ✅ Good: Clear component with proper TypeScript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false 
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
}
```

##### Accessibility Requirements

- **Semantic HTML**: Use proper HTML elements
- **ARIA labels**: Add appropriate ARIA attributes
- **Keyboard navigation**: Ensure all interactive elements are keyboard accessible
- **Color contrast**: Maintain WCAG AA standards
- **Focus management**: Provide clear focus indicators

#### Testing Your Changes

1. **Run type checking**
   ```bash
   npm run type-check
   ```

2. **Run linting**
   ```bash
   npm run lint
   npm run lint:fix  # Auto-fix issues
   ```

3. **Test in multiple browsers**
   - Chrome/Chromium
   - Firefox
   - Safari (if on macOS)
   - Edge

4. **Test responsive design**
   - Mobile (320px+)
   - Tablet (768px+)
   - Desktop (1024px+)

#### Commit Guidelines

Follow conventional commit format:

```bash
# Format: type(scope): description
feat(homepage): add destination search functionality
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
```

**Types:**
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style/formatting
- `refactor`: Code refactoring

## 📋 Project Standards

### Visual Consistency

- **Color Palette**: Use defined color variables from `globals.css`
- **Typography**: Follow established font sizes and weights
- **Spacing**: Use consistent spacing scale (4, 6, 8, 12, 16, 24px)

### Component Design

- **Reusability**: Create components that can be reused across the app
- **Props Interface**: Design clear, intuitive prop interfaces
- **Default Values**: Provide sensible defaults for optional props

## 📞 Getting Help

- **Issues**: Use GitHub issues for technical questions
- **Discussions**: Use GitHub discussions for general questions

Thank you for contributing to Wanderly Nepal! 🏔️
- Follow existing code formatting (Prettier configuration)
- Use meaningful variable and function names
- Add comments for complex logic

### Commit Messages
Follow conventional commit format:
```
type(scope): description

Examples:
feat(auth): add user registration
fix(ui): resolve mobile navigation issue
docs(readme): update installation instructions
```

### Pull Request Process
1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass: `npm run test`
4. Make sure build passes: `npm run build`
5. Update the README.md with details of changes if applicable

## 🐛 Bug Reports

When filing an issue, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

## 💡 Feature Requests

Feature requests are welcome! Please:
- Check if the feature already exists
- Provide clear use case and motivation
- Consider implementation complexity
- Be open to discussion and feedback

## 📝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## 🔧 Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## 📞 Questions?

Feel free to reach out by:
- Opening a GitHub Discussion
- Creating an issue with the "question" label
- Contacting the maintainers

Thank you for contributing! 🙏
