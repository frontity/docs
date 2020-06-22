# Creating a custom theme for Frontity

When you create a Frontity project most of the times you'll end up creating a custom theme:
- because you need some specific design and features for your project
- because you directly want to create a theme that can be reused by others (like [@frontity/mars-theme](https://www.npmjs.com/package/@frontity/mars-theme) or [@frontity/twentytwenty-theme](https://www.npmjs.com/package/@frontity/twentytwenty-theme))

Whatever the case is, you may want the community:
- to be able to check the code of your theme
- to be able to install it locally so it can be debugged → this will help the community to help you with any issue you may have with your project/theme
- to be able to install it as an NPM package (eventually) so it can be easily reused in some other projects

Here you have a few things to consider to ease contributions and support from the community to your theme

## A Frontity _theme_ project structure

In Frontity, _themes_ are packages that can be published in NPM so they can be installed and used in any other Frontity project

> You can find all the Frontity themes looking for the tag [`frontity-theme`](https://www.npmjs.com/search?q=keywords:frontity-theme) at npm

The suggested structure for developing new themes that works with frontity is the following one

```text
/my-frontity-project
|__ frontity.settings.js
|__ package.json
|__ /node_modules
|__ /packages
    |__ /my-theme
    |__ /my-custom-extension-1
    |__ /my-custom-extension-2
```

> This is the structure we recommend you to upload to your remote git repository (Github, Bitbucket or any other)

In  this structure, the theme you're developing is a local dependency of the main `package.json`

```
"dependencies": {
    "awesome-theme": "file:packages/awesome-theme"
  }
```

> This type of dependency is automatically defined if you create the package (theme) w/ the frontity command `npx frontity create-package awesome-theme`

This structure implies having a main Frontity project (root `package.json`) and some packages (each one with its own `package.json`) under the `packages` folder

```text
/my-frontity-project
...
|__ package.json
...
|__ /packages
    |__ /my-theme
    |__ /my-custom-extension-1
    |__ /my-custom-extension-2
```

So, to create a custom theme project we recommend you to:
1. Create a Frontity project → `npx frontity create awesome-theme-project`
1. Create a Frontity package (your theme) → `npx frontity create-package awesome-theme`

### [The Project](https://docs.frontity.org/learning-frontity/project)

These files in the root represents the Frontity project that can be launched and that will allow to see the _theme_ (or any other package) in action

In the *root folder* you'll find the following:

##### `frontity.setting.js`

A [`frontity.setting.js`](https://docs.frontity.org/learning-frontity/project#the-frontity-setting-js-file) file containing the settings for your project (among other settings you'll usually define the use of this theme)

For example: 
```
...
"packages": [
    {
      "name": "awesome-theme"
    },
...
```

##### `node_modules`

A  [`/node_modules/`](https://docs.frontity.org/learning-frontity/project#the-node_modules-folder) folder, where the dependencies of the project are installed

##### `packages`

A [`packages`](https://docs.frontity.org/learning-frontity/project#the-packages-folder) folder where your local packages live

##### `package.json`

And a [`package.json`](https://docs.frontity.org/learning-frontity/project#the-package-json-file) with the configuration & dependencies for the Frontity project. 

This `package.json` is used when you publish a package in NPM, but this Frontity project is not meant to be published

> Notice the `"private": true` preventing this package (the main Frontity project defined in the root) being published

### The Theme

With this structure you can develop your theme as a package inside the `packages` folder. 

Each one of these _packages_ will have its own `package.json` and these packages are the ones meant to be published (`npm publish`)

> In frontity you can create a new package by doing `npx frontity  create-package <my package name>` (from the root of the Frontity project)

### Why this structure?

This structure allows to:
- Launch the project using the theme locally
- Publish the theme independently 

So any developer can clone this project, launch the Frontity project locally, have a look at how the theme looks like & behave and make contributions (pull requests) to your repository (that can be eventually merged into the main repo).

And also, the owner of the theme still can publish those new updates independently (from the theme folder, `packages/awesome-theme` in this case)


## Example: Frontity Chakra Theme

Let's take [**Frontity Chakra Theme**](https://github.com/chakra-ui/frontity-chakra-ui-theme) as an example of a Frontity theme available:

- As [an NPM package](https://www.npmjs.com/package/frontity-chakra-theme) ready to be installed and used as a theme in any Frontity project 
- In a [GitHub repository](https://github.com/chakra-ui/frontity-chakra-ui-theme) ready to be cloned and launched locallly, and also ready to accept contributions from the community via Pull Requests

> If you want to know more about Pull Requests you can take a look at:
> - 📑 "Opening a pull request" | opensource.guide
> - 📺 How to Contribute to an Open Source Project on GitHub | egghead.io

### Clone and launch it locally

Once we [clone the theme](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) we can see the project  follows the structure of a typical frontity project

```text
/frontity-chakra-ui-theme
|__ frontity.settings.js
|__ package.json
...
|__ /packages
    |__ /frontity-chakra-theme

```

From the root of the project we can do 

```
npm install
```

This command will install the dependencies of the Frontity project and the dependencies of its dependencies, just as any other npm package

So, as Frontity Chakra Theme is also one of the dependencies ([a local dependency](https://www.viget.com/articles/how-to-use-local-unpublished-node-packages-as-project-dependencies/)) is: 

```
"dependencies": {
   ...
    "frontity-chakra-theme": "./packages/frontity-chakra-theme"
  }
```

All needed dependencies (the ones defined for the frontity project and the ones defined for the theme) are installed

>  More info about this → npm install <folder>: https://docs.npmjs.com/cli/install

Once we have all the dependencies installed you can do (from the root)

```
npx frontity dev
```

This will launch the Frontity project using this theme

## Publishing the theme

As we can see `frontity-chakra-theme` is published as [an NPM package](https://www.npmjs.com/package/frontity-chakra-theme)

```
> npm search frontity-chakra-theme
NAME                      | DESCRIPTION          | AUTHOR          | DATE       | VERSION  | KEYWORDS
frontity-chakra-theme     | A frontity theme…    | =segunadebayo   | 2020-01-28 | 0.0.2    | wordpress frontity frontity-theme frontity
```

How did [@segunadebayo](https://github.com/segunadebayo) published this theme once he finished it? Just by doing:

```
cd packages/frontity-chakra-theme
npm publish
```

> Take into account that there cannot be two packages with the same name (property `name` in your `package.json`) so if you try to publish a package that is already published you will get an error
