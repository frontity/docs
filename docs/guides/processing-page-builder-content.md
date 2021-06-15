# How to process page-builder content in Frontity

Video: https://www.youtube.com/watch?v=qOfENWKR7EE&list=PLC9teX20GdrTBeOzSwE-bFW-MbBEUwowS&index=6&t=159s



### Introduction

Page builders are becoming increasingly popular with content creators and content editors. They allow people who are not developers, namely content creators and editors, to work in a visual way and to lay out their content and style it with a WYSIWYG interface.

Page builders can either be page building themes such as [Divi](https://www.elegantthemes.com/gallery/divi/) and [Total](https://total.wpexplorer.com/), or plugins such as [Elementor](https://elementor.com/), [WP Bakery](https://wpbakery.com/), and [Beaver Builder](https://www.wpbeaverbuilder.com/).

In addition [Gutenberg](https://wordpress.org/gutenberg/), the new block editor for WordPress that is intended to replace the traditional TinyMCE based editor, also presents a WYSIWYG style interface and offers advantages similar to those offered by the more established page-builder themes and plugins. Gutenberg is undoubtedly the future of WordPress, and especially so with the forthcoming [Full Site Editing feature](https://make.wordpress.org/design/handbook/focuses/full-site-editing/) promised in the WordPress pipeline.

Whichever type of page builder is opted for, whether theme, plugin, or Gutenberg, it can be used for both posts and pages, and even custom post types if they have been [configured with the necessary support](https://www.cloudways.com/blog/gutenberg-wordpress-custom-post-type/).

### How do page builders work

As already indicated, page builders present the content creator with a WYSIWYG visual interface such that the content creator or editor can layout and style their content with the assurance that what they see while they are editing the page or post will be precisely what the visitor to the site will see. This means that even technically unskilled people can enjoy a great deal of creative freedom when creating their pages or posts.

The page builder will then generate HTML which is stored in the `post_content` field of the `wp_posts` table in the database. Enough styling information is included in the HTML, in the form of classes or inline styles, to allow the page or post to be rendered in the browser accurately simulating the appearance as it was in the editor.

Usually the page builder will have one or more generic stylesheets which define styles for the classes added by the page builder. Some of these stylesheets are static and exist at the time that the page builder is installed in WordPress, and some of them may be dynamically generated for a particular site, or even for a particular page/post, as the content is created.

These style sheets need to be copied across to your Frontity project and added using the `<Global />` component.
[see image here](https://frontity.org/blog/connecting-gutenberg-and-frontity/#adapt-frontity-to-gutenberg)

{% hint style="warn" %}
A cautionary note that should be borne in mind is that some page builders, such as Divi and WP Bakery, populate the content with a large number of shortcodes. Ideally these should result in rendered HTML appearing in the content delivered by the REST API, but unfortunately some of these shortcodes can appear verbatim in the content that comes from the REST API.
{% endhint %}

### The problem with page builders

Ideally we want to have the performance, and other, benefits of a decoupled front end for our WordPress sites, yet at the same time retain the WYSIWYG content editing experience that page builders do so well.

However, by using a decoupled front end (such as Frontity) we lose the tight integration that exists between a page builder and WordPress, and so the appearance of the page or post as it appears in the page builder's editor, and also when viewed using the WordPress theme, is not as accurately reproduced by Frontity. At least not without some additional work on the developer's part.

### What can we do to solve the problem

There are a number of approaches that we as developers can take in order to solve the problem of pages and posts created with a page builder not appearing as intended in Frontity.

The most straightforward approach would be to create the Frontity theme to reproduce the appearance of the pages/posts built with a page builder. This approach would require agreement up-front between content creators, designers, and developers and could restrict the creative freedom of content creators and designers as they must develop the pages and posts to work within the pre-defined constraints of the Frontity theme. That said, this approach could work for small or stylistically simple websites.

A second approach would be to copy the style sheets that the page builder uses across to the Frontity site and import them into the project and use them with the [`<Global />` component](https://api.frontity.org/frontity-packages/core-package/frontity#global). In most cases this should result in a fairly accurate rendering of the pages or posts in Frontity. However, the benefits of CSS-in-JS are lost with this approach and adding several stylesheets to the project using the `<Global />` component will potentially result in reduced performance of the website.

In theory it's possible to reproduce the page builders' stylesheets in CSS-in-JS but this would be onerously difficult and time-consuming.

Another approach is to use processors that detect matching elements in the HTML and "process" them, i.e. modify or alter them in some way, or indeed completely replace them with something else entirely, such as a React component.

### Processors

#### What is a processor?

A [processor](https://api.frontity.org/frontity-packages/features-packages/html2react#processors) is a JavaScript object with the following defined properties:

- name
- priority
- test
- processor

The values of `test` and `processor` are functions.

In the case of `test` the function simply returns a boolean value depending on whether a condition is matched. In this example the function returns `true` if the received node (i.e. an HTML element) is an `<img>` tag. For all other elements in the DOM tree it will return `false`.

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

The `processor` property is a function that "processes" the received node (remember that a node is a JavaScript object representing an HTML element). It can return a modified version of the element or something entirely different, such as a React compontent. This returned value will replace the original element in the DOM tree. The execution of the `processor` function is dependent on the value returned by the `test` function. The `processor` function will only be executed if the `test` function returns `true`.

So, in the example above the processor function will only be executed if the element being tested by the `test` function is an `<img>`.

#### Configure Frontity to use processors

In order to use a processor you need to take these steps:

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

For more info please see [the documentation](https://api.frontity.org/frontity-packages/features-packages/html2react) for the `html2react` package.

With those steps accomplished your project now has the ability to use processors.

#### How to use processors

Whenever you use the `html2react` component to render the HTML for the post/page the `test` function will be evaluated for each element in the DOM tree and the `processor` function will execute if the test on that node passes, i.e. returns `true`.

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

Both of the functions, i.e. the `processor` and the `test`, receive the node as a prop. They also receive the other properties of the Frontity object, i.e. `root`, `state` and `libraries`

{% hint style="info" %}
Documentation on the `html2react` component can be found [here](https://api.frontity.org/frontity-packages/features-packages/html2react).

More information about processors can be found [here](https://api.frontity.org/frontity-packages/features-packages/html2react#processors).

[The repository for the Frontity.org website](https://github.com/frontity/frontity.org/tree/dev/packages/frontity-org-theme) contains a [large number of examples of processors](https://github.com/frontity/frontity.org/tree/dev/packages/frontity-org-theme/src/processors) that you can examine both for ideas and for details of technical implementation in specific cases.
{% endhint %}

### Examples

In this section we will look at some examples to demonstrate how you might implement a processor. We will show a basic example first, and then illustrate how you might process elements from Gutenberg and from Elementor.

#### Basic example

Our first example shows how to process an HTML element that might be found in the content from a WordPress site. In this example we will show you how to replace a `<blockquote>` element with a React component.

{% hint style="info" %}
The example can be found in [this repository](https://github.com/frontity-demos/frontity-examples/tree/master/processor-blockquote).
{% endhint %}

We first define our processor `quote` in a file `./processors/quote.js`. This file also includes the React component `<Quote>` that will replace any `<blockquote>` element that also has the class `wp-block-quote`. However, a more complex example might import this from a separate file.

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

####	Gutenberg

Our second example will illustrate how a processor can work on an element created by Gutenberg.

{% hint style="info" %}
As mentioned earlier [the repository for the Frontity.org website](https://github.com/frontity/frontity.org/tree/dev/packages/frontity-org-theme) contains a [large number of examples of processors](https://github.com/frontity/frontity.org/tree/dev/packages/frontity-org-theme/src/processors) that you can examine for the details of technical implementation in various cases.
{% endhint %}

Let's use as our example here one of the processors from that repository. We will choose [the `webBrowser` processor](https://github.com/frontity/frontity.org/blob/dev/packages/frontity-org-theme/src/processors/web-browser.tsx).

Gutenberg allows you to add classes to any block. You can do this under Settings → Block → Advanced → Additional CSS class(es).

![](https://frontity.org/wp-content/uploads/2021/06/processing-page-builder-content-img01.png)

In the screengrab above we've added the `has-browser-window` class.

Gutenberg stores the content for a page/post as HTML in the database, adding this class along with Gutenberg's native classes which it uses to correctly render the elements of the page/post.

This HTML is then available to us in the `content.rendered` property received from the REST API. We can therefore simply parse this HTML with the `html2react` component to identify the elements we want to process.

The `webBrowser` processor therefore tests whether the element has the `has-browser-window` class and if so executes the processor function which adds a top bar to the element to create the effect of being in a browser window:
![](https://frontity.org/wp-content/uploads/2021/06/processing-page-builder-content-img02.png)

The processor first imports a [`<Topbar>` component](https://github.com/frontity/frontity.org/blob/dev/packages/frontity-org-theme/src/components/window-top-bar.tsx) which renders the actual top-bar. It then adds it as the first element in the node's `children` array (using [unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)). Adding it as the first element in the array ensures that it will appear above the remaining child elements, creating the browser window effect.

```jsx
import TopBar from "../components/window-top-bar";

export const webBrowser = {
  name: "web-browser",
  test: ({ node }) =>
    node.type === "element" &&
    node.props?.className?.split(" ").includes("has-browser-window"),

  processor: ({ node }) => {
    const topFrame: Element = {
      type: "element",
      component: TopBar,
      props: {},
    };

    node.children.unshift(topFrame);

    /* styles go here */

    return node;
  },
};
```

The processor then merely adds some styling, using the [`<css>` object](https://api.frontity.org/frontity-packages/core-package/frontity#css), before returning the node.

One additional important thing that we need to do to ensure that our Gutenberg content is rendered correctly is to import Gutenberg's stylesheets into our Frontity project.

Gutenberg uses two stylesheets, `theme.css` and `style.css`. These files can be found in the `./wp-includes/css/dist/block-library` directory of your WordPress installation. Copy them across to a location in your Frontity theme, e.g. to a sub-directory called `styles`.

You should then import them into the `index.js` file of your Frontity theme and add them using the [`<Global>` component](https://api.frontity.org/frontity-packages/core-package/frontity#global).

```jsx
import { connect, css, Global, Head, styled } from "frontity";
import gutenbergStyle from "./styles/style.css";
import gutenbergTheme from "./styles/theme.css";

const Theme = ({ state }) => {

  ...

  return (
    <>
      <Global styles={css(gutenbergStyle)} />
      <Global styles={css(gutenbergTheme)} />

      ...

    </>
  );

};
```

{% hint style="info" %}
See [this blog post](https://frontity.org/blog/connecting-gutenberg-and-frontity/) which discusses some of the considerations that went into making Gutenberg and Frontity work together in the development of the frontity.org website. The [section on `html2react`](https://frontity.org/blog/connecting-gutenberg-and-frontity/#frontity-html2react) is particularly pertinent here and contains further examples.
{% endhint %}

####	Elementor

CSS files

wp-content/plugins/elementor/assets/css/frontend.min.css

Elementor also puts files in
  wp-content/uploads/elementor/css
which you will need to copy across to your Frontity project and import

```js
import ElementorStyles from "../assets/frontend.min.css"
import ElementorGlobalStyles from "../assets/global.css"


      <Global styles={css(ElementorStyles)} />
      <Global styles={css(ElementorGlobalStyles)} />
```

Elementor adds classes to the `<body>` tag - you can use a processor to add these classes to the elements that need to look the same in Frontity.
_(Can you add classes to the body tag in Frontity????)_