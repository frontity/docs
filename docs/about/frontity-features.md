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
* [Perfect accessibility](frontity-features.md#perfect-accessibility)
* [Battle-tested](frontity-features.md#battle-tested-framework)
* [Serverless and horizontal scaling](frontity-features.md#serverless-and-horizontal-scaling)
* [First class TypeScript support](frontity-features.md#first-class-typescript-support)
* [Support for ES6 in modern browsers](frontity-features.md#support-for-es6-in-modern-browsers)
* [Support for Wordpress.com & WordPress.org](frontity-features.md#support-for-wordpress-com-and-wordpress-org)
* [Support for multiple sites with a single installation](frontity-features.md#support-for-multiple-sites-with-a-single-installation)
* [Code Splitting](frontity-features.md#code-splitting)
* [Smallest React bundle possible](frontity-features.md#smallest-react-bundle-possible)
* [Ready for React Concurrent and Suspense](frontity-features.md#ready-for-react-concurrent-and-suspense)

## Frontity features

### ⚙ Zero setup development

Everything is already wired up you can focus on building your site: React, webpack, Babel, SSR, Routing, CSS-in-JS, WP REST API, TypeScript, Linting, Testing, and so on.

### 🚀 **Lightning-fast loading**

Frontity sends an HTML that is ready to start navigating the site, so the initial load feels almost instant. No extra assets or round trips are necessary.

This HTML is fully **functional** and **navigable** without JavaScript. Once React loads, it takes control of the app and users don’t notice any change, it is 100% transparent.

### ⚡️ Instant in-app navigation

Once React has loaded, our router prefetches other routes and data automatically. Users never have to wait when they navigate inside the app.

### 🗄 server-side Rendering

Frontity responds with a fully populated HTML file generated with React. This reduces the time required for the first contentful paint and ensures that the **SEO** is **not harmed**.

The content is retrieved using the WordPress REST API. Once React is loaded in the browser, it takes control of the page and does its magic.

### &lt;&gt; Extensible

One of the most amazing things about Frontity is its extensibility: it allows you to easily add new features to your theme via **extensions** and **NPM packages** without having to create them from scratch.

We are working on a lot of Frontity extensions which will be available soon. You can check them out [here](https://github.com/frontity/docs/tree/a6a79476ae299fdebf52cf13ddeaca9ede179f24/docs/frontity-features/extensions.md). Some examples are Yoast SEO, AdSense, SmartAds, DoubleClick for Publishers, OneSignal Push Notifications, Disqus, Google Analytics, Google Tag Manager, or ComScore.

Apart from these extensions, there are many other **interface tools** specifically created for Frontity: context routing, swipe navigation, infinite scrolling, html-to-react, gutenberg-to-react, etc.

Our themes can also use any of the 80.000 React packages currently available in npm.

### 🌎 Perfect accessibility

As part of our mission to make building sites with WordPress and React easier and more accessible, we also want to develop the framework focused on this aspect. Frontity is perfectly **accessible by default** and will provide tools that let the developers know if they break it.

### 🎖 Battle-tested framework

We’re open sourcing the internal framework we’ve been using to power big WordPress news sites during the last year. Used by million readers, Frontity is proven and ideal for building engaging frontend experiences.

### 📈 Serverless and horizontal scaling

The Frontity server is so small it suits perfectly the serverless requirements. That means infinite scaling for the frontend.

All the server code is bundled in one file, ready to work with serverless services like [Vercel](https://vercel.com/docs) \(using its CLI `now`\) or [AWS Lambda](https://aws.amazon.com/es/lambda/). Frontity is also prepared to scale horizontally in any Node.js server.

### {  } First class TypeScript support

Frontity has amazing TypeScript support. Actually, we like it so much that Frontity itself is built using TypeScript. But don’t worry, it’s **absolutely** optional: if you don’t know or don’t want to learn it you can use regular JavaScript without problems!

### **💻 Support for ES6 in modern browsers**

Frontity generates two bundles of JavaScript:

* One in ES6 without transpilation or polyfills so it’s as small and fast as possible. 
* The other in ES5 for the old browsers that don’t support ES6.

Modern browsers that support ES6 modules will request the ES6 bundle, translating into a **reduced bundle size** and **shorter evaluation time** in the browser. This guarantees that performance is not harmed in the modern browsers while ensuring backwards compatibility with the old ones.

### 🔗 Support for Wordpress.com & WordPress.org

Frontity can work with different “source” extensions. The first beta version includes a “wp-source” which works with the **REST API** of any [wordpress.com](https://developer.wordpress.com/docs/api/) or [wordpress.org](https://developer.wordpress.org/rest-api/) site. This way, whether you have a self-hosted site or it is hosted by Automattic, Frontity will suit your needs.

Frontity has been designed so it can support **other sources** in the future \(like the [GraphQL API for WordPress](https://www.wpgraphql.com/)\). Actually, we are discussing possible future sources here in [the community](https://community.frontity.org/t/potential-supported-sources/18/3). Feel free to join the conversation and share any ideas you might have.

### ☝️ Support for multiple sites with a single installation

This is something similar to WordPress multisite: Frontity allows you to serve any number of sites with just one installation. This can be really useful for users who manage different clients or those who want to create a network.

### 🕸 Code Splitting

Frontity uses webpack to split the code and send the minimum code required for the app to work. It also allows developers to dynamically load components with the help of loadable-components.

### **🌱 Smallest React bundle possible**

Frontity helps build sites which are fast to deliver better user experiences. That's the reason why we have tried very hard to make the core as small as possible. It has finally been reduced by 60% and only weights 60kb \(gzipped\).

### **✅ Ready for React Concurrent and Suspense**

The React team is working hard to release [Concurrent Mode](https://reactjs.org/docs/concurrent-mode-intro.html), which is a set of features that will improve the user experience of React apps and Frontity will be compatible with it.

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

