# 📚 Core Concepts

Frontity was designed to make it as simple as possible for developers to create websites using decoupled (or headless) WordPress.

However, in order to have the best possible experience when developing with Frontity you still need to become familiar with certain concepts.

In this **Core Concepts** section you'll learn the basic ideas that underlie a Frontity Project.

A [Frontity project](project.md) basically consists of several packages installed into the project's directory and which are configured in the settings file (`frontity.settings.js`). In the [**Project**](project.md) section you'll learn about the structure of a Frontity project and the purpose of each directory or file contained within it.

The `frontity.settings.js` file is where the Frontity project is configured. It contains the definition of, and the configuration for, each package included in the project. In the [**Settings**](settings.md) section you'll learn more about how to add settings for your Frontity project, to define such things as:

- how many sites are being managed by this instance of Frontity,
- the packages required by each site,
- the theme to be used,
- the URL of the WordPress data source,
- any initial data for the Frontity state,

as well as much more.

Frontity projects are built around the concept of [packages](https://api.frontity.org/frontity-packages). A package is, in essence, code that instatiates logic that can be reused across many projects. In the [**Packages**](packages.md) section you will find various concepts and topics related to packages, such as:

- local packages,
- directory structure,
- publishing,

and more.

Every Frontity package shares a common API which consists of these four main elements:

- [**Roots**](roots.md): A package in Frontity can define a `root` which is an HTML element representing the point where React is inserted for that package. This is usually only needed for Theme packages but can be defined for any package.
- [**State**](state.md): Frontity's State is a JavaScript object containing all the data (state) exposed by the project and its packages.
- [**Actions**](actions.md):  Actions are a set of functions that your package needs to work. They can also be used to expose data so that other packages can get access to that data. They can modify the state but don't return anything.
- [**Libraries**](libraries.md): Libraries are a set of tools that are not intended to change the state, but rather other parts of the application.

As these elements, namely the Frontity state, actions and libraries, all belong to a common space shared among all the packages in a project, each package needs to be defined under its own namespace in order to avoid conflicts. In the [**Namespaces**](namespaces.md) section you'll learn more about how using namespaces can make Frontity projects very flexible and extensible.

Frontity uses CSS in JS for adding styles to the React components. This approach improves the performance of Frontity sites and also makes for a better developer experience. In the [**Styles**](styles.md) section you can learn some of the CSS in JS concepts needed to style Frontity projects.