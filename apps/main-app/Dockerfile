### STAGE 1: Build ###
ARG featureBranch=""
FROM artifactory:5000/agents/agents-package AS build
WORKDIR /usr/src/app
COPY . .

# # Clenup
# RUN npm run clean
# RUN npm i
# Lint
RUN npx nx run main-app:lint
# Test
RUN npx nx run main-app:test
# Build
RUN npx nx run main-app:build:production

### STAGE 2: Serve ###
FROM artifactory:5000/nginx:1.23-alpine
# FROM nginx-alpine
COPY apps/main-app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/apps/main-app /usr/share/nginx/html
EXPOSE 8080
