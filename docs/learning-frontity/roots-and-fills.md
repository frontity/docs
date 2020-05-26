# 4. Roots and Fills

{% hint style="info" %}
This "Learning Frontity" guide is intended to be read in order so please start from the [first section](settings.md) if you haven't done so already.
{% endhint %}

## Roots

Each package has the opportunity to include any number of React nodes in the final HTML.

We finished the [Packages](packages.md) section with an example of package export that contained a `root` like this:

{% code title="/packages/my-awesome-theme/src/index.js" %}
```javascript
import MyAwesomeTheme from "./components";

export default {
  roots: {
    theme: MyAwesomeTheme
  },
}
```
{% endcode %}

Usually, a React app injects it's code in a `<div>` of the body, like this:

{% code title="/index.HTML \(rendered by Frontity\)" %}
```markup
<html>
  <head>...</head>
  <body>
    <div id="root">
      <!-- REACT IS INJECTED HERE -->
    </div>
  </body>
</html>
```
{% endcode %}

**Frontity** uses that `<div id="root">` to inject the roots of all the packages that are installed:

{% code title="/index.HTML \(rendered by Frontity\)" %}
```jsx
<html>
  <head>...</head>
  <body>
    <div id="root">
      <MyAwesomeTheme />
      <ShareModal />
      <YetAnotherPackage />
    </div>
  </body>
</html>
```
{% endcode %}

Most of the time only your `theme` will export a **root**, but if any other package needs something in the DOM, it can include it also. For example, let's imagine a _ShareModal_ package that has a modal like this:

![](../.gitbook/assets/blog-frontity-org%20%281%29%20%281%29.jpg)

This package can export the React elements it needs in its **root** and expose an action like `actions.share.openModal()` to interact with the theme.

The **root** could be something like this:

{% code title="/packages/my-share-modal-package/src/components/index.js" %}
```jsx
const ShareRoot = ({ state }) => (
  state.share.isModalOpen && <ShareModal />
); 
export default ShareRoot;
```
{% endcode %}

And the rest of the package something like this:

{% code title="/packages/my-share-modal-package/src/index.js" %}
```javascript
import ShareRoot from "./components/";

export default {
    roots: {
        share: ShareRoot;
    },
    state: {
        share: {
            isModalOpen: false
        }
    },
    actions: {
        share: {
            openModal: ({ state, actions }) => {
                state.share.isModalOpen = true;
            },
            closeModal: ({ state }) => {
                state.share.isModalOpen = false;
            } 
        }
    }
}
```
{% endcode %}

Then the only thing the theme would have to do if they want to include share functionality is to check if there's a `share` package and if there is, use its `actions.share.openModal()` action when appropriate. For example in these buttons:

![](../.gitbook/assets/blog%20%281%29%20%281%29.jpg)

I hope you're starting to see how extensibility works in **Frontity**, but don't worry too much now, we'll talk in more detail later.

By the way, **Frontity** has an API to modify the `<head>` element inside React using the `<Head>` component like this:

```jsx
import { Head } from "frontity";

const MyPackage = () => (
  <Head>
    <title>The title of the page</title>
    <link rel="canonical" href="http://mysite.com/example" />
    <meta name="description" content="Some description" />
  </Head>
);
```

So even though **Frontity** only allows packages to insert React nodes in the `<div id="root">` of the body, they can also modify the `<head>` by adding tags inside a `<Head>`.

For a more detailed explanation you can check [Head page](head.md).

## Fills

**Frontity** uses an extensibility pattern called **Slot and Fill** to extend your themes. It works like this:

1. In your theme, you include **Slots** where other packages can place content

```jsx
import { Slot } from "frontity";

const Menu = () => (
  <div>
    <Slot name="before menu" />
    <MenuItems />
    <Slot name="after menu" />
  </div>
);
```

1. In your packages, export **Fills** to fill up those spaces:

```jsx
import { Fill } from "frontity";

const AdSenseFills = () => (
  <>
    <Fill name="before menu">
      <AdSense slot="1234" />    
    </Fill>

    <Fill name="after menu">
      <AdSense slot="5678" />    
    </Fill>
  </>
  );
```

Finally, export the **Fills** in your package export like this:

{% code title="/packages/my-adsense-ads/src/index.js" %}
```javascript
import AdSenseFills from "./components/fills";

export default {
  fills: {
    adsense: <AdSenseFills />
  },
}
```
{% endcode %}

Frontity will insert them after the **roots** to ensure they work correctly:

{% code title="/index.HTML \(rendered by Frontity\)" %}
```markup
<html>
  <head>...</head>
  <body>
    <div id="root">
      <!-- ROOTS -->
      <MyAwesomeTheme />
      <!-- FILLS -->
      <AdSenseFills />
    </div>
  </body>
</html>
```
{% endcode %}

The components `<Slot>` and `<Fill>` know about each other so everything ends up in the correct place once the final HTML is generated :\)

![Fills get inserted where they find a Slot with the same name.](../.gitbook/assets/screen-shot-2019-06-03-at-12.08.01%20%282%29.png)

