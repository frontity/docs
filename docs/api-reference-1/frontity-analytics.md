# Frontity Analytics packages

There is a set of official **_Analytics_ Frontity packages** that you can use to easily add analytics tracking in your project.

These packages are:
- `@frontity/google-analytics`
- `@frontity/google-tag-manager`
- `@frontity/comscore-analytics`

```js
import Root from "./components";
import Analytics from "../types";

const analytics: Analytics = {
  roots: {
    analytics: Root,
  },
  state: {
    analytics: {
      pageviews: {},
      events: {},
    },
  },
  actions: {
    analytics: {
      // Get the functions for every analytics package
      // and run `pageview` for each one.
      pageview: ({ state, actions }) => (pageview) => {
        Object.entries(state.analytics.pageviews).forEach(
          ([namespace, shouldSend]) => {
            if (shouldSend) actions[namespace].pageview(pageview);
          }
        );
      },

      // Get the functions for every analytics package
      // and run `event` for each one.
      event: ({ state, actions }) => (event) => {
        Object.entries(state.analytics.events).forEach(
          ([namespace, shouldSend]) => {
            if (shouldSend) actions[namespace].event(event);
          }
        );
      },
    },
  },
};

export default analytics;
```
## The namespace `analytics`

These packages share the Namespace `analytics` so they're all configured in the same place of `frontity.settings.js`

- `state.analytics.pageviews`
- `state.analytics.events`
- `actions.analytics.pageview`
- `actions.analytics.event`

## `state.analytics.pageviews`

Map of namespaces with boolean values.

This object is used by `actions.analytics.pageview` to know which
analytics packages should send the pageview to their respective
services.

If you want to disable sending pageviews for a specific analytics
package, the respective namespace of that package should be set here to
`false`.

```
pageviews: {
  googleAnalytics: false,
  comscoreAnalytics: true
}
```

---

`actions.analytics.pageview` → is automatically launched every time link changes (or every time `action.router.set(link)` is launched)