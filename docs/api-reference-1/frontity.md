# `frontity`

## Overview

Apart from being the package that executes the Frontity commands in the terminal, `frontity` also exports functions, objects, etc. to be imported and used by other Frontity packages.

You can import any of these utils using:

```javascript
import { connect, styled, Head, ... } from "frontity";
```

### React

Use **`connect`** to inject `state`, `actions` and `libraries` in your React components.
If you are familiar with React hooks, you can use also **`useConnect`** to do the same.

Use the **`Head`** component whenever you want to add HTML tags inside the `<head>` of any of your site's pages.
You can read more **Head** in the [Head page](../learning-frontity/head.md) of our **Learning Frontity** section.

#### **API reference:**

- [connect](frontity.md#connect)
- [useConnect](frontity.md#useConnect)
- [Head](frontity.md#head)

### CSS in JS

**`styled`** creates new React components from HTML tags, or other React components, with styles attached to them.
**`css`** lets you to add inline styles to an element if you don't want to create a new component.
If you want to add styles for the whole app, use **`Global`**.
And **`keyframes`** is used to define and use animations in your CSS.

You can read more in the [Styles](../learning-frontity/styles.md) page of our **Learning Frontity** section.

#### **API reference:**

- [styled](frontity.md#styled)
- [CSS](frontity.md#css)
- [Global](frontity.md#global)
- [keyframes](frontity.md#keyframes)

### Code Splitting

Use **`loadable`** in order to separate you code into different bundles that will be dynamically loaded at runtime.
This helps you to reduce your page size.

You can read more in the [Code Splitting](../learning-frontity/code-splitting.md) page of our **Learning Frontity** section.

#### **API reference:**

- [loadable](frontity.md#loadable)

### `fetch` and `URL`

Frontity exports `fetch` and `URL` with the same API they have in the browser, but working exactly the same both in the client and in the server.

#### **API reference:**

- [fetch](frontity.md#fetch)
- [URL](frontity.md#url)

### Helpers

#### API reference:

- [decode](frontity.md#decode)

## API Reference

### `connect`

#### Syntax

```javascript
ConnectedComponent = connect(Component, options?);
```

It's a function that receives a React component an returns the same component but connected to the Frontity state, actions and libraries.
Any instance of that component will receive three new props: `state`, `actions` and `libraries`, allowing the component to read the state, manipulate it through actions or use any code other packages have exposed in libraries.
Also, that instance will re-render automatically whenever any value from the `state` which the component is using is changed.

If you don't want to inject the Frontity state props in your connected components, you can use the `injectProps` option set to `false`.
Components will still be reactive to changes in the state but without receiving more props.
For these components to access the state use the [`useConnect`](frontity.md#useConnect) hook.

**Arguments**

- `Component`: a React component
- `options` (optional): object with the following properties:
  - `injectProps`: Boolean.
If `false`, the `state`, `actions` and `libraries` won't be passed as props to the component.
Default is `true`

#### Return value

- The same component as passed in as the first argument but connected to the Frontity state

#### Example

{% code title="Page.js" %}

```jsx
import React from "react";
import { connect } from "connect";
import { Loading, List, Post, PageError } from "./components";

const Page = ({ state }) => {
  // The next line will trigger a re-render whenever
  // the value of "state.router.link" changes.
  const data = state.source.get(state.router.link);

  return (
    <Switch>
      <Loading when={data.isFetching} />
      <List when={data.isArchive} />
      <Post when={data.isPostType} />
      <PageError when={data.isError} />
    </Switch>
  );
};

// Connect Page to the Frontity state.
export default connect(Page);
```

{% endcode %}

### `useConnect`

#### Syntax

```javascript
const { state, actions, libraries } = useConnect();
```

It's a React hook that returns the Frontity state, allowing the component to consume `state`, `actions` and `libraries` in components without passing them as props.


#### Return value

- The Frontity state (`state`, `actions` and `libraries`)

#### Example

{% code title="Page.js" %}

```jsx
import React from "react";
import { connect, useConnect } from "connect";
import { Loading, List, Post, PageError } from "./components";

const Page = () => {
  // Get state using useConnect hook.
  const { state } = useConnect();

  // The next line will trigger a re-render whenever
  // the value of "state.router.link" changes.
  const data = state.source.get(state.router.link);

  return (
    <Switch>
      <Loading when={data.isFetching} />
      <List when={data.isArchive} />
      <Post when={data.isPostType} />
      <PageError when={data.isError} />
    </Switch>
  );
};

// Connect Page to the Frontity state.
export default connect(Page);
```

{% endcode %}

#### Use Case of `{ injectProps: false }` with `connect`

Most of the times you'll use `useConnect` in this way:

```jsx
const Input = ({ name, type }) => {
    const { state } = useConnect();
   // Do something with `state`.

  return <input name={name} type={type} />
};

export default connect(Input);
```


But if you want to pass down props to a HTML tag, like in this case:

```jsx
const Input = ({ name, type, ...props }) => {
   const { state } = useConnect();
   // Do something with `state`.

  return <input name={name} type={type} {...props} />
};

export default connect(Input);
```

You'll end up passing `actions` and `libraries` to `<input>` as well, because they are injected by `connect`.

To avoid this you can:
- Add `{ injectProps: false }` to `connect`.
- Use `const { state, actions, libraries } = useConnect();`.

```jsx
const Input = (props) => {
    const { state } = useConnect();
   // Do something with `state` (or `actions` and `libraries`).

  return <input {...props} />
};

// Avoid injecting `state`, `actions` and `libraries` so they are not present in `...props`.
export default connect(Input, { injectProps: false });
```


### `styled`

#### Syntax

```jsx
// You can use an HTML tag like this.
const StyledDiv = styled.div`
  font-size: 24px;
`;

// Or use it like a function and pass a React component.
const StyledComponent = styled(Component)`
  background: aliceblue;
`;
```

It's a function that receives an HTML tag or a React component as argument and returns a function that can be used as a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates).
Inside, you write the CSS code for your component.
The tag function returns a styled component with the CSS you wrote.
Also, `styled` has built-in tag functions for every HTML tag so in those cases it is not necessary to call `styled` directly.

#### Arguments

- A template literal containing CSS code

#### Return value

- A React component with the styles defined

#### Example

```jsx
import { styled } from "frontity";
import { Page } from "./page";

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
  background: ${(props) => props.background};
`;
```

### `css`

#### Syntax

```javascript
const styleObject = css`
  background: pink;
`;
```

It's a tagged template literal to add inline style to React Components.
The usage is quite similar to **`styled`** except that **`css`** doesn't return a React Component but a special object that can be passed to a component through the **`css`** prop.

#### Arguments

- A template literal containing CSS code

#### Return value

- A style object to be passed to a **`css`** prop or to the **`<Global>`**'s **`styles`** prop

#### Example

```jsx
import { css } from "frontity";

const Component = () => (
  <div
    css={css`
      background: pink;
    `}
  >
    Styling my theme
  </div>
);
```

### `Global`

#### Syntax

```jsx
<Global styles={styleObject} />
```

It's a React component that creates global styles for the whole Frontity site.

{% hint style="warning" %}
**Using `<Global>` for other than HTML tags is not recommended** because Frontity is not able to optimize it.
That means you can use it for tags like `html`, `body` , `a`, `img`, and so on...
But **avoid it for classes**.
Use either the CSS prop or styled-components instead.
{% endhint %}

#### Props

- **`styles`**: an style object created with [`css`](frontity.md#css)

#### Example

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

#### Syntax

```jsx
const animation = keyframes`
    from { ... } to { ... };
`;
```

It's a function used to define and use animations in your CSS.

#### Arguments

- A template literal containing [CSS @keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) code

#### Return value

- An animation object to be used inside a template literal passed to [`styled`](frontity.md#styled) or [`css`](frontity.md#css)

#### Example

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

// Add the animation to the styled component.
const Button = styled.button`
  background-color: hotpink;
  animation: ${rotate} 2s linear infinite;
`;

const Component = () => <Button>Styling my theme</Button>;
```

### `loadable`

#### Syntax

```jsx
const HeavyComponent = loadable(importFunction, options);
```

It's a function that loads a component asynchronously generating a different bundle for it.
Frontity has integrated and configured [Loadable Components](https://www.smooth-code.com/open-source/loadable-components/docs/code-splitting/), in case you want to check its docs.
You can also take a look at the [Code Splitting](../learning-frontity/code-splitting.md) page inside the Learning Frontity section.

#### Arguments

- **`importFunction`**: a function that executes a [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Import) and returns a `Promise` that will contain the imported module
- **`options`**: an object with any of the following properties:
  - `fallback`: component displayed until the `Promise` resolves
  - `ssr`: if `false`, it will not be processed server-side \(default to `true`\)

#### Return value

- A React component

#### Example

```jsx
import { loadable } from "frontity";
import Content from "./components/content";

// Thanks to loadable we prevent comments from loading until it's needed.
const HeavyComments = loadable(() => import("./components/comments"));

const Post = ({ state }) => (
  <>
    <Content />
    {state.comments.areOpened && <HeavyComments />}
  </>
);

export default connect(Post);
```

### `Head`

#### Syntax

```jsx
<Head>{children}</Head>
```

It's a React component that injects their children in the HTML `<head>` tag.
It allows you to change the title while navigating, add meta tags, scripts, etc.
As we use `react-helmet` under the hood, you may check its [reference guide](https://github.com/nfl/react-helmet#reference-guide).

#### Props

- **`children`**: the HTML tags you want to appear inside `<head>`

#### Example

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

#### Syntax

```javascript
const fetchResponsePromise = fetch(resource, init);
```

It's a function with the [WHATWG API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for fetching a resource from the network.
This function is safe to use both server and client side, but you have to import it first.

#### Arguments

- **`resource`**: a string containing the direct URL of the resource you want to fetch
- **`init`**: an options object containing any custom settings that you want to apply to the request \(go to [this link](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) for the complete list of available settings\)

#### Return value

- A `Promise` that resolves to a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object

#### Example

```javascript
import { fetch } from "frontity";

const getFromSomeAPI = async (resource) => {
  const response = await fetch("https://site.com/api/v1" + resource);
  const body = await response.json();
  return body;
};
```

### `URL`

#### Syntax

```javascript
const url = new URL(url, base);
```

It's a constructor with the [WHATWG API](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) to create [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)objects.
This constructor is safe to use both server and client side, but you have to import it first.

#### Arguments

- **`url`**: a string representing an absolute or relative URL.
If `url` is a relative URL, `base` is required
- **`base`**: a string representing the base URL to use in case `url` is a relative URL

#### Return value

- A [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)object

#### Example

```jsx
import { URL } from "frontity";

const getApiPathname = ({ state }) => {
  const { pathname } = new URL(state.source.api);
  return pathname;
};
```

### `decode`

An entity decoder that decodes HTML numeric entities and [XML named entities](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).
It works both in the server and the client and it's optimized to be both lightweight and performant.

#### Syntax

```jsx
const decodedText = decode(text);
```

#### Arguments

- **`text`**: a string representing the HTML to be escaped

#### Return value

- `string`

#### Example

```jsx
import { decode } from "frontity";

const decodedText = decode("milk &amp; cookies");

console.log(decodedText); // "milk and cookies"
```
