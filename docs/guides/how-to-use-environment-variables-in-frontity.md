Environment variables are a very useful way of managing custom data that shouldn't be in the code. A prime example would be API KEYs or other authentication credentials for external APIs.

Since a [Frontity app is an Isomorphic React app](../isomorphic-react.md) we need to consider whether these environment variables should be accessible only from the server-side, or whether they should also be accessible from the client-side.

## Adding environment variables to a Frontity Project

In order to access environment variables from your Frontity project you can use a package such as [`cross-env`](https://www.npmjs.com/package/cross-env) or [`dot-env`](https://github.com/motdotla/dotenv).

If you use `cross-env`, you will not have to do anything special in Frontity. You just need to add it to your `package.json` scripts thus:

```json
{
  "scripts": {
    "dev": "cross-env MY_VARIABLE=xxx frontity dev",
    "serve": "cross-env MY_VARIABLE=xxx frontity serve",
    "build": "cross-env MY_VARIABLE=xxx frontity build"
  }
}
```

`dotenv` only runs in Node, so rather than using an `index.js` file you should instead [divide the content of your `index.js` file across two files, namely `client.js` and `server.js`](https://docs.frontity.org/learning-frontity/packages#entry-points).

{% hint style="info" %}
If `client.js` and `server.js` exist, the `index.js` file can also still exist but it will be ignored by both the server and the client.
{% endhint %}

So for `dotenv` we must create a `.env` file:

```bash
MY_VARIABLE=xxx
```

## Accessing the environment variables

### Private access to the environment variables ![](https://img.shields.io/badge/SERVER-7950f2.svg)

As [we can create different entry points](../isomorphic-react.md#creating-different-entry-points) for our Frontity theme package by creating separate `server.js` and `client.js` files (that will each only be executed in the appropriate environment), we are therefore able to privately access the content of the environment variable on the server (for example to perform a request to an external API and storing this data in the `state` so it can be accessed from your React components).

{% hint style="info" %}
[Here a demo](https://github.com/frontity-juanmaguitar/demo-frontity-env-variables-server) illustrating the use of an environment variable in `server.js`.
{% endhint %}


The content of the `server.js` file could be something like this:

```js
import { config } from "dotenv";
import { fetch } from "frontity";
import packageClient from "./client";

// Launch dotenv.
config();

export default {
  ...packageClient,
  actions: {
    theme: {
      ...packageClient.actions.theme,
      beforeSSR: async ({ state }) => {
        const {API_TMDB} = process.env
        const URL = `https://api.themoviedb.org/3/movie/550?api_key=${API_TMDB}`
        const detailsMovie = await fetch(URL)
          .then( response => response.json() )
        state.tmdb = { detailsMovie }
      }
    }
  },
};
```

In this example a `API_TMDB` environment variable is defined in a `.env` file included in that project

This method (`beforeSSR` defined in the `server.js`) will ensure that your API credentials are secure (i.e. they will not be part of the client bundle) and are only visible to the code running server-side. However, remember to take into account that this logic will be executed in the [initialization (or bootstrapping) of the Frontity app](../isomorphic-react.md#initialization-or-bootstraping-of-a-frontity-app) (i.e. for any page loaded the first time).

### Generic access to the environment variables ![](https://img.shields.io/badge/SERVER-7950f2.svg) ![](https://img.shields.io/badge/CLIENT-fd7e14.svg)

If you need to use the ENV variable also in the client, the best way is to add it to the `state`.

You can use `frontity.settings.js` or your package `state` for that, whichever is more appropriate for your situation.

`frontity.settings.js`:

```js
import { config } from "dotenv";

// Launch dot-env.
config();

const settings = {
  name: "my-project",
  state: {
    env: {
      myVariable: process.env.MY_VARIABLE
    }
  },
  packages: [
    // ...
  ];
}
```

`packages/my-package/src/server.js`:

```js
import { config } from "dotenv";

// Launch dot-env.
config();

export default {
  state: {
    theme: {
      myVariable: process.env.MY_VARIABLE,
    },
  },
};
```

Either way, the ENV variable will be serialized with the rest of the `state` and it will be sent to the client for the React hydration.

{% hint style="danger" %}
Please note that any ENV variable exposed in `state` will end up in the client. *Do not expose any secret API KEY or password.*
{% endhint %}