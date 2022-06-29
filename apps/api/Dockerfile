FROM artifactory:5000/node:16-alpine AS build
# FROM node:16-alpine AS build
WORKDIR /usr/src/app
#  TODO: use parent jenkins file dist
COPY ../dist<my-app> ./
ENTRYPOINT [ "node" , 'index.js' ]