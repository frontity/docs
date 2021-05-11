# Decoupled Mode

In **Decoupled mode** the _primary domain points to the Node.js server hosting Frontity_. This is the site that visitors access directly in order to view the content.

![](../.gitbook/assets/frontity-architecture%20%282%29%20%288%29%20%288%29.png)

[A Frontity architecture requires 2 servers](README.md#servers-and-domains). In this decoupled mode we have:

- A main domain pointing to the Frontity Server (Node.js)
- A secondary URL (or subdomain) pointing to the WordPress Server (PHP)

In this mode site visitors access the site using the primary domain and are served HTML pages directly from Frontity. The secondary domain is used by content editors to access the WordPress admin pages.

Frontity fetches data from the REST API located on the secondary domain, i.e. the WordPress installation, and uses that information to generate the HTML that is returned to the user.

![](https://frontity.org/wp-content/uploads/2021/05/workflow-decoupled-mode.png)

{% hint style="info" %}
The `state.source.url` property set in the `frontity.settings.js` file [configures the URL of the WordPress installation](../guides/setting-url-wordpress-source-data.md).
{% endhint %}


## Features of the Decoupled Mode

The Decoupled Mode offers several **advantages**:

- **No extra WordPress plugin** is required for this mode
- It has the **fastest workflow to respond to the requests**: just a single call in SSR is made to the WP REST API, with no round-robin request for content and return of HTML.
- It **provides an extra layer of security** as the WordPress site is not on the public-facing domain.

Decoupled Mode uses two different domains. The main one ([www.domain.com](http://www.domain.com/)) for Frontity and a subdomain ([wp.domain.com](http://wp.domain.com/)) for WordPress.

Due to the two-domains nature of this mode, it’s the mode where developers need to be aware, test, and take care of most things:

- **URL replacements** from [wp.domain.com](http://wp.domain.com/) to [www.domain.com](http://www.domain.com/).
- Cross-domain 301 redirections from Frontity to WordPress and vice-versa.
- 301 redirections of individual URLs stored in the WordPress database.
- Proxying WordPress resources that need to be served from the [www.domain.com](http://www.domain.com/) domain.
- Adding CORS headers in the [wp.domain.com](http://wp.domain.com/) domain.
- Purging page cache of the [www.domain.com](http://www.domain.com/) domain.

It’s also the mode where, due again to the two-domains nature, it’s impossible to make it 100% transparent for the content editors because it’s not possible to:

- Render the admin bar for logged in users.
- Make 100% transparent post previews.

![](https://frontity.org/wp-content/uploads/2021/05/decoupled-mode-features.png)

### URL replacements

The URLs produced by WordPress belong to the subdomain ([wp.domain.com](http://wp.domain.com/)) instead of the main domain ([www.domain.com](http://www.domain.com/)) so they need to be replaced across the whole app:

- REST API links
- Post `content` links
- SEO/Yoast head tags
- Sitemap links
- RSS feed links
- "View post" and similar links on the WordPress dashboard

{% hint style="info" %}
You can follow the guide **[Update the URLs in the content](#)** to learn how to do this
{% endhint %}





## Caching in Decoupled Mode

With a good CDN caching strategy your Frontity project can be as performant as a static site. In Decoupled Mode there are two types of requests that can be cached to minimize the computing time and to take advantage of the proximity of CDN servers:

- **[Cache for URL requests](#)**: URL's of the Frontity site
- **[Cache for REST API requests](#)**: Endpoint of the WordPress REST API

[Caching the URL requests](#) managed by Frontity and the [requests to the WordPress REST API](#) is a recommended strategy for this Decoupled Mode

![](https://frontity.org/wp-content/uploads/2021/05/cache-decoupled-mode.png)

