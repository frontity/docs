# Setting the URL of the WordPress source of data

The most important setting in a Frontity project is the WordPress installation that can be used as the source of data

The format of the WordPress URL will be different depending on the type of WordPress installation used with the Frontity project so the type of WordPress installation may require different ways of setting this url in the Frontity settings

The main properties in the settings of this package that are implied in the URL of the WordPress source of data are:

- `state.source.url`:  The URL of the WordPress
- `state.source.api`:  The URL of the WordPress REST API
- `state.wpSource.isWpCom`:  A flag to indicate a special use case of wordpress.com sites (Personal or Premium plans)

`state.source.api` can be set manually but it can be computed from the value of `state.source.url` in most of the cases

## Wordpress scenarios

### A self-hosted WordPress site 

Most of the Frontity projects will use a custom domain for a self-hosted WordPress site ([wp.org](http://wp.org/)) like for example `https://test.frontity.org/`

The recommended way for setting this URL is through the `state.source,url`

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
- `state.source.api`:  `https://test.frontity.org/wp-json` (value computed from `state.source.url`)
- `state.wpSource.isWpCom`: `false` (value derived `state.source.api`)

The same recommendation applies for custom domains used with a [Business wordpress.com plan](https://wordpress.com/support/business-plan/) 


### A Free wordpress.com plan 

Some other Frontity projects will use a free wordpress.com installation with URL's pointing to subdomains of wordpress.com like for example  `https://frontitytest.wordpress.com/` 

The recommended way for setting this URL is also through the `state.source,url`

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
- `state.source.api`:  `https://frontitytest.wordpress.com//wp-json` (value computed from `state.source.url`)
- `state.wpSource.isWpCom`: `true` (value derived `state.source.api`)

### A Personal or Premium wordpress.com plan 

A less frequent use case is using a Personal or Premium wordpress.com. These plans allows you to use a custom domain but this a special case because the final REST API url is available through a special URL

The recommended way for setting this URL is also through the `state.source,url` but specifying it is a Personal or Premium wordpress.com plan installation by setting `state.wpSource.isWpCom` to `true`

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
- `state.source.api`: ` https://public-api.wordpress.com/wp/v2/sites/test-premium-plan.frontity.org` (value computed from `state.source.url` & `state.wpSource.isWpCom`)

---

All these scenarios and their different combinations depending on how you set the values are described in detail in the following table


|                                                                                           | state.frontity.url                    | state.source.url                                     | state.source.api                                                                         | state.source.isWpCom                     |
| ----------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------- |
| **Free WP com** - configured by state.source.url                                          | **Set by the user**: final-domain.com | **Set by the user**: sub.wordpress.com               | **Derived from state.source.url**: sub.wordpress.com/wp-json                             | **Derived from state.source.api**: true  |
| **Free WP com** - configured by state.source.api                                          | **Set by the user**: final-domain.com | **Derived from state.source.api**: sub.wordpress.com | **Set by the user**: public-api.wordpress.com/wp/v2/sites/sub.wordpress.com              | **Derived from state.source.api**: true  |
| **Personal and Premium WP com** - configured by state.source.url and state.wpSource.isWpCom | **Set by the user**: final-domain.com | **Set by the user**: final-domain.com                | **Derived from state.source.url**: public-api.wordpress.com/wp/v2/sites/final-domain.com | **Set by the user**: true                |
| **Personal and Premium WP com** - configured by state.source.url and state.source.api     | **Set by the user**: final-domain.com | **Set by the user**: final-domain.com                | **Set by the user**: public-api.wordpress.com/wp/v2/sites/final-domain.com               | **Derived from state.source.api**: true  |
| **Personal and Premium WP com** - configured by state.source.api                          | **Set by the user**: final-domain.com | **Derived from state.source.api**: final-domain.com  | **Set by the user**: public-api.wordpress.com/wp/v2/sites/final-domain.com               | **Derived from state.source.api**: true  |
| **WP org and Business WP com** - configured by state.source.url                           | **Set by the user**: final-domain.com | **Set by the user**: wp-domain.com                   | **Derived from state.source.url**: wp-domain.com/wp-json                                 | **Derived from state.source.api**: false |
| **WP org and Business WP com** - configured by state.source.api                           | **Set by the user**: final-domain.com | **Derived from state.source.api**: wp-domain.com     | **Set by the user**: wp-domain.com/wp-json                                               | **Derived from state.source.api**: false |

