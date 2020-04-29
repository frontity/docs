# Connect Frontity to Your WordPress Site

Once you've run the initial setup [**outlined here**](quick-start-guide.md) you're ready to move on to the next step. We'll now show you how to connect Frontity up to your WordPress site and customise the menu to reflect your WordPress site's structure.

## Making the connection

Once setup, Frontity initially connects to our starter blog. You can change this to connect to your own WordPress site in the `frontity.settings.js` file which you'll find in the root of your project directory. In this file locate the `@frontity/wp-source` settings object _(hint - it's near the bottom of the file)_ and change the `api` property to the address of your own site:

{% code title="frontity.settings.js" %}
```typescript
const settings = {
  ...,
  packages: [
    ...,
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          // Change this url to point to your WordPress API.
          api: "https://test.frontity.io/wp-json/"
        }
      }
    }
  ]
}
```
{% endcode %}

Your site at http://localhost:3000 won't auto-update on this occasion as auto-updates only occur when you make a change to a file in the `packages` folder, so you will need to manually refresh the page in your browser.

You should now see your own posts in the browser.

## Updating the menu

However the menu still has links to the demo content which will no longer work. You can change these to point to archives or pages on your own WordPress site. To do so locate the `@frontity/mars-theme` settings object and change the `menu` array to reflect the structure of your own site. So for example:

{% code title="frontity.settings.js" %}
```typescript
const settings = {
  ...,
  packages: [
    {
      "name": "@frontity/mars-theme",
      "state": {
        "theme": {
          "menu": [
            [
              // The link to your home page
              "Home",
              "/"
            ],
            [
              // A link to a page
              "About",
              "/about/"
            ],
            [
              // A link to the 'books' category
              "Books",
              "/category/books/"
            ],
            ...
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": false
          }
        }
      }
    },
    ...
  ]
}
```
{% endcode %}

Again you should refresh the browser manually in order to see these changes.

## Edit the starter theme

You're now ready to start customising Frontity to render the content and appearance that you want for your site. This is where the fun begins.

With Frontity you won't have your site code in the root folder as you would with `gatsbyjs` or `next.js`. Instead you develop Frontity packages and in order to personalize your site you'll edit a theme package.

If you're just starting out with Frontity then the theme you should have selected when you ran `npx frontity create` will be `@frontity/mars-theme`. You can find it in `packages/mars-theme/`. Go ahead and edit any of its files while running Frontity and the site will refresh automatically.

Move onto the [**Learning Frontity**](learning-frontity/README.md) section to dig in to the details of Frontity and how you can work with it.

> `npx frontity create` will install the `mars-theme` in `packages/` so the theme can be edited by the developer. However, this theme doesn't need to reside in `packages/` if you don't want to edit it. It can be installed directly with `npm` inside `node_modules/` and it will work exactly the same.

## Production mode

Once you are happy with your site and are ready to deploy it to production you can use

```text
npx frontity build
```

to create a production-ready bundle.

It will create a `/build` folder with a `server.js` file and a `/static` folder with all your javascript files and other assets. You can either

* Use `npx frontity serve` to run it like a normal Node app.
* Upload your `static` folder to a CDN and your server.js file to a `serverless` service, like [Now](../installation-and-deploy/deploy-on-now.md) or [Netlify](https://www.netlify.com/?ref=frontity).

For more info on deploying your site please refer to the [Deployment](../deployment/README.md) section.

{% hint style="info" %}
Still have questions? Come and join us in [the community](https://community.frontity.org/) and ask there! We are here to help 😊
{% endhint %}
