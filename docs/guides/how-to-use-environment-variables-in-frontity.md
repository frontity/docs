Environment variables are a very useful way of managing API KEY's or custom data that doesn't belong to the code.

Taking into account that Frontity apps are Isomorphic React apps we need to consider if we need to access these environment variables from only the server side or also from the client side

## Adding environment variables to a Frontity Project 

To do that, you can use packages like [`cross-env`](https://www.npmjs.com/package/cross-env) or [`dot-env`](https://github.com/motdotla/dotenv). Whatever approach you prefer.

If you use `cross-env`, you don't have to do anything special in Frontity, just add it to your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "cross-env MY_VARIABLE=xxx frontity dev",
    "serve": "cross-env MY_VARIABLE=xxx frontity serve",
    "build": "cross-env MY_VARIABLE=xxx frontity build"
  }
}
```

`dotenv` can only run in Node, so you must [divide your `index.js` file in two files: `client.js` and `server.js`](https://docs.frontity.org/learning-frontity/packages#entry-points).

So for `dotenv` we must create a `.env` file:

```bash
MY_VARIABLE=xxx
```

## Accessing the environment variables 

### Private access to the environment variables ![](https://img.shields.io/badge/SERVER-7950f2.svg)

As [we can create different entry points](#) for our Frontity theme package, we can create the `server.js` that will be executed only in the server side. In this way we can privately access the content of the environment variable (for example to perform a request to an external API and storing this data in the `state` so it can be accessed from your React components) 

{% hint style="info" %}
[Here a demo](https://github.com/frontity-juanmaguitar/demo-frontity-env-variables-server) of using an environment variable in `server.js`
{% endhint %}


The `server.js` could be something like this... 

```
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

In this example, there's a `API_TMDB` environment variable defined in a `.env` of that project

This method (`beforeSSR` defined in the `server.js`) will assure that your API's are secure (will not be part of the client bundle) and only visible from the server-side. But take into account that this logic will be executed in the initialization (or bootstrapping of the Frontity app)  (for any page loaded the first time)

### Generic access to the environment variables ![](https://img.shields.io/badge/SERVER-7950f2.svg) ![](https://img.shields.io/badge/CLIENT-fd7e14.svg)

If you need to use the ENV variable also in the client, the best way is to add it to the `state`.

You can use `frontity.settings.js` or your package `state` for that, whatever is more appropriate for your situation.

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

Please note that any ENV variable exposed in `state` will end up in the client. *Do not expose any secret API KEY or password.*