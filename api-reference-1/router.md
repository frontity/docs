# @frontity/tiny-router

## Installation

Add the `tiny-source` package to your project:

```text
npm i @frontity/tiny-source
```

And include it in your `frontity.settings.js` file:

```javascript
module.exports = {
  packages: [
    "@frontity/mars-theme",
    "@frontity/wp-source",
    "@frontity/tiny-router"
  ]
}
```

## Settings

#### state.router.autoFetch

When `autoFetch` is activated, tiny-router does a `actions.source.fetch(link)` each time the action `actions.router.set(link)` is triggered. This ensures that the data you need for the current page is always available.

It also does a `actions.source.fetch(link)` in the `beforeSSR` action to ensure that the data needed for SSR is also available.

It's `true` by default.

## How to use

### State

Tiny router has the following state:

#### state.router.link

This is the path the site is in. For example, `/category/nature/`.

These are some examples of links:

* `/`: You are in the home, path is `/` and page is `1`.
* `/page/2`: You are in the page 2 of the home, path is `/` and page is `2`.
* `/category/nature:` You are in the category `nature`, path is `/` and page is `1`.
* `/category/nature/page/2`: You are in page 2 of category `nature`, path is `/` and page is `2`.
* `/some-post`: You are a post, path is `/some-post`. 
* `/some-page`: You are in a page, path is `/some-page`.

### Actions

Tiny router is very simple, it only has one action: `actions.router.set()` .

For example, this is could be your React component for the links:

```javascript
const Link = ({ actions, children, link }) => {
  const onClick = event => {
    event.preventDefault();
    actions.router.set(link);
  };

  return (
    <a href={link} onClick={onClick}>
      {children}
    </a>
  );
};
```

`actions.router.set()` accepts a string with the `url`.

#### actions.router.set\("/category/nature/page/2"\)

You can pass any url and router will set the new path. It doesn't matter if it's just a path like `/category/nature/`, a path that includes the page `/category/nature/page/2` or the full url `https://site.com/category/nature`.

## API Reference

## TypeScript

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

