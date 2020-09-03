# @frontity/html2react

{% hint style="warning" %}
This reference is a **work in progress** until we have time to improve it. For the time being, if you have any questions on how to use `html2react` , the `processors` or anything else, please don't hesitate to ask in our community forum, we'll be happy to answer your questions.
{% endhint %}

## Installation

Add the `html2react` package to your project:

```text
npm i @frontity/html2react
```

And include it in your `frontity.settings.js` file:

{% code title="frontity.settings.js" %}
```javascript
module.exports = {
  packages: [
    "@frontity/html2react"
  ]
}
```
{% endcode %}

## Settings

You don't need to configure any settings for this package.

## How to use

### Render the parsed content.

This is how you need to include the Component that will render the parsed content. The only prop it takes is `html`, and you'll usually pass `post.content.rendered` to it:

```jsx
import React from 'react'

const Post = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];

  // Component exposed by html2react.
  const Html2React = libraries.html2react.Component; 

  return (
    <div>
      <Title />
      <AuthorAndDate />
      <FeaturedImage />
      {/* Use Html2React to render the post HTML content */}
      <Html2React html={post.content.rendered} />
    </div>
  );
};
```

### Load processors

The `processors` field is an _array_ where you can push all the processors you want to use with `html2react`. You can check the default processors [here](frontity-html2react.md#processors).

You can add your processors directly in `libraries.html2react.processors`. Here you can see as an example how this is done in `mars-theme`:

```jsx
import image from "@frontity/html2react/processors/image";
import customProcessor from "./processors/custom";

const myPackage = {
  roots: { ... },
  state: { ... },
  actions: { ... },
  libraries: {
    html2react: {
      processors: [image, customProcessor]
    }
  }
};

export default myPackage;
```

### Create your own processors

A processor is an object with four properties: `name` , `priority` , `test`,and `processor`.

* `name` : Just the name of your processor
* `priority` : A number that lets the package know in which order processors should be evaluated. The processors are evaluated in numeric order. For example, a processor with `priority` of `10` will be applied **before** a  processor with a `priority` of `20`
* `test` : It's a function that evaluate each [node](frontity-html2react.md#nodes), and if it returns `true`, this node will be passed down to the `processor` function
* `processor` : A function to apply some logic to the [node](frontity-html2react.md#nodes) that we want to modify. It could be substituting HTML tags for React component with some logic, as adding `lazy-loading` to images, or just modifying some attributes, like adding `target="_blank"` to the links. Both the `test` and the `processor` functions receive the same params `({ node, root, state, libraries })` :
* `node` : It's the HTML node tag the processor is evaluating
* `root` : The top node of the node tree
* `state` : Access to Frontity's `state`  . This could be useful to use some parts of the `state` inside your processor. For example, using your `state.theme.colors` 
* `libraries` : Access to Frontity's `libraries`. As it happens with the `state`, sometimes could be useful to access your `libraries` as well

Let's see some examples. This is how the `image` processor is implemented in `html2react`:

```typescript
import Image from "@frontity/components/image";

const image = {
  // We can add a name to identify it later.
  name: "image",

  // We can add a priority so it executes before or after other processors.
  priority: 10,

  // Only process the node it if it's an image.
  test: ({ node }) => node.component === "img",

  processor: ({ node }) => {
    // If the image is inside a <noscript> tag, we don't want to process it.
    if (node.parent.component === "noscript") return null;

    // Many WP lazy load plugins move the real "src" to "data-src", so we move it back.
    if (node.props["data-src"])
      node.props.src = node.props["data-src"];
    if (node.props["data-srcset"])
      node.props.srcSet = node.props["data-srcset"];

    // We tell Html2React that it should use the <Image /> component
    // from @frontity/components, which includes lazy loading support.
    node.component = Image;

    return node;
  }
};

export default image;
```

You don't need to return a React component, you can also modify the attributes \(props\) of the node. For example, this processor adds `target="_blank"` to the `<a>` tags with href starting with `http`:

```typescript
const extAnchors = {
  name: "external anchors",
  priority: 10,
  // Only process the node it if it's an anchor and href starts with http.
  test: ({ node }) => node.component === "a" && node.props.href.startsWith("http"),
  // Add the target attribute.
  processor: ({ node }) => {
    node.props.target = "_blank";
    return node;
  }
};
```

### Nodes

The object `node` received by both `test` and `processor`can be an `Element`, a `Text` or a `Comment`. You can distinguish between them using `node.type`.

The common properties are:

* **`type`** : `"element" | "text" | "comment"`
* **`parent?`**: `Element` The parent of this node, which is always an `element` \(`text` or `comment` can't have children\)
* **`ignore?`**: `boolean` If you set `ignore` to `true` for a node, it won't pass any `test`. This is useful in some situations when you don't want additional processors applied to this node.

  **Node: `Element`**

An `Element` is an HTML tag or a React component.

* **`type`** : `"element"`
* **`component`** : `string | React.ComponentType` If it's a string, it's an HTML tag and if it's a function is a React component. You can change it at will and it is what you would usually do when you want to convert HTML tags to React components
* **`props`**: `object`  An object containing all the HTML attributes of that node or props of that React component. You can also change them at will. All the attributes are converted to the React equivalents, even for HTML tags. For example:
  * `class` -&gt; `className`
  * `style` -&gt; `css` \([frontity's CSS prop](../learning-frontity/styles.md#the-css-prop)\)
  * `srcset` -&gt; `srcSet`
  * `onclick` -&gt; `onClick`
  * ..
* **`children?`**: `array of nodes` An array containing other nodes, children to this one. If you want to get rid of the children, just overwrite it with `null` or an empty array

**Node: `Text`**

A `Text` is a text content. For example, the text inside a `<p>` tag.

* **`type`** : `"text"`
* **`content`** : `string`

**Node: `Comment`**

A **`Comment`** is just an HTML comment. Like this `<!-- comment -->`.

* **`type`** : `"comment"`
* **`content`** : `string`

## Processors

This are the current processors exposed in this package:

### Script

React doesn’t execute the code inside a `<script>` tags. For that reason, html2react doesn’t execute the script tags included in the contents.

The script processor, with a priority of `20`, processes `<script>` tags found in the HTML for execution. `<script>` type must either be `application/javascript`, `text/javascript` or `application/ecmascript` to pass the test of the processor.

**Usage:** The script processor is included by default in html2react. Therefore, no extra procedure is required to use the processor.

### Iframe

Iframes can impact the loading time and performance of a site. The iframe processor adds lazy-loading to the `<iframe>` tags found in the HTML.

**Usage:**

Add `iframe` to the `processors` array in your package `index.js` file.

```javascript
import iframe from "@frontity/html2react/processors/iframe";

const themeName = {
    name: "theme-name",
    ...
    libraries: {
        html2react: {
            processors: [iframe]
        }
    }
}
```

## API Reference

### Libraries

#### `libraries.html2react.processors`

An array of the `processor`s that will be used by `html2react`.

You should can add, remove or mutate any processor from the array:

```jsx
// Add a processor.
libraries.html2react.processors.push(image);

// Remove a processor.
const index = libraries.html2react.processors.findIndex(pr => pr.name === "image");
libraries.html2react.processors.splice(index, 1);

// Change a processor priority.
const processor = libraries.html2react.processors.find(pr => pr.name === "image");
processor.priority = 20;
```

#### `libraries.html2react.Component`

The React component used to render the parsed HTML.

**Props**

* **`html`** : `String` The HTML that needs to be rendered

```jsx
import React from 'react'

const Post = ({ libraries }) => {
  // Get the component exposed by html2react.
  const Html2React = libraries.html2react.Component; 

  return (
    <>
      {/* Use it to render the HTML. */}
      <Html2React html={html} />
    </>
  );
};
```

