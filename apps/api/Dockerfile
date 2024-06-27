FROM node:20 AS build
WORKDIR /usr/src/app
COPY . .
RUN npm i
RUN npx nx run api:build:production
RUN ls /usr/src/app/dist/apps/api
RUN ls
FROM node:20-alpine as final
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist/apps/api /usr/src/app/dist/apps/api
ENTRYPOINT [ "node" , 'index.js' ]
