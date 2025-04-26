#!/bin/bash

# Stage changes
git add src/middlewares/ErrorHandler.ts
git add src/middlewares/SecurityMiddleware.ts
git add package.json

# Create commit with detailed message
git commit -m "feat: Enhance system security and error handling

- Add comprehensive error handling middleware
- Implement security measures (rate limiting, XSS protection)
- Add process handling for graceful shutdown
- Update dependencies for security packages

Related: Priority 0 tasks - Security implementation"

# Push changes
git push origin development # or your branch name
