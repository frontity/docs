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

| Name | Type | Default | Optional | Description |
| :--- | :--- | :--- | :--- | :--- |
| `src` | string | `null` | `true` | `URL` to an external `JavaScript`  file. |
| `code` | string | `null` | `true` | internal `JavaScript` code |
| `id` | string | `null` | `true` | `ID` for script element |

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
    <Script code={`
        const body = document.querySelector('body');

        // Triggers anytime anywhere in the body of the page is clicked
        body.addEventListener('click', e => {
            e.preventDefault();
            console.log('Button Works');
        });
    `} />
)
```

### Iframe

`<Iframe />` is a React component that implement lazy-load on iframe components. The approach taken in implementing this component is based off the edge cases in the table below.

| Intersection Observer | Native Lazy | Height &gt; 0 | Output |
| :--- | :--- | :--- | :--- |
| true | true | true | Native Lazy Load |
| true | true | false | Intersection Observer |
| true | false | true | Intersection Observer |
| true | false | false | Intersection Observer |
| false | true | true | \(not possible\) |
| false | true | false | \(not possible\) |
| false | false | true | Normal Load \(eager\) |
| false | false | false | Normal Load \(eager\) |

{% hint style="info" %}
Native Lazy needs a height attribute. For that reason, we use the Intersection Observer when a height is not provided.
{% endhint %}

#### Props

| Name | Type | Default | Optional | Description |
| :--- | :--- | :--- | :--- | :--- |
| `src` | string | `null` | `true` | `URL` to an external `JavaScript`  file. |
| `title` | string | `null` | false | internal `JavaScript` code |
| `width` | string | `null` | `true` | width of the iframe component |
| `height` | string | null | true | height of the iframe component |
| `className` | string | null | true | class name for the component |
| `loading` | string | lazy | true | lazy \| eager \| auto |
| `rootMargin` | string | null | true | margin around root element |

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
}
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
}
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
           (data.isPostType && <Post />) ||
           <ErrorPage />}
        </>    
    );
}
```

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

