### STAGE 1: Build ###
FROM artifactory:5000/agents/agents-package:16 AS build
#ENV http_proxy="http://mswg.hq.corp.phoenix.co.il:8080"
#ENV https_proxy="http://mswg.hq.corp.phoenix.co.il:8080"
#RUN npm config set registry https://artifactory.hq.corp.phoenix.co.il:8443/artifactory/api/npm/npm/
#RUN npm config set _auth YXJ0aWZhY3RvcnlfamVua2luc191c2VyOkFQQjhEaGV1VTNLQ2RqUmJLeDN0RkU5OFJkSA==
#RUN npm config set strict-ssl false
#RUN apt-get update \
#    && apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
WORKDIR /usr/src/app
COPY . .
RUN npm run build:main-app

### STAGE 2: Serve ###
FROM artifactory:5000/nginx:1.17.1-alpine
# FROM nginx:1.17.1-alpine
COPY ../../nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/apps/main-app /usr/share/nginx/html
EXPOSE 8080
