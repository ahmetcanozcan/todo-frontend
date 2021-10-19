# client

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
## Deployment

Deployment is automated using GitHub actions. whenever a push comes to the `master` branch, It triggers a GitHub action. that action build project a container and runs all tests. if tests are not failed, Create a docker image and deploy this image into the Heroku container registry, after that Heroku deploys this image as a running container


## Development Process
- Create a single page web app using `vue` cli
- Write unit test for `TodoList` component using jest for testing UI elements exists and visible.
- Implement UI parts to satisfy the first tests
- Write unit tests for business logic
- Create contract and write consumer driven contract tests
- Write consumer client and satisfy consumer drivern contract tests
- Write acceptance test using TestCafe
- Create mock server using contract and pact.io
- Use mock server on unit and acceptance tests
- Implement business logic of the UI component that satisfy unit tests and acceptance tests 
- Create multi-stage Dockerfile
- Create CI/CD pipeline

