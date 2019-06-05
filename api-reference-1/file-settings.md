# Settings

The settings file is where you can configure the sites and packages you are using.

It is named `frontity.settings.js` \(or `frontity.settings.ts` if you are using TypeScript\) and needs to be at the root of the project, just like your `package.json`.

## Sites 

If you only have a site, it can be an object like this:

{% code-tabs %}
{% code-tabs-item title="frontity.settings.js" %}
```javascript
module.exports = {
  packages: [
    "@frontity/mars-theme",
    "@frontity/tiny-router",
    "@frontity/wp-source"
  ]
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

If you have more than one, you can use an array and set a name for each one:

{% code-tabs %}
{% code-tabs-item title="frontity.settings.js" %}
```javascript
module.exports = [
  {
    name: "site-1",
    packages: [
      "@frontity/mars-theme",
      "@frontity/tiny-router",
      "@frontity/wp-source"
    ]
  },
  {
    name: "site-2",
    packages: [
      "@frontity/mars-theme",
      "@frontity/tiny-router",
      "@frontity/wp-source"
    ]
  }
]

```
{% endcode-tabs-item %}
{% endcode-tabs %}

## Packages

You should include at least one `theme`, one `router` and one `source`.

Package can be strings, like `"@frontity/mars-theme"` or object with more properties:

```javascript
module.exports = {
  packages: [
    "@frontity/mars-theme",
    "@frontity/tiny-router",
    {
      name: "@frontity/wp-source",
      active: true,
      state: {
        source: {
          apiUrl: "https://site.com/wp-json"
        }
      }  
    }
  ]
}
```

## State

The Frontity packages use `state` to work internally. Each one works in it's own namespace to avoid name collisions.

Right now we only have one `theme`, one `router` and one `source`, but in the future when there are many of each, themes will be able to work with any router or source, and viceversa thanks to namespaces.

Here in the settings you can add state both in the site or inside a package, like this:

```javascript
module.exports = {
  state: {
    frontity: {
      // These is general state, common to all the packages.
      url: "https://site.com", 
      title: "My Site"
  },
  packages: [
    "@frontity/mars-theme",
    "@frontity/tiny-router",
    {
      name: "@frontity/wp-source",
      active: true,
      state: {
        source: {
          // These is state for the `source` namespace.
          apiUrl: "https://site.com/wp-json"
          isWPCom: false
        }
      }  
    }
  ]
}
```



{% hint style="info" %}
Still any doubts? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

