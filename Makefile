# <app-name> referense can be found in angular.json

run-story-book:
	npx nx run <app-name>:storybook

build-story-book:
	npx nx run <app-name>:build-storybook

web-serve-cypress-vidoes:
	npx serve ./dist/cypress/

aotu-commit:
	git add . && git commit -m (string replace u-s- '#' (string replace task- '#' (string replace bug- '#' (git branch --show-current)))) && git push origin (git branch --show-current)

docker-build-main-app:
	docker build -t nx-main-app-image -f Dockerfile . && docker run --rm --name nx-main-app-container -p 8080:8080 nx-main-app-image