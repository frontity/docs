# @frontity/html2react

{% hint style="warning" %}
This reference is a **work in progress** until we have time to improve it. For the time being, if you have any doubt on how to use `html2react` , the `processors` or anything else, please don't hesitate to ask in our community, we'll be more than glad to answer your questions.
{% endhint %}

Usage and reference of the `@frontity/html2react` package.

## Usage

### Component

```jsx
import React from 'react'

const Post = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  
  return (
    <div>
      <Title />
      <Content>
        // Here you have the component exposed by html2react.
        // Needs one prop called `html` that you usually want to
        // use to pass the post content.
        <libraries.html2react.Component html={post.content.rendered} />
      </Content>
    </div>
  );
};
```

### Processors

The `processors` field is of type `Processor[]`. Here you can see how to load the processors from your theme into `html2react`.

```jsx
import Theme from "./components/theme";
import image from "./processors/image";

const before = ({ libraries }) => {
  libraries.html2react.processors = libraries
    .html2react
    .processors
    .concat([
      image
    ]);
};

const marsTheme = {
  name: "@frontity/mars-theme",
  roots: {
    theme: Theme
  },
  state: {
    theme: {
      menu: [],
      featured: {
        showOnList: false,
        showOnPost: false
      }
    }
  },
  actions: {
    theme: {
      beforeSSR: before,
      beforeCSR: before
    }    
  }
};

export default marsTheme;
```

And here is how a `processor` is structured:

The `test` function will evaluate the node, and depending on the result, this node will be passed to the `process` function in order to apply the processor.

```typescript
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
```

And an example of a very simple `processor`:

{% code-tabs %}
{% code-tabs-item title="processors/image.js" %}
```typescript
import Image from "@frontity/components/image";

export default {
  test: node => node.type === "element" && node.component === "img",
  process: (node: Element) => {
    node.component = Image;
    return node;
  }
};
```
{% endcode-tabs-item %}
{% endcode-tabs %}

