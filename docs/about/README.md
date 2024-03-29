# 📃 About Frontity

## Table of Contents

<!-- toc -->

- [What is Frontity?](#what-is-frontity)
  - [An alternative rendering engine for WordPress](#an-alternative-rendering-engine-for-wordpress)
- [How does Frontity work?](#how-does-frontity-work)
  - [Why a different Node.js server?](#why-a-different-node-js-server)
- [Why WordPress and React?](#why-wordpress-and-react)
- [Why Frontity?](#why-frontity)
  - [Benefits of using React and WordPress with Frontity](#benefits-of-using-react-and-wordpress-with-frontity)
  - [Frontity features](#frontity-features)
  - [Key differences from other React frameworks](#key-differences-from-other-react-frameworks)

<!-- tocstop -->

## What is Frontity?

Frontity is a free and open source framework. It enables you to easily build a **React-based frontend** for a [**headless \(or decoupled\) WordPress**](https://www.elegantthemes.com/blog/wordpress/headless-wordpress) site. Your WordPress site serves its data via the [**REST API**](https://developer.wordpress.org/rest-api/), and the frontend that you build with Frontity consumes this data and renders it in the browser as a SPA \(Single Page Application\) which you can configure and style to your liking.

The above approach, as exemplified by Frontity, has many advantages. But in order to build a site in this way without Frontity there are a lot of things that developers need to learn and configure: _bundling_, _transpiling_, _routing_, _server rendering_, _retrieving data from WordPress_, _managing state_, or _managing CSS_, among many others.

Next.js and Gatsby.js are two great React frameworks that can work with WordPress in this way but none of them is exclusively focused on WordPress. Therefore, there’s still some complex configuration and additional tooling that the developer has to do.

Frontity, on the other hand, is an opinionated framework based on React and focused on WordPress. It aims to make everything simpler, even for developers who are not familiar with React:

- **Focused on WordPress**: each part of the framework has been simplified and optimized to be used with WordPress.
- **Opinionated framework**: developers don’t need to figure out or make decisions about what tools to use for things like CSS or State Management.

This means that everything is ready-to-go out of the box, so to speak, so that you can jump straight in and start creating an amazing new site with WordPress and React right away.

### An alternative rendering engine for WordPress

Frontity can also be described as an alternative rendering engine for WordPress.

Traditionally WordPress generates HTML using a theme based on **PHP** template files.

When the [**REST API**](https://developer.wordpress.org/rest-api/) was merged into core in WordPress 4.7, developers were no longer limited to the PHP rendering engine. They could query WordPress for the stored content which WordPress then sent in JSON format. The developer could then use it wherever and however they wanted. This opened up a new world of possibilities for web developers.

One of those possibilities is to create frontend sites based on React. That’s where Frontity comes into play.

## How does Frontity work?

In a Frontity project, WordPress is used as a headless or decoupled CMS, just for managing the content. Frontity uses data from the WordPress REST API and generates the final HTML that is displayed in the browser using React.

You still use your WordPress dashboard to edit and create content in exactly the same way that you are accustomed to. As you make changes content is automatically updated in your Frontity site, just as it is when using a traditional WordPress theme.

Frontity apps require both a Node.js server and a WordPress server (PHP) to run on. And there are two main Frontity Modes (architectures or configurations):

- **[Decoupled Mode](../architecture/decoupled-mode.md)**: in this mode Frontity fetches the data from the REST API of the WordPress Server and returns the final HTML to the visitor as an Isomorphic React App.
- **[Embedded Mode](../architecture/embedded-mode.md)**: in this mode the [Frontity Embedded Mode plugin](https://api.frontity.org/frontity-plugins/embedded-mode) replaces the PHP theme and makes a request to the Frontity server to retrieve the HTML as an Isomorphic React App, which is returned to the visitor by WordPress.

Depending on the mode used, the main domain (e.g. `www.domain.com`) will be connected either to the WordPress/PHP Server (in Embedded mode) or to the Frontity/Node.js server (in Decoupled mode).

{% hint style="info" %}
Head over to the [**Architecture**](../architecture) page to learn more about how Frontity works.
{% endhint %}

### Why a different Node.js server?

React is a JavaScript library. In order to generate HTML for site visitors or for Google AMP, the server needs to be able to run JavaScript as well.

> _In theory a PHP server can send an empty HTML file with the JavaScript files included and the visitor will see the page after the JavaScript has loaded. However, this is not a good user experience and it is certainly not recommended if your site needs to be SEO friendly and to rank in search engine listings._

**Frontity** can be hosted either on a regular Node.js server or in a **serverless** environment. That makes it both super cheap and infinitely scalable.

## Why WordPress and React?

As at time of writing \(July 2021\), WordPress powers [40% of all the sites](https://w3techs.com/technologies/details/cm-wordpress) on the internet. Its market share has been growing over the last few years and it shows no sign of slowing down.

![](https://w3techs.com/diagram/history_technology/cm-wordpress)

With the shift to Gutenberg, and as the use of [headless CMS](https://css-tricks.com/what-is-a-headless-cms/) grows, the WordPress community has increasingly started considering React for their projects. Besides this, modern libraries like React are growing in popularity and becoming essential to rich user experiences.

If **WordPress** is great and **React** is too, then why not **combine** the two? Especially if you want to build a CMS-powered site with modern web development tools.

We believe this JavaScript-based approach is gaining traction in the WordPress ecosystem, so there’s no better time to start getting familiar with it.

## Why Frontity?

Going with Frontity in the stack means you get the best of WordPress and the best of React while the framework does the heavy lifting. In addition to its feature set, there are other advantages and reasons why you might want to use Frontity.

### Benefits of using React and WordPress with Frontity

#### The developer experience

Frontity requires zero setup configuration, allows you to keep the simplicity of some of the most common WordPress workflows, and includes features that typically require custom engineering such as routing, caching, and integration with third-party services like Analytics (among others).

On the other hand, because Frontity is based on React, it allows you to build great user experiences with all the tools and benefits you expect from this component-based library:

- It gives you the ability to create layouts and complex UIs using components and hooks which are highly reusable.
- React's declarative code makes the code more predictable and easier to debug.
- Having a single codebase means less code to maintain and a big advantage for performance.

The ease of getting started as well as the improved developer experience are some of the biggest benefits that you can gain from using Frontity, allowing you to save an amount of development time and resources.

#### The extensibility

Frontity has been designed to be extensible by default. Similar to how plugins work in WordPress, the framework provides a powerful and flexible package management interface that enables you to easily extend Frontity according to your project needs.

The ability to reuse [packages and themes](https://api.frontity.org/frontity-packages) across projects will also help you reduce both development and maintenance times.

#### It has a strong performance-oriented approach

Frontity’s infrastructure is designed to be as efficient and performant as possible. There are different strategies directly available with Frontity (such as WordPress data normalization, lazy loading, pre-fetching, code splitting) which you can also use to impact positively both on the performance and the UX of your projects.

Head over to the [Performance section](../performance) to learn more.

#### It’s SEO optimized

Frontity does Server Side Rendering. It uses [Isomorphic rendering](../isomorphic-react.md), you need a Node server to render the pages but this means the browser will get fully formed HTML for pages (ready to be indexed). This makes it optimized for search engines right out of the box.

For more fine-grained SEO control, there are Frontity packages that add support for some of the most popular WordPress SEO plugins.

#### The editing experience

Marketing and content teams like tools that help them write, create, and manage pages easily. That's why they choose WordPress.

Frontity allows them to experience no interruption to their usual WordPress publishing workflow and get their work done easily without having to rely on a technical team.

Teams can also benefit from real-time content updates (thanks to Frontity's dynamic architecture) and post preview support with Frontity's [Embedded Mode plugin](https://api.frontity.org/frontity-plugins/embedded-mode), which allows them to keep the preview mode as it currently works in WordPress. In addition, Frontity works great with Gutenberg, not only for creating new content areas but also for site-wide editing.

#### The user experience

With Frontity users get meaningful content as quickly as possible. The Hydration process enables React to take control of the app so that subsequent pages load instantaneously. This is due to pre-fetching and other strategies employed by the framework. Having pages load instantaneously helps to create a great user experience.

{% hint style="info" %}
[These diagrams](https://excalidraw.com/#json=6167540090798080,cvhnsErHXsqarOVT82YgLw) can help you understand how Frontity, a WordPress + React stack and the proper performance strategies may improve the final performance of your project (besides having a great development, content creation, and user experience) in both [Decoupled](../architecture/decoupled-mode.md) and [Embedded](../architecture/embedded-mode.md) Mode.
{% endhint %}

### Frontity features

Frontity and its extensions will help save you a lot of development time and effort, whilst also allowing you to enjoy all of the latest technology trends that come pre-configured for you out of the box. _You can check them out in more detail here:_ [_Frontity Features page_](frontity-features.md)_._

Here are the main ones:

- [Zero setup development](frontity-features.md#zero-setup-development)
- [Lightning-fast loading](frontity-features.md#lightning-fast-loading)
- [Instant in-app navigation](frontity-features.md#instant-in-app-navigation)
- [Server-side Rendering](frontity-features.md#server-side-rendering)
- [Extensible](frontity-features.md#less-than-greater-than-extensible)
- [Battle-tested](frontity-features.md#battle-tested-framework)
- [Serverless and horizontal scaling](frontity-features.md#serverless-and-horizontal-scaling)
- [First class TypeScript support](frontity-features.md#first-class-typescript-support)
- [Support for ES6 in modern browsers](frontity-features.md#support-for-es6-in-modern-browsers)
- [Support for Wordpress.com & WordPress.org](frontity-features.md#support-for-wordpress-com-and-wordpress-org)
- [Support for multiple sites with a single installation](frontity-features.md#support-for-multiple-sites-with-a-single-installation)
- [Code Splitting](frontity-features.md#code-splitting)
- [Smallest React bundle possible](frontity-features.md#smallest-react-bundle-possible)
- [Ready for React Concurrent and Suspense](frontity-features.md#ready-for-react-concurrent-and-suspense)

### Key differences from other React frameworks

Frontity is in a way similar to, and can be compared with, Gatsby.js and Next.js. However, there are some key differences. These are some of the distinct advantages Frontity offers.

#### 100% focused on WordPress

This means the number of concepts that you as a developer need to learn are minimal. No complex configuration is necessary to get started, and the queries to the APIs that deliver the content are pre-configured for the things that developers most frequently need.

In short, you can spend the bulk of your time on the development requirements of the project (e.g. the theme) and less time on setting up the project or worrying about tooling and configuration.

#### Opinionated

Frontity has its own state manager and CSS in JS solution. Thanks to that developers don't have to figure out how to configure these tools, or learn other technologies such as Redux or GraphQL.

#### Extensible like WordPress

Frontity powers a very flexible extensibility pattern, more similar to that of WordPress itself, rather than that of other JavaScript frameworks. In order to add new functionality or expand the capabilities of Frontity, you can use any of the existing Frontity and npm packages without having to build them from scratch.

Moreover, Frontity themes and extensions can be activated and deactivated without code changes and are reusable across projects, helping reduce both development and maintenance times.

#### Rendered dynamically

In Frontity the HTML is rendered dynamically by a Node.js server or a serverless service. This means the HTML does not have to be rebuilt each time the content is edited or new content is published.

Frontity sites can be as fast as static sites as most of the requests are handled by [intermediate cache layers](../performance/caching.md). The static HTML is cached by a CDN, the same way that the dynamic HTML generated by Frontity is cached and served by a CDN.

Because of its dynamic approach, Frontity provides a great power and reliability when it comes to frequent and real-time content updates, making it a great fit for those projects with content that might change rapidly or that is expected to grow over time.

In addition:

- There is no need to learn GraphQL or the REST API. The data is available to you using Frontity's built-in State Manager.
- Frontity can output HTML suitable for Google AMP with exactly the same React codebase.

{% hint style="info" %}
If you still have any questions about Frontity, please check out the [**community forum**](https://community.frontity.org), which is packed full of answers and solutions to all sorts of Frontity questions. If you don't find what you're looking for, feel free to start a new post.
{% endhint %}
