---
description: Guide to understand how our starter them works.
---

# Understanding Mars Theme

Mars theme is our starter theme and is installed by default on `frontity create`. Here we'll explain how [`@frontity/mars-theme`](https://github.com/frontity/frontity/tree/dev/packages/mars-theme) works.

> If you yet don't understand the structure of a Frontity project, please read our guide [Understanding a Frontity project](understanding-mars-theme.md).

## Structure

The structure of our extension is:

```text
mars-theme/
|__ index.ts
|__ package.json
|__ src/
    |__ html/
    |   |__ client.js
    |   |__ server.js
    |__ amp/
        |__ server.js
```

The `index.ts` file is where we are exporting our extension's type definition.

Inside the `src` folder you can find a folder for each mode supported by Frontity. Right now we support `html` and `amp`. Frontity will look after two files inside these folders: `client.js` and `server.js`. Each file exports what is needed by Frontity either on the server side or on the client side. In our case, the export is exactly the same. Also, `amp` will have only a `server.js` file because AMP sites are only server side rendered, therefore they don't execute code on the client side.

## Dependencies

### Types

So, in order to define our extension's types, we are using three dependencies: `frontity/types`, `@frontity/source` and `@frontity/router`.

While `frontity/types` are the core types of Frontity, used to extend from and define the types of other packages, `@frontity/source` and `@frontity/router` are the types of a specific set of packages that can themselves be extended.

For example, our `@frontity/source` types are extended by `@frontity/wp-source` but it could also be extended by a hypothetical `@frontity/grahpql-wp-source`. So, when we are using `@frontity/source` in our theme, we are relying on that any other package that extends `@frontity/source` will be compatible with our theme. Even if that other package has more features, as far as it respects the structure defined by `@frontity/source`, it won't be a problem.

```typescript
// index.ts

import { Action, Package } from "frontity/types";
import Router from "@frontity/router";
import Source from "@frontity/source";

interface MarsTheme extends Package {
  name: "@frontity/mars-theme";
  roots: {
    theme: React.ReactType;
  };
  state?: {
    router?: Router["state"]["router"];
    source?: Source["state"]["source"];
    theme: {
      menu: [string, string][];
      featured: {
        showOnList: boolean;
        showOnPost: boolean;
      };
    };
  };
  actions: {
    router?: Router["actions"]["router"];
    source?: Source["actions"]["source"];
    theme: {
      beforeSSR: Action<MarsTheme>;
    };
  };
}

export default MarsTheme;

```

### Utils

Utils are those libraries that are part of the Frontity core and need to be exposed to us in order to successfully develop a theme that integrates completely with Frontity. All those utils are exposed in the`frontity` package.

For example, our state manager `@frontity/connect` exposes a HOC called `connect` to wrap our React components so we can access the Frontity store from them. To avoid us the need to remember lots of packages and dependencies, we can import `connect` and other libraries like this:

```jsx
import { connect, styled } from "frontity";

const HelloWorld = () => <Container>Hello World!</Container>

export default connect(HelloWorld);

const Container = styled.div`
  background: blue;
  color: white;
`;
```

As you can see in the example above, we are accessing also `styled` from `frontity`. In this case `frontity` is just exposing the API of `@emotion/styled`, and it does this with other libraries like `react-helmet`, so you get everything that you'd usually need in just one line.

## Exports

Our extension needs to export two things: the **types** and the **extension** itself, that consists of an object defining the different parts that `@frontity/core` will require from the extension.

By convention, our types are in the default export. If you need to use the types of `mars-theme` you can import them as shown below:

```typescript
import MarsTheme from "@frontity/mars-theme";
```

The extension itself is exported in the `client.js` and `server.js` files, which are imported by `@frontity/core`. 

{% hint style="info" %}
As a developer, you'll never need to import another extension, you will just use the needed state and actions from other extensions directly from the store.
{% endhint %}

### Types

Types were pretty much explained above, on the [dependencies](understanding-mars-theme-1.md#types) part of this guide.

We expose the `mars-theme` types to be used by this extension, or by other extensions.

### Extension

The extension itself can be an object or a function that returns that object. You can see the object structure explained in the following code, along with what we are exporting in `mars-theme`:

```typescript
import Theme from "./components/theme";

const marsTheme = {
  // The name of the extension.
  name: "@frontity/mars-theme",
  // The React components that will be rendered.
  roots: {
    theme: Theme,
  },
  // The state that the extension needs to create in order to work.
  state: {
    theme: {
      menu: [
        ["Home", "/"]
      ]
    }
  },
  // The actions that the extension needs to create in order to work.
  // In our case, `mars-theme` doesn't export any actions.
  actions: {},
  // The libraries that the extension needs to create in order to work.
  // In our case, `mars-theme` doesn't export any actions.
  libraries: {}
};
```

In each part of the exported object, what the extension defines needs to be inside its `namespace`. In our case, all the things we are defining are inside the `theme` namespace, but if our theme implemented, for example, a comments solution, that state, actions, etc., should be defined inside the `comments` namespace. So, in the case of `roots`, it would be something like:

```typescript
import Theme from './components/theme';
import Comments from './components/comments';

const extension = {
  ...
  roots: {
    theme: Theme,
    comments: Comments,
  },
  ...
};
```

## Building the theme

There are some steps that we need to go through in order to have our theme working:

### SSR populated

First of all, we want our server side rendering to be equal to our client side rendering to not harm the UX and SEO. In order to do this, we are going to use an action called `beforeSSR`. This action will be run by `@frontity/core` before the server side render is generated by React and it's the best place to request the data we need from our WP:

We are doing this in our `src/html/index.js` file, that we'll use later on `client.js` and `server.js`:

```javascript
const marsTheme = {
  name: "@frontity/mars-theme",
  roots: { ... },
  state: { ... },
  actions: {
    theme: {
      beforeSSR: async ({ state, actions }) => {
        // We read the path and page of the request
        // from our router.
        const { path, page } = state.router;
        // We use them to request the data from WP.
        await actions.source.fetch({ path, page });
      }
    }
  }
};
```

{% hint style="info" %}
We don't need to export this action in `client.js` as it will only run on the server while on the client will be ignored. We did it this way because it's a small function and it allows us to simplify the export files.
{% endhint %}

Now that we have the data we need to render our app, we can start writing some React. All the components described below can be found inside `src/html/components`.

### Theme component

Our main React component will be `Theme`, where we are deciding what kind of view to render, and in order for that component to access the store, we need to wrap it with the `connect` function. Once it's wrapped, we can access `state` and `actions` directly from the props. In this case, we are using `source.data()` to retrieve info about what kind of content should be rendered in the current path. If it happens to be an archive, we will render the `<List />` component, if a post type, the `<Post />` and if for some reason `wp-souce` couldn't retrieve the data from our WP, we will render a 404 page.

Here you have the code of `Theme` with some comments:

```jsx
// theme.js

import React from "react";
import {
  // Modules from `@emotion/core` and `@emotion/styled`.
  Global,
  css,
  styled,
  // Module from `@frontity/connect`.
  connect,
  // Alias for `Helmet` from `react-helmet`.
  Head
} from "frontity";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Page404 from "./page404.js";

const Theme = ({ state }) => (
  <>
    // Adding some elements to <head>
    // with `react-helmet`.
    <Head>
      <title>{state.frontity.title}</title>
      <html lang="en" />
    </Head>
    // Adding global styles to our app.
    <Global styles={globalStyles} />
    // Just rendering the Header component.
    <HeadContainer>
      <Header />
    </HeadContainer>
    <Body>
      // Here is where we use our `source.data()` to decide
      // what component we'll render.
      {state.source.data(state.router.path).isArchive && <List />}
      {state.source.data(state.router.path).isPostType && <Post />}
      {state.source.data(state.router.path).is404 && <Page404 />}
    </Body>
  </>
);

export default connect(Theme);
```

Between the `Post` component and the `List` component there are a bunch of different things going on here. I'll start with `List`.

### List component

It is exported from `list/index.js`. There, we are using `loadable` from `frontity` \(which is actually an alias for the `default` export of `@loadable/components`\) to split the code of our `List` component, so it won't be loaded if a user access directly to a `Post` view, and instead the code will be requested when the user clicks on a list view. This is helpful to reduce the loading times and times to interactive of our site. The less code we have, the less time the browser spends evaluating it.

```javascript
// list/index.js

import { loadable } from "frontity";

// Codesplit the list component so it's not included if the users
// load a post directly.
export default loadable(() => import("./list"));
```

Now, our `List` component is the responsible to render a list of posts, and for that it needs to know what posts to render. We are using `source.data(path)` again to access the `pages` field. In this field we have an array of pages starting on 1 \(`source.data(path).pages[0]` will be `undefined`\), and each element of the array is itself an array of posts for that page.

```javascript
// list/list.js

const List = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.data(state.router.path);
  // Get the items of the current page.
  const items = data.pages[state.router.page];

  return items ? (
    <Container>
      // If the list is from a taxonomy, we are rendering
      // a little header like `Category: Nature`.
      {data.isTaxonomy && (
        <Taxonomy>
          {data.taxonomy}: {state.source[data.taxonomy][data.id].name}
        </Taxonomy>
      )}
      // Map the content of the list to Item components.
      {items.map(({ type, id }) => {
        const item = state.source[type][id];
        return <Item key={item.id} item={item} />;
      })}
      // Render the Pagination component.
      <Pagination />
    </Container>
  ) : null;
};
```

The last detail we are going to explain is how we are doing pagination on `List`.

We are getting the total of pages for that list from `source.data(path)` and we are checking if we are either in the first one, the last one, or in the middle. Using the React hook `useEffect` we are prefetching the next page when the component mounts, so in the case the user goes there, he doesn't have to wait for the response from the WP REST API.

Depending on the page we are at the moment, we render different links to travel through the list. For that we are using our own `Link` component, which accepts the same parameters as `source.fetch()` or `router.set()`.

```javascript
// list/pagination.js

const Pagination = ({ state, actions }) => {
  const { totalPages } = state.source.data(state.router.path);
  const isThereNextPage = state.router.page < totalPages;
  const isTherePreviousPage = state.router.page > 1;

  // Fetch the next page if it hasn't been fetched yet.
  useEffect(() => {
    if (isThereNextPage)
      actions.source.fetch({
        path: state.router.path,
        page: state.router.page + 1
      });
  }, []);

  return (
    <div>
      {isThereNextPage && (
        // This is our custom Link component.
        <Link path={state.router.path} page={state.router.page + 1}>
          <em>← Older posts</em>
        </Link>
      )}
      {isTherePreviousPage && isThereNextPage && " - "}
      {isTherePreviousPage && (
        <Link path={state.router.path} page={state.router.page - 1}>
          <em>Newer posts →</em>
        </Link>
      )}
    </div>
  );
};
```

### Post component

There is something new here, that we haven't done on `List`. We are doing a preload of the `List` component \(as it is a dynamic component and we don't have that code yet\). Once we have our site rendered and working, we preload the code for `List`, so the user won't need to wait for it later if she decides to visit a list of posts.

```javascript
// post.js

import List from './list';

const Post = ({ state, actions }) => {
  const data = state.source.data(state.router.path);
  const post = state.source[data.type][data.id];
  // Get the author.
  const author = state.source.author[post.author];
  const date = new Date(post.date);

  useEffect(() => {
    actions.source.fetch("/");
    // Here is where we are preloading the List component.
    // This will run only on mount.
    List.preload();
  }, []);

  return data.isReady ? (
    <Container>
      { ... }
    </Container>
  ) : null;
};
```

### Link component

The `Link` component will use `@frontity/tiny-router` to handle the navigation within the app. It will render the children passed to it inside an `<a>`. It will populate the `href` attribute so the link still works even if JavaScript is not available, which will provoke a call to the server and get the next page server side rendered.

However, if JS is available, we are overriding the anchor behaviour with an `onClick` function. Inside that function, we are fetching the data needed to render our destination with `source.fetch(path)` and we are setting the URL to the new route with `router.set(path)`.

Note that we are mapping also a prop called `className` to the `<a>` class. This is done in case we want to style `Link`, e.g.: ```const StyledLink = styled(Link)``;```.

```javascript
// link.js

const Link = ({ actions, children, path, className, page }) => {
  // Get the href needed for <a>.
  const href = page ? `${path}page/${page}` : path;

  const onClick = event => {
    event.preventDefault();
    // Fetch the data if it's not already fetched.
    actions.source.fetch({ path, page });
    // Set the URL to the new route.
    actions.router.set({ path, page });
    window.scrollTo(0, 0);
  };

  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
};
```

### Defining the theme state

The last thing that might need to be explained is how we define `state` for our extension in order to use it within React and be able to set it with a `frontity.settings` file in a Frontity project.

In `mars-theme` we are defining the following `state`:

```javascript
// src/html/index.js

const marsTheme = {
  ...,
  state: {
    theme: {
      // This field will be used in our Nav bar.
      // Here we are defining the default value.
      menu: [["Home", "/"]],
      featured: {
        showOnList: false,
        showOnPost: false
      }
    }
  }
};
```

And we are using it as shown below:

```javascript
// src/html/components/nav.js

const Nav = ({ state }) => (
  <Container>
    // Here we are reading it and mapping the values into Nav links.
    {state.theme.menu.map(item => (
      <Item key={item[0]} isSelected={state.router.path === item[1]}>
        <Link path={item[1]}>{item[0]}</Link>
      </Item>
    ))}
  </Container>
);
```

And when we create a new Frontity project where our theme is installed, that state can be changed in `frontity.settings.js`:

```javascript
const settings = {
  ...,
  packages: [
    ...,
    {
      name: "@frontity/mars-theme",
      state: {
        theme: {
          // Here is where the owner of the project can
          // set the values of the `mars-theme` state.
          ...,
          menu: [
            ["Home", "/"],
            ["Nature", "/category/nature/"],
            ["Travel", "/category/travel/"],
            ["Japan", "/tag/japan/"],
            ["About Us", "/about-us/"]
          ],
        }
      }
    }
  ]
};
```



{% hint style="info" %}
Still any doubts? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

