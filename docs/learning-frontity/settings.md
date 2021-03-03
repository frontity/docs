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

To distinguish between different sites, you must use a `match` setting. Each time a new request is received by **Frontity**, it tests the URL against the `match` field to know which site it should load:

```javascript
// frontity.settings.js

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

For example, if the URL is `https://www.site-1.com/my-post` the `"site-1"` settings are loaded and if the URL is `https://www.site-2.com/category/some-cat` the `"site-2"` settings are loaded.

In development, you can access a specific site using the `?frontity_name=`
query, which should match the `name` specified for your site. For example, using
the `frontity.settings.js` file above, to access `site-2`, you should use:

```text
https://localhost:3000/?frontity_name=site-2
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
            url: "https://wp.site.com/"
          }
        }
      }
    ]
  }
]
```
{% endcode %}

As you can see, they have an `active` prop. That means you can deactivate a package without having to delete it from your settings file.

In **Frontity**, all the code is contained in packages. In a sense it is more similar to WordPress, where all the code is contained in your theme and plugins, than to other JavaScript frameworks. This is obviously on purpose, but we will explain the reasons later when we talk about packages and namespaces :\)

## State

The `settings` of a Frontity project are written in the `state`.

If you come from a WordPress background, you can think of **Frontity** `state` as the database of your application. And if you come from a React background, well... it's the `state` that you usually find in Redux or MobX. That `state` is accessible by your packages at runtime.

The initial _settings_ of a Frontity site can be set in the `frontity.settings.js` file


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
            url: "https://wp.site.com/"
          }
        }
      }
    ]
  }
]
```
{% endcode %}

The state is compartmentalized though namespaces. Each namespace usually corresponds to a Frontity package. 

For example, our `wp-source` package uses the `source` namespace to store its settings. And our `tiny-router` package uses the `router` namespace:

In this way, we keep organized the settings of each package.

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

There's also a special namespace called `frontity` that is the place to set the general properties of our site. There's a mandatory property we need to set under the `frontity` namespace: `state.frontity.url`

### `state.frontity.url`






The important takeaway here is: _in the settings file you have the opportunity to change the `state` of **Frontity**. Most of the time you will use this to configure the settings of each package._


{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

