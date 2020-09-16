# Frontity Analytics packages

There is a set of official *Analytics Frontity packages* that you can use to easily add analytics tracking in your project.

These packages are:
- [`@frontity/google-analytics`](https://github.com/frontity/frontity/tree/dev/packages/google-analytics)
- [`@frontity/google-tag-manager-analytics`](https://github.com/frontity/frontity/tree/dev/packages/google-tag-manager-analytics)
- [`@frontity/comscore-analytics`](https://github.com/frontity/frontity/tree/dev/packages/comscore-analytics)

## Installation

Install the analytics package you need for your project:

- [Installation instructions for `@frontity/google-analytics`](https://github.com/frontity/frontity/tree/dev/packages/google-analytics#installation)
- [Installation instructions for `@frontity/google-tag-manager-analytics`](https://github.com/frontity/frontity/tree/dev/packages/google-tag-manager-analytics#installation)
- [Installation instructions for `@frontity/comscore-analytics`](https://github.com/frontity/frontity/tree/dev/packages/comscore-analytics#installation)

## Settings

Each package will require some custom configuration to add things such as tracking ID's for the services behind. In the description of each package you'll find the details of each configuration:

- [Settings for `@frontity/google-analytics`](https://github.com/frontity/frontity/tree/dev/packages/google-analytics#settings)
- [Settings for `@frontity/google-tag-manager-analytics`](https://github.com/frontity/frontity/tree/dev/packages/google-tag-manager-analytics#settings)
- [Settings for `@frontity/comscore-analytics`](https://github.com/frontity/frontity/tree/dev/packages/comscore-analytics#settings)

Once we have properly installed and configured these `analytics` packages, their actions will be centralized by the `analytics` namespace.

In `frontity.settings.js` we can enable/disable specific analytic packages for pageviews or events through the following properties in the `state` under the `analytics` namespace

- `state.analytics.pageviews`
- `state.analytics.events`

_Example:_

```js
export default {
  state: {
    analytics: {
      pageviews: {
        googleAnalytics: true
      },
      events: {
        googleAnalytics: true
      }
    }
  }
};
```


#### `state.analytics.pageviews`

Map of Analytics packages namespaces with boolean values.

This object is used by `actions.analytics.pageview` to know which analytics packages should send the pageview to their respective services.

If you want to disable sending pageviews for a specific analytics package, the respective namespace of that package should be set here to `false`.

_Example:_
```js
pageviews: {
  googleAnalytics: false,
  comscoreAnalytics: true
}
```

#### `state.analytics.events`

Map of Analytics packages namespaces with boolean values.

This object is used by `actions.analytics.event` to know which
analytics packages should send the event to their respective services.

If you want to disable sending events for a specific analytics
package, the respective namespace of that package should be set here to `false`.

_Example:_
```js
events: {
  googleAnalytics: true,
  comscoreAnalytics: false,
}
```

## How to use

Once everything is properly configured, the following `actions` under the namespace `analytics` will be ready for use

- `actions.analytics.pageview`
- `actions.analytics.event`


#### `actions.analytics.pageview`

Send a pageview to all active analytics packages.

This action takes all namespaces defined in `state.analytics.pageviews` that are `true` and calls the `pageview` action of each one with the specified `Pageview` object.

`actions.analytics.pageview` is automatically launched every time link changes (or every time `action.router.set(link)` is launched)

{% hint style="warning" %}
This action is used by the `roots.analytics` component and is not meant to be called directly
{% endhint %}


_Example:_
```js
actions.analytics.pageview({
  link: "/2016/the-beauties-of-gullfoss",
  title: "The Beauties Of Gullfoss",
});
```

#### `actions.analytics.event`

Send an event to all active analytics packages.

This action takes all namespaces defined in `state.analytics.events` that are `true` and calls the `event` action of each one with the specified `Event` object.

_Example:_
```js
actions.analytics.event({
  name: "click",
  payload: {
    category: "video",
    label: "featured-media",
  },
});
```
