# Quick start guide

This guide will try to get you from not knowing what **Frontity** is, to feeling amazed about the things you can do with it!

{% hint style="info" %}
Frontity v1 **Release Candidate** is now **available**. Please try it out and [give us](https://community.frontity.org/?utm_source=docs&utm_medium=rc-notification&utm_campaign=rc-launch) your feedback. [Bug reports](https://github.com/frontity/frontity/issues) will be also highly appreciated.
{% endhint %}

{% embed url="https://www.youtube.com/watch?v=wC7-3lMDuiU" %}

## Create a new Frontity project

Frontity has it's own CLI so you can just create a new Frontity project with a single command:

```text
npx frontity create my-app && cd my-app
```

> For those wondering what **npx** is you can have a look at [this article](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).  
> TL;DR It downloads an **npm** package to run just this one time and then removes it from your computer.

This command will create a new directory with the following structure:

```text
my-app/
|__ node_modules/
|__ package.json
|__ frontity.settings.js
|__ favicon.ico
|__ packages/
    |__ mars-theme/
```

## Start development

Now you can start a development server with:

```text
npx frontity dev
```

This server will be listening to `http://localhost:3000` and watching for any changes inside the `packages` folder.

## Production mode

Once you are happy with your site and want to deploy it to production you can use

```text
npx frontity build
```

to create a production-ready bundle.

It will create a `/build` folder with a `server.js` file and a `/static` folder with all your javascript files and other assets. You can either

* Use `npx frontity serve` to run it like a normal Node app.
* Upload your `static` folder to a CDN and your server.js file to a `serverless` service, like [Now](../installation-and-deploy/deploy-on-now.md) or [Netlify](https://www.netlify.com/?ref=frontity).

## Custom setup

Once installed, Frontity will connect to our starter blog, but you can change this in the file `frontity.settings.js`, inside the `@frontity/wp-source`settings:

{% code-tabs %}
{% code-tabs-item title="frontity.settings.ts" %}
```typescript
const settings = {
  ...,
  packages: [
    ...,
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          // Here you should write the url point of your WordPress API.
          api: "https://test.frontity.io/wp-json/",
          // Also, if your blog is hosted on WordPress.com you can set:
          // isWPCom: true
        }
      }
    }
  ]
}

export default settings;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Now you can run it again with `npx frontity dev` and the theme should be now populated with your own WordPress content.

## Edit the starter theme

With Frontity you won't have your site code in the root folder like you would have with `gatsbyjs` or `next.js`. Instead you will develop Frontity packages and in order to personalize your site you'll edit a theme package.

The installed theme with `npx frontity create` is `@frontity/mars-theme` and you can find it in `packages/mars-theme/`. You can edit any of its files while running Frontity and the site will refresh automatically.

> `npx frontity create` will install the `mars-theme` in `packages/` so the theme can be edited by the developer. However, this theme doesn't need to reside in `packages/` if you don't want to edit it. It can be installed directly with `npm` inside `node_modules/` and it will work exactly the same.



{% hint style="info" %}
Still any doubts? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

