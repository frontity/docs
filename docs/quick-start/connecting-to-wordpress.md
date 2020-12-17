# Connect Frontity to Your WordPress Site

Once you've run the initial setup [**outlined here**](quick-start-guide.md) you're ready to move on to the next step. We'll now show you how to connect Frontity up to your WordPress site and customise the menu to reflect your WordPress site's structure.

## Making the connection

Once setup, Frontity initially connects to our starter blog. You can change this to connect to your own WordPress site in the `frontity.settings.js` file which you'll find in the root of your project directory. In this file locate the `@frontity/wp-source` settings object _\(hint - it's near the bottom of the file\)_ and change the `url` property to the address of your own site:

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
          // Change this url to point to your WordPress site.
          url: "https://test.frontity.org/"
        }
      }
    }
  ]
}
```
{% endcode %}

Your site at [http://localhost:3000](http://localhost:3000) won't auto-update on this occasion as auto-updates only occur when you make a change to a file in the `packages` folder, so you will need to manually refresh the page in your browser.

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

## What's next

You're doing great! See our [**Next steps**](next-steps.md) page to see what you can do to take your project from here.

{% hint style="info" %}
Still have questions? Come and join us in [the community](https://community.frontity.org/) and ask there! We are here to help 😊
{% endhint %}

