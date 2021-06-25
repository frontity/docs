# How to process page-builder content in Frontity

## Table of Contents

<!-- toc -->

- [Introduction](#introduction)
- [How do page builders work](#how-do-page-builders-work)
- [The problem with page builders](#the-problem-with-page-builders)
- [What can we do to solve the problem](#what-can-we-do-to-solve-the-problem)
- [Examples](#examples)
  * [Gutenberg](#gutenberg)
    + [Processing Gutenberg content](#processing-gutenberg-content)
    + [Gutenberg stylesheets](#gutenberg-stylesheets)
  * [Elementor](#elementor)
    + [Processing Elementor content](#processing-elementor-content)
    + [Elementor stylesheets](#elementor-stylesheets)
    + [Elementor classes](#elementor-classes)

<!-- tocstop -->

## Introduction

Page builders are becoming increasingly popular with content creators and content editors. They allow people who are not developers, namely content creators and editors, to work in a visual way and to lay out their content and style it with a WYSIWYG interface.

Page builders can either be page building themes such as [Divi](https://www.elegantthemes.com/gallery/divi/) and [Total](https://total.wpexplorer.com/), or plugins such as [Elementor](https://elementor.com/), [WP Bakery](https://wpbakery.com/), and [Beaver Builder](https://www.wpbeaverbuilder.com/).

In addition [Gutenberg](https://wordpress.org/gutenberg/), the new block editor for WordPress that has replaced the traditional TinyMCE based editor, also presents a WYSIWYG style interface and offers advantages similar to those offered by the more established page-builder themes and plugins. Gutenberg is undoubtedly the future of WordPress, and especially so with the forthcoming [Full Site Editing feature](https://make.wordpress.org/design/handbook/focuses/full-site-editing/) promised in the WordPress pipeline.

Whichever type of page builder is opted for, whether theme, plugin, or Gutenberg, it can be used for both posts and pages, and even custom post types if they have been [configured with the necessary support](https://www.cloudways.com/blog/gutenberg-wordpress-custom-post-type/).

## How do page builders work

As already indicated, page builders present the content creator with a WYSIWYG visual interface such that the content creator or editor can layout and style their content with the assurance that what they see while they are editing the page or post will be precisely what the visitor to the site will see. This means that even technically unskilled people can enjoy a great deal of creative freedom when creating their pages or posts.

The page builder will then generate HTML which is stored in the `post_content` field of the `wp_posts` table in the database. Enough styling information is included in the HTML, in the form of classes or inline styles, to allow the page or post to be rendered in the browser accurately simulating the appearance as it was in the editor.

{% hint style="info" %}
Virtually all page builders will structure the post/page using the _three C's_, which are Container, Column, and Content.

Top level elements are _Containers_. These will variously be called "rows" or "sections" depending on the page builder you are using. Whatever they're called in your particular page builder they divide the page/post up into distinct areas and are stacked vertically.

Each Container will have one or more _Columns_. These are arrayed horizontally - at least in large viewports on devices with large screens, but on devices with small screens or if the viewport is narrow then these could be arrayed vertically.

_Content_, i.e. what is visually seen on the screen (such as headings, paragraphs, and images), is then presented within a Column.

Whichever page builder you are using, you will find that this structure is common and can be seen reflected in the final HTML markup.
{% endhint %}

Usually the page builder will have one or more generic style sheets which define styles for the classes added by the page builder. Some of these style sheets are static and exist at the time that the page builder is installed in WordPress, and some of them may be dynamically generated for a particular site, or even for a particular page/post, as the content is created.

These style sheets need to be copied across to your Frontity project and added using the [`<Global />` component](https://api.frontity.org/frontity-packages/core-package/frontity#global).

{% hint style="warn" %}
A cautionary note that should be borne in mind is that some page builders, such as Divi and WP Bakery, populate the content with a large number of shortcodes. Ideally these should result in rendered HTML appearing in the `content.rendered` property delivered by the REST API, but unfortunately some of these shortcodes can appear verbatim in the content that comes from the REST API.
{% endhint %}

## The problem with page builders

Ideally we want to have the performance, and other, benefits of a decoupled frontend for our WordPress sites, yet at the same time retain the WYSIWYG content editing experience that page builders do so well.

However, by using a decoupled frontend (such as Frontity) we lose the tight integration that exists between a page builder and WordPress, and so the appearance of the page or post as it appears in the page builder's editor, and also when viewed using the WordPress theme, is not as accurately reproduced by Frontity. At least not without some additional work on the developer's part.

## What can we do to solve the problem

There are a number of approaches that we as developers can take in order to solve the problem of pages and posts created with a page builder not appearing as intended in Frontity.

The most straightforward approach would be to create the Frontity theme to reproduce the appearance of the pages/posts built with a page builder. This approach would require agreement up-front between content creators, designers, and developers and could restrict the creative freedom of content creators and designers as they must develop the pages and posts to work within the predefined constraints of the Frontity theme. That said, this approach could work for small or stylistically simple sites.

A second approach would be to copy the style sheets that the page builder uses across to the Frontity site and import them into the project and use them with the [`<Global />` component](https://api.frontity.org/frontity-packages/core-package/frontity#global). In most cases this should result in a fairly accurate rendering of the pages or posts in Frontity. However, the benefits of CSS in JS are lost with this approach and adding several style sheets to the project using the `<Global />` component will potentially result in reduced performance of the site.

In theory it's possible to reproduce the page builders' style sheets in CSS in JS but this would be onerously difficult and time-consuming.

Another approach is to use html2react processors that detect matching elements in the HTML and "process" them, i.e. modify or alter them in some way, or indeed completely replace them with something else entirely, such as a React component.

{% hint style="info" %}
For detailed explanations of processors please see the [reference page for the `<html2react>` package](https://api.frontity.org/frontity-packages/features-packages/html2react), and in particular [the section on processors](https://api.frontity.org/frontity-packages/features-packages/html2react#processors).

In addition our documentation contains a [guide to working with processors](./using-processors.md) and there is also a discussion about processors in [one of the videos in the Frontity Talks series](https://www.youtube.com/watch?v=qOfENWKR7EE&list=PLC9teX20GdrTBeOzSwE-bFW-MbBEUwowS&index=10&t=1272s).
{% endhint %}

## Examples

In these examples we will illustrate how you might work with content from Gutenberg and from Elementor in a Frontity project. We will look at what we might need to include in our Frontity project, which is mainly copying `.css` files that the page builder uses, and also illustrate using a processor to dynamically process elements.

###	Gutenberg

#### Processing Gutenberg content

In this example we will illustrate how a processor can work on an element created by Gutenberg.

{% hint style="info" %}
For further ideas and information [the repository for the Frontity.org site](https://github.com/frontity/frontity.org/tree/dev/packages/frontity-org-theme) contains a [large number of examples of processors](https://github.com/frontity/frontity.org/tree/dev/packages/frontity-org-theme/src/processors) that you can examine for the details of technical implementation in various cases.
{% endhint %}

Let's use as our example here one of the processors from that repository. We will choose [the `webBrowser` processor](https://github.com/frontity/frontity.org/blob/dev/packages/frontity-org-theme/src/processors/web-browser.tsx).

Gutenberg allows you to add classes to any block. You can do this under Settings → Block → Advanced → Additional CSS class(es).

![](https://frontity.org/wp-content/uploads/2021/06/processing-page-builder-content-img01.png)

In the screengrab above we've added the `has-browser-window` class.

Gutenberg stores the content for a page/post as HTML in the database, adding this class along with Gutenberg's native classes which it uses to correctly render the elements of the page/post.

This HTML is then available to us in the `content.rendered` property received from the REST API. We can therefore simply parse this HTML with the `html2react` component to identify the elements we want to process.

The `webBrowser` processor tests whether the element has the `has-browser-window` class and if so executes the processor function which adds a top bar to the element to create the effect of being in a browser window:

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

    node.props.css = css`
      // styles go here
    `

    return node;
  },
};
```

The processor then merely adds some styling, using the [`<css>` object](https://api.frontity.org/frontity-packages/core-package/frontity#css), before returning the node.

#### Gutenberg stylesheets

One additional important thing that we need to do to ensure that our Gutenberg content is rendered correctly is to import Gutenberg's style sheets into our Frontity project.

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
See [this blog post](https://frontity.org/blog/connecting-gutenberg-and-frontity/) which discusses some of the considerations that went into making Gutenberg and Frontity work together in the development of the frontity.org site. The [section on `html2react`](https://frontity.org/blog/connecting-gutenberg-and-frontity/#frontity-html2react) is particularly pertinent here and contains further examples.
{% endhint %}

###	Elementor

Getting Elementor content to appear as desired in a Frontity project is a bit clunkier and less elegant that working with Gutenberg content.

However, Elementor is an immensely popular page-builder plugin, so it's worth going over the steps needed to get Element content to render properly in a Frontity project.

#### Processing Elementor content

Processing Elementor content is no different to processing Gutenberg content, or indeed any other content. We will therefore not go over the process again here. Please refer to the section above on [processing Gutenberg content](#processing-gutenberg-content), or see our guide to [working with processors](./using-processors.md).

As with any content the best way to decide what and how to implement a processor is to examine the HTML generated by the standard WordPress theme and identify the elements and classes that are added to the markup.

#### Elementor stylesheets

There are a number things that need to be taken into account here in order to get Elementor content to render correctly in a Frontity project.

Like with Gutenberg, it's necessary to copy Elementor's CSS files over to your Frontity project. However, with Elementor there are several files in two different locations.

You will need Elementor's `frontend.min.CSS` file which is located in the `wp-content/plugins/elementor/assets/css/` directory.

Elementor also puts files in `wp-content/uploads/elementor/css`. In particular you will need `global.css` from this directory.

Copy these two files across to your Frontity project and import them into your main `<Theme>` component in your theme's `index.js` file:

```js
import ElementorStyles from "../assets/frontend.min.css"
import ElementorGlobalStyles from "../assets/global.css"

const Theme = ({ state }) => {

  // ...

  return (
    <>
      {// ...}
      <Global styles={css(ElementorStyles)} />
      <Global styles={css(ElementorGlobalStyles)} />
      {// ...}
    </>
  )
}
```

Elementor may put other post or page specific stylesheets in the `wp-content/uploads/elementor/css` directory. These will usually each be specific to a particular page or post.

You should copy any that you find there (or at least any that you identify that you will need) to your Frontity project and import them into your Frontity theme, for example _(the filenames in your project may differ)_:

```js
import ElementorPost6Styles from "../assets/post-6.css"
import ElementorPost8Styles from "../assets/post-8.css"

const Theme = ({ state }) => {

  // ...

  return (
    <>
      {// ...}
      <Global styles={css(ElementorPost6Styles)} />
      <Global styles={css(ElementorPost8Styles)} />
      {// ...}
    </>
  )
}
```

{% hint style="info" %}
Remember that the preferred way of styling a Frontity project is to use CSS in JS, and the benefits of CSS in JS are lost when adding style sheets to the project using the `<Global />` component. Adding stylesheets in this way can potentially affect the performance of the site.

You may need to add several `.css` files from Elementor in this way in order to accurately reproduce the look and feel of the content in your Frontity project, so keep in mind the potentially adverse effect of this on the performance of your site.
{% endhint %}

#### Elementor classes

A complication that needs to be taken into account is that Elementor adds classes to the `<body>` tag. However, you can add these same classes to the `<body>` tag of your Frontity project using the [`<Head>` component](https://api.frontity.org/frontity-packages/core-package/frontity#head).

First import the `<Head>` component into your theme's `index.js` file and then use it in your main `<Theme>` component passing it a `bodyAttributes` prop containing an object with the classes that you want in your `<body>` tag.

```js
import { Head } from "frontity";

const Theme = ({ state }) => {

  // ...

  return (
    <>
      {// ...}
      <Head bodyAttributes={{
        class: 'elementor-default elementor-page elementor-kit-8'
      }} />
      {// ...}
    </>
  )
}
```

{% hint style="info" %}
**Note** that the classes that you need for your project may differ from those in the example above. The easiest way to find out what classes you need is to inspect the HTML of the page generated by WordPress.

You may not need all the classes that you find in the `<body>` tag there. WordPress itself adds certain classes, and your WordPress theme may well be adding classes of it's own.

So you will need to identify which are the Elementor classes. This should be pretty easy as they usually start with `elementor-`, however a trial-and-error approach is needed here to see which classes added to the `<body>` tag produce the desired result in the browser.
{% endhint %}

{% hint style="info" %}
**Note also** that live reload doesn't work when you add or edit `<Head>` components to your theme. You will need to manually refresh your browser in order to see the new classes added to the `<body>` tag.
{% endhint %}

