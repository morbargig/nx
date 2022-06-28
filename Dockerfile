### STAGE 1: Build ###
FROM artifactory:5000/node:16-alpine AS build
# FROM node:16-alpine AS build
ENV http_proxy="http://mswg.hq.corp.phoenix.co.il:8080"
ENV https_proxy="http://mswg.hq.corp.phoenix.co.il:8080"
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci
ENV http_proxy=""
ENV https_proxy=""
COPY . .
RUN npm run build:main-app

### STAGE 2: Serve ###
FROM artifactory:5000/nginx:1.17.1-alpine
# FROM nginx:1.17.1-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/apps/main-app /usr/share/nginx/html
EXPOSE 8080