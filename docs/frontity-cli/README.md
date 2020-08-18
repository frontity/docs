# 💻 Frontity CLI

The Frontity command-line tool (CLI\) is the main entry point for getting up and running with a Frontity application. It provides functionality like running a development server or building your Frontity application for deployment.

## How to use Frontity CLI

The Frontity CLI (Frontity commands\) is available via [npm](https://www.npmjs.com/package/frontity). You can run any Frontity command by doing `npx frontity <frontity-command>`

Run `npx frontity --help` for full help.

## Commands

The `frontity` commands you have available are

### Create commands

These commands will allow you to either create a Frontity project or a Frontity package

* [`create`](https://docs.frontity.org/frontity-cli/create-commands#create)
* [`create-package`](https://docs.frontity.org/frontity-cli/create-commands#create-package)

### Run commands

These commands will allow you run a Frontity project in development or production mode

* [`dev`](https://docs.frontity.org/frontity-cli/run-commands#dev)
* [`serve`](https://docs.frontity.org/frontity-cli/run-commands#serve)

### Build commands

These commands will allow you generate the code that can be used to run or analyze a Frontity project

* [`build`](https://docs.frontity.org/frontity-cli/build-commands#build)

### Extra commands

* [`subscribe`](https://docs.frontity.org/frontity-cli/extra-commands#subscribe)
* [`info`](https://docs.frontity.org/frontity-cli/extra-commands#info)

> You can also use `--help` with each one of these commands to get more info about them: `npx frontity dev --help`

## A typical workflow with Frontity commands

### In Development

1. Create a Frontity project: `npx frontity create my-cool-project`
2. Add a custom theme (package\): `npx frontity create-package my-custom-theme`
3. Launch a development server: `npx frontity dev`

### In Production

1. Generate a build of our project: `npx frontity build`
2. Launch our project in production using the build generated before: `npx frontity serve`

