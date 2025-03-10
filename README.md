# Nx App

### infrastructures code for nx workspace and angular infrastructures libs and more

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

![Diagram](https://github.com/morbargig/nx/blob/main/Jenkins/Jenkins.drawio.svg)
<br>
<a href="https://app.diagrams.net/#Hmorbargig%2Fnx%2Fmain%2FJenkins%2FJenkins.drawio.svg" target="_blank" >Edit</a>

# softbar

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

[Interactive Tutorial](https://nx.dev/tutorial/01-create-application)

## ☁ Nx Cloud

Nx Cloud enables faster builds and tests by caching computations.

[Learn More](https://nx.app/)

