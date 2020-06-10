# @frontity/components

## Description

This package is a collection of React components that have proven to be pretty useful for a Frontity project.

## How to use

In order to use it, you just have to import the component you want to use in your theme from `@frontity/components/` and place it wherever needed. For example, if we want to use the `<Image />`component:

```javascript
import Image from "@frontity/components/image";
```

## Components

### Image

`<Image />` is a React component that adds `lazy-loading` to the native WordPress images. Combined with [`@html2react/processors`](frontity-html2react.md#processors) , you can add this functionality and optimize your images pretty easy.

### Script

`<Script />` is a React component that executes scripts tags found in content.

#### Props

| Name   | Type   | Default | Optional | Description                             |
| :----- | :----- | :------ | :------- | :-------------------------------------- |
| `src`  | string | `null`  | `true`   | `URL` to an external `JavaScript` file. |
| `code` | string | `null`  | `true`   | internal `JavaScript` code              |
| `id`   | string | `null`  | `true`   | `ID` for script element                 |

#### Usage

External JavaScript file:

```javascript
import Script from "@frontity/components/script";

const MyComponent = () => (
    <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js />
);
```

Internal JavaScript code

```javascript
import Script from "@frontity/components/script";

const MyComponent = () => (
  <Script
    code={`
        const body = document.querySelector('body');

        // Triggers anytime anywhere in the body of the page is clicked
        body.addEventListener('click', e => {
            e.preventDefault();
            console.log('Button Works');
        });
    `}
  />
);
```

### Iframe

`<Iframe />` is a React component that implement lazy-load on iframe components. The approach taken in implementing this component is based off the edge cases in the table below.

| Intersection Observer | Native Lazy | Height &gt; 0 | Output                |
| :-------------------- | :---------- | :------------ | :-------------------- |
| true                  | true        | true          | Native Lazy Load      |
| true                  | true        | false         | Intersection Observer |
| true                  | false       | true          | Intersection Observer |
| true                  | false       | false         | Intersection Observer |
| false                 | true        | true          | \(not possible\)      |
| false                 | true        | false         | \(not possible\)      |
| false                 | false       | true          | Normal Load \(eager\) |
| false                 | false       | false         | Normal Load \(eager\) |

{% hint style="info" %}
Native Lazy needs a height attribute. For that reason, we use the Intersection Observer when a height is not provided.
{% endhint %}

#### Props

| Name         | Type   | Default | Optional | Description                             |
| :----------- | :----- | :------ | :------- | :-------------------------------------- |
| `src`        | string | `null`  | `true`   | `URL` to an external `JavaScript` file. |
| `title`      | string | `null`  | false    | internal `JavaScript` code              |
| `width`      | string | `null`  | `true`   | width of the iframe component           |
| `height`     | string | null    | true     | height of the iframe component          |
| `className`  | string | null    | true     | class name for the component            |
| `loading`    | string | lazy    | true     | lazy \| eager \| auto                   |
| `rootMargin` | string | null    | true     | margin around root element              |

#### Usage

```javascript
import Iframe from "@frontity/components/iframe";

const MyComponent = () => (
  <Iframe
    src="https://frontity.org"
    title="Frontity"
    height="500"
    width="500"
  />
);
```

### Switch

The `<Switch />` renders the first child component that returns `true` as the value of its `when` prop.

The last child component \(which should not have a `when` prop\) will be rendered if no other component matches the condition.

You can use it for routing to different components in your theme:

```javascript
import Switch from "@frontity/components/switch";

const Theme = ({ state }) => {
  const data = state.source.get(state.router.link);

  return (
    <Switch>
      <Loading when={data.isFetching} />
      <Home when={data.isHome} />
      <Archive when={data.isArchive} />
      <Post when={data.isPostType} />
      <ErrorPage /> {/* rendered by default */}
    </Switch>
  );
};
```

But also inside any other component. For example, in a `<Header>` component that has a different menu for the home:

```javascript
import Switch from "@frontity/components/switch";

const Header = ({ state }) => {
  const data = state.source.get(state.router.link);

  return (
    <Switch>
      <MenuHome when={data.isHome} />
      <Menu /> // rendered by default
    </Switch>
  );
};
```

This component is an alternative to applying plain JavaScript logic in React:

```javascript
const Theme = ({ state }) => {
  const data = state.source.get(state.router.link);

  return (
    <>
      {(data.isFetching && <Loading />) ||
        (data.isHome && <Home />) ||
        (data.isArchive && <Archive />) ||
        (data.isPostType && <Post />) || <ErrorPage />}
    </>
  );
};
```

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

### Slot

The `<Slot />` component. It enables for the use of a Slot and Fill pattern which allows the insertion of any React component in different places of the app.

This component allows a theme developer to insert <Slot> components in different places in a theme. Then other package developers are able to add <Fill> components which will be "inserted" in place of those

#### Props

| Name             | Type      | Default     | Required | Description                                                                                                                                                           |
| :--------------- | :-------- | :---------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`           | string    | `undefined` | true     | The name of the Slot. The user of this Slot will have to specify this name in order to insert a Fill component.                                                       |
| `children`       | ReactNode | `undefined` | true     | The component that will be used as a fallback in case that no fill is specified for a particular Slot. You can use any type of data that is valid as a react element. |
| `data`           | any       | `undefined` | false    | Any data that you might want to pass to the Fill. Normally used for passing route data fetched in the parent component.                                               |
| `any other prop` | any       | undefined   | false    | Any other custom prop. The theme can specify other props and they will be passed down to the Fill.                                                                    |

The simplest example of a Slot would be:

```tsx
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

```tsx
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

The Slot component supports optional children that are rendered if no fills are present:

```tsx
const Post = () => (
  <>
    {/* ... */}
    <PostTitle />
    <Slot name="Between post title and post meta">
      <Seperator />
    </Slot>
    <PostMeta />
    {/* ... */}
  </>
);
```
