# @frontity/head-tags

## Description

This package is designed to get automatically all the data that the [REST API Head Tags plugin](https://wordpress.org/plugins/rest-api-head-tags/) exposes in the REST API, depending on the URL. Basically, this plugin adds all the tags in the `<head>` section of a site to WordPress REST API responses, what is pretty useful for plugins like Yoast SEO or All in One SEO.

This package doesn't make sense without the mentioned plugin, so before installing the package you have to install the plugin in your WordPress backend.

## Installation

Add the `head-tags` package to your project:

```text
npm i @frontity/head-tags
```

Do this in your root and include it in your `frontity.settings.js` file:

```javascript
...
packages: [
    "@frontity/mars-theme",
    "@frontity/tiny-router",
    ...
    "@frontity/head-tags"
]
...
```

{% hint style="warning" %}
If you have an existing project make sure your [@frontity/wp-source](frontity-head-tags.md) package is at least on the 1.5.0 version. If not, update it using this command:  
`> npm install @frontity/wp-source@latest`
{% endhint %}

## Settings

As it works automatically, It doesn't have settings itself, but it requires two Frontity parameters to work:

* `state.frontity.url` : The URL of your site. Usually defined in the `frontity.settings.js` file.
* `state.source.api`: The API where your project is pointing. Defined at [@frontity/wp-source](https://docs.frontity.org/api-reference-1/wordpress-source#state-source-api-required) if you haven't changed your Source.

It needs `@frontity/wp-source` installed and updated to at least the `1.5.0` version.

## How to use

As mentioned before, it doesn't require any configuration. Just install it and everything will work out of the box. Note that you'll need the [REST API Head Tags plugin](https://wordpress.org/plugins/rest-api-head-tags/) installed in your WordPress.

This package needs these other Frontity packages:

## API Reference

### State

#### `headTags.get`

It is a function that accepts a `link`as parameter and it returns an array with the `head_tags` field of that link.

```javascript
state.headTags.get("/blog/hello-world/");
```

will return something like

```javascript
[
  {
    "tag": "title",
    "content": "Hello world! - My Site"
  },
  {
    "tag": "meta",
    "attributes": {
      "name": "robots",
      "content": "max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    }
  },
  {
    "tag": "link",
    "attributes": {
      "rel": "canonical",
      "href": "http://mysite.com/hello-world/"
    }
  }
]
```

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

