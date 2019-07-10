---
description: Guide to help you understand what is involved in a Frontity project
---

# Understanding a Frontity project

## What you get in a new Frontity project.

If you have followed our [quick start guide](../getting-started/quick-start-guide.md) you probably have already a new Frontity project. If not, run `npx frontity create <project-name>` and you'll get a project with the same structure as the one explained in this guide.

So, the important pieces that you get, once a project is created, are:

* A `package.json` file where the dependencies needed for your app to work are declared.
* A `frontity.settings.js` file where the basic setup for your app is already populated.
* A `packages` folder with `mars-theme` installed inside.

### The `package.json` file

The basic dependencies we'll need for our app to work are:

* **`frontity`** : this is the main package, where we can find all the methods we might need to use during development. It's also where the CLI lives.
* **`@frontity/core`** : here is where the magic happens. Core takes care of all the bundling, rendering, merging, transpiling, serving, etc. We don't need to access to it in order to develop a Frontity app.
* **`@frontity/wp-source`** : this package is the one that connects to the WordPress REST API of your site and fetches all the data needed on your Frontity theme.
* **`@frontity/tiny-router`** : this is a small package that handles `window.history` and helps us with the routing on `mars-theme`.
* **`@frontity/mars-theme`** : this is our starter theme, where we build our site with React.

As you can see, our `mars-theme` dependency has no version but a path. This is how we need to add our custom packages \(those we are developing inside the app\) to our `package.json` so they will be treated as if they were living in `node_modules`.

### The `frontity.settings.js` file

In this file we define our project settings. We also define the extensions needed to successfully run a Frontity app. You can learn more about this file in the [Settings reference](https://docs.frontity.org/learning-frontity/settings).

### The `packages` folder

In this folder is where we create all the custom extensions we want to develop for our site. Usually it will be a custom theme. In this case, the one installed by default is our `mars-theme`. Any changes done in these extensions during development will refresh our site automatically.

## How does everything work together

When starting `frontity`, all the packages defined in `frontity.settings.js` are imported by `@frontity/file-settings` and the settings and exports from each package are merged by `@frontity/core` into a single `store` where you can access the `state` and `actions` of the different packages during development using `@frontity/connect` \(our state manager\).



{% hint style="info" %}
Still any doubts? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

