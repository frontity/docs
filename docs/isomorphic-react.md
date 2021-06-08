# Isomorphic React apps in Frontity

When developing a Frontity project or package the React code (used in your custom theme) should be [isomorphic](https://www.smashingmagazine.com/2015/04/react-to-the-future-with-isomorphic-apps/) (also called universal).

This means that **all the code in a Frontity project should be prepared to be executed both on the server-side and on the client-side**.

{% hint style="info" %}
This is especially important when we import npm packages for use in our Frontity project. For example, [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) is native in client-side only and so is not available server-side. Therefore [a `fetch` that works in both client-side and server-side](https://api.frontity.org/frontity-packages/core-package/frontity#fetch) is recommended.
{% endhint %}

{% hint style="info" %}
Another example is the [`window` object](https://developer.mozilla.org/en-US/docs/Web/API/Window). You should not try to access any of the properties or methods available in the `window` object from code that is going to be executed on the server, as the code will fail since the `window` object is only available in the browser.
{% endhint %}

## Table of Contents

<!-- toc -->

- [Server-side Navigation and client-side Navigation](#server-side-navigation-and-client-side-navigation)
- [Initialization of a Frontity app](#initialization-of-a-frontity-app)
  * [Frontity Lifecycle Initialization Actions](#frontity-lifecycle-initialization-actions)
- [Creating different entry points](#creating-different-entry-points)
- [Server-side code and client-side code](#server-side-code-and-client-side-code)
  * [Server-side only code](#server-side-only-code)
  * [Client-side only code](#client-side-only-code)
  * [Both server-side and client-side code](#both-server-side-and-client-side-code)

<!-- tocstop -->

## Server-side Navigation and client-side Navigation

Every time we access a page on a Frontity site the first load is rendered on the server. Once the initial server-side render (SSR) is complete the HTML is sent to the client (along with React hydration) and then the ensuing navigation is done in the client-side (CSR). ([This enables your site to remain SEO friendly, while also maintaining a good UX](https://medium.com/capital-one-tech/why-everyone-is-talking-about-isomorphic-universal-javascript-and-why-it-matters-38c07c87905)).

Let's take a look at some possible navigation examples as they would occur in an Isomorphic React App:

**Scenario A (SSR)**

If we enter the URL `/home` in the browser's address bar and press Enter, then the page with the slug `home` is rendered in the server and served to the client.
If we enter the URL `/contact` in the browser's address bar and press Enter, then the page with the slug `contact` is rendered in the server and served to the client.

In these two cases, a SSR (Server-Side Render) process has taken the React code and created the proper HTML with the proper content that is "served" to the client so it can be displayed to the user.

**Scenario B (SSR & CSR)**

But consider the case where we enter the URL `/home` in the browser's address bar and press Enter, and then once the page has loaded in the browser we go to the `/contact` URL from a link in the page.

What then happens is:

-  the page with the slug `home` is rendered in the server and served to the client _(as before)_
-  the page with the slug `contact` is this time rendered *in the client* and displayed to the user

In this "Scenario B", we can call the navigation process to get to the `home` page *"server-side Navigation"* and the navigation process to get to the `contact` page *"client-side Navigation"*

We can also refer to these as a *Server-Side Render* process (SSR) in the case of the `home` page, and a *Client-Side Render* process (CSR) in the case of the `contact` page.

![Isomorphic Workflow](https://frontity.org/wp-content/uploads/2021/06/frontity-react-isomorphic-apps-2.png)

*[Open drawing](https://excalidraw.com/#json=4939822133149696,WM4aYk6GSv47pncKIs365Q)*

So, as you can see from the above image, this is something that we need to bear in mind when developing a React theme with Frontity.

Luckily, **ALL** the tools included with Frontity provide this isomorphic behavior out of the box (i.e. they ensure behavior that works both on the server-side and on the client-side).

## Initialization of a Frontity app

The initialization (or Bootstraping) of a Frontity site happens when we do _Server-side Navigation_ (Server-Side Render, SSR), this when we do either:

- type a URL of a Frontity site in the browser's address bar and press Enter, or
- reload a URL of a Frontity site (e.g. by hitting the `refresh` button in the browser on a page that has been rendered in CSR)

In this process (i.e. the request of `/home` in the diagram above) Frontity does the following:

1. Server generates the HTML for the requested page
1. Server sends the HTML to the client
1. Client hydrates the React app in top of the HTML rendered

Once these have occurred React can then take full control of the app and the navigation of the site (through clicks on links) will be handled in the client-side (i.e. the request of `/contact` in the diagram above):

1. Client (React) requests the data from the WordPress server _(if not already in the state)_
1. Client (React) displays the proper HTML with the proper content and data

### Frontity Lifecycle Initialization Actions

 Frontity provides several actions, namely [Frontity Lifecycle Initialization Actions](https://docs.frontity.org/learning-frontity/actions#frontity-lifecycle-initialization-actions), that are executed at specific moments in the initialization process. You can 'hook' functions onto these actions to ensure that they are executed at the appropriate moments in this lifecyle.

 Some of these actions that you can 'hook' your code onto occur on the server-side, and some on the client-side - thus giving you the ability to specify not only *when* your code is executed, but also *where* it is executed.

On the Server Side:

1. Execution of the `init` action
1. Execution of the `beforeSSR` action
1. Server generates the HTML of the requested page
1. Execution of the `afterSSR` action
1. Server sends the HTML to the client

On the Client Side:

1. Execution of the `init` action (again)
1. Execution of the `beforeCSR` action
1. Client hydrates the React app in top of the HTML rendered
1. Execution of the `afterCSR` action

![Frontity Lifecycle Initialization Actions](https://frontity.org/wp-content/uploads/2021/06/Frontity-Lifecycle-Initialization-Actions.png)

## Creating different entry points

By default Frontity will create the final bundles that will be used in the server-side and in the client-side from the `index.js` file in the `src` folder of the theme package you're using for your Frontity project.

However, you can actually create two different [entry points](https://docs.frontity.org/learning-frontity/packages#entry-points) for your React theme package in Frontity. So, instead of having an `index.js` you can have the following two files:
- `client.js` → the entry point of our app when client-side takes controls
- `server.js` → the entry point of our app when server-side takes controls

If Frontity finds those files, it will import the `server.js` one in Node.js and the `client.js` one in the browser, and it will ignore the `index.js` file - which can, nevertheless, still exist.

You can define the appropriate [Frontity Lifecycle Initialization Actions](https://docs.frontity.org/learning-frontity/actions#frontity-lifecycle-initialization-actions) in either, or both, of these files (`client.js` and `server.js`), or in the default `index.js`.

{% hint style="info" %}
Using  `beforeSSR`  is independent of using a  `server.js`  file. You can add a  `beforeSSR`  function to your  `index.js`  and it works fine. The code, of course, will make it into the client bundle, but the action won’t be called there (unless you call it manually).
{% endhint %}

The main use cases where you may want to use two separate  `client.js`  and  `server.js`  files are:

* If you need to access Node.js libraries, such as `"fs"` or `"path"` , because they will fail if present in the client bundle (`"dot-env"` for accessing environment variables, for example).
* If the code contains something that cannot be exposed to the client, for example authentication details such as a hardcoded API key.
* If you are using a heavy library on the server that will increase the size of the client bundle unnecessarily. For example, you can use  [`he`](https://github.com/mathiasbynens/he)  to decode entities in the `server.js`, but it [weighs in at 73Kbs](https://bundlephobia.com/result?p=he@1.2.0). You can therefore use [`new DOMParser().parseFromString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser), which is available in the browser and so is essentially free, in the `client.js` instead.

## Server-side code and client-side code

Due to the isomorphic nature of sites built with Frontity there will be some parts of the code of your Frontity project that will be executed only on the server, some parts that will be executed only on the client (i.e. the browser), and some parts that will be executed on both.

[_Open diagram_](https://excalidraw.com/#json=5101565044064256,fH-YZ9augphZgj4jF_u4IQ)

### Server-side only code

During the initialization of a Frontity app, the following parts of the code are executed only on the server

- The [`server.js` file](#creating-different-entry-points)
- Functions "hooked" onto the [`beforeSSR`](https://docs.frontity.org/learning-frontity/actions#beforessr-server-only) and [`afterSSR`](https://docs.frontity.org/learning-frontity/actions#beforessr-server-only) actions

As the [`frontity.settings.js` file](learning-frontity/settings.md) is executed at Build Time, this file also has also access to server-side packages and environment variables.

{% hint style="info" %}
As the code only runs on the server we can safely make use of environment variables inside of, for example, the `beforeSSR` action.
{% endhint %}

![Server-side only code](https://frontity.org/wp-content/uploads/2021/06/server-side-code.png)


### Client-side only code

During the initialization of a Frontity app, the following parts of the code are executed only on the client-side (i.e. in the Browser).

- The [`client.js` file](#creating-different-entry-points)
- Functions "hooked" onto the [`beforeCSR`](https://docs.frontity.org/learning-frontity/actions#beforecsr-client-only) and [`afterCSR`](https://docs.frontity.org/learning-frontity/actions#aftercsr-client-only) actions

When components are “hydrated”, and also whenever any _Client-side Navigation_ occurs, any hook defined in a React component (such as  `useEffect`) will also be executed only on the client-side.

{% hint style="info" %}
This means that we can safely make use of, for example, the [`window` object](https://developer.mozilla.org/en-US/docs/Web/API/Window) or the native [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) inside of the `useEffect` hook.
{% endhint %}

![Client-side only code](https://frontity.org/wp-content/uploads/2021/06/client-side-code.png)

### Both server-side and client-side code

During the initialization of a Frontity app, the following parts of the code are executed on both the server and on the client side, including:

- Functions "hooked" onto the [`init`](https://docs.frontity.org/learning-frontity/actions#init-client-and-server) action of the [`index.js` file](#creating-different-entry-points)

The rest of the code inside the React components in the project will be executed either server-side or client-side depending on if we're doing Server-Side Navigation or Client-Side Navigation.

![Both Client-side and Server-side code](https://frontity.org/wp-content/uploads/2021/06/server-client-side-code.png)

