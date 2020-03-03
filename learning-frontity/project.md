# 1. Project

The first thing you need to understand about Frontity is that all the code lives inside packages. There is no "app code" per se, like in other frameworks. Your final site is the combination of all your packages.

For those of you coming from WordPress, that's no surprise. All the WordPress code \(except the core\) is contained in either the theme or the plugins. If you come from React, this may be less intuitive, but it just means that the files of your project are always inside a **package**, either your theme or any other extension. 

At this point, it is important to understand and differentiate between two types of packages:

* **Core packages**:  – `frontity` and `@frontity/core` These packages contain the core of Frontity and need to be installed in any Frontity project.
* **Frontity packages**:  – For example `@frontity/wp-source` ,  `@frontity/tiny-router` or `@frontity/my-theme` These are similar to WordPress theme and plugins. You can change them if you want, add more, create new ones...

Both core and Frontity packages are _npm packages_ and need to be installed with `npm install the-package-name`. Don't worry, if you have used `npx frontity create`, the core packages were already installed for you.

The Frontity packages also need to be declared in your settings file: `frontity.settings.js`. We'll talk about the settings in detail in the next section.

## Folder Structure

If you have followed our [quick start guide](../getting-started/quick-start-guide.md) you probably have a new **Frontity** project. This is its folder structure:

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

It's important to understand each part of the project:

### The `frontity.setting.js` file

As its name suggests, this is where you define the settings for your project, the packages needed, and their own settings. You have a default configuration when you use `npx frontity create` to start a new project, but Frontity is really versatile, and there are many options. You can check them out at [the Settings page](settings.md), explained in detail later.

### The `/node_modules/` folder

This is the folder where all your dependencies are installed. For example, the core of Frontity \(`@frontity/core`\) is installed there. If you install other Frontity packages like `@frontity/tiny-router` or `@frontity/wp-source` they will be there as well.

These packages **aren't meant to be modified**, as they are dependencies. If you modify their code, your code will be overwritten when you update the dependencies. Again, it is similar to WordPress. Once you install a theme or a plugin, it is recommended to not change their code because if you update them, your changes will be lost.

If you want to change these, you should first move them to the `/packages/` folder. The code won't be update when inside this directory. 

### The `/packages/` folder

This is the folder where your **local packages** live. These are the packages where you will add code and functionality to your site. It will include your theme, the Frontity packages you moved from `node_modules` folder to adapt their code, and the custom packages you create. They are core in Frontity, so they are explained in detail later at [Packages](packages.md).

### The `package.json` file

This is the file used for configuration in any Node project. There are many great articles about it like [this one](https://medium.com/beginners-guide-to-mobile-web-development/why-package-json-npm-basics-cab3e8cd150), [this one](https://flaviocopes.com/package-json/) or [this one](https://alligator.io/nodejs/package-json/), but its main purpose is to store the dependencies needed for your app to work. The basic dependencies added after a  `npx frontity create`  are:

* **`frontity`** : this is the main package, where we can find all the methods we might need to use during development. It's also where the CLI lives.
* **`@frontity/core`** : here is where the magic happens. Core takes care of all the bundling, rendering, merging, transpiling, serving, etc. We don't need to access it in order to develop a Frontity app.
* **`@frontity/wp-source`** : this package is the one that connects to the WordPress REST API for your site and fetches all the data needed for your Frontity theme. If you are using a different Source than WordPress, you will want to change this.
* **`@frontity/tiny-router`** : this is a small package that handles `window.history` and helps us with the routing. You can also use a different Router.
* **`@frontity/mars-theme`** : this is our starter theme, where we build our site with React, but you could install a different one.

{% code title="package.json" %}
```javascript
{
  "name": "my-frontity-project",
  ...
  "dependencies": {
    "frontity": "^1.2.2"
    "@frontity/core": "^1.1.3",
    "@frontity/wp-source": "^1.1.8",
    "@frontity/tiny-router": "^1.0.12",
    "@frontity/mars-theme": "./packages/mars-theme"
  }
}
```
{% endcode %}

As you can see, our `mars-theme` dependency has no version but a path. This is how we need to add our local packages to our `package.json` so they will be treated as if they were living in `node_modules`.



