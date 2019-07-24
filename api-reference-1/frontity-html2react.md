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
      <Content>        
        <Html2React html={post.content.rendered} />
      </Content>
    </div>
  );
};
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Load a processor

The `processors` field is an array where you can push all the processors you want to use with `html2react`. You need to do this in the `beforeSSR` and `beforeCSR` functions of your theme or extension, in order for the processors to be loaded before the React render. Here you can see as an example how this is done in `mars-theme`:

{% code-tabs %}
{% code-tabs-item title="index.js" %}
```jsx
import Theme from "./components";
import image from "@frontity/html2react/processors/image";

const before = ({ libraries }) => {
  // We use html2react to process the <img> tags inside the content HTML.
  libraries.html2react.processors.push(image);
};

const marsTheme = {
  name: "@frontity/mars-theme",
  actions: {
    theme: {
      beforeSSR: before,
      beforeCSR: before
    }
  },
  ...
};

export default marsTheme;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

### Create a processor

A processor is an object with two functions: `test` and `process`, a `name` and a `priority`.  The `test` function will evaluate the node, and if it returns `true`, this node will be passed to the `process` function in order to apply the processor.

As an example, this is how the `image` processor is implemented in `html2react`:

{% code-tabs %}
{% code-tabs-item title="processors/image.js" %}
```typescript
import Image from "@frontity/components/image";

const image: Processor = {
  // We can add a name to identify it later.
  name: "image",

  // We can add a priority so it executes before or after other processors.
  priority: 10,

  // Only process it if it's an image.
  test: node => node.component === "img",
  
  process: node => {
    // If it's inside a noscript tag, we don't wont to process it.
    if (node.parent.component === "noscript") return null;

    // Many WP lazy load plugins move the src to the data-src, so we fix that.
    if (node.props["data-src"])
      node.props.src = node.props["data-src"];
    if (node.props["data-srcset"])
      node.props.srcSet = node.props["data-srcset"];
      
    // We tell html2react that it should use the <Image /> component.
    node.component = Image;

    return node;
  }
};

export default image;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

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

// Change processor priority.
const pr = libraries.html2react.processors.find(pr => pr.name === "image");
pr.priority = 20;
```
{% endcode-tabs-item %}
{% endcode-tabs %}

#### `libraries.html2react.Component`

A React component used to render the parsed HTML.

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

