# Deploy Frontity on Moovweb XDN

The [Moovweb XDN](https://developer.moovweb.com/) is an all-in-one platform to develop, deploy, preview, experiment on, monitor, and run your headless frontend. The XDN is focused on large, dynamic websites and performance through an integrated Content Delivery Network \(CDN\), CDN-as-JavaScript, predictive prefetching, and performance monitoring. Moovweb offers a free tier.

Moovweb XDN's CDN-as-JavaScript enables powerful and precise control of Edge based [caching](https://developer.moovweb.com/guides/caching) and [routing](https://developer.moovweb.com/guides/routing) that can improve the performance for Frontity sites.

For the full details on deploying Frontity to the XDN, refer to the [Frontity on Moovweb XDN guide](https://developer.moovweb.com/guides/frontity) in the developer documentation.

## Getting Started

First start by installing the [XDN command line interface \(CLI\)](https://developer.moovweb.com/guides/cli),

```bash
npm i -g @xdn/cli
```

## Project setup

Run the `init` command in the directory of your Frontity project:

```bash
cd my-frontity-app
xdn init
```

This will automatically configure your app for deployment on the XDN.

## Running locally

You can simulate your app running on the XDN using the `dev` command:

```bash
xdn dev
```

In particular, the `--cache` option will emulate Edge caching rules locally so that you can test easily test edge behavior during development without having to do a deploy to the cloud:

```bash
xdn dev --cache
```

## Deploying

Deploying a Frontity app requires an account on the Moovweb XDN. [Sign up here for free](https://moovweb.app/signup).

Once you have installed the CLI and created an account, you should login from the terminal by running the `login` command:

```bash
xdn login
```

Once you have an account and have logged in to the CLI, you can deploy to the Moovweb XDN by running the following in the root folder of your project:

```text
xdn deploy
```

## Enabling Prefetching \(optional\)

The XDN improves the performance of your site by bundling an integrated server worker that will predictively prefetch cached pages from the edge. To add the XDN service worker to your app, call the `install` function from `@xdn/prefetch/window` in a `useEffect` hook when the app first loads. For example, you can alter the Header component in your theme as follows:

```javascript
// mars-theme/src/components/header.js

import { useEffect } from 'react'

const Header = ({ state }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      install()
    }
  }, [])

  /* ... */
}
```

To prefetch data into the browser cache using the service worker, use the Prefetch component from @xdn/react. This component prefetches a specific url from the XDN edge when it becomes visible in the viewport. You typically wrap it around links. For example:

```javascript
import { Prefetch } from '@xdn/react'

function MyComponent() {
  return (
    <Prefetch url="/some/data/url.json">
      {/* When this link is scrolled into view, /some/data/url.json in JSON will be fetched in the background and put in the browser cache */}
      <a href="/link/to/page">My Page</a>
    </Prefetch>
  )
}
```

