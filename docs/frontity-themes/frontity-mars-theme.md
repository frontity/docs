# @frontity/mars-theme

## Description

Mars theme is meant to be considered a starter theme or a theme to show people how to use some of Frontity functionalities. You can check out its **code** and structure on our [GitHub repository](https://github.com/frontity/frontity/tree/dev/packages/mars-theme) and find it on [npm](https://www.npmjs.com/package/@frontity/mars-theme).

You can find a detailed guide, both to learn how Frontity and `mars-theme` work on "[Understanding Mars Theme](../guides/understanding-mars-theme-1.md)".

{% hint style="info" %}
Have a look at this Frontity Talk where we talk about the `mars-theme`:

* 📺 [Frontity Talks 2020-04 - mars-theme \[27:52\]](https://www.youtube.com/watch?v=e6n1j4gwFjQ&t=1672s)
{% endhint %}

## Demo

![](../.gitbook/assets/screenshot-mars-theme-demo%20%281%29.png)

You can check out all the features in this [**theme demo**](https://mars.frontity.org/)**.**

## Settings

You can configured it via the `frontity.settings.js` file. The theme options can be specified in the `state.theme` property.

Here you have an example of a possible configuration \(each setting is explained later in detail\):

```javascript
{
  name: "@frontity/mars-theme",
  state: {
    theme: {
      menu: [
        ["Home", "/"],
        ["Nature", "/category/nature/"],
        ["Travel", "/category/travel/"],
        ["Japan", "/tag/japan/"],
        ["About Us", "/about-us/"]
      ],
      featured: {
        showOnList: true,
        showOnPost: true
      }
    }
  }
},
```

All the settings and their description:

| Key | Description | Default value |
| :--- | :--- | :--- |
| **menu** | Menu links to display in the header | \[\] |
| _featuredMedia_.**showOnList** | Whether to show featured image on list view | true |
| _featuredMedia_.**showOnPost** | Whether to show featured media on post view | true |

## API Reference

### Actions

There are some actions used along the theme that you may need useful:

#### actions.theme.toggleMobileMenu

It changes the status of `state.theme.isMobileMenuOpen` , which lets you open/close the mobile menu.

#### actions.theme.closeMobileMenu

It changes `state.theme.isMobileMenuOpen` to `false`, so it closes the mobile menu.

### Libraries

This theme doesn't have its own libraries, but it includes the image and iframe processor of [@frontity/html2react](frontity-mars-theme.md), so all the `<img>` tags are converted into the [`<Image />` component](frontity-mars-theme.md) and the &lt;iframe&gt; tags into the [`<Iframe />` component](frontity-mars-theme.md).

