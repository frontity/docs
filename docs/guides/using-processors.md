# Working with processors

## Table of Contents

<!-- toc -->

- [What is a processor?](#what-is-a-processor)
- [Configure Frontity to use processors](#configure-frontity-to-use-processors)
- [How to use processors](#how-to-use-processors)
- [An Example](#an-example)

<!-- tocstop -->

## What is a processor?

A [processor](https://api.frontity.org/frontity-packages/features-packages/html2react#processors) is a JavaScript object used by the `<html2react>` package that, among other things, ccontains a function that is executed if a certain test condition evaluates as true. The test condition is used to match elements (or nodes) in the HTML markup of the content. The _processor_ function will in some way process or alter the markup of that element and return either the modified markup or even something else in it's place.

A processor is a JavaScript object with the following defined properties:

- name
- priority
- test
- processor

The values of `test` and `processor` are functions.

In the case of `test` the function simply returns a boolean value depending on whether a condition is matched. The condition checks against each node in the DOM tree. Normally it will test whether a node has a particular HTML tag or a particular class, or other property.

In this example the function returns `true` if the received node (i.e. an HTML element) is an `<img>` tag. For all other elements in the DOM tree it will return `false`.

```jsx
test: ({ node }) => node.component === "img"
```

{% hint style="info" %}
A node here is an HTML element represented in a JavaScript object. So for example, this HTML:

```html
<div class="wp-block-group jsforwp">
  <h4>Heading</h4>
  <p>Paragraph</p>
</div>
```

would be represented in JavaScript as follows:

```js
{
 "type": "element",
 "component": "div",
 "props": { "className": "wp-block-group jsforwp" },
 "children": [
   { /* heading-object ... */ },
   { /* paragraph-object ... */ }
 ]
}
```
{% endhint %}

The `processor` property is a function that in some way "processes" the received node (remember that a node is a JavaScript object representing an HTML element). It can return a modified version of the element or something entirely different, such as a React compontent. This returned value will replace the original element in the DOM tree.

The execution of the `processor` function is dependent on the value returned by the `test` function. The `processor` function will only be executed if the `test` function returns `true`, therefore the `processor` function will only operate on nodes that match the `test` condition.

So, in the example above the `processor` function will only be executed if the element being tested by the `test` function is an `<img>`, and it will then _process_ that element in a defined way.

## Configure Frontity to use processors

In order to use a processor you need to take these steps in your Frontity project:

{% hint style="info" %}
Note that if you are using an existing theme such as `mars-theme` or `twentytwenty-theme` then the `html2react` package is already installed and you don't need to follow these steps.
{% endhint %}

1. Install the `html2react` package into your theme

```bash
    npm i @frontity/html2react
```

2. Add `@frontity/html2react` to the `packages` array in `frontity.settings.js`

```js
    packages: [
      // ...
      "@frontity/html2react"
    ]
```

3. In the component that you wish to use it get `html2react` from the `libraries` object, which must be passed via props to the component connected via `connect`.

```js
const MyComponent = ({ libraries }) => {
    const Html2React = libraries.html2react.Component
    // ...
}
export default connect(MyComponent)
```

4. Use it in that component where you might otherwise use [`dangerouslySetInnerHTML`](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml), passing it an `html` prop with the content that you wish to be rendered - this will usually be `post.content.rendered`.

```jsx
    <Html2React html={post.content.rendered} />
```

You can see an example of it's use in the [`post.js` file in `mars-theme`](https://github.com/frontity/frontity/blob/dev/packages/mars-theme/src/components/post.js).

For more info please see [the documentation for the `html2react` package](https://api.frontity.org/frontity-packages/features-packages/html2react).

With those steps accomplished your project now has the ability to use processors.

## How to use processors

Whenever you use the `html2react` component to render the HTML for the post/page content the `test` function will be evaluated for each element in the DOM tree and the `processor` function will execute and _process_ that element if the test on that node passes, i.e. returns `true`.

You add processors in the array at `libraries.html2react.processors` in the theme's `index.js`.

{% hint style="info" %}
Some processors, such as `image`, `iframe`, and `link`, are included with Frontity, and if you are using a ready-made theme such as `@frontity/mars-theme` or `@frontity/twentytwenty-theme` then they will already be added for you.
{% endhint %}

```js
libraries: {
    html2react: {
      processors: [image, iframe, link],
    },
```

You can also [define your own processor](https://api.frontity.org/frontity-packages/features-packages/html2react#creating-your-own-processors) and add it to this array.

As previously stated, a processor is a function that runs at render time when the HTML is parsed by the `html2react` component and a specific condition, as defined by the `test` function, is met. The condition is specified by a pattern, such as a specific element type which has a specific class. For example:

```jsx
test: ({ node }) => node.component === "div" && node.props?.className?.split(" ").includes("some-class")
```

Then in place of the element that meets this condition the processor returns either a processed version of it (hence the name "processor") or even something else entirely, such as a React component.

Both of the functions, i.e. the `processor` and the `test`, receive the node (i.e. a JavaScript object representing an HTML element) as a prop. They also receive the other properties of the Frontity object, i.e. `root`, `state` and `libraries`.

## An Example

In this section we will look at an example that demonstrates how you might implement a processor.

This example shows how to process an HTML element that might be found in the content from a WordPress site. In this example we will show you how to replace a `<blockquote>` element with a React component.

{% hint style="info" %}
The full code for this example can be found in [this repository](https://github.com/frontity-demos/frontity-examples/tree/master/processor-blockquote).
{% endhint %}

We first define our processor, to be named "quote", in a file `./processors/quote.js`. This file also includes the React component `<Quote>` that will replace any `<blockquote>` element that also has the class `wp-block-quote`. However, a more complex example might import this from a separate file.

```jsx
import React from 'react'

const Quote = ({quote, author}) => {
  console.log('Quote')
  console.log({quote, author})
  return (
    <div style={ { background: 'red' , color: 'white', padding: '10px'} }>
      <h3>{quote}</h3>
      <h5>{author}</h5>
    </div>
  )
}

const quote = {
  name: 'quote',
  priority: 20,
  test: ({ component, props }) => component === "blockquote" && props?.className === "wp-block-quote",
  processor: ({ node }) => {
    const quote = node.children[0].children[0].content
    const author = node.children[1].children[0].children[0].content
    return {
      component: Quote,
      props: { quote, author },
    }
  },
}

export default quote;
```

The `processor` function extracts certain sub-parts of the `<blockquote>` element and passes them as props to the `<Quote>` component. The `processor` function also returns the HTML returned by the `<Quote>` component.

In the final line the `quote` processor is exported.

The `quote` processor is then imported into our theme's `index.js` file:

```jsx
import quote from "./processors/quote";
```

And then included in the array of processors:

```jsx
libraries: {
    html2react: {
      processors: [image, iframe, quote],
    },
  },
```

Now, in any component that uses the `<Html2React>` component to render the content, as follows:

```jsx
  <Html2React html={post.content.rendered} />
```

any element of this type:

```html
<blockquote class="wp-block-quote">
  <!-- child elements -->
</blockquote>
```

will be processed.

Another, more elaborate, example that illustrates the use of a processor can be found [in the guide on processing page builder content](./processing-page-builder-content.md#gutenberg).

{% hint style="info" %}
**Further information**

Documentation on the `html2react` component can be found [here](https://api.frontity.org/frontity-packages/features-packages/html2react).

More information about processors can be found [here](https://api.frontity.org/frontity-packages/features-packages/html2react#processors).

[The repository for the Frontity.org site](https://github.com/frontity/frontity.org/tree/dev/packages/frontity-org-theme) contains a [large number of examples of processors](https://github.com/frontity/frontity.org/tree/dev/packages/frontity-org-theme/src/processors) that you can examine both for ideas and for details of technical implementation in specific cases.

There is also a discussion about processors in [a video in the Frontity Talks series](https://www.youtube.com/watch?v=qOfENWKR7EE&list=PLC9teX20GdrTBeOzSwE-bFW-MbBEUwowS&index=10&t=1272s).
{% endhint %}