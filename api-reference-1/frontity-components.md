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



{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

