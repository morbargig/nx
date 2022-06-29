# TODO: check if add lastest alpine
FROM artifactory:5000/nginx:1.17.1-alpine
# FROM nginx:1.17.1-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
#  TODO: use parent jenkins file dist
COPY ../dist<app-name> /usr/share/nginx/html
EXPOSE 8080