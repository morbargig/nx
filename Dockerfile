# From base image node
FROM artifactory.hq.corp.phoenix.co.il:5000/node:16-alpine
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# set proxy
ENV http_proxy="http://mswg.hq.corp.phoenix.co.il:8080"
ENV https_proxy="http://mswg.hq.corp.phoenix.co.il:8080"
# Copying all the files from your file system to container file system
COPY package.json .
# Install all dependencies
RUN npm install
# Copy other files too
COPY ./ .
# unset proxy
ENV http_proxy=""
ENV https_proxy=""
# Expose the port
EXPOSE 8080
# Command to run app when intantiate an image
CMD ["npm","start"]