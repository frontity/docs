# frontity

## Overview

Apart from being the package that executes the Frontity commands in the terminal, `frontity` also exports functions, objects, etc. to be imported and used by other Frontity packages.

### State

Frontity exports **`connect`** to inject the Frontity state to your React components and make them reactive to changes in it.

* [connect](frontity.md#connect)

### CSS-in-JS

**`styled`**creates new React components from HTML tags, or other React components, with styles attached to them. **`css`** lets you to add inline styles to an element if you don't want to create a new component. If you want to add styles for the whole app, use **`Global`**. And **`keyframes`** is used to define and use animations in your CSS. Also, you can take a look at the [Styles](../learning-frontity/styles.md) page in our Learning Frontity section.

* [styled](frontity.md#styled)
* [css](frontity.md#css)
* [Global](frontity.md#global)
* [keyframes](frontity.md#keyframes)

### Code Splitting

Use **`loadable`** in order to separate you code into different bundles that will be dynamically loaded at runtime. This helps you to reduce your page size.

* [loadable](frontity.md#loadable)

### `<head>` tags <a id="head-tags"></a>

Use the **`Head`**component whenever you want to add HTML tags inside the `<head>` of any of your site's pages.

* [Head](frontity.md#head)

### `fetch` and `URL`

Frontity exports `fetch` and `URL` with the same API they have in the browser, but working exactly the same both in the client and in the server.

* [fetch](frontity.md#fetch)
* [URL](frontity.md#url)

## Api Reference

### `connect`

#### syntax

```javascript
ConnectedComponent = connect(Component);
```

Function that receives a React component an returns the same component but connected to the Frontity state. Any instance of that component will receive three new props: `state`, `actions` and `libraries`, allowing the component to read the state, manipulate it through actions or use any code other packages have exposed in libraries. Also, that instance will re-render automatically whenever the value of any attribute that the component reads from the state changes.

**arguments**

* `Component`: a React component

#### return value

* the same component connected to the Frontity state

#### example

{% code-tabs %}
{% code-tabs-item title="Page.js" %}
```jsx
import React from "react";
import { connect } from "connect";
import { Loading, List, Post, Page404 } from ".";

const Page = ({ state }) => {
  // Next line will trigger a re-render whenever
  // the value of "state.router.link" changes.
  const data = state.source.get(state.router.link);
  return (
    <>
      {((data.isFetching && <Loading />) ||
        (data.is404 && <Page404 />) ||
        (data.isArchive && <List />) ||
        (data.isPostType && <Post />) ||
        null)}
    </>
  );
};

// Connect Page to the Frontity state
export default connect(Page);
```
{% endcode-tabs-item %}
{% endcode-tabs %}



### `styled`

#### syntax

```jsx
StyledComponent = styled(Component)`background: aliceblue`;
StyledDiv = styled.div`font-size: 24px`;
```

Function that receives an HTML tag or a React component as argument and returns a function that can be used as a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates), inside which you write the CSS code for your component. The tag function returns a styled component with the CSS you wrote. Also, `styled` has built-in tag functions for every HTML tag so in those cases it is not necessary to call `styled` directly.

We use a library called `emotion` under the hood so you may check [their docs](https://emotion.sh/docs/styled).

#### arguments

* a template literal containing CSS code

#### return value

* a React component with the styles defined

#### example

```jsx
import { styled } from "frontity";
import { Page } from ".";

const Main = () => (
  <Container>
    <StyledPage background="aliceblue" />
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledPage = styled(Page)`
  background: ${props => props.background};
`;
```



### `css`

#### syntax

```javascript
styleObject = css`background: pink`;
```

Tagged template literal to add inline style to React Components. The usage is quite similar to `styled` except that **`css`** doesn't return a React Component but a special object that can be passed to a component through the `css` prop.

We use a library called `emotion` under the hood so you may check [their docs](https://emotion.sh/docs/css-prop).

#### arguments

* a template literal containing CSS code

#### return value

* a style object to be passed to a `css` prop or to the **`<Global>`**'s `styles` prop

#### example

```jsx
import { css } from "frontity";

const Component = () => (
  <div css={css`background: pink`}>
    Styling my theme
  </div>
);
```



### `Global`

#### syntax

```jsx
<Global styles={styleObject} />
```

React component that creates global styles for the whole Frontity site.

{% hint style="warning" %}
**Using `<Global>` for other than html tags is not recommended** because Frontity is not able to optimize it. That means you can use it for tags like `html`, `body` , `a`, `img`, and so on... but **avoid it for classes**. Use either the css prop or styled components instead.
{% endhint %}

#### props

* **`styles`**: an style object created with [`css`](frontity.md#css)

#### example

```jsx
import { Global, css } from "frontity";

const Page = () => (
    <>
        <Global
          styles={css`
            body {
                margin: 0;
                font-family: "Roboto";
            }
          `}
        />
        <OtherContent />
    </>
);
```



### `keyframes`

#### syntax

```jsx
animation = keyframes`from { ... } to { ... }`;
```

Function used to define and use animations in your CSS.

#### arguments

* a template literal containing [CSS @keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) code

#### return value

* an animation object to be used inside a template literal passed to [`styled`](frontity.md#styled) or [`css`](frontity.md#css)

#### example

```jsx
import { styled, keyframes } from "frontity";

// Create the keyframes.
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Add the animation to Button.
const Button = styled.button`
  background-color: hotpink;
  animation: ${rotate} 2s linear infinite;
`;

const Component = () => (
  <Button>Styling my theme</Button>
);
```



### `loadable`

#### syntax

```jsx
HeavyComponent = loadable(importFunction, options);
```

Function that loads a component asynchronously generating a different bundle for it. Frontity has integrated and configured [Loadable Components](https://www.smooth-code.com/open-source/loadable-components/docs/code-splitting/), in case you want to check its docs, or take a look at the [Code Splitting](../learning-frontity/code-splitting.md) page inside the Learning Frontity section.

#### arguments

* **`importFunction`**: a function that executes a [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Import) and returns a `Promise` that will contain the imported module
* **`options`**: an object with any of the following properties:
  * `fallback`: component displayed until the `Promise` resolves
  * `ssr`: if `false`, it will not be processed server-side \(default to `true`\)

#### return value

* a React component

#### example

```jsx
import { loadable } from "frontity";
import Content from "./components/content";

// Thanks to loadable we prevent comments from loading until it's needed.
const HeavyComments = loadable(() => import('./components/comments'));

const Post = ({ state }) => (
  <>
    <Content />
    {state.comments.areOpened && <HeavyComments />}
  </>
);

export default connect(Post);
```



### `Head`

#### syntax

```jsx
<Head>{children}</Head>
```

React component that injects their children to the HTML `<head>` tag. It allows you to change the title while navigating, add meta tags, scripts, etc. As we use `react-helmet` under the hood, you may check its [reference guide](https://github.com/nfl/react-helmet#reference-guide). 

#### props

* **`children`**: the HTML tags you want to appear inside `<head>`

#### example

```jsx
import { Head } from "frontity";

const Theme = () => (
  <Head>
    <title>My awesome blog</title>
    <meta name="description" content="This blog is just for being awesome" />
    <html lang="en" />
    <link rel="canonical" href="https://example.com" />
  </Head>
);
```



### `fetch`

#### syntax

```javascript
fetchResponsePromise = fetch(resource, init);
```

Function with the [WHATWG API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for fetching a resource from the network. This function is safe to use both server and client side.

#### arguments

* **`resource`**: a string containing the direct URL of the resource you want to fetch
* **`init`**: an options object containing any custom settings that you want to apply to the request \(go to [this link](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) for the complete list of available settings\)

#### return value

* a `Promise` that resolves to a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.

#### example

```javascript
import { fetch } from "frontity";

async getFromSomeAPI(resource) {
  const response = await fetch("https://site.com/api/v1" + resource);
  return await response.json();
}
```



### `URL`

#### syntax

```javascript
url = new URL(url, base)
```

Constructor with the [WHATWG API](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) to create [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)objects. This constructor is safe to use both server and client side.

#### arguments

* **`url`**: a string representing an absolute or relative URL. If `url` is a relative URL, `base` is required
* **`base`**: a string representing the base URL to use in case `url` is a relative URL

#### return value

* a [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)object

#### example

```jsx
import { URL } from "frontity";

const getWpSubdir = ({ state }) => {
  const { pathname } = new URL(state.source.api);
  return pathname.replace(/\/wp-json\/?$/, "/");
};
```



