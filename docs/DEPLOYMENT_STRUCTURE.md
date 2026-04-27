# Deployment Cleanup and Structure Recommendations

## What was cleaned
- Removed runtime check text files from backend root.
- Removed local H2 database files from backend/data and data.
- Hardened root ignore rules for build artifacts, local DB files, runtime outputs, and env files.
- Switched backend default datasource config to environment-driven values (no committed credentials).

## Recommended folder structure

Use this layout to separate source code, runtime data, and deployment assets:

- backend/
  - src/
  - pom.xml
  - mvnw, mvnw.cmd
  - .env.example
- frontend/
  - src/
  - public/
  - package.json
  - .env.example
- deploy/
  - docker/
  - nginx/
  - scripts/
- docs/
  - DEPLOYMENT_STRUCTURE.md
  - API.md
- .gitignore
- README.md

## MVP architecture (applied where practical)

### Backend (Spring Boot)
- View: REST endpoints in controller package.
- Presenter: response composition in presentation package.
- Model/Business: service and repository packages.

Current MVP-aligned path highlights:
- backend/src/main/java/com/example/demo/controller/
- backend/src/main/java/com/example/demo/presentation/
- backend/src/main/java/com/example/demo/service/
- backend/src/main/java/com/example/demo/repository/

### Frontend (React)
- View: page and component files render UI only.
- Presenter: hooks in presenters package handle state, validation, and orchestration.
- Model: API service and browser storage.

Current MVP-aligned path highlights:
- frontend/src/pages/
- frontend/src/components/
- frontend/src/presenters/
- frontend/src/services/

## Suggested moves
- Move ephemeral files out of backend root:
  - login_check*.txt
  - profile_*_runtime.txt
- Keep local databases outside tracked source folders, e.g. runtime/ or docker volumes.
- Add deployment artifacts under deploy/ (Dockerfile(s), compose, reverse-proxy config).

## Next deployment hardening steps
- Add Dockerfiles for backend and frontend.
- Add CI pipeline to run backend tests and frontend build before deploy.
- Add health check endpoint monitoring (Spring actuator already included).
- Keep production secrets only in environment variables or a secret manager.
