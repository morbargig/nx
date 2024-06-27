# <app-name> referense can be found in angular.json

run-story-book:
	npx nx run <app-name>:storybook

build-story-book:
	npx nx run <app-name>:build-storybook

web-serve-cypress-vidoes:
	npx serve ./dist/cypress/

aotu-commit:
	git add . && git commit -m (string replace u-s- '#' (string replace task- '#' (string replace bug- '#' (git branch --show-current)))) && git push origin (git branch --show-current)

docker-build-nx-app:
	docker build -t nx-<app-name>-image -f <Dockerfile-path> . && docker run --rm --name nx-<app-name>-container -p 8080:8080 nx-<app-name>-image
docker-build-main-app:
	docker build -t nx-main-app-image -f Dockerfile . && docker run --rm --name nx-main-app-container -p 8080:8080 nx-main-app-image

# commit changes and push to origin branch
auto-commit:
	`git add . ; git commit -am  "$( "$( "$( "$( "$(git rev-parse --abbrev-ref HEAD)" -replace 'u-s-','#')" -replace 'bug-','#')" -replace 'task-','#')" -replace 'hotfix-','#')" ; git push origin $(git rev-parse --abbrev-ref HEAD)`

# pull cuurent branch
pull:
	`git pull origin $(git rev-parse --abbrev-ref HEAD)`

# push cuurent branch
push:
	`git push origin $(git rev-parse --abbrev-ref HEAD)`

# remove all merges branches (excpt current branch)
remove-branches:
	`git for-each-ref --format '%(refname:short)' refs/heads | ForEach-Object {git branch $_ -d}`

# remove all branches (excpt current branch)
remove-local-branches:
	`git for-each-ref --format '%(refname:short)' refs/heads | ForEach-Object {git branch $_ -D}`

# clone singale btanch
clone-develop:
	`git clone --single-branch --branch develop <remote>`

kill-json-server:
	`Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force`

kill-angular:
	`Stop-Process -Id (Get-NetTCPConnection -LocalPort 4200).OwningProcess -Force`

show-conflicts:
	`git diff --name-only --diff-filter=U`

uncommit:
	`git reset --soft HEAD^1`

checkout-remote-branch:
	`git fetch origin <remote_branch>:<local_branch_name>`

vsc-extansions-export:
	`code --list-extensions | % { "code --install-extension $_" }`

# ignore some file chnages locally only / in the repo those file will act differently.
skip-worktree:
	git update-index --skip-worktree <filename>

# git add . && git commit -m (string replace u-s- '#' (string replace task- '#' (string replace bug- '#' (git branch --show-current)))) && git push origin (git branch --show-current)
