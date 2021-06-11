# How to process page-builder content in Frontity

Video: https://www.youtube.com/watch?v=qOfENWKR7EE&list=PLC9teX20GdrTBeOzSwE-bFW-MbBEUwowS&index=6&t=159s



### Introduction

Page builders are becoming increasingly popular with content creators and content editors. They allow people who are not developers, namely content creators and editors, to work in a visual way and to lay out their content and style it with a WYSIWYG interface.

Page builders can either be page building themes such as [Divi](https://www.elegantthemes.com/gallery/divi/), or plugins such as [Elementor](https://elementor.com/), [WP Bakery](https://wpbakery.com/), and [Beaver Builder](https://www.wpbeaverbuilder.com/).

In addition [Gutenberg](https://wordpress.org/gutenberg/), the new block editor for WordPress that is intended to replace the traditional TinyMCE based editor, also presents a WYSIWYG style interface and offers advantages similar to those offered by the more established page-builder themes and plugins. Gutenberg is undoubtedly the future of WordPress, and especially so with the forthcoming [Full Site Editing feature](https://make.wordpress.org/design/handbook/focuses/full-site-editing/) promised in the WordPress pipeline.

Whichever type of page builder is opted for, whether theme, plugin, or Gutenberg, it can be used for both posts and pages, and even custom post types if they have been [configured with the necessary support](https://www.cloudways.com/blog/gutenberg-wordpress-custom-post-type/).

### The problem with page builders

Ideally we want to have the performance benefits of Frontity by adopting it in the front end for our WordPress sites, yet at the same time retain the WYSIWYG content editing experience that page builders do so well.

However, by using a decoupled front end (such as Frontity) we lose the tight integration that exists between a page builder and WordPress, and so the appearance of the page or post as it appears in the page builder's editor, and when viewed using the WordPress theme, is not as accurately reproduced by Frontity. At least not without some additional work on the developer's part.

### How do page builders work

As already indicated, page builders present the content creator with a WYSIWYG visual interface such that the content creator or editor can layout and style their content with the assurance that what they see while they are editing the page or post will be precisely what the visitor to the site will see. This means that even technically unskilled people can enjoy a great deal of creative freedom when creating their pages or posts.

The page builder will then generate HTML which is stored in the `post_content` field of the `wp_posts` table in the database. Enough styling information is included in the HTML, in the form of classes or inline styles, to allow the page or post to be rendered in the browser accurately simulating the appearance as it was in the editor.

Usually the page builder will have one or more generic stylesheets, some of which are static and exist at the time that the page builder is installed into the WordPress installation, and some of which may be dynamically generated for a particular site, or even page/post, as the content is created.

These style sheets need to be copied across to your Frontity project and added using the `<Global />` component.
[see image here](https://frontity.org/blog/connecting-gutenberg-and-frontity/#adapt-frontity-to-gutenberg)

A cautionary note that should be borne in mind is that some page builders, such as Divi and WP Bakery, populate the content with a large number of shortcodes. Ideally these should result in rendered HTML appearing in the content delivered by the REST API, but unfortunately some of these shortcodes can appear verbatim in the content that comes from the REST API.

### What can we do to solve the problem

There are a number of approaches that we as developers can take in order to solve the problem of pages and posts created with a page builder not appearing as intended in Frontity.

The most straightforward approach would be to create the Frontity theme to reproduce the appearance of the pages/posts built with a page builder. This approach would require agreement up-front between content creators, designers, and developers and could restrict the creative freedom of content creators and designers as they must develop the pages and posts to work within the pre-defined constraints of the Frontity theme. That said, this approach could work for small or stylistically simple websites.

A second approach would be to copy the style sheets that the page builder uses across to the Frontity site and import them into the project and use them with the `<Global />` component. In most cases this should result in a fairly accurate rendering of the pages or posts in Frontity. However, the benefits of CSS-in-JS are lost with this approach and adding several stylesheets to the project using the `<Global />` component will potentially result in reduced performance of the website.

In theory it's possible to reproduce the page builders' stylesheets in CSS-in-JS but this would be onerously difficult and time-consuming.

Another approach is to use processors that detect matching elements in the HTML and "process" them, i.e. modify or alter them in some way, or indeed completely replace them with something else entirely, such as a React component.

### Processors

#### What is a processor?

A processor is a JavaScript object with the following defined properties:

- name
- priority
- test
- processor

The values of `test` and `processor` are functions.

In the case of `test` the function simply returns a boolean value depending on whether a condition is matched. In this example the function returns `true` if the received node (i.e. an HTML element) is an `<img>` tag. For all other elements in the DOM tree it will return `false`.

```jsx
test: ({ node }) => node.component === "img"
```

The `processor` property is a function that "processes" the received node (remember that a node is an HTML element). It can return a modified version of the element or something entirely different, such as a React compontent. This returned value will replace the original element in the DOM tree. The execution of the `processor` function is dependent on the value returned by the `test` function. The `processor` function will only be executed if the `test` function returns `true`.

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
    const Html2React = libraries.html2react.Component;
```

4. Use it in that component where you might otherwise use [`dangerouslySetInnerHTML`](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml), passing it an `html` prop with the content that you wish to be rendered - this will usually be `post.content.rendered`.

```jsx
    <Html2React html={post.content.rendered} />
```

You can see an example of it's use in the [`post.js` file in `mars-theme`](https://github.com/frontity/frontity/blob/dev/packages/mars-theme/src/components/post.js).

For more info please see [the documentation](https://api.frontity.org/frontity-packages/features-packages/html2react) for the `html2react` package.

You now have the ability to use processors.

#### How to use processors

https://api.frontity.org/frontity-packages/features-packages/html2react#processors

Whenever you use the `html2react` component to render the HTML the processors will fire and execute if the test on that node passes, i.e. returns `true`.



Add processors in the array at `libraries.html2react.processors` in the theme's `index.js`. Some such as `image`, `iframe`, and `link` are included with Frontity.
```js
libraries: {
    html2react: {
      processors: [image, iframe, link],
    },
```
But you can define your own processor and add it to this array.

A processor is a function that runs when the HTML is rendered and a specific condition is met. The condition is specified by a pattern (this is a function that returns a boolean) - e.g. a specific element with a specific class.

Then in place of the element that meets this condition the processor returns either a processed version of it (hence the name "processor") or even something else entirely, such as a React component.

Both the function and the condition, i.e. the pattern to be matched, receive the element (node) as a prop. (as well as others: root, state, libraries)


The part about processors
- Reference: https://api.frontity.org/frontity-packages/features-packages/html2react#processors
- Frontity.org examples: https://github.com/frontity/frontity.org/tree/dev/packages/frontity-org-theme

### Examples

#### Basic example
- basic example - processing an HTML element (e.g. <blockquote />) - https://github.com/frontity-demos/frontity-examples/tree/master/processor-blockquote

####	Gutenberg

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