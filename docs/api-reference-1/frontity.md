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

Use the **`Head`** component whenever you want to add HTML tags inside the `<head>` of any of your site's pages. You can read more **Head** in the [Head page](../learning-frontity/head.md) of our **Learning Frontity** section.

Use the **`Slot`** component whenever you want to add a 'placeholder' to your theme which will be filled with a **`Fill`**. Fills are added to the state in the `state.fills` namespace.

#### **API reference:**

* [connect](frontity.md#connect)
* [useConnect](frontity.md#useConnect)
* [Head](frontity.md#head)
* [Slot](frontity.md#slot)

### CSS in JS

**`styled`** creates new React components from HTML tags, or other React components, with styles attached to them. **`css`** lets you to add inline styles to an element if you don't want to create a new component. If you want to add styles for the whole app, use **`Global`**. And **`keyframes`** is used to define and use animations in your CSS.

You can read more in the [Styles](../learning-frontity/styles.md) page of our **Learning Frontity** section.

#### **API reference:**

* [styled](frontity.md#styled)
* [CSS](frontity.md#css)
* [Global](frontity.md#global)
* [keyframes](frontity.md#keyframes)

### Code Splitting

Use **`loadable`** in order to separate you code into different bundles that will be dynamically loaded at runtime. This helps you to reduce your page size.

You can read more in the [Code Splitting](../learning-frontity/code-splitting.md) page of our **Learning Frontity** section.

#### **API reference:**

* [loadable](frontity.md#loadable)

### `fetch` and `URL`

Frontity exports `fetch` and `URL` with the same API they have in the browser, but they work the same both in the client and in the server.

#### **API reference:**

* [fetch](frontity.md#fetch)
* [URL](frontity.md#url)

### Helpers

#### API reference:

* [decode](frontity.md#decode)

## API Reference

### `connect`

#### Syntax

```javascript
ConnectedComponent = connect(Component, options?);
```

It's a function that receives a React component and returns the same component but connected to the Frontity state, actions and libraries. Any instance of that component will receive three new props: `state`, `actions` and `libraries`, allowing the component to read the state, manipulate it through actions or use any code other packages have exposed in libraries.

Also, that instance will re-render automatically whenever any value from the `state` which the component is using is changed.

If you don't want to inject the Frontity state props in your connected components, you can use the `injectProps` option set to `false`. Components will still be reactive to changes in the state but without receiving more props.

For these components to access the state use the [`useConnect`](frontity.md#useConnect) hook.

**Arguments**

* `Component`: a React component
* `options` \(optional\): object with the following properties:
  * `injectProps`: Boolean

    If `false`, the `state`, `actions` and `libraries` won't be passed as props to the component.

    Default is `true`

#### Return value

* The same component as passed in as the first argument but connected to the Frontity state

#### Example

{% code title="Page.js" %}
```jsx
import React from "react";
import { connect } from "frontity";
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

{% hint style="warning" %}
You still need to use `connect` when using `useConnect` properly.

By using `connect`:

* Your components get optimized with _memo_, so they won't re-render whenever a parent component re-renders
* Your components get reactive, so they will re-render when the parts of state they use are changed
{% endhint %}

#### Return value

* The Frontity state \(`state`, `actions` and `libraries`\)

#### Example

{% code title="Page.js" %}
```jsx
import React from "react";
import { connect, useConnect } from "frontity";
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

  return <input name={name} type={type} />;
};

export default connect(Input);
```

But if you want to pass down props to a HTML tag, like in this case:

```jsx
const Input = ({ name, type, ...props }) => {
  const { state } = useConnect();
  // Do something with `state`.

  return <input name={name} type={type} {...props} />;
};

export default connect(Input);
```

You'll end up passing `actions` and `libraries` to `<input>` as well, because they are injected by `connect`.

To avoid this you can:

* Add `{ injectProps: false }` to `connect`
* Use `const { state, actions, libraries } = useConnect();`

```jsx
const Input = (props) => {
  const { state } = useConnect();
  // Do something with `state` (or `actions` and `libraries`).

  return <input {...props} />;
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

`styled` is a function that receives an HTML tag or a React component as the argument and returns a function that can be used as a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates). Inside, you write the CSS code for your component.

The `styled` tag function returns a styled component with the CSS you wrote.

Also, `styled` has built-in tag functions for every HTML tag so in those cases it is not necessary to call `styled` directly.

#### Arguments

* A template literal containing CSS code

#### Return value

* A React component with the styles defined

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

It's a tagged template literal to add an inline style to React Components.

The usage is quite similar to **`styled`** except that **`css`** doesn't return a React Component but a special object that can be passed to a component through the **`css`** prop.

#### Arguments

* A template literal containing CSS code

#### Return value

* A style object to be passed to a **`css`** prop or to the **`<Global>`**'s **`styles`** prop

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
**Using `<Global>` for other than HTML tags is not recommended** because Frontity is not able to optimize it. That means you can use it for tags like `html`, `body` , `a`, `img`, and so on... But **avoid it for classes**. Use either the CSS prop or styled-components instead.
{% endhint %}

#### Props

* **`styles`**: an style object created with [`css`](frontity.md#css)

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

* A template literal containing [CSS @keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) code

#### Return value

* An animation object to be used inside a template literal passed to [`styled`](frontity.md#styled) or [`css`](frontity.md#css)

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

It's a function that loads a component asynchronously generating a different bundle for it. Frontity has integrated and configured [Loadable Components](https://www.smooth-code.com/open-source/loadable-components/docs/code-splitting/), in case you want to check its docs.

You can also take a look at the [Code Splitting](../learning-frontity/code-splitting.md) page inside the Learning Frontity section.

#### Arguments

* **`importFunction`**: a function that executes a [dynamic import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Import) and returns a `Promise` that will contain the imported module
* **`options`**: an object with any of the following properties:
  * `fallback`: component displayed until the `Promise` resolves
  * `ssr`: if `false`, it will not be processed server-side \(default to `true`\)

#### Return value

* A React component

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

It's a React component that injects their children in the HTML `<head>` tag. It allows you to change the title while navigating, add meta tags, scripts, etc.

As we use `react-helmet` under the hood, you may check its [reference guide](https://github.com/nfl/react-helmet#reference-guide).

#### Props

* **`children`**: the HTML tags you want to appear inside `<head>`

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

### `useFills`

A React hook to ease the creation of `Slot` components.

#### Syntax

```javascript
const fills = useFills("Slot Name");
```

#### Parameters

| Name | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| **`slotName`** | string | undefined | true | A string that refers to the name of the Slot. |

#### Return value

`Fill[]`

An array of configuration objects for the fills that want to fill the slot passed by the `slotName` parameter. The values in those objects will come from the fills defined by the user of the slot in `state.fills`.

Mind that a user might define more than one fill for a particular slot. Because of this, we always return a list of slots sorted in **ascending order** by their `priority`.

Each configuration object has this structure:

| Name | Type | Description |
| :--- | :--- | :--- |
| **`Fill`** | ReactComponent | The component that should be rendered for this fill. |
| **`slot`** | string | The name of the slot. Mind that a user can define multiple fills that fill the same slot, so there might exist more than one object with the same `slot` property. Defined in `state.fills.namespace.fillName.slot`. |
| **`props`** | object | The props that should be passed down to the component. Defined in `state.fills.namespace.fillName.props`. |
| **`library`** | string | The name of the library that is using the fill. defined in `state.fills.namespace.fillName.library`. |
| **`priority`** | number | The priority of the fill. By default, the fills are sorted in ascending order according to this value. Defined in `state.fills.namespace.fillName.priority`. |
| **`key`** | string | This is a unique value that identifies the particular fill. It's a combination of the `namespace` and the `fillName`. |

#### Example

Import the hook in your React component and use it to create a component:

```jsx
import { useFills } from "frontity";

const Comp = () => {
  const fills = useFills("slot 1");

  return (
    <>
      {fills.map(({ Fill, props, key }) => (
        <Fill key={key} {...props} />
      ))}
    </>
  );
};

export default connect(Comp);
```

{% hint style="info" %}
You need to wrap the component that uses the `useFills` hook with `connect()` in order for that component to work.
{% endhint %}

#### Debug mode

If you want to see all the slots added to a theme/package without having to add fills for all of them, you can turn the debug mode on:

```javascript
state.frontity.debug = true;
```

If you want to do this on the console, remember that you need to access the `state` using `frontity.state`, like this:

![Debug mode in the console](../.gitbook/assets/frontity-debug-in-console%20%281%29.png)

### `fetch`

#### Syntax

```javascript
const fetchResponsePromise = fetch(resource, init);
```

It's a function with the [WHATWG API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) for fetching a resource from the network.

This function is safe to use both server and client-side, but you have to import it first.

#### Arguments

* **`resource`**: a string containing the direct URL of the resource you want to fetch
* **`init`**: an options object containing any custom settings that you want to apply to the request \(go to [this link](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) for the complete list of available settings\)

#### Return value

* A `Promise` that resolves to a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object

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

It's a constructor with the [WHATWG API](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) to create [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) objects.

This constructor is safe to use both server and client side, but you have to import it first.

#### Arguments

* **`url`**: a string representing an absolute or relative URL

  If `url` is a relative URL, `base` is required

* **`base`**: a string representing the base URL to use in case `url` is a relative URL

#### Return value

* A [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL)object

#### Example

```jsx
import { URL } from "frontity";

const getApiPathname = ({ state }) => {
  const { pathname } = new URL(state.source.api);
  return pathname;
};
```

### `decode`

An entity decoder that decodes HTML numeric entities and [XML named entities](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references). It works both in the server and the client and it's optimized to be both lightweight and performant.

#### Syntax

```jsx
const decodedText = decode(text);
```

#### Arguments

* **`text`**: a string representing the HTML to be escaped

#### Return value

* `string`

#### Example

```jsx
import { decode } from "frontity";

const decodedText = decode("milk &amp; cookies");

console.log(decodedText); // "milk and cookies"
```

### `Slot`

The `<Slot />` component enables the use of a powerful pattern called Slot and Fill. This allows for any React component to be inserted into, or hooked onto, different places within the app, thereby improving extensibility.

This component allows a theme developer to insert named `<Slot>` components in various places in a theme. Other package developers are then able to add _'fill'_ components which will be hooked onto the named slots.

#### Rationale

When developing a site the developer is often required to make certain customisations to the structure and/or appearance of the site. This can be difficult to do and necessitates modifying the core code of the theme.

Theme developers are able to facilitate such customisations by adding `<Slot />` components at various places in the theme, e.g. above the header, below the header, before the content, etc...

These 'slots' can then be filled with custom components that have been added by the site developer and which are then 'hooked' onto a particular 'slot' to insert the content in that place on the page.

An example might be as follows - the site developer wants to place a third party ad above the content of each page. The theme developer has thoughtfully provided a slot in that position in the theme:

```jsx
//...
const Content = () => {
  //...
  <Container>
  <Slot name="Before Content">
  //...
  </Container>
  //...
}
```

The site developer is now able to 'hook' a component that returns an ad onto that slot, so that the ad gets rendered in that position on the page. This component is referred to as a _'fill'_.

#### Syntax

```jsx
<Slot name="name of the slot" data={data} myprops={myprops} />
```

or

```jsx
<Slot name="name of the slot" data={data} myprops={myprops}>
  {children}
</Slot>
```

#### Props

All the following props can be passed to the `<Slot/>` component.

| Name | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `name` | string | `undefined` | yes | The name of the Slot. The user of this Slot will have to specify this name in order to insert a Fill component. |
| `children` | ReactNode | `undefined` | yes | The component that will be used as a fallback in case that no fill is specified for a particular Slot. You can use any type of data that is a valid React element. |
| `data` | ReturnType | `state.source.get(state.router.link)` | no | Any data that you might want to pass to the Fill. Normally used for passing route data fetched in the parent component. If you don't pass any value, the `<Slot/>` component will set the value of this prop to `state.source.get(state.router.link)` for you automatically. |
| `any other prop` | any | undefined | no | Any other custom prop. The theme can specify other props and they will be passed down to the Fill. |

#### Examples

The simplest example of a Slot would be:

```jsx
import { Slot } from "frontity";

const Theme = ({ state }) => (
  <>
    <Slot name="Above Header" />
    <Header />
    <Slot name="Below Header" />
    {/* ... */}
  </>
);
```

Slots can also pass data to the `Fill` components that will be inserted in place of those slots:

```jsx
import { Slot } from "frontity";

const Carousel = ({ state }) => {

  // Get latest posts.
  const homeData = state.source.get("/");

  return homeData.items.map((post, index) => {
    const data = state.source.get(post.link);
    return (
      <>
        <Slot data={data} name={`Before post ${index}`} />
        <PostCard />
        <Slot data={data} name={`After post ${index}`} />
      </>
    );
  });

};
```

Slots can also pass arbitrary props to the `Fill` components that will be inserted in place of those slots. In this example we're using 'index' to pass the value of `index` to the Fills:

```jsx
import { Slot } from "frontity";

const Carousel = ({ state }) => {

  // Get latest posts.
  const homeData = state.source.get("/");

  return homeData.items.map((post, index) => {
    const data = state.source.get(post.link);
    return (
      <>
        <Slot data={data} index={index} name="Before post" />
        <PostCard />
        <Slot data={data} index={index} name="After post" />
      </>
    );
  });

};
```

The Slot component supports optional children that are rendered if no fills are present. You can use any type of data that is valid as a react element:

```jsx
const Post = () => (
  <>
    {/* ... */}
    <PostTitle />
    <Slot name="Between post title and post meta">
      <Separator />
    </Slot>
    <PostMeta />
    {/* ... */}
  </>
);
```

#### Fills

Fills are added to the `state`, to a common namespace called `fills`. Each fill consists of a configuration object that should be given a unique key and assigned to a namespace. To learn more about namespaces see [this section](https://github.com/frontity/docs/tree/86e298278ca553c95aea7d6313205cebf3e2747b/docs/learning-frontity/namespaces/README.md) of our docs.

More than one Fill can be hooked onto any single Slot, and these can be ordered according to a `priority` attribute assigned to the Fill.

```jsx
// my-frontity-app/packages/my-theme/src/index.js

const state = {
  fills: {
    namespace: {
      nameOfTheFill: {
        slot: "Name of the slot they want to fill", // This has to match the `name` prop passed to <Slot/>
        library: "libNamespace.ComponentName",
        priority: 5,
        props: {
          // Object with props that will be passed to the component.
        },
      },
    },
  },
};
```

Fills configuration objects structure:

| Name | Description | Required |
| :--- | :--- | :--- |
| `object key` | Name of your fill, must be unique. | yes |
| `slot` | Name of the slot they want to fill. | yes |
| `library` | Name of the component they want to use. This is obtained from `libraries.fills` \(see below\). | yes |
| `priority` | Priority of the fill. Default is 10. \(lower value means higher priority\) | no |
| `props` | Object with props that will be passed to the component. | no |

Fills configuration objects can have a false value. This is useful if a package creates a fill by default and a user \(or another package\) wants to turn it off.

```jsx
// my-frontity-app/packages/my-theme/src/index.js

const state = {
  fills: {
    namespace: {
      nameOfTheFill: false,
    },
  },
};
```

The actual components that will be hooked onto a `<Slot>` should be exposed in `libraries.fills` by Frontity packages. They can be defined anywhere you like, as long as you can import them and pass to `libraries.fills`. For example:

```jsx
// my-frontity-app/packages/my-theme/src/fills.js

export const FillComponent = ({
  // If the Slot creator has passed a `data` prop to the Slot,
  // you can access it here. Otherwise, this prop will be automatically
  // populated with the value of `state.source.get(state.router.link)`
  data,

  // Any other props passed by the creator of the Slot will be available as well!
  ...props
  }) => (
    <div>
      This is the fill content
    </div>
  )
}
```

```jsx
// my-frontity-app/packages/my-theme/src/index.js

import { MyFillComponent } from "./fills"; // This is the component defined below

export default {
  state: {
    //...
  },
  actions: {
    //...
  },
  libraries: {
    fills: {
      libNamespace: {
        ComponentName: MyFillComponent
      },
    },
  },
};
```

Note that `libNamespace.ComponentName` here matches the value of `state.fills.namespace.nameOfTheFill.library` above. `FillComponent` here is the actual component which is defined elsewhere and may be imported. The return value of this component, i.e. `FillComponent`, is the content that will be inserted into HTML at the position of the `<Slot>` that it is attached to.

