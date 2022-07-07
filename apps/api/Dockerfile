FROM artifactory:5000/agents/agents-package AS build
WORKDIR /usr/src/app
COPY . .
RUN npx nx run api:build:production
RUN ls /usr/src/app/dist/apps/api
RUN ls
FROM artifactory:5000/node:16-alpine as final
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist/apps/api /usr/src/app/dist/apps/api
ENTRYPOINT [ "node" , 'index.js' ]