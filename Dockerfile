FROM artifactory:5000/agents/agents-package
WORKDIR /usr/src/app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
#RUN ngx nx print-affected