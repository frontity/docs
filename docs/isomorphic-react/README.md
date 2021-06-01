# Isomorphic React apps in Frontity

When developing a Frontity project or package the React code (used in your custom theme) should be [isomorphic](https://www.smashingmagazine.com/2015/04/react-to-the-future-with-isomorphic-apps/) (also called universal) 

This means that all the code in a Frontity project should be prepared to be executed both on the server-side and in the client-side.

Every time we access a page the first load is rendered from the server and from there the navigation is done in the client-side ([this allows a SEO friendly behavior while maintaining a good UX](https://medium.com/capital-one-tech/why-everyone-is-talking-about-isomorphic-universal-javascript-and-why-it-matters-38c07c87905))

Let's take an example of an isomorphic react app:

If we enter the URL of the `pageA` and press Enter, then `pageA` is rendered in the server and served to the client
If we enter the URL of the `pageB` and press Enter then `pageB` is rendered in the server and served to the client

In these two cases, a SSR (Server Side Render) process has taken the React code and created the proper HTML with the proper content that is "served" to the client so it can be displayed to the user

But if we enter the URL of the `pageA`, press Enter and from any some link in our app we go to `pageB` what is happening is:
-  `pageA` was rendered in the server and served to the client
-  `pageB` was rendered *in the client* and displayed to the user

So, as you can see, we have to keep in mind this when developing a React theme with Frontity

![Isomorphic Workflow](https://frontity.org/wp-content/uploads/2021/06/9e4ddb6f8facc23d5b48de077be0ea1361a9f3b5.png) 

*[Open drawing](https://excalidraw.com/#json=6240761477595136,gNYNZWqFAR6vpTkjaucNMw)*

Luckily, ALL the tools provided by Frontity provide an isomorphic behavior (they assure a behavior that works in both the server-side & the client-side)

So taking this into account...

### Creating different entry points

We can actually create 2 different [entry points](https://docs.frontity.org/learning-frontity/packages#entry-points) for our React theme in Frontity → instead of having and `index.js` we can split it in:
- `client.js` → the entry point of our app when client-side takes controls
- `server.js` → the entry point of our app when server-side takes controls

If Frontity finds those files, it will import the `server.js` one in Node and the `client.js` one in the browser, and it will ignore the `index.js` file. It can still exist, though.

In the `server.js` you can define a piece of code that will be executed BEFORE this SSR process is executed where you can actually do what you asked, this is, using an environment variable that is not visible for the client

### Adding environment variables to a Frontity  Project 

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

`dotenv` can only run in Node, so you must divide your `index.js` file in two files: `client.js` and `server.js`.

More info about the different entry points in the docs: https://docs.frontity.org/learning-frontity/packages#entry-points.

So for `dotenv` create an `.env` file:

```bash
MY_VARIABLE=xxx
```

### Accessing those environment variables privately (only server) in a Frontity  Project 

Here you have a little demo of how to use an environment variable to perform a request to an external API and storing this data in the `state` so it can be accessed from your React components 

https://github.com/frontity-juanmaguitar/demo-frontity-env-variables-server

The `server.js` looks like this... 

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

This method (`beforeSSR` defined in the `server.js`) will assure that your API's are secure (will not be part of the client bundle) and only visible from the server-side (but this logic will be executed for any page loaded the first time)

### Accessing environment variables (client & server) in a Frontity  Project 

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

### One last consideration

Using  `beforeSSR`  is independent of using a  `server.js`  file. You can add a  `beforeSSR`  function to your  `index.js`  and it works fine. The code, of course, will make it into the client bundle, but the action won’t be called there (unless you call it manually).

The only moment where you may want to divide between two separate  `client.js`  and  `server.js`  files is:

* If you need to access Node libraries, like  `"fs"`  or  `"path"` , because that will fail if it’s present in the client bundle. For example, when using `dot-env`.
* If the code contains something that cannot be exposed to the client. For example, a hardcoded API key.
* If you are using a heavy library on the server that will increase the size of the client bundle unnecessarily. For example, we use  `he`  to decode entities in the server, but it [weights 73Kbs](https://bundlephobia.com/result?p=he@1.2.0) so we use the  `new DOMParser().parseFromString`  in the client, which is available in the browser and essentially free.