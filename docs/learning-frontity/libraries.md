# 7. Libraries

{% hint style="info" %}
This "Learning Frontity" guide is intended to be read in order so please start from the [first section](settings.md) if you haven't done so already.
{% endhint %}

Do you remember [Actions](actions.md)? Libraries are pretty similar. Actions have been defined as a reusable set of functions aimed to change the state of the application. Similarly, **libraries** are a reusable set of tools. However, it is NOT aimed to change the state, but rather other parts of the application and is available for use by many packages.

Let's see two different examples: `stringify` and the array of processors of `html2react`.

## Stringify

In the `wp-source` package, we have a library called [`stringify`](https://docs.frontity.org/api-reference-1/wordpress-source#stringify-path-page-query-hash) which is used to create a route from the params you pass to it. This won't change the state, but it is reusable logic that has proven really useful.

```javascript
const path = "/category/nature";
const page = 4;

const nextPageLink = libraries.source.stringify({
    path,
    page: page + 1
});
// Outputs: "/category/nature/page/5"

const prevPageLink = libraries.source.stringify({
    path,
    page: page - 1
});
// Outputs: "/category/nature/page/3"
```

As you can see, we are creating two new URLs \(one for next posts and other for previous ones\) with the same code. This library accepts more params and you can perform more complex logic, but this is a good example of how to consume libraries and its reusability.

Like actions, libraries can be used either by their own packages or by other packages. For example, although `stringify` is defined inside `wp-source` package, it could also be use by your own theme.

## Array of processors from html2react

Another example is the array of processors from [html2react](libraries.md). There are some processors defined by default, but you can also add any processor you want, and it will be executed without additional code being needed.

For example, there is a processor for images where each time it finds an `<img>` tag, it transforms it to an `<Image />` component with some props and functionalities added to it.

You could add your own processor that finds every `<blockquote>` and transforms it into a new `<Blockquote />` component with your own logic.

{% code title="" %}
```jsx
import image from "@frontity/html2react/processors/image";
import blockquote from "./processors/blockquote";

const myTheme = {
  ...
  actions: {
    theme: {
      init: ({ libraries }) => {
        // We use html2react to process the <img> tags inside the content HTML.
        libraries.html2react.processors.push(image);
        libraries.html2react.processors.push(blockquote);
      }
    }
  }
  ...
};

export default myTheme;
```
{% endcode %}

That's basically all you need to know about libraries, a powerful way of reusing tools in Frontity. Oh, and you can access the available libraries in the client console using:

```text
> frontity.libraries
```

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

