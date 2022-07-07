### STAGE 1: Build ###
FROM artifactory:5000/node:16-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
#RUN ngx nx print-affected