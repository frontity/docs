# ⚽️ Troubleshooting

In this section we offer solutions to common issues detected in Frontity projects

<!-- toc -->

- [`@frontity/wp-source`](#frontity-wp-source)
  - [💻 FetchError: invalid json response body at ... reason: Unexpected token < in JSON at position 0](#fetcherror-invalid-json-response-body-at-reason-unexpected-token-less-than-in-json-at-position-0)
- [Frontity CLI](#frontity-cli)
  - [💻 Error: Cannot find module ‘@frontity/core’](#error-cannot-find-module-frontity-core)
- [Styles](#styles)
  - [👨‍💻 The pseudo class ":xxx-xxxxx" is potentially unsafe when doing server-side rendering. Try changing it to ":xxx-xxxxx"](#the-pseudo-class-xxx-xxxxx-is-potentially-unsafe-when-doing-server-side-rendering-try-changing-it-to-xxx-xxxxx)

<!-- tocstop -->

{% hint style="info" %}
These are the symbols used in this troubleshooting guide

- 💻 Terminal messages
- 👨‍💻 Browser's console messages
{% endhint %}

## `@frontity/wp-source`

### 💻 FetchError: invalid json response body at ... Reason: Unexpected token < in JSON at position 0

If you launch your site locally with `npx frontity dev` and you get this in the browser

```
Internal Server Error
```

And you get something like this error in the terminal when attempting to load the page in the browser:

```
FetchError: invalid json response body at http://wptest.test/wp-json/wp/v2/posts/?_embed=true&page=1 reason: Unexpected token < in JSON at position 0
```

It may be because your WP doesn't have permalinks activated (which is a requisite of the `@frontity/wp-source` package)

#### Solution

From your WP, go to `Settings -> Permalinks` and check one of the pretty permalinks options, rather than the plain one:

![](./.gitbook/assets/wordpress-permalink-setting.png)

**Related Threads**:

- https://community.frontity.org/t/frontity-not-working-with-plain-permalinks/1428

## Frontity CLI

### 💻 Error: Cannot find module ‘@frontity/core’

If you get this error in the terminal when you do `npx frontity serve`:

```
Error: Cannot find module ‘@frontity/core’
home/lib/node_modules/frontity/dist/src/cli/index.js
home/lib/node_modules/frontity/dist/src/commands/serve.js
home/lib/node_modules/frontity/dist/src/cli/serve.js
```

This may be caused because you're not executing this command from the root of your Frontity project (maybe you're launching it from the `build` folder)

#### Solution

Run `npx frontity serve` from the root of your Frontity project

**Related Threads**:

- https://community.frontity.org/t/error-cannot-find-module-frontity-core/2180

## Styles

### 👨‍💻 The pseudo class ":xxx-xxxxx" is potentially unsafe when doing server-side rendering. Try changing it to ":xxx-xxxxx"

If you are getting these types of warnings in the console:

```
The pseudo class ":nth-child" is potentially unsafe when doing server-side rendering. Try changing it to ":nth-of-type"
The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".
```

This is caused by an [`emotion`](https://github.com/emotion-js/emotion) issue: https://github.com/emotion-js/emotion/issues/1105

As [emotion is used internally](https://docs.frontity.org/learning-frontity/styles#emotion-documentation) by Frontity our code should take into account what can and cannot be done using CSS in JS with emotion

This is NOT an issue that should be ignored or "fixed" under normal circumstances. We recommend you use the following solutions only if you're getting these messages because of some third-party CSS that you don't have no control over (e.g. from a CSS framework or a component library or another external source).

#### Solution 1

For this specific issue, there's [this solution](https://github.com/emotion-js/emotion/issues/1105#issuecomment-557726922) that seems to work pretty well to solve this issue in a Frontity project

**`components/index`**

```
import { CacheProvider } from '@emotion/core'
import createCache from '@emotion/cache'

const myCache = createCache()
myCache.compat = true

<CacheProvider value={myCache}>
  <App/>
</CacheProvider>
```

#### Solution 2

You could also define functions to search and replace the selectors causing the warnings by the recommended ones

**`helpers/css`**

```
export const nthChildToNthChildType = css => css.replace(/\:nth\-child/g, `:nth-type`)
export const firstChildToFirstOfType = css => css.replace(/\:first\-child/g, `:first-of-type`)

export const fixCss = css => firstChildToFirstOfType(nthChildToNthChildType(css))
```

So then you can do in your code...

**`components/index`**

```
import React from "react";
import { Global, css, connect, styled, Head } from "frontity";
...
import gutenbergThemeCSS from "../styles/theme.min.css";
import gutenbergStyleCSS from "../styles/style.min.css";
...

import {fixCss} from '../helpers/css'
const fixedGutenbergThemeCSS = fixCss(gutenbergThemeCSS)
const fixedGutenbergStyleCSS = fixCss(gutenbergStyleCSS)


const Theme = ({ state }) => {

  ...
  return (
    <>
      ...
        <Global styles={css([fixedGutenbergThemeCSS, fixedGutenbergStyleCSS])} />
      ...
    </>
  );
};

...
```

**Related Threads**:

- https://community.frontity.org/t/bootstrap-the-pseudo-class-first-child-is-potentially-insecure-when-processed-on-the-server-side-try-changing-it-to-first-type/1811
