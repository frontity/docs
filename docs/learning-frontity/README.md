# 📚 Core Concepts

Frontity was designed to be as simple as possible, but you still need to familiarize yourself with some concepts. In this section you'll learn the very basic ideas behind Frontity Projects

## [Project](project.md)

Frontity projects are basically the sum of several packages bundled in some final files under the direction of a settings file (`frontity.settings.js`). In [this section](project.md) you'll learn about the structure of a Frontity project and the purpose of each folder or file in it

## [Settings](settings.md)

The `frontity.settings.js` file is the orchestrator of Frontity projects. In [this section](settings.md) you'll learn more about how to add setings for your Frontity project to define things such as how many sites is Frontity managing, the packages required of Frontity sites, the theme, the URL of the WordPress source of data, the initial data of the Frontity state and more

## [Packages](packages.md)

Frontity projects are built around the idea of packages that encapsulate logic that can be reused across projects. You'll find in [this section](packages.md) some topics related to packages such as: local packages, folder structure, publishing and more

## [Roots](roots.md)

Packages in Frontity can define they're `roots` that is the HTML point where React node is inserted for that package. This is usually only needed for Theme packages but can be defined for any package. Have a look at [this section](roots.md) to learn more about this.

## [State](state.md)

Frontity State is a JavaScript object containing all the data (state) exposed by the project and its packages. Learn more about the state in [this section](state.md) 

## [Actions](actions.md)

Actions are a set of functions that your package needs to work or to expose data for other packages. They can modify the state and don't return anything. Have a look at [this section](actions.md) to learn more them.

## [Libraries](libraries.md)

Libraries are a set of tools that are not aimed to change the state, but rather other parts of the application. Learn more about libraries in [this section](libraries.md) 

## [Namespaces](namespaces.md)

As the Frontity state, actions and libraries belong to a shared space among all packages, each package needs to be defined under its own namespace to avoid conflicts. In [this section](namespaces.md) you'll learn more about how using namespaces make Frontity projects very flexible and extensible.

## [Styles](styles.md)

Frontity uses CSS-in-JS for adding styles to the React components. This approach allows to improve the performance of Frontity sites and improve the developer experience. In [this section](styles.md) you can learn some of the CSS-in-JS concepts needed to style Frontity projects.

## [Head](head.md)

Due to the Isomorphic nature of React apps in Frontity, the first load of a page will be rendered by the server using the React components in the project. With Frontity you can define your `<head>` tags from React to improve the SEO of your project. Learn how to do this in [this section](head.md)