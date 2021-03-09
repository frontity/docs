# Quick start guide

Right, let's get you set up with your very first Frontity project. This guide will take you from the very basics to feeling amazed at what you can do with Frontity!

> Please check that you meet the [**requirements**](README.md#requirements) before following the steps below.

{% embed url="https://www.youtube.com/watch?v=OdiuVxjbh9A" caption="" %}

## Getting started with Frontity

1 - **Create a new Frontity project** by entering the following command in your terminal:

```sh
npx frontity create my-first-frontity-project
```

2 - **Select a starter theme**. If it's your first time using Frontity we recommend that you select `@frontity/mars-theme` to start with.

```
? Pick a starter theme to clone: @frontity/mars-theme (recommended)
```

A directory with the same name as the project name you used will be created. It will have a structure similar to this:

```text
my-first-frontity-project/
|__ node_modules/
|__ package.json
|__ frontity.settings.js
|__ favicon.ico
|__ packages/
    |__ mars-theme/
```

3 - **Run the project locally** by executing this command from the terminal:

```sh
cd my-first-frontity-project && npx frontity dev
```

A development server will be started. This server will be listening on http://localhost:3000 and watching for any changes inside the packages directory.

4 - Now you’re **ready to make changes** to your site

Open the project directory in your preferred code editor/IDE and try editing some of the files under `packages/mars-theme`. Each time you save a change the browser will automatically reload and display the new version as these changes are detected by the development server.

5 - **Set your own WordPress installation** as data source

You can connect your [_own WordPress site_](https://docs.frontity.org/guides/what-are-the-requisites-of-wordpress-for-frontity) to your Frontity project by setting the `state.source.url` property in the `frontity.settings.js` file.

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

By default, `state.source.url` is set to `https://test.frontity.org/` (our demo WordPress site) but you can set this property to any valid URL pointing to a WordPress site.

{% hint style="info" %}
Setting `state.source.url` will be enough for most WordPress installations and plans. For specific use cases check the guide [*Setting the URL of the WordPress data source*](https://docs.frontity.org/guides/setting-url-wordpress-source-data)
{% endhint %}


> Your site at `http://localhost:3000` won't auto-update with this change as auto-updates only occur with changes to files in the packages directory, so you will need to manually refresh the page in your browser.

You should now see your own posts in the Frontity project displayed in the browser.

## What's next?

### Follow the Step by Step Tutorial

Our primary learning resource is the **[Step by Step Tutorial](https://tutorial.frontity.org)**. This is the perfect place to start if you're new to Frontity, or even if you've previously used Frontity but feel that your knowledge is incomplete or fragmented.

### Check our guides

We have several **[Guides](https://docs.frontity.org/guides)** that will help you in your understanding of working with Frontity, and which will also assist you in solving some of the common challenges that come up when working with Dynamic SSR (server-side Rendering) in React apps connected to WordPress.

### Check the API Reference

Our main reference resource is the **[API Reference](https://api.frontity.org)**. This is where you'll find detailed information about Frontity CLI, packages, plugins and themes. Once you've mastered the basics of working with Frontity this is where you're likely to spend most of your time when working on projects.

### Deploy your site

When you're done developing and are ready to launch your new site follow the instructions in our **[Deployment](https://docs.frontity.org/deployment)** section to learn how to deploy your finished Frontity site. We recommend that you start by [deploying your site to Vercel](https://docs.frontity.org/deployment/deploy-using-vercel).

{% hint style="info" %}
Still have questions? Come and join us in [the community](https://community.frontity.org/) and ask there! We are here to help 😊
{% endhint %}