FROM artifactory:5000/agents/agents-package
WORKDIR /usr/src/app
COPY package.json  .npmrc ./
RUN npm install
RUN cat package-lock.json
#RUN ngx nx print-affected