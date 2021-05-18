# Decoupled Mode

In **Decoupled mode** the _primary domain points to the Node.js server hosting Frontity_. This is the site that visitors access directly in order to view the content.

Frontity will fetch the data from the REST API of the WordPress Server and will return the final HTML as an [Isomorphic](https://medium.com/capital-one-tech/why-everyone-is-talking-about-isomorphic-universal-javascript-and-why-it-matters-38c07c87905) React App.

![](https://frontity.org/wp-content/uploads/2021/04/frontity-architecture.png)

Any Frontity architecture requires two servers. In Decoupled Mode you need to have:

- A **main domain** pointing to the **Frontity Server**, either:
  - A server running Node.js
  - A hosted function-as-a-service (FaaS) platform allowing serverless computing, such as AWS Lambda or Netlify functions

- A **secondary URL** (or subdomain) pointing to the **WordPress Server**, either:
  - An Apache or Nginx web server running PHP
  - A hosted software-as-a-service (SaaS) platform with WordPress, such as WordPress.com

In this mode site visitors access the site using the primary domain and are served HTML pages directly from Frontity. The secondary domain is used by content editors to access the WordPress admin pages.

Frontity fetches data from the REST API located on the secondary domain, i.e. the WordPress installation, and uses that information to generate the HTML that is returned to the user.

![](https://frontity.org/wp-content/uploads/2021/05/workflow-decoupled-mode.png)

{% hint style="info" %}
The `state.source.url` property set in the `frontity.settings.js` file [configures the URL of the WordPress installation](../guides/setting-url-wordpress-source-data.md).
{% endhint %}

## Table of Contents

<!-- toc -->

- [Features of the Decoupled Mode](#features-of-the-decoupled-mode)
    + [Technical considerations](#technical-considerations)
- [Caching in Decoupled Mode](#caching-in-decoupled-mode)

<!-- tocstop -->

## Features of the Decoupled Mode

The Decoupled Mode offers a number of **advantages**:

- **No extra WordPress plugin** is required for this mode
- It has the **fastest workflow to respond to the requests**: just a single call in SSR is made to the WP REST API, with no round-robin request for content and return of HTML.
- It **provides an extra layer of security** as the WordPress site is not on the public-facing domain.

Decoupled Mode uses two different domains. The main one ([www.domain.com](http://www.domain.com/)) for Frontity and a subdomain ([wp.domain.com](http://wp.domain.com/)) for WordPress.

#### Technical considerations

Due to the two-domains nature of this mode, in _Decoupled Mode_ e developers need to be aware of, test, and take care of many things that are normally handled for you by WordPress. For example:

- _URL replacements_ from [wp.domain.com](http://wp.domain.com/) to [www.domain.com](http://www.domain.com/). _(see the ☝️ hint below)_
- _Cross-domain 301 redirections_ from Frontity to WordPress and vice-versa.
- _301 redirections_ of individual URLs stored in the WordPress database.
- _Proxying WordPress resources_ that need to be served from the [www.domain.com](http://www.domain.com/) domain.
- Adding _CORS headers_ in the [wp.domain.com](http://wp.domain.com/) domain.
- _Purging page cache_ of the [www.domain.com](http://www.domain.com/) domain.


{% hint style="info" %}
☝️ In the guide [URLs in a Migration from WordPress to Frontity Decoupled Mode](../guides/update-db-urls.md) you can learn more about why you need to change these URLs in the content of your WordPress site. The guide also provides useful information on how to do so.
{% endhint %}


Additionally, in Decoupled Mode it is impossible to replicate the editing experience that content editors may be used to because in this mode it’s not possible to:

- Render the _admin bar_ for logged in users.
- Make 100% transparent _post previews_.

![](https://frontity.org/wp-content/uploads/2021/05/decoupled-mode-features.png)

## Caching in Decoupled Mode

With a good [**caching strategy**](../performance/caching.md) your Frontity project can be just as performant as a static site.

In *Decoupled Mode*, the main domain is connected to the Node.js server executing the Frontity app which will process the URL requests to return the proper HTML based on the data from the WP REST API.

In this mode there are two types of requests that can be cached to minimize the computing time and to take advantage of the proximity of CDN servers:
- [CDN for caching URL requests made to Frontity](../performance/caching.md#cdn-for-frontity-servers)
- [Server caching for REST API requests in WordPress servers](../performance/caching.md#server-caching-for-rest-api-requests-in-wordpress-servers)


![](https://frontity.org/wp-content/uploads/2021/05/cache-decoupled-mode.png)

