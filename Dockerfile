FROM node:20
WORKDIR /usr/src/app
COPY package.json  .npmrc ./
RUN npm install
