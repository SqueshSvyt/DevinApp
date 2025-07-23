# UI Generation Rules

This document outlines the high-level rules and patterns for generating UI components and pages based on the analysis of prompts from the component_generation and page_generation folders.

## 1. Component Generation Rules

### 1.1 Architecture & Organization
- **Feature-Based Structure**: Components are organized in a feature-based architecture with clear separation of concerns
- **File Organization**: Each component must be split into at least 4 files:
  - `index.ts` - Barrel export
  - `ComponentName.tsx` - Main component
  - `styles.ts` - Styled components
  - `types.ts` - TypeScript interfaces

### 1.2 Technology Stack
- **React + TypeScript**: All components use React with TypeScript for type safety
- **Styling**: Use styled-components (preferred) or @emotion/styled for CSS-in-JS
- **Charts**: Use Chart.js via react-chartjs-2 for data visualization
- **Material UI**: Use MUI for base components, override with custom styles as needed
- **Tailwind CSS**: Use for custom styling alongside styled-components

### 1.3 Naming Conventions
- **Components**: PascalCase with structured hierarchy (Component/Type/State)
- **Variables**: camelCase for functions and variables
- **Constants**: UPPER_CASE for constants
- **Descriptive Names**: Never use generic names like "Group 45" or "Rectangle 123"
- **State Naming**: Always define interaction states (Default, Hover, Active, Focused, Disabled)

### 1.4 Design Fidelity
- **Pixel-Perfect**: Components must exactly replicate the design reference
- **Responsive Design**: Implement responsive behavior with proper breakpoints
- **Visual Consistency**: Maintain consistent spacing, typography, and color schemes
- **Reusability**: Extract atomic components that can be reused across the application

## 2. Backend Integration Rules

### 2.1 API Service Layer
- **Service Abstraction**: All backend communication goes through dedicated service classes
- **CRUD Operations**: Implement Create, Read, Update, Delete operations for all entities
- **Error Handling**: Comprehensive error handling with proper HTTP status codes
- **Async/Await**: Use async/await for all asynchronous operations

### 2.2 Database & Migration
- **Alembic Migrations**: Use Alembic for database schema management (preferred over create_all)
- **Model Relationships**: Ensure foreign key constraints match model relationships
- **Data Validation**: Implement proper validation at both Pydantic and database levels
- **Seeding System**: Create comprehensive test data seeding for all entities

### 2.3 Quality Assurance
- **Testing**: Comprehensive test coverage for all endpoints and operations
- **Code Quality**: Pylint score must be >= 7.5
- **Security**: No hardcoded credentials, use environment variables
- **Documentation**: JSDoc for all components and APIs

## 3. Configuration & Environment

### 3.1 Development Setup
- **CORS Configuration**: Proper CORS setup to prevent cross-origin issues
- **Proxy Configuration**: Use Vite proxy for development API calls
- **Environment Variables**: All configuration must use .env files
- **Relative URLs**: Use relative URLs for API calls in development

### 3.2 Build & Deployment
- **Build Success**: Ensure `npm install` and `npm run build` complete successfully
- **Linting**: Zero ESLint errors expected
- **Type Checking**: All TypeScript types must be properly defined
- **Production Ready**: Code must be production-ready with proper error handling

## 4. Documentation & Maintenance

### 4.1 Documentation Requirements
- **Component Documentation**: JSDoc for all components with usage examples
- **API Documentation**: Comprehensive API documentation with examples
- **Setup Instructions**: Clear setup and deployment instructions
- **Troubleshooting**: Common issues and solutions documented

### 4.2 Code Standards
- **Consistent Formatting**: Use Prettier for code formatting
- **Modern JavaScript**: Use ES6+ syntax throughout
- **TypeScript**: Avoid using `any` type
- **Best Practices**: Follow React and TypeScript best practices

## 5. Error Handling & Logging

### 5.1 Error Management
- **Global Exception Handlers**: Implement global error handling
- **Custom Exceptions**: Create custom exception classes for specific errors
- **Graceful Degradation**: Handle errors gracefully without breaking the UI
- **User Feedback**: Provide meaningful error messages to users

### 5.2 Logging & Monitoring
- **Structured Logging**: Use structured logging throughout the application
- **Request/Response Logging**: Log API requests and responses
- **Performance Monitoring**: Monitor application performance and response times
- **Error Tracking**: Track and monitor errors in production

## 6. Performance Optimization

### 6.1 Frontend Performance
- **Component Memoization**: Use React.memo and useMemo for expensive operations
- **Code Splitting**: Implement code splitting for large applications
- **Lazy Loading**: Use lazy loading for components and images
- **Bundle Optimization**: Optimize bundle size and loading times

### 6.2 Backend Performance
- **Database Optimization**: Use proper indexing and query optimization
- **Caching**: Implement caching strategies where appropriate
- **Connection Pooling**: Use connection pooling for database connections
- **Load Testing**: Test performance under various load conditions

## 7. Security Best Practices

### 7.1 Frontend Security
- **Input Validation**: Validate all user inputs
- **XSS Prevention**: Prevent cross-site scripting attacks
- **CSRF Protection**: Implement CSRF protection where needed
- **Secure Authentication**: Use secure authentication methods

### 7.2 Backend Security
- **SQL Injection Prevention**: Use parameterized queries
- **Authentication**: Implement proper authentication and authorization
- **Data Encryption**: Encrypt sensitive data
- **Security Scanning**: Regular security vulnerability scanning