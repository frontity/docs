# `Slot` and `Fills`

Slot and Fill is a powerful pattern in React which allows the insertion of any React component in different places of the app. It is perfect when the application is extensible, like Frontity.

In the case of Frontity, this pattern allow the theme developer to insert <Slot> components among the theme, and other package developers to add <Fill> components hooked to a particular Slot.

This pattern is especially interesting for Frontity theme creators that wants to share their theme to other developers. The users of the theme will be able to customize specific parts of the theme without touching the internal code of the theme.

Some examples of use for this pattern:
- Add an ad above the first post of any archive.
- Add a newsletter subscription widget after the eighth post of the home.
- Add more elements to a menu, for example, a link to the GDPR or a notifications switch.
- Substitute the theme footer for a new custom one.

An example might be as follows - the site developer wants to place a _third party ad above the content of each page_. The theme developer has thoughtfully provided a slot in that position in the theme:

```js
//...
const Content = () => {
  //...
  <Container>
  <Slot name="Ad Before Content">
  //...
  </Container>
  //...
}
```

The site developer is now able to 'hook' a component that returns an ad onto that slot, so that the ad gets rendered in that position on the page. This component is referred to as a _'fill'_.

```js

const AdFillComponent = props => (
    <div>
      This is the Ad 
    </div>
  )
}

const state = {
  fills: {
    namespace: {
      nameOfTheFill: {
        slot: "Ad Before Content", // This has to match the `name` prop passed to <Slot/>
        library: "libNamespace.ComponentName",
        priority: 5,
        props: {
          // Object with props that will be passed to the component.
        },
      },
    },
  },
};                                                                               |
```

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

Fills are added to the `state`, to a common namespace called `fills`. Each fill consists of a configuration object that should be given a unique key and assigned to a namespace. To learn more about namespaces see [this section](https://docs.frontity.org/learning-frontity/namespaces) of the docs.

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
        ComponentName: MyFillComponent,
      },
    },
  },
};
```

Note that `libNamespace.ComponentName` here matches the value of `state.fills.namespace.nameOfTheFill.library` above. `FillComponent` here is the actual component which is defined elsewhere and may be imported. The return value of this component, i.e. `FillComponent`, is the content that will be inserted into HTML at the position of the `<Slot>` that it is attached to.
