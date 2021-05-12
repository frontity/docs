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

#### Technical considerations

Due to the two-domains nature of this mode, _Decoupled Mode_ is the mode where developers need to be aware, test, and take care of most things:

- _URL replacements_ from [wp.domain.com](http://wp.domain.com/) to [www.domain.com](http://www.domain.com/).
- _Cross-domain 301 redirections_ from Frontity to WordPress and vice-versa.
- _301 redirections_ of individual URLs stored in the WordPress database.
- _Proxying WordPress resources_ that need to be served from the [www.domain.com](http://www.domain.com/) domain.
- Adding _CORS headers_ in the [wp.domain.com](http://wp.domain.com/) domain.
- _Purging page cache_ of the [www.domain.com](http://www.domain.com/) domain.


{% hint style="info" %}
In the guide [URLs in a Migration from WordPress to Frontity Decoupled Mode](#) you can learn more about why and how to change these URLs in the content of your WordPress site
{% endhint %}


Decoupled Mode is also the mode where, due again to the two-domains nature, it’s impossible to make it 100% transparent for the content editors because it’s not possible to:

- Render the _admin bar_ for logged in users.
- Make 100% transparent _post previews_.

![](https://frontity.org/wp-content/uploads/2021/05/decoupled-mode-features.png)

## Caching in Decoupled Mode

With a good CDN caching strategy your Frontity project can be as performant as a static site. In Decoupled Mode there are two types of requests that can be cached to minimize the computing time and to take advantage of the proximity of CDN servers:

- **[Cache for URL requests](#)**: URL's of the Frontity site
- **[Cache for REST API requests](#)**: Endpoint of the WordPress REST API

![](https://frontity.org/wp-content/uploads/2021/05/cache-decoupled-mode.png)

### Cache for URL requests

In the **Decoupled Mode**, the main domain is connected to the Node.js server executing the Frontity Web Server which will process the URL requests to return the proper HTML based on the data from the WP REST API. 

In this case, a service to add a cache layer should be set in front of this Frontity server. If the URL requested is cached, the Cache Layer (CDN) will return the content and no requests will be done to the WP REST API

Based on our experience working with media publishers, we recommend that you select a service offering the [**stale-while-revalidate**](https://www.keycdn.com/blog/keycdn-supports-stale-while-revalidate) cache directive, which is the best cache technique for this type of architecture.

Our recommendation is that you host your Frontity site with [**Vercel**](https://vercel.com/). Vercel offer both a CDN and the `stale-while-revalidate` cache directive (which they call [Serverless Pre-Rendering](https://vercel.com/blog/serverless-pre-rendering)). Their service is the quickest and easiest to set up, and you can follow our guide to [deploying Frontity using Vercel](../deployment/deploy-using-vercel).

If you deploy your Frontity site as a [Serverless](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9) function by using services such as [AWS Lambda](https://aws.amazon.com/lambda), [Netlify](https://www.netlify.com/) or [Google Functions](https://cloud.google.com/functions/), we highly recommend you to add a Cache Layer (such as a CDN) as it is key to improve your web performance.

{% hint style="info" %}
We have tested many solutions for CDN and `stale-while-revalidate`, and we consider that the best options for this approach are [KeyCDN](https://www.keycdn.com) and [StackPath](https://www.stackpath.com/).
{% endhint %}


### Cache for REST API requests

Adding a cache layer for the requests done to the WordPress REST API is also recommended  

This can also be done easily though a cache plugin that supports REST API such as [Simple Cache plugin](https://wordpress.org/plugins/simple-cache/)

{% hint style="info" %}
With [Simple Cache plugin](https://wordpress.org/plugins/simple-cache/) you'll have to [turn REST API and Headers options ON](https://frontity.org/wp-content/uploads/2021/05/simple-cache-settings.png), so REST API requests are properly cached
{% endhint %}




