# Deploy Frontity on Layer0

[Layer0](https://layer0.co) is an all-in-one platform to develop, deploy, preview, experiment on, monitor, and run your headless frontend. It is focused on large, dynamic websites and best-in-class performance through EdgeJS (a JavaScript-based Content Delivery Network), predictive prefetching, and performance monitoring.

Layer0's EdgeJS enables powerful and precise control of Edge based [caching](https://developer.layer0.co/guides/caching) and [routing](https://developer.layer0.co/guides/routing) that can improve the performance for Frontity sites.

For the full details on deploying Frontity on Layer0 refer to the [Frontity on Layer0 guide](https://developer.layer0.co/guides/frontity) in the developer documentation.

## Getting Started

First start by installing the [Layer0 command line interface \(CLI\)](https://developer.layer0.co/guides/cli),

```bash
npm i -g @layer0/cli
```

## Project setup

Run the `init` command in the directory of your Frontity project:

```bash
cd my-frontity-app
layer0 init
```

This will automatically configure your app for deployment on Layer0.

## Running locally

You can simulate your app running on Layer0 using the `dev` command:

```bash
layer0 dev
```

In particular, the `--cache` option will emulate Edge caching rules locally so that you can test easily test edge behavior during development without having to do a deploy to the cloud:

```bash
layer0 dev --cache
```

## Deploying

Deploying a Frontity app requires an account on Layer0. [Sign up here for free](https://app.layer0.co/signup).

Once you have installed the CLI and created an account, you should login from the terminal by running the `login` command:

```bash
layer0 login
```

Once you have an account and have logged in to the CLI, you can deploy to the Layer0 by running the following in the root folder of your project:

```text
layer0 deploy
```

## Enabling Prefetching \(optional\)

Layer0 improves the performance of your site by bundling an integrated server worker that will predictively prefetch cached pages from the edge. To add the Layer0 service worker to your app, call the `install` function from `@layer0/prefetch/window` in a `useEffect` hook when the app first loads. For example, you can alter the Header component in your theme as follows:

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

To prefetch data into the browser cache using the service worker, use the Prefetch component from @layer0/react. This component prefetches a specific url from the Layer0 edge when it becomes visible in the viewport. You typically wrap it around links. For example:

```javascript
import { Prefetch } from '@layer0/react'

function MyComponent() {
  return (
    <Prefetch url="/some/data/url.json">
      {/* When this link is scrolled into view, /some/data/url.json in JSON will be fetched in the background and put in the browser cache */}
      <a href="/link/to/page">My Page</a>
    </Prefetch>
  )
}
```

