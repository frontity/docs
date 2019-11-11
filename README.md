# » Frontity Framework

Welcome to Frontity Documentation **👋** Here you will find all the necessary information to build something awesome with Frontity.

### **Get started!**

There are two main ways to get started with Frontity:

1. [**Quick start guide:**](getting-started/quick-start-guide.md) learn how to install Frontity and get your site ready.
2. [**Community forum**](https://community.frontity.org)**:** tell us about your project and get any help you may need.

## About Frontity framework

* [What is Frontity?](./#what-is-frontity)
* [Why WordPress and React?](./#why-wordpress-and-react)
* [How does Frontity work?](./#how-does-frontity-work)
* [Frontity features](./#frontity-features)
* [Key differences with GatsbyJS](./#key-differences-with-gatsbyjs)

## What is Frontity?

### **A React framework to create WordPress themes**

Frontity is a free and open source framework to develop WordPress themes based on React JS. In other words, it allows to build a **React frontend** for a [headless WordPress](https://www.elegantthemes.com/blog/wordpress/headless-wordpress) site, which serves its data via the WordPress REST API.

This approach has plenty of advantages, but in order to build a WordPress theme with React there are a **lot of things** that developers need **to learn** and configure: _bundling_, _transpiling_, _routing_, _server rendering_, _retrieving data from WordPress_, _managing state_, or _managing css_, among many others.

Next.js and GatbsyJS are two great React frameworks that can work with WordPress but none of them is exclusively focused on this CMS. Therefore, there’s still some **complex configuration** and additional tooling left to the developer.

Frontity is an opinionated React framework focused on WordPress which aims to make everything simpler, even for those developers who are less familiar with React:

* **Focused on WordPress**: each part of the framework has been simplified and optimized to be used with WordPress.
* **Opinionated framework**: developers don’t need to figure out what tools to use for things like css or state management.

This all means that everything is ready so you can jump in and create a new amazing WordPress theme using React right away.

### **An alternative rendering engine for WordPress**

Frontity can also be explained as an alternative rendering engine for WordPress.

In the past, the only way to get HTML out of WordPress was to use its **PHP** rendering engine.

When the [REST API](https://developer.wordpress.org/rest-api/) was merged into core in WordPress 4.7, developers were **no longer limited** to the PHP rendering engine. They could retrieve their WordPress content and use it wherever they want, which opened a new world of possibilities.

One of those possibilities is to create WordPress themes using React. That’s where Frontity comes into play.

## **Why WordPress and React?**

As of April, WordPress powers over [33% of the web](https://wordpress.org/news/2019/03/one-third-of-the-web/).  Its **market share** has been growing over the last years and it shows no signs of slowing down.

![Source: w3techs.com](.gitbook/assets/wp-react.png)

With the shift to Gutenberg as well as the rise of [headless CMS](https://css-tricks.com/what-is-a-headless-cms/) approaches, the WordPress community has started considering React for their projects. Beside this, modern libraries like React are growing popularity and becoming essential to rich user experiences.

If **WordPress** is great and **React** too, why not **combine** the two? Especially if you want to build a CMS-powered site with modern web development tools.

We believe this JavaScript-based approach is already accelerating things in the WordPress ecosystem. There’s no better time to start getting familiar with it.

## **How does Frontity work?**

With Frontity, you can use your WordPress dashboard to edit and manage your content as you usually do. If you make changes, content will automatically update on Frontity.

Frontity apps live in a Node.js server tailored for WordPress.

* It uses the WP REST API to retrieve content and generate the final HTML.
* It is also capable of generating AMP pages with the same React code and CSS.

![](.gitbook/assets/frontity-architecture.png)

**Why a different Node.js server?**

React is a JavaScript library. In order to generate HTML for the visitors or Google, the server needs to be able to run JavaScript as well.

> _In theory a PHP server can send an empty HTML with the JavaScript files and the visitor will see the page after the JavaScript has loaded, but it is not a good user experience and certainly not recommended if your site needs to rank in Google._

**Frontity** is prepared to be hosted either in a regular Node.js server or in **serverless** services. That makes it super cheap and infinitely scalable.

{% hint style="info" %}
We are working in other possible installations, although we strongly recommend this one. You can check them at [possible installations page](installation-and-deploy/possible-architectures.md).
{% endhint %}

## **Frontity features**

Frontity and its extensions will help save you a lot of development time while enjoying of all of the latest technology trends, already configured for you. ****You can check them in detail here: [Frontity Features page](frontity-features/). 

Here are the main ones:

* [Zero setup development](frontity-features/#zero-setup-development)
* [Lightning-fast loading](frontity-features/#lightning-fast-loading)
* [Instant in-app navigation](frontity-features/#instant-in-app-navigation)
* [Google AMP with the same codebase](frontity-features/#google-amp-support-with-the-same-codebase)
* [Server Side Rendering](frontity-features/#server-side-rendering)
* [Extensible](frontity-features/#less-than-greater-than-extensible)
* [Best Lighthouse score](frontity-features/#best-lighthouse-score)
* [Perfect accessibility](frontity-features/#perfect-accessibility)
* [Battle-tested](frontity-features/#battle-tested-framework)
* [Serverless and horizontal scaling](frontity-features/#serverless-and-horizontal-scaling)
* [First class TypeScript support](frontity-features/#first-class-typescript-support)
* [Support for ES6 in modern browsers](frontity-features/#support-for-es6-in-modern-browsers)
* [Support for Wordpress.com & WordPress.org](frontity-features/#support-for-wordpress-com-and-wordpress-org)
* [Support for multiple sites with a single installation](frontity-features/#support-for-multiple-sites-with-a-single-installation)
* [Code Splitting](frontity-features/#code-splitting)
* [Smallest React bundle possible](frontity-features/#smallest-react-bundle-possible)
* [Ready for React Concurrent and Suspense](frontity-features/#ready-for-react-concurrent-and-suspense)

## **Key differences with GatsbyJS**

Frontity is in a sense similar to GatsbyJS, but there are some key differences:

* **100% focused on WordPress**: this means the number of concepts to learn are minimal, it doesn’t need any complex configuration to get you started and the APIs that WordPress developers use to create themes are tailored for the things they usually need.
* **Opinionated: i**t has its own state manager and it uses Emotion for the CSS. Thanks to that people don’t need to learn things like Redux and at the same time it powers a very flexible extensibility pattern, more similar to the one of WordPress itself than to the rest of JS frameworks.
* It’s **rendered dynamically:** this means people don’t have to rebuild the HTML each time they edit or publish something. Our preferred approach is [SPR](https://zeit.co/blog/serverless-pre-rendering), although there are many ways to configure it.
* **Extensible like WordPress**: themes and extensions can be activated and deactivated without code changes.
* No need to learn GraphQL or the REST API, you get the data using the state manager.
* It can output Google AMP html created with the same React codebase.

If you still have any questions about Frontity, please feel free to ask in our [community forum](https://community.frontity.org). 

One of our goals is to build a **community** of people interested in WordPress and React, so we’d love to meet you and learn how Frontity can help your project\(s\).

{% hint style="info" %}
**Subscribe** to our newsletter [**here**](https://frontity.org/#newsletter) ****to get notified of the **latest framework updates.**
{% endhint %}

