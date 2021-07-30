---
description: >-
  Frontity framework and its extensions will help save you a lot of development
  time while enjoying of all of the latest technology trends, already configured
  for you.
---

# Frontity features

Here's a list of the main features included in Frontity's core:

### **Frontity features**

* [Zero setup development](frontity-features.md#zero-setup-development)
* [Lightning-fast loading](frontity-features.md#lightning-fast-loading)
* [Instant in-app navigation](frontity-features.md#instant-in-app-navigation)
* [Server-side Rendering](frontity-features.md#server-side-rendering)
* [Extensible](frontity-features.md#less-than-greater-than-extensible)
* [Battle-tested](frontity-features.md#battle-tested-framework)
* [Serverless and horizontal scaling](frontity-features.md#serverless-and-horizontal-scaling)
* [First class TypeScript support](frontity-features.md#first-class-typescript-support)
* [Support for ES6 in modern browsers](frontity-features.md#support-for-es6-in-modern-browsers)
* [Support for WordPress.com & WordPress.org](frontity-features.md#support-for-wordpress-com-and-wordpress-org)
* [Support for multiple sites with a single installation](frontity-features.md#support-for-multiple-sites-with-a-single-installation)
* [Code Splitting](frontity-features.md#code-splitting)
* [Smallest React bundle possible](frontity-features.md#smallest-react-bundle-possible)
* [Ready for React Concurrent and Suspense](frontity-features.md#ready-for-react-concurrent-and-suspense)

## Frontity features

### ⚙ Zero setup development

Everything is already wired up so that you can focus on building your site and spend less time worrying about tooling and configuration: React, Webpack, Babel, Server Side Rendering, Routing, CSS-in-JS, WP REST API, TypeScript, Linting, Testing, and so on.


### 🚀 Lightning-fast loading

Frontity sends an HTML that is ready to start navigating the site, so the initial load feels almost instant. No extra assets or round trips are necessary.

This HTML is fully **functional** and **navigable** without JavaScript. Once React loads, it takes control of the app and users don’t notice any change, it is 100% transparent.

### ⚡️ Instant in-app navigation

Once React has loaded, our router prefetches other routes and data automatically. Users never have to wait when they navigate inside the app.

### 🗄 Server Side Rendering

Frontity responds with a fully populated HTML file generated with React. This reduces the time required for the first contentful paint and ensures that it is optimized for search engines.

The content is retrieved using the WordPress REST API. Once React is loaded in the browser, it takes control of the page and does its magic.

### &lt;&gt; Extensible

One of the most amazing things about Frontity is its extensibility, similar to that of WordPress itself. It allows you to easily add new functionality and expand the capabilities of Frontity via **npm packages** without having to create them from scratch.

Frontity packages and themes can also be activated and deactivated without code changes and are reusable across projects, helping reduce both development and maintenance times.

Check out the [API Reference docs](https://api.frontity.org/frontity-packages) to see a **full list of Frontity packages** (including themes) and learn more about the different types of packages.

Frontity themes can also use any of the 80.000 React packages currently available in npm.

### 🎖 Battle-tested framework

In 2019 the Frontity team decided to open-source the internal React framework they had been using to power large WordPress news sites for the previous few years. Used by millions of readers, Frontity is proven and ideal for building engaging frontend experiences. Learn more [here](https://frontity.org/about-us/).

### 📈 Serverless and horizontal scaling

The Frontity server is so small it suits perfectly the serverless requirements. That means infinite scaling for the frontend.

All the server code is bundled in one file, ready to work with serverless services like [Vercel](https://vercel.com/docs) \(using its CLI `now`\) or [AWS Lambda](https://aws.amazon.com/es/lambda/). Frontity is also prepared to scale horizontally in any Node.js server.

### {  } First class TypeScript support

Frontity has amazing TypeScript support. Actually, we like it so much that Frontity itself is built using TypeScript. But don’t worry, it’s **absolutely** optional: if you don’t know or don’t want to learn it you can use regular JavaScript without problems!

### 💻 Support for ES6 in modern browsers

Frontity generates two bundles of JavaScript:

* One in ES6 without transpilation or polyfills so it’s as small and fast as possible. 
* The other in ES5 for the old browsers that don’t support ES6.

Modern browsers that support ES6 modules will request the ES6 bundle, translating into a **reduced bundle size** and **shorter evaluation time** in the browser. This guarantees that performance is not harmed in the modern browsers while ensuring backwards compatibility with the old ones.

### 🔗 Support for WordPress.com & WordPress.org

Frontity can work with different “source” extensions. The 1.0 version includes a [`wp-source` package](https://api.frontity.org/frontity-packages/features-packages/wp-source) which works with the **REST API** of any [wordpress.com](https://developer.wordpress.com/docs/api/) and [wordpress.org](https://developer.wordpress.org/rest-api/) site. This way, whether you have a self-hosted site or it is hosted by Automattic, Frontity will suit your needs.

The framework has been designed so it can support other sources in the future \(like the [GraphQL API for WordPress](https://www.wpgraphql.com/)\).

### ☝️ Support for multiple sites with a single installation

This is something similar to WordPress multisite: Frontity allows you to serve any number of sites with just one installation. This can be really useful for users who manage different clients or those who want to create a network.

### 🕸 Code Splitting

Frontity uses Webpack to split the code and send the minimum code required for the app to work. It also allows developers to dynamically load components with the help of loadable-components. Learn more about this feature in the [Performance](../performance) section.

### 🌱 Smallest React bundle possible

Frontity helps build sites which are fast to deliver better user experiences. That's the reason why we have tried very hard to make the core as small as possible. It has finally been reduced by 60% and only weights 60kb \(gzipped\).

### ✅ Ready for React Concurrent and Suspense

The React team is working hard to release [Concurrent Mode](https://reactjs.org/docs/concurrent-mode-intro.html), which is a set of features that will improve the user experience of React apps and Frontity will be compatible with it.

{% hint style="info" %}
In addition to its feature set, there are many other reasons to use Frontity. Check them out [here](README.md#why-frontity).
{% endhint %}
