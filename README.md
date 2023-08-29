# Nx App

### infrestrector code for nx workspace and angular infrestrector libs and more

- <app-name> refer to app or lib (app/lib names can be found in workspace.json)

## install

### to install all mono repo apps dependencies

`npm i`

#### if there are issues try with npm proxy

```
npm config delete proxy
npm config delete https-proxy
```

### you can also try clean the project by

#### cleanup the project folder from node_module etc.

```
npm run clean
```

#### cleanup npm cache.

```
npm run clean:npm
```

## install VSC extensions

1. open extensions tab
2. type @recommended
3. install all result

[VSC workspace recommended extensions docs](https://code.visualstudio.com/docs/editor/extension-marketplace#_extensions-view-filters)

## run workspace in docker with VSC (docker desktop must be installed)

1. after install all recommended extensions in last section [install VSC extensions](#install-vsc-extensions)
2. <kbd>control</kbd> + <kbd>shift</kbd> + <kbd>p</kbd>
3. start type `Dev Containers: Reopen in Container` and select (that it the folder will reopen in docker with access to it terminal)
4. run any nx workspace command such as [nx workspace command](#nx-workspace-command)

[Dev Containers Extension Docs](https://code.visualstudio.com/docs/devcontainers/containers)

## Dev Example

Front - Main App
`npx nx run main-app:serve`

BFF
`npx nx run api:serve`

## nx workspace command

[refer to nx command docs](https://nx.dev/reference/commands)

## serve

#### serve default app

`npx nx serve`

### serve app

`npx nx run <app-name>:serve`

## test

#### test default app

`npx nx test`

### test app

`npx nx run <app-name>:test`

## test (\*watch)

`npx nx run <app-name>:test --watch`

## lint

#### lint default app

`npx nx lint`

### lint app

`npx nx run <app-name>:lint`

## build

#### build default app

`npx nx build`

#### build app

`npx nx run <app-name>:build`

## storybook

#### serve the storybook of some app or lib if any

`npx nx run <app-name>:storybook`

## build storybook

#### build the storybook of some app or lib if any

`npx nx run <app-name>:build-storybook`

## graph

#### show project dependencies and explore them via ui

`npx nx graph`

## migrate

#### update nx and all supported nx plugins and dependencies

`npx nx migrate latest`

## Mono-Repo structure

### Project base tree

```bash
Jenkins
   |-- Jenkinsfile
   |-- jenkins.dio
Makefile
README.md
apps
   |-- api
   |   |-- Dockerfile
   |   |-- Jenkins
   |-- main-app
   |   |-- Dockerfile
   |   |-- Jenkins
libs
   |-- api-interfaces
   |-- front
   |   |-- dynamic-forms
   |   |-- dynamic-table
   |   |-- base-client
   |   |-- ui-standalone-components


nx.json
package.json
workspace.json
```

# CI-CD
// TODO: update url
<br>
<a href="https://app.diagrams.net/#Hmorbargig%2Fnx%2Fmain%2FJenkins%2FJenkins.drawio.svg" target="_blank" >Edit</a>
![Diagram](https://github.com/morbargig/nx/blob/main/Jenkins/jenkins.drawio.svg)

# FnxNx

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nx/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nx/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nx/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `ng g @nx/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nx/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@fnx-nx/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
