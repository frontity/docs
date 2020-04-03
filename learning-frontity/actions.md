# 6. Actions

{% hint style="info" %}
This "Learning Frontity" guide is intended to be read in order so please start from the [first section](settings.md) if you haven't done so already.
{% endhint %}

Actions are a set of functions that your package needs to work or expose for other packages. They can modify the state and don't return anything.

Let's see one simple example:

```javascript
actions: {
    theme: {
        openMenu: ({ state }) => {
            state.theme.isMenuOpen = true;
        },
        closeMenu: ({ state }) => {
            state.theme.isMenuOpen = false;
        } 
    }
}
```

**Actions** are similar to **derived state**. They receive `({ state })` in their argument but that gets stripped out when you consume them:

```jsx
actions.theme.openMenu();
```

And similar to derived state functions, they can also receive arguments if they are declared using a second function:

```javascript
actions: {
    theme: {
        setMenu: ({ state }) => value => {
            if (value === "open")
                state.theme.isMenuOpen = true;
            else if (value === "closed")
                state.theme.isMenuOpen = false;
        },
    }
}
```

And they are consumed like this:

```jsx
actions.theme.setMenu("open");
```

Actions can be used either by their own package or by other packages.

For example, `tiny-router` \(and all packages that want to implement the `router` API\) exposes the action `actions.router.set()`. This action modifies `state.router.link` and makes sure that the URL of your browser is in sync. Additionally, `tiny-router` also runs this action if users click on the _back_ and _forward_ buttons of their browsers.

By the way, you can access the actions in the client console using:

```text
> frontity.actions
```

## Actions triggered by Frontity

There are a set of special actions that Frontity runs at appropriate moments:

![](https://github.com/github.com/frontity/gitbook-docs/blob/gitbook/.gitbook/assets/screen-shot-2019-06-03-at-17.19.03.png)

### `init` \(client & server\)

Packages can use this action to initialize their internal libraries. Packages should not use actions or libraries from other packages as they may not be properly initialized.

### **`beforeSSR`** \(server only\) \_\_

The purpose of this action is to prepare the state for the React render made in the server. Packages can populate it with content fetched from external APIs, like the WP REST API. They can also interact with other packages if necessary.

You can _optionally_ use the [curried](https://en.wikipedia.org/wiki/Currying) version of `beforeSSR` which is called with an object that contains the [Koa Context](https://koajs.com/#context) in the `ctx` parameter. You can use this `ctx` to modify things like status codes, headers and so on.

```javascript
// Without the context
{
  beforeSSR: ({ state, libraries }) => {
    console.log('Gonna SSR this page');
  }
}

// The optional curried version using the context
{
  beforeSSR: ({ state, libraries }) => async ({ ctx }) => {
    // ctx is koa context: https://koajs.com/#context
    console.log('SSR all day long', ctx.status);
  }
}
```

### `afterSSR` \(server only\)

This action runs when the HTML has been sent to the client. Packages should not rely on this action except for logging purposes because serverless providers sometimes kill the function after the HTML has been sent

### `beforeCSR`  \(client only\)

This action is run before React is hydrated. Be aware that the state that React needs for the hydration is already received from the server so you don't need to replicate the fetching done in `beforeSSR`.

### `afterCSR`  **\(client only\)**

This action is run after React has been hydrated in the client and it has taken control of the page. This is where packages with client side logic can start doing their thing.

