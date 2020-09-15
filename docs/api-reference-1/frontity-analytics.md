# Frontity Analytics packages

There is a set of official *Analytics Frontity packages* that you can use to easily add analytics tracking in your project.

These packages are:
- `@frontity/google-analytics`
- `@frontity/google-tag-manager`
- `@frontity/comscore-analytics`

## Installation

Add the analytics package you need for your project:

```text
npm i @frontity/google-analytics
npm i @frontity/google-tag-manager
npm i @frontity/comscore-analytics
```

And include it in your **`frontity.settings.js`** file:

```javascript
module.exports = {
  ...,
  packages: [
    ...,
    "@frontity/google-analytics",
    "@frontity/google-tag-manager",
    "@frontity/comscore-analytics"
  ]
}
```

## Settings

### Settings per package

For every analytics package we need to set specific ID's so it can connect properly to its specific service behind

#### `@frontity/google-analytics`

The namespace for this package is **`googleAnalytics`** 

The properties `state.googleAnalytics.trackingId` or `state.googleAnalytics.trackingIds` are used to specify the tracking IDs used by the package.

**Example:**
```js
{
  state: {
    googleAnalytics: {
      // If you only specify a single tracking ID
      trackingId: "UA-34567890-12"
    }
  }
}
```

```js
{
  state: {
    googleAnalytics: {
      // If you want to use a list of tracking IDs
      trackingIds: ["UA-34567890-12", "UA-34567890-13"]
    }
  }
}
```

#### ``@frontity/google-tag-manager``

The namespace for this package is **`googleTagManagerAnalytics`** 

The properties `state.googleTagManagerAnalytics.containerId` or `state.googleTagManagerAnalytics.containerIds` are used to specify the tracking IDs used by the package.

**Example:**
```js
{
  state: {
    googleTagManagerAnalytics: {
      // If you only specify a single tracking ID
       containerId: "GTM-XXXXXXX"
    }
  }
}
```

```js
{
  state: {
    googleTagManagerAnalytics: {
      // If you want to use a list of tracking IDs
      containerIds: [ "GTM-XXXXXXX","GTM-YYYYYYY"]
    }
  }
}
```

#### `@frontity/comscore-analytics`

The namespace for this package is **`comscoreAnalytics`** 

The properties `state.comscoreAnalytics.trackingId` or `state.comscoreAnalytics.trackingIds` are used to specify the tracking IDs used by the package.

**Example:**
```js
{
  state: {
    comscoreAnalytics: {
      // If you only specify a single tracking ID
       trackingId: "34567890",
    }
  }
}
```

```js
{
  state: {
    comscoreAnalytics: {
      // If you want to use a list of tracking IDs
      trackingId: ["34567890", "56789012"]
    }
  }
}
```


### Shared settings for the `analytics` packages

Shared configuration for the Analytic packages is done in the `frontity.settings.js` under the `analytics` namespace where we can configure: 

- `state.analytics.pageviews`
- `state.analytics.events`


#### `state.analytics.pageviews`

Map of Analytics packages namespaces with boolean values.

This object is used by `actions.analytics.pageview` to know which analytics packages should send the pageview to their respective services.

If you want to disable sending pageviews for a specific analytics package, the respective namespace of that package should be set here to `false`.

**Example:**
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

**Example:**
```js
events: {
  googleAnalytics: true,
  comscoreAnalytics: false,
}
```

## How to use

#### `actions.analytics.pageview`

Send a pageview to all active analytics packages.

This action takes all namespaces defined in `state.analytics.pageviews` that are `true` and calls the `pageview` action of each one with the specified `Pageview` object.

`actions.analytics.pageview` is automatically launched every time link changes (or every time `action.router.set(link)` is launched)

{% hint style="warning" %}
This action is used by the `roots.analytics` component and is not meant to be called directly
{% endhint %}


**Example:**
```js
actions.analytics.pageview({
  link: "/2016/the-beauties-of-gullfoss",
  title: "The Beauties Of Gullfoss",
});
```

#### `actions.analytics.event`

Send an event to all active analytics packages.

This action takes all namespaces defined in `state.analytics.events` that are `true` and calls the `event` action of each one with the specified `Event` object.

**Example:**
```js
actions.analytics.event({
  name: "click",
  payload: {
    category: "video",
    label: "featured-media",
  },
});
```
