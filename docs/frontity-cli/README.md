# 💻 Frontity CLI

The Frontity command-line tool \(CLI\) is the main entry point for getting up and running with a Frontity application. It provides functionality like running a development server or building your Frontity application for deployment.

## How to use Frontity CLI

The Frontity CLI \(Frontity commands\) is available via [npm](https://www.npmjs.com/package/frontity). You can run any Frontity command by doing `npx frontity <frontity-command>`

Run `npx frontity --help` for full help.

## Commands

The `frontity` commands you have available are

#### Create commands

These commands will allow you to either create a Frontity project or a Frontity package

* [`create`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/create-commands/README.md#create)
* [`create-package`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/create-commands/README.md#create-package)

#### Run commands

These commands will allow you run a Frontity project in development or production mode

* [`dev`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/run-commands/README.md#dev)
* [`serve`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/run-commands/README.md#serve)

#### Build commands

These commands will allow you generate the code that can be used to run or analyze a Frontity project

* [`build`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/run-commands/README.md#build)

#### Extra commands

* [`subscribe`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/extra-commands/README.md#subscribe.md)
* [`info`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/extra-commands/README.md#info)

> You can also use `--help` with each one of these commands to get more info about them: `npx frontity dev --help`

### A typical workflow with Frontity commands

#### In Development

1. Create a Frontity project: `npx frontity create my-cool-project`
2. Add a custom theme \(package\): `npx frontity create-package my-custom-theme`
3. Launch a development server: `npx frontity dev`

#### In Production

1. Generate a build of our project: `npx frontity build`
2. Launch our project in production using the build generated before: `npx frontity serve`

