# 10. Code Splitting

Code Splitting lets you split your code into various bundles, instead of using a single one with all the code. These smaller bundles are dynamically loaded at runtime depending on the URL. If used properly, this can mean important performance gains.

The bundles can be loaded on demand or in parallel, what allows you to just load the code that is currently needed by the user. This way you can avoid loading heavy code until it is required, and reduce the amount of code during the initial load.

Frontity has configured everything to make Code Splitting really easy. To use it you just have to import `{ loadable }` module from `frontity` and make a dynamic import of the React component you don't want to be loaded until it is strictly needed.

### Example

Imagine you are using a big library for showing your comments. You will want to load it just when it is needed, so it doesn't increase the bundle size if that React component is not loaded. Code splitting lets you do it. 

You have to use `loadable` with a dynamic `import()` inside:

```jsx
import { loadable } from "frontity";
import Content from "./components/content";

// Thanks to loadable we prevent comments from loading until it's needed.
const HeavyComments = loadable(() => import('./components/comments'));

const Post = ({ state }) => (
    <>
        <Content />
        {state.comments.areOpened && <HeavyComments />}
    </>
);

export default connect(Post);
```

Instead of using the normal `import ... from`.

```jsx
import { loadable } from "frontity";
import Content from "./components/content";
import HeavyComments from "./components/comments";

const Post = ({ state }) => (
    <>
        <Content />
        {state.comments.areOpened && <HeavyComments />}
    </>
);

export default connect(Post);
```

By default, `state.comments.areOpened === false` . The heavy library used for comments won't be loaded until you change the state to `true` , for example when you click a button to open the comments. At that moment, the code of that React component is downloaded and executed.

If we don't use `loadable` , the `<HeavyComments>` component is included in the main bundle and loaded at the initial page load, even if the comments are never shown.

### Loadable Components Documentation

For managing the Code Splitting, Frontity has integrated and configured [Loadable Components](https://www.smooth-code.com/open-source/loadable-components/docs/code-splitting/).

If you want to go deeper, you should take a look at their docs. You don't need to read the docs referring how to install and configure Loadable Components, we have already done that work for you. These are the ones which are interesting to learn how to use it:

* [Code Splitting](https://www.smooth-code.com/open-source/loadable-components/docs/code-splitting/)
* [Prefetching](https://www.smooth-code.com/open-source/loadable-components/docs/prefetching/)
* [Suspense](https://www.smooth-code.com/open-source/loadable-components/docs/suspense/)
* [Fallback](https://www.smooth-code.com/open-source/loadable-components/docs/fallback/)
* [Error Boundaries](https://www.smooth-code.com/open-source/loadable-components/docs/error-boundaries)
* [Delay](https://www.smooth-code.com/open-source/loadable-components/docs/delay/)
* [Timeout](https://www.smooth-code.com/open-source/loadable-components/docs/timeout/)
* [Library Splitting](https://www.smooth-code.com/open-source/loadable-components/docs/library-splitting/)
* [Dynamic Import](https://www.smooth-code.com/open-source/loadable-components/docs/dynamic-import/)

That's it! You are now a master of Code Splitting.

