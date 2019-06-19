# @frontity/html2react

Usage and reference of the `@frontity/html2react` package.Ï

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

Here you can see how to load the processors from your theme into `html2react`.

```jsx
import Theme from "./components/theme";
import processors from "./processors";

const before = ({ libraries }) => {
  libraries.html2react.processors = libraries.html2react.processors.concat(processors);
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

And here how a `processor` is structured:

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

