# Setting the URL of the WordPress data source

The most important setting in a Frontity project is the WordPress installation that can be used as the source of data.

The format of the URL used to access the WordPress REST API varies depending on the type of WordPress installation used as the data source for the Frontity project, so the type of WordPress installation determines how this URL should be set in the Frontity configuration file `frontity.settings.js`.

The main properties in the settings of this package that are implied in determining the URL of the WordPress data source are:

- **`state.source.url`**:  The URL of the WordPress. Required.
- **`state.wpSource.isWpCom`**:  A flag to indicate a special use case of WordPress.com sites (Personal or Premium plans). *It is not required for Free WordPress.com sites. Defaults to `false`.*
- **`state.wpSource.prefix`**: The prefix of the API. *Defaults to `/wp-json`. It is not used if `isWpCom` is `true`.*

{% hint style="info" %}
From [version 1.10](https://github.com/frontity/frontity/blob/dev/packages/wp-source/CHANGELOG.md#1100) of the `@frontity/wp-source` package, the property `state.source.api` _should never be set manually by the end-users_ (it will be computed from the properties mentioned above)
{% endhint %}

## WordPress scenarios

### A Self-hosted WordPress site 

Most Frontity projects will use a self-hosted WordPress site ([wp.org](http://wp.org/))  with a custom domain, such as, for example, `https://test.frontity.org/`.

The recommended way to set this URL is via the `state.source.url` property.

```javascript
// frontity.settings.js
export default {
  packages: [
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://test.frontity.org",
        },
      },
    },
  ],
};
```

In this example the computed values would be:
- `state.source.api`:  `https://test.frontity.org/wp-json` _(value computed from `state.source.url` and `state.wpSource.prefix`)_.
- `state.wpSource.isWpCom`: `false` _(value derived from `state.source.api`)_

The same recommendation applies for custom domains used with a [WordPress.com Business plan](https://wordpress.com/support/business-plan/).


### A Free WordPress.com plan 

Some Frontity projects may use a free WordPress.com installation with the URL pointing to a subdomain of WordPress.com, such as: `https://frontitytest.wordpress.com/`.

The recommended way to set this URL is also via the `state.source.url` property.

```javascript
// frontity.settings.js
export default {
  packages: [
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://frontitytest.wordpress.com/",
        },
      },
    },
  ],
};
```

In this example the computed values would be:
- `state.source.api`:  `https://frontitytest.wordpress.com//wp-json` _(value computed from `state.source.url`)_
- `state.wpSource.isWpCom`: `true` _(value derived `state.source.api`)_

### A Personal or Premium WordPress.com plan 

A less frequent use case is where a Personal or Premium WordPress.com site is used as the data source. These plans allow you to use a custom domain, but in these cases the REST API is available via a different URL format.

The recommended way to set this URL is also via the `state.source.url` property, but in addition to this you also need to specify that it is a Personal or Premium WordPress.com plan installation by setting `state.wpSource.isWpCom` to `true`.

```javascript
// frontity.settings.js
export default {
  packages: [
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: "https://test-premium-plan.frontity.org",
        },
        wpSource: {
          isWpCom: true
        } 
      },
    },
  ],
};
```

In this example the computed values would be:
- `state.source.api`: ` https://public-api.wordpress.com/wp/v2/sites/test-premium-plan.frontity.org` _(value computed from `state.source.url` & `state.wpSource.isWpCom`)_

## Summary

All these scenarios and their different settings combinations are summarized in the following table


||Free [wordpress.com](http://wordpress.com)|Personal or Premium [wordpress.com](http://wordpress.com)|Business [wordpress.com](http://wordpress.com) or [wp.org](http://wp.org)|
| --- | --- | --- | --- |
|needs `state.source.url`|YES|YES|YES|
|needs `state.wpSource.isWpCom`|NO|YES|NO|
