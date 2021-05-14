# Link prefetching

## What is prefetching?

Link prefetching is a strategy to improve the perceived performance of page loading.

We cannot improve on the explanation of prefetching provided by [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ). They describe it thus:

> Link prefetching is a browser mechanism, which utilizes browser idle time to download or prefetch documents that the user might visit in the near future. A web page provides a set of prefetching hints to the browser, and after the browser is finished loading the page, it begins silently prefetching specified documents and stores them in its cache. When the user visits one of the prefetched documents, it can be served up quickly out of the browser's cache.

Commonly documents and assets are prefetched using a `<link>` element containing a `rel="prefetch"` attribute. For example:

```html
<link rel="prefetch" href="/images/my-pic.jpg">
```

The `rel="prefetch"` attribute is a 'hint' to the browser that the specified URL should be prefetched. It may or may not be prefetched depending on whether the browser has sufficient idle time to do so before the user actually clicks the link.

This works well for traditional sites where each new URL involves an HTTP request and a page refresh. Performance is improved because prefetched documents and assets are already in the browser cache and so don't need to be fetched at the time that the link is clicked.

In addition to `prefetch` the `rel` attribute of the `<link>` element can take different values depending on the type of prefetching required:

- dns-prefetch
- preconnect
- prefetch
- subresource
- prerender

[This CSS-tricks article](https://css-tricks.com/prefetching-preloading-prebrowsing/) provides a comprehensive overview of these different prefetching options.

{% hint style="warn" %}
Care should be taken when implementing prefetching and consideration should be given to the likelihood that the document or asset will be needed in the near future, i.e. how likely it is that a particular link will be the next one to be clicked.
{% endhint %}

## Implementing link prefetching strategies with Frontity

For JavaScript based SPA applications such as Frontity the situation is slightly different. No additional elements are needed in the markup, and the prefetching is performed with JavaScript. In such cases data is prefetched and stored in the application's "state".

We will describe two methods for implementing link prefetching in Frontity. The first will use the `<Link />` component provided by Frontity. The second will demonstrate how to create your own component implementing link prefetching.

### Frontity's `<Link>` component

Frontity's [`<Link />` component](https://api.frontity.org/frontity-packages/collections-packages/components#link) supports prefetching. The prefetching strategy that it adopts is determined by the value of the property `state.theme.autoPrefetch`.

The possible values for `state.theme.autoPrefetch` are:

| Value     | Description                                       |
| :-------- | :------------------------------------------------ |
| `no`      | No auto prefetch.                                 |
| `hover`   | Prefetches links on hover.                        |
| `in-view` | Prefetch links currently visible in the viewport. |
| `all`     | Prefetches all internal links on the page.        |

The value of `state.theme.autoPrefetch` could then be set in the `frontity.settings.js` file, for example:

```js
const settings = {
  // Other settings...
  packages: [
    {
      name: "my-theme",
      state: {
        theme: {
          autoPrefetch: "hover", // values: no | hover | in-view | all
        },
      },
    },
    // Other packages...
  ],
};
```

A component that uses Frontity's `<Link />` component should import it from `@frontity/components`:

```js
import Link from "@frontity/components/link";
```

Here is a short video demonstrating prefetching with Frontity's `<Link>` component:

{% embed url="https://www.youtube.com/watch?v=EUt8x5oglmI" caption="" %}

{% hint style="info" %}
**Note that** for links present in the content to benefit from the prefetching strategy of the `<Link>` component the content should be processed by the [`html2react` package](https://api.frontity.org/frontity-packages/features-packages/html2react). See [this page](https://tutorial.frontity.org/part7-finishing-touches/use-the-html2react-component) in our tutorial for a detailed example illustrating the steps that need to be taken.
{% endhint %}

### Creating your own link component with prefetching

If you wish to create your own link component that also implements auto-prefetching based on the value of a `state.theme.autoPrefetch` property then a possible implementation could look like this:

```js
import React, { useEffect } from "react";
import { connect } from "frontity";

const Link = ({
  state,
  actions,
  link,
  className,
  children,
  rel,
  "aria-current": ariaCurrent,
  onClick: onClickProp,
}) => {
  // Check if the link is an external or internal link
  const isExternal = link.startsWith("http");

  // Prefetch the link's content when it mounts and autoPreFetch is set to `true`
  useEffect(() => {
    if (!isExternal) {
      if (state.theme.autoPrefetch === "all") actions.source.fetch(link);
    }
  }, []);

  const onClick = (event) => {
    // Do nothing if it's an external link
    if (isExternal) return;

    event.preventDefault();
    // Set the router to the new url.
    actions.router.set(link);

    // Scroll the page to the top
    window.scrollTo(0, 0);

    // if the menu modal is open, close it so it doesn't block rendering
    if (state.theme.isMobileMenuOpen) {
      actions.theme.closeMobileMenu();
    }

    if (onClickProp) {
      onClickProp(event);
    }
  };

  return (
    <a
      // ref={ref}
      href={link}
      onClick={onClick}
      className={className}
      aria-current={ariaCurrent}
      rel={isExternal ? "noopener noreferrer" : rel}
      onMouseEnter={() => {
        // Prefetch the link's content when the user hovers on the link
        if (state.theme.autoPrefetch === "hover" && !isExternal)
          actions.source.fetch(link);
      }}
    >
      {children}
    </a>
  );
};

export default connect(Link);

```

This uses `useEffect` to call `actions.source.fetch(link)` to fetch the data if the value of `state.theme.autoPrefetch` is "all", and if the value is "hover" then it calls `actions.source.fetch(link)` to fetch the data when the `onMouseEnter` event occurs.
