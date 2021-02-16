# Quick start guide

Right, let's get you set up with your very first Frontity project. This guide will take you from the very basics to feeling amazed at what you can do with Frontity!

> Please check that you meet the [**requirements**](README.md#requirements) before following the steps below.

{% embed url="https://www.youtube.com/watch?v=OdiuVxjbh9A" caption="" %}

## Getting started with Frontity

1.-  **Create a new Frontity project** by using the Frontity CLI with a single command:

```text
npx frontity create my-first-frontity-project
```

2.-  **Select a starter theme**. We recommend you to start with `@frontity/mars-theme`

```
? Pick a starter theme to clone: @frontity/mars-theme (recommended)
```

A folder with your project name will be created with some files inside of it

```
my-first-frontity-project/
|__ node_modules/
|__ package.json
|__ frontity.settings.js
|__ favicon.ico
|__ packages/
    |__ mars-theme/
```

3- **Run the project locally** by doing

```
cd my-first-frontity-project && npx frontity dev
```

A development server will be started. This server will be listening to http://localhost:3000 and watching for any changes inside the packages folder.


4- Now you’re **ready to make changes** to your site

Try editing the files under `packages/mars-theme` and save your changes. The browser will automatically reload when these changes are detected

5- **Set your own WordPress installation** as the source of data 

You can connect your own WordPress site to your Frontity project by setting the `state.source.url` property in the `frontity.settings.js` file

```javascript
const settings = {
  ...,
  packages: [
    ...,
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          // Change this url to point to your WordPress site.
          url: "https://test.frontity.org/"
        }
      }
    }
  ]
}
```

By default, `state.source.url` is set to `https://test.frontity.org/` (our demo WordPress site) but you can set this property to any valid URL pointing to a WordPress site

Your site at `http://localhost:3000` won't auto-update with this change as auto-updates only occur with changes to files in the packages folder, so you will need to manually refresh the page in your browser.

You should now see your own posts in the Frontity project displayed in the browser.

## What's next?

### Deploy your site

Follow the instructions in our **[Deployment](https://docs.frontity.org/deployment)** section to learn how to deploy your Frontity site. We recommend you to start by [deploying your site in Vercel](https://docs.frontity.org/deployment/deploy-using-vercel)

### Follow the Step by Step Tutorial

We have created for you a **[Step by Step Tutorial](https://tutorial.frontity.org)** to create a more functional Frontity project that will help you to learn how to use some of the basic features of the framework

### Check our guides

We have several **[Guides](https://docs.frontity.org/guides)** prepared for you to help you understand and solve with Frontity some of the common challenges of Dynamic SSR (server-side Rendering) in React apps connected to WordPress

### Check the API Reference

Let's cut to the chase! In the **[API Reference](https://api.frontity.org)** site you'll find specific details of Frontity CLI, packages, plugins and themes

{% hint style="info" %}
Still have questions? Come and join us in [the community](https://community.frontity.org/) and ask there! We are here to help 😊
{% endhint %}

