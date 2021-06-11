# 8. Namespaces

Now, let's talk about **namespaces** and how we, as a community, can use them to extend Frontity and create a better tool for everyone.

In **Frontity** `state`, `actions` and `libraries` belong to a shared space among all packages, so each package needs to use its own namespace.

To avoid conflicts between packages we could simply use the name of the package, but we use **namespaces** instead because some packages are interchangeable. For example, it doesn't matter if you install `wp-comments` \(native WordPress comments\) or `disqus-comments` \(Disqus comments\) in your Frontity project because the theme is going to access it using the common `comments` namespace and everything is going to work. In the future, another person could create a third `comments` package, based on a new service, and as long as it respects the same structure \(written in TypeScript\), all the themes \(even the old ones!\) will work perfectly.

More examples of **namespaces** are:

* `source`: for example `wp-source`, `wpgrahql-source` or even `drupal-source`…
* `analytics`: for example `google-analytics`, `gtm-analytics`, `mixpanel-analytics`…
* `notifications`: for example `onesignal-notifications`, `pushwoosh-notifications`…
* `share`: for example `modal-share`, `native-share`…
* `router`: for example `tiny-router`, `3d-router`…

But let's start from the beginning.

## Using namespaces in package exports

As we've already seen, this could be a typical `theme` package:

{% code title="/packages/my-awesome-theme/src/index.js" %}
```javascript
import Theme from "./components";

export default {
  roots: {
    theme: Theme,
  },
  state: {
    theme: {
      menu: [
        ["Home", "/"],
        ["About", "/about"],
      ],
      isMenuOpen: false,
      featuredImage: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },
  actions: {
    theme: {
      toggleMenu: ({ state }) => {
        state.theme.isMenuOpen = !state.theme.isMenuOpen;
      },
    },
  },
};
```
{% endcode %}

One thing you might notice is that `roots`, `state`, and `actions` have a namespace called `theme`. It may seem like it is not adding much value because it is the only namespace. Why not write it like this instead?

{% code title="/packages/my-awesome-theme/src/index.js" %}
```javascript
import Theme from "./components";

export default {
  namespace: "theme",
  roots: Theme,
  state: {
    menu: [
      ["Home", "/"],
      ["About", "/about"],
    ],
    isMenuOpen: false,
    featuredImage: {
      showOnList: false,
      showOnPost: false,
    },
  },
  actions: {
    toggleMenu: ({ state }) => {
      state.theme.isMenuOpen = !state.theme.isMenuOpen;
    },
  },
};
```
{% endcode %}

There are several reasons:

### 1. It's easier to be aware of the final structure

When you access state or actions, it's much easier to see what you need when you write it like this:

{% code title="" %}
```javascript
state: {
  theme: {
    isMenuOpen: false,
  }
},
actions: {
  theme: {
    toggleMenu: ({ state }) => {
      state.theme.isMenuOpen = !state.theme.isMenuOpen; // <- Easy, right?
    }
  }
}
```
{% endcode %}

### 2. It's easier for TypeScript

Even though TypeScript is optional in **Frontity**, we make sure it has excellent support in case you want to use it. TypeScript gets really complex when you try to modify the structure of your objects, and in order to make it as simple as possible, it's good to create objects with the same structure that they will be consumed later. So yes, TypeScript just works :\)

### 3. Multiple namespaces per package

Packages can export multiple namespaces and that's good. It makes **Frontity** more flexible.

For example, imagine we want to create a theme that implements its own share:

{% code title="/packages/my-awesome-theme-with-share/src/index.js" %}
```javascript
import Theme from "./components/theme";
import Share from "./components/share";

export default {
  roots: {
    theme: Theme,
    share: Share
  },
  state: {
    theme: {
      ... // State for the theme
    },
    share: {
      ... // State for the share
    }
  },
  actions: {
    theme: {
      ... // Actions for the theme
    },
    share: {
      ... // Actions for the share
    }
  }
}
```
{% endcode %}

## Making Frontity extensible through namespaces

This is the main reason namespaces exist in **Frontity** and a big part of how Frontity itself works.

We use namespaces to create abstractions on top of packages and, by doing so, they can communicate between each other without really knowing the specific implementation.

It's easier to understand with some examples.

### Example: `comments`

Take for example the [`@frontity/wp-comments`](https://api.frontity.org/frontity-packages/features-packages/wp-comments) package which has an [`actions.comments.submit`](https://api.frontity.org/frontity-packages/features-packages/wp-comments#actions-comments-submit) method. As you can see this method is defined under the `comments` namespace.

In the case of the `@frontity/wp-comments` package the `actions.comments.submit` is responsible for sending the content of the fields in the comment form to WordPress.

Now, all the `theme` packages that want to submit a comments form can check if there is a package with the `comments` namespace with an `actions.comments.submit` method available. If there is, it can be used from any React component in the project to submit comment form data.

```js
// Submit the comment to the post with ID 60
// using the values passed as the second argument.
actions.comments.submit(60, {
  content: "This is a comment example. Hi!",
  authorName: "Frontibotito",
  authorEmail: "frontibotito@frontity.com",
});
```

Users can use their `frontity.settings.js` to install and configure `wp-comments`:

{% code title="frontity.settings.js" %}
```javascript
export default {
  packages: [
    "my-awesome-theme",
    "@frontity/tiny-router",
    "@frontity/wp-source",
    "@frontity/wp-comments", // <- That's it. You have native wp comments now.
  ],
};
```
{% endcode %}

But what if \(and now this is where things become interesting\) users don't want to use WordPress native comments but [Disqus](https://disqus.com/) comments?

Then they just have to install a possible `disqus-comments` package instead:

{% code title="frontity.settings.js" %}
```javascript
export default {
  packages: [
    "my-awesome-theme",
    "@frontity/tiny-router",
    "@frontity/wp-source",
    "@frontity/disqus-comments", // <- That's it. You have disqus now.
  ],
};
```
{% endcode %}

This possible `disqus-comments` package might define a different implementation of `actions.comments.submit` that instead of submitting the comment form data to WordPress it would instead submit it to be handled by Disqus.

Actually, the `theme` has no idea about what specific implementation of `comments` you have installed. Everything works and the theme didn't need to change.

### Example: `analytics`

Let's take a look at another example: two actions in the `analytics` namespace. All the packages that want to implement analytics need to have these two actions:

* `actions.analytics.sendPageview`: send a pageview to the analytics service.
* `actions.analytics.sendEvent`: send an event to the analytics service.

The first one, `actions.analytics.sendPageview`, is used by packages that implement `router`, each time `actions.router.set` is used.

The second one, `actions.analytics.sendEvent`, is used by the theme when something interesting happens. For example:

{% code title="Post.js" %}
```jsx
const Post = ({ actions }) => (
  <Post>
    <Title />
    <Content />
    <ShareButtons onClick={actions.theme.openShareModal} />
  </Container>
);

export default connect(Post);
```
{% endcode %}

{% code title="/packages/theme/src/index.js" %}
```jsx
export default {
  state: {
    theme: {
      shareOpen: false,
    },
  },
  actions: {
    theme: {
      openShareModal: ({ state, actions }) => {
        state.theme.shareOpen = true;
        if (actions.analytics) {
          actions.analytics.sendEvent("share-modal-open");
        }
      },
    },
  },
};
```
{% endcode %}

When users open the share modal, a new event is sent to the analytics service of the `analytics` package that is installed in the **Frontity** project, no matter which one it is 🎉🎉

{% hint style="info" %}
If you still have any questions about Namespaces in Frontity, please check out the [**community forum**](https://community.frontity.org), which is packed full of answers and solutions to all sorts of Frontity questions. If you don't find what you're looking for, feel free to start a new post.
{% endhint %}
