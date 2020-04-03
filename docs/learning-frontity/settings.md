# 2. Settings

The first thing you should do when you start a new **Frontity** project is to configure your `frontity.settings.js` file. Let's take a look at each concept you need to understand in order to use it properly.

## Site

A **site** is a set of packages and settings. For example, this is a site:

{% code title="frontity.settings.js" %}
```javascript
export default [
  {
    name: "my-site", // The name of your site.
    state: {
      frontity: {
        url: "https://www.site.com", // Some settings.
      }
    },
    packages: [
      "@frontity/mars-theme",  // And the packages of that site.
      "@frontity/tiny-router",
      "@frontity/wp-source"
    ]
  }
]
```
{% endcode %}

## Multiple Sites

One **Frontity** installation can serve content for multiple sites. This is useful if you have severals blogs and want to manage all of them with the same installation. Both the packages and settings of each site are independent.

To distinguish between different sites, you must use a `match` setting. Each time a new request is received by **Frontity**, it tests the url against the `match` field to know which site it should load:

```javascript
export default [
  {
    name: "site-1",
    match: ["https://www.site-1.com"],
    packages: [...]
  },
  {
    name: "site-2",
    match: ["https://www.site-2.com"],
    packages: [...]
  }
]
```

For example, if the url is `https://www.site-1.com/my-post` the `"site-1"` settings are loaded and if the url is `https://www.site-2.com/category/some-cat` the `"site-2"` settings are loaded.

In development, you can access a specific site using the `?name=` query:

```text
https://localhost:3000/?name=site-2
```

## Packages

You can specify a different set of **packages** for each site. They can be either strings or objects:

{% code title="frontity.settings.js" %}
```javascript
export default [
  {
    packages: [
      "@frontity/mars-theme",
      "@frontity/tiny-router",
      {
        name: "@frontity/wp-source",
        active: true,
        state: {  // Some settings for this package.
          source: {
            api: "https://wp.site.com/wp-json"
          }
        }
      }
    ]
  }
]
```
{% endcode %}

As you can see, they have an `active` prop. That means you can deactivate a package without having to delete it from your settings file.

In **Frontity**, all the code is contained in packages. In a sense it is more similar to WordPress, where all the code is contained in your theme and plugins, than to other javascript frameworks. This is obviously on purpose, but we will explain the reasons later when we talk about packages and namespaces :\)

That's pretty much it about packages for now.

## State

The last thing you need to know to work with your `frontity.settings.js` file are the settings.

As you have probably already noticed, we don't use `settings`, we use `state`. That's on purpose as well.

If you come from a WordPress background, you can think of **Frontity** `state`as the database of your application. And if you come from a React background, well... it's the `state` that you usually find in Redux or MobX. That `state` is accessible by your packages at run time.

You have the opportunity to modify the initial `state` of your site in the `frontity.settings.js` file. You can do it in a general `state` object or inside packages.

{% code title="frontity.settings.js" %}
```javascript
export default [
  {
    name: "my-site",
    state: {
      frontity: {
        url: "https://www.site.com", // Some settings of the site.
      }
    },
    packages: [
      "@frontity/mars-theme",
      "@frontity/tiny-router",
      {
        name: "@frontity/wp-source",
        state: {  // Some settings for this package.
          source: {
            api: "https://wp.site.com/wp-json"
          }
        }
      }
    ]
  }
]
```
{% endcode %}

In **Frontity**, the `state` is organized in what we call **namespaces**. It means that each package uses a specific part of the state: a **namespace**. For example, our `wp-source` package uses the `source` namespace to store its settings.

And our `tiny-router` package uses the `router` namespace:

{% code title="frontity.settings.js" %}
```javascript
packages: [
  {
    name: "@frontity/tiny-router",
    state: {
      router: {
        autoFetch: true
      }
    }
  }
]
```
{% endcode %}

For now, let's leave it here. We will explain why the namespaces are important later.

The important takeaway here is: _in the settings file you have the opportunity to change the `state` of **Frontity**. Most of the time you will use this to configure the settings of each package._

