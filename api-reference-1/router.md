# Tiny Router

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

Tiny Router doesn't need any setting :\)

## How to use

### State

Tiny router has the following state:

#### state.router.path

This is the path the site is in, but without the page. For example, `/category/nature/`. 

#### state.router.page

This is the current page of the path, for example `2`. By default it is `1`.

These are some examples of urls:

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
const Link = ({ actions, children, href }) => {
  const onClick = event => {
    event.preventDefault();
    actions.router.set(href);
  };

  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
};
```

`actions.router.set()` accepts either a string with the `url` or an object with `path` and `page`.

#### actions.router.set\("/category/nature/page/2"\)

You can pass any url and router will set the new path. It doesn't matter if it's just a path like `/category/nature/`, a path that includes the page `/category/nature/page/2` or the full url `https://site.com/category/nature`.

#### actions.router.set\({ path: "/category/nature", page: 2  \)

Sometimes it's easier to let it now the path you want along with the page, so you can do so as well.



{% hint style="info" %}
Still any doubts? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

