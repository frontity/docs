# Isomorphic React apps in Frontity

When developing a Frontity project or package the React code (used in your custom theme) should be [isomorphic](https://www.smashingmagazine.com/2015/04/react-to-the-future-with-isomorphic-apps/) (also called universal) 

This means that all the code in a Frontity project should be prepared to be executed both on the server-side and in the client-side.

{% hint style="info" %}
This is specially important when we import npm packages to use them in our Frontity project. For example, [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) is native in client-side but not in Server Side, so we should use [a `fetch` that works in both Client & server-side](https://api.frontity.org/frontity-packages/core-package/frontity#fetch) 
{% endhint %}

Every time we access a page the first load is rendered from the server and from there the navigation is done in the client-side ([this allows a SEO friendly behavior while maintaining a good UX](https://medium.com/capital-one-tech/why-everyone-is-talking-about-isomorphic-universal-javascript-and-why-it-matters-38c07c87905))

Let's take an example of an isomorphic react app:

If we enter the URL of the `pageA` and press Enter, then `pageA` is rendered in the server and served to the client
If we enter the URL of the `pageB` and press Enter then `pageB` is rendered in the server and served to the client

In these two cases, a SSR (server-side Render) process has taken the React code and created the proper HTML with the proper content that is "served" to the client so it can be displayed to the user

But if we enter the URL of the `pageA`, press Enter and from any some link in our app we go to `pageB` what is happening is:
-  `pageA` was rendered in the server and served to the client
-  `pageB` was rendered *in the client* and displayed to the user

![Isomorphic Workflow](https://frontity.org/wp-content/uploads/2021/06/frontity-react-isomorphic-apps-.png) 

*[Open drawing](https://excalidraw.com/#json=6616620059328512,rwp6fVWHxGIgvfE0aYZvFQ)*

So, as you can see, we have to keep in mind this when developing a React theme with Frontity

Luckily, ALL the tools provided by Frontity provide an isomorphic behavior (they assure a behavior that works in both the server-side & the client-side)

## Initialization (or Bootstraping) of a Frontity app

The initialization (or bootstraping) of a Frontity site happens when :

- When we type a URL of a Frontity site in the browser and press Enter 
- When we reload a URL of a Frontity site

In this process (request of `/pageA` in the diagram above) Frontity does the following:

1. Server generates the HTML of the requested page
1. Server sends the HTML to the client
1. Client hydrates the React app in top of the HTML rendered

From that point, React can take full control of the app and the navigation in the site through clicks will be handled in the client-side (request of `/pageB` in the diagram above):

1. Client (React) requests the data from the server 
1. Client (React) displays the proper HTML with the proper data

### Frontity Lifecycle Initialization Actions

With Frontity you can define some actions ([Frontity Lifecycle Initialization Actions](https://docs.frontity.org/learning-frontity/actions#frontity-lifecycle-initialization-actions)) that will be executed at specific moments of this initialization process:

1. Execution of the `init` action
1. Execution of the `beforeSSR` action
1. Server generates the HTML of the requested page
1. Server sends the HTML to the client
1. Execution of the `afterSSR` action
1. Execution of the `init` action (again)
1. Execution of the `beforeCSR` action
1. Client hydrates the React app in top of the HTML rendered
1. Execution of the `afterCSR` action

![Frontity Lifecycle Initialization Actions](https://frontity.org/wp-content/uploads/2021/04/actions-triggered-by-frontity.png)

## Creating different entry points

By default, Frontity will create the final bundles that will be used in the server-side and in the client-side from the `index.js` file in the `src` folder of the theme package you're using for your Frontity project

But, we can actually create 2 different [entry points](https://docs.frontity.org/learning-frontity/packages#entry-points) for our React theme package in Frontity. This is, instead of having and `index.js` we can split it in:
- `client.js` → the entry point of our app when client-side takes controls
- `server.js` → the entry point of our app when server-side takes controls

If Frontity finds those files, it will import the `server.js` one in Node.js and the `client.js` one in the browser, and it will ignore the `index.js` file. It can still exist, though.

We can define the [Frontity Lifecycle Initialization Actions](https://docs.frontity.org/learning-frontity/actions#frontity-lifecycle-initialization-actions) in both these files (`client.js` and `server.js`) or in the default `index.js`. 

{% hint style="info" %}
Using  `beforeSSR`  is independent of using a  `server.js`  file. You can add a  `beforeSSR`  function to your  `index.js`  and it works fine. The code, of course, will make it into the client bundle, but the action won’t be called there (unless you call it manually).
{% endhint %}

The only moment where you may want to divide between two separate  `client.js`  and  `server.js`  files is:

* If you need to access Node.js libraries, like  `"fs"`  or  `"path"` , because that will fail if it’s present in the client bundle. For example, when using `dot-env`.
* If the code contains something that cannot be exposed to the client. For example, a hardcoded API key.
* If you are using a heavy library on the server that will increase the size of the client bundle unnecessarily. For example, we use  `he`  to decode entities in the server, but it [weights 73Kbs](https://bundlephobia.com/result?p=he@1.2.0) so we use the  `new DOMParser().parseFromString`  in the client, which is available in the browser and essentially free.