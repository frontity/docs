# 8. Namespaces

{% hint style="info" %}
This "Learning Frontity" guide is intended to be read in order so please start from the [first section](settings.md) if you haven't done so already.
{% endhint %}

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
    theme: Theme
  },
  state: {
    theme: {
      menu: [["Home", "/"], ["About", "/about"]],
      isMenuOpen: false,
      featuredImage: {
        showOnList: false,
        showOnPost: false
      }
    }
  },
  actions: {
    theme: {
      toggleMenu: ({ state }) => {
        state.theme.isMenuOpen = !state.theme.isMenuOpen;
      }
    }
  }
}
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
    menu: [["Home", "/"], ["About", "/about"]],
    isMenuOpen: false,
    featuredImage: {
      showOnList: false,
      showOnPost: false
    }
  },
  actions: {
    toggleMenu: ({ state }) => {
      state.theme.isMenuOpen = !state.theme.isMenuOpen;
    }
  }
}
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

Imagine a Frontity package for WordPress native comments that exports a `Comment` in its libraries. It is called `wp-comments` but its namespaces is `comments`. It may be something like this:

{% code title="/packages/wp-comments/src/index.js" %}
```javascript
import Comment from "./components/Comment";

export default {
    libraries: {
        comments: {
            Comment
        }
    }
};
```
{% endcode %}

Now, all the `theme`  packages that want to include a comments section, can take a look and check if there is a `comments` package installed. If it is, they can include its React component after the post content. 

{% code title="/packages/my-awesome-theme/src/components/Post.js" %}
```jsx
const Post = ({ state, actions, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = state.source.post[data.id];
  
  // Check if libraries.comments exist and if it does get the Comments component.
  const Comments = libraries.comments ? libraries.comments.Comments : null;
  
  return (
    <Container>
      <Title title={post.title.rendered} />
      <Content html={post.content.rendered} />
      <Comments /> // <- Insert the Comments component in its place.
    </Container>
  );
};

export default connect(Post);
```
{% endcode %}

Final users can use their `frontity.settings.js` to install and configure `wp-comments`:

{% code title="frontity.settings.js" %}
```javascript
export default {
  packages: [
    "my-awesome-theme",
    "@frontity/tiny-router",
    "@frontity/wp-source",
    "@frontity/wp-comments" // <- That's it. You have native wp comments now.
  ]
}
```
{% endcode %}

But what if \(and now it is when this become interesting\) users don't want to use WordPress native comments but [Disqus](https://disqus.com/) comments?

Then they just have to install `disqus-comments` instead:

{% code title="frontity.settings.js" %}
```javascript
export default {
  packages: [
    "my-awesome-theme",
    "@frontity/tiny-router",
    "@frontity/wp-source",
    "@frontity/disqus-comments" // <- That's it. You have disqus now.
  ]
}
```
{% endcode %}

The `disqus-comments` package also exports a `Comments` component in `libraries.comments.Comments` so the theme inserts that instead. 

Actually, the `theme` has no idea about what specific implementation of `comments` you have installed. Everything works and the theme didn't need to change.

### Example: `analytics`

Let's take a look at another example: two actions in the `analytics` namespace. All the packages that want to implement analytics need to have these two actions:

* `actions.analytics.sendPageview`:  send a pageview to the analytics service.
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
            shareOpen: false
        }
    },
    actions: {
        theme: {
            openShareModal: ({ state, actions }) => {
                state.theme.shareOpen = true;
                if (actions.analytics) {
                  actions.analytics.sendEvent("share-modal-open");
                }
            }
        }
    }
};
```
{% endcode %}

When users open the share modal, a new event is sent to the analytics service of the `analytics` package that is installed in the **Frontity** project, no matter which one it is 🎉🎉

