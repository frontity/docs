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

{% code-tabs %}
{% code-tabs-item title="frontity.settings.js" %}
```javascript
module.exports = {
  packages: [
    "@frontity/html2react"
  ]
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

## Settings

You don't need to configure any settings for this package.

## How to use

### Render the parsed content.

This is how you need to include the Component that will render the parsed content. The only prop it takes is `html`, and you'll usually pass `post.content.rendered` to it:

{% code-tabs %}
{% code-tabs-item title="post.js" %}
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
{% endcode-tabs-item %}
{% endcode-tabs %}

### Load processors

The `processors` field is an _array_ where you can push all the processors you want to use with `html2react`. You need to do this in the `init` function of your theme or extension, in order for the processors to be loaded before the React render. Here you can see as an example how this is done in `mars-theme`:

{% code-tabs %}
{% code-tabs-item title="index.js" %}
```jsx
import Theme from "./components";
import image from "@frontity/html2react/processors/image";

const marsTheme = {
  ...
  actions: {
    theme: {
      init: ({ libraries }) => {
        // Add an Html2React processor for the <img> tags.
        libraries.html2react.processors.push(image);
      }
    }
  }
  ...
};

export default marsTheme;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Create your own processors

A processor is an object with four properties: `test`, `process`, `name` and `priority`.  

The `test` function will evaluate the node, and if it returns `true`, this node will be passed down to the `process` function in order to apply the processor.

For example, this is how the `image` processor is implemented in `html2react`:

{% code-tabs %}
{% code-tabs-item title="processors/image.js" %}
```typescript
import Image from "@frontity/components/image";

const image = {
  // We can add a name to identify it later.
  name: "image",

  // We can add a priority so it executes before or after other processors.
  priority: 10,

  // Only process the node it if it's an image.
  test: node => node.component === "img",
  
  process: node => {
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
{% endcode-tabs-item %}
{% endcode-tabs %}

You don't need to return a React component, you can also modify the attributes \(props\) of the node. For example, this processor adds `target="_blank"` to the `<a>` tags with href starting with `http`:

```typescript
const extAnchors = {
  name: "external anchors",
  priority: 10,
  // Only process the node it if it's an anchor and href starts with http.
  test: node => node.component === "a" && node.props.href.startsWith("http"),
  // Add the target attribute.
  process: node => {
    node.props.target = "_blank";
    return node;
  }
};
```

### Nodes

The object `node` received by both `test` and `process`can be an `Element`, a `Text` or a `Comment`. You can distinguish between them using `node.type`.

The common properties are:

* **`type`** : `"element" | "text" | "comment"`
* **`parent?`**: `Element` The parent of this node, which is always an `element` \(`text` or `comment` can't have children\).
* **`ignore?`**: `boolean` If you set `ignore` to `true` for a node, it won't pass any `test`. This is useful in some situations when you don't want additional processors applied to this node. 

**Node: `Element`**

An `Element` is an HTML tag or a React component.

* **`type`** : `"element"`
* **`component`** : `string | React.ComponentType` If it's a string, it's an HTML tag and if it's a function is a React component. You can change it at will and it is what you would usually do when you want to convert HTML tags to React components.
* **`props`**: `object`  An object containing all the HTML attributes of that node or props of that React component. You can also change them at will.
* **`children?`**: `array of nodes` An array containing other nodes, children to this one. If you want to get rid of the children, just overwrite it with `null` or an empty array.

**Node: `Text`**

An `Text` is a text content. For example, the text inside a `<p>` tag.

* **`type`** : `"text"`
* **`content`** : `string`

**Node: `Comment`**

An **`Comment`** is just an HTML comment. Like this `<!-- comment -->`.

* **`type`** : `"comment"`
* **`content`** : `string`

## API Reference

### Libraries

#### `libraries.html2react.processors`

An array of the `processor`s that will be used by `html2react`. 

You should can add, remove or mutate any processor from the array:

{% code-tabs %}
{% code-tabs-item title="index.js" %}
```jsx
// Add a processor.
libraries.html2react.processors.push(image);

// Remove a processor.
const i = libraries.html2react.processors.findIndex(pr => pr.name === "image");
libraries.html2react.processors.splice(i, 1);

// Change a processor priority.
const pr = libraries.html2react.processors.find(pr => pr.name === "image");
pr.priority = 20;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

#### `libraries.html2react.Component`

The React component used to render the parsed HTML.

**Props**

* **`decodedText`** : `String` The decoded text.
* **`html`** : `String` The HTML that needs to be rendered.

### Other internal APIs

#### `libraries.html2react.parse(html, decode) => htmlTree`

Parses the HTML passed as a string into an AST ready to be used by `html2react.Component`.

**Arguments**

* **`html`** : `String`  The HTML content to be parsed.
* **`decode`**: `Function`  A function used by `html2react.Component` to decode HTML characters.

**Return**

* **`htmlTree`** : `Array` A AST structure of the HTML passed into the function.

#### `libraries.html2react.decode(text) => decodedText`

Decode any HTML character found in the string passed and returns another string with the characters decoded.

**Arguments**

* **`text`** : `String` The text that we want to decode.

**Return**

## TypeScript

You can import the types from `@frontity/html2react/types`. The main package type is the default export, and the other types are named exports:

```javascript
import Html2React, { Processor } from '@frontity/html2react/types';
```

The following types are exposed:

```typescript
interface Html2React extends Package {
  name: "@frontity/html2react";
  libraries: {
    html2react: {
      parse: Parse;
      decode: Decode;
      processors: Processor[];
      Component: Component;
    };
  };
}

interface Processor {
  name?: string;
  priority?: number;
  test: Test;
  process: Process;
}

interface Test {
  (node: Node): boolean;
}

interface Process {
  (node: Node, payload: { root: Node[] }): Node;
}

interface Element {
  type: "element";
  component: string | React.ComponentType;
  props: {
    css?: Emotion.SerializedStyles;
  } & {
    [key: string]: string | number | boolean;
  };
  children?: Node[];
  parent?: Element;
  ignore?: boolean;
}

interface Text {
  type: "text";
  content: string;
  parent?: Element;
  ignore?: boolean;
}

interface Comment {
  type: "comment";
  content: string;
  parent?: Element;
  ignore?: boolean;
}

type Node = Element | Text | Comment;
```

### 

