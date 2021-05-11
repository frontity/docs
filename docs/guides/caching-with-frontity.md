# Caching with Frontity

With a good CDN caching strategy your Frontity project can be as performant as a static site. In Frontity projects there are some types of requests that can be cached to minimize the computing time and to take advantage of the proximity of CDN servers:

- **URL requests**: URLs of your Frontity site
  - URL requests managed by **Frontity** (Decoupled Mode)
  - URL requests managed by **WordPress** (Embedded Mode)
- **WordPress REST API requests**: Endpoints of your WordPress REST API

## Table of Contents

<!-- toc -->

- [Caching URL Requests](#caching-url-requests)
  * [Managed by Frontity (Decoupled Mode)](#managed-by-frontity-decoupled-mode)
  * [Managed by WordPress (Embedded Mode)](#managed-by-wordpress-embedded-mode)
- [Caching WP REST API Requests](#caching-wp-rest-api-requests)

<!-- tocstop -->

## Caching URL Requests

Using a [CDN Cache layer](https://en.wikipedia.org/wiki/Content_delivery_network) to manage first the URL requests will minimize the processing time of the Frontity Server while improving the response time as it will be delivered from the closest location

### Managed by Frontity (Decoupled Mode)

In the **Decoupled Mode**, the main domain is connected to the Node.js server executing the Frontity Web Server which will process the URL requests to return the proper HTML based on the data from the WP REST API. 

In this case, a service to add a cache layer should be set in front of this Frontity server. If the URL requested is cached, the Cache Layer (CDN) will return the content and no requests will be done to the WP REST API

Based on our experience working with media publishers, we recommend that you select a service offering the [**stale-while-revalidate**](https://www.keycdn.com/blog/keycdn-supports-stale-while-revalidate) cache directive, which is the best cache technique for this type of architecture.

Our recommendation is that you host your Frontity site with [**Vercel**](https://vercel.com/). Vercel offer both a CDN and the `stale-while-revalidate` cache directive (which they call [Serverless Pre-Rendering](https://vercel.com/blog/serverless-pre-rendering)). Their service is the quickest and easiest to set up, and you can follow our guide to [deploying Frontity using Vercel](../deployment/deploy-using-vercel).

If you deploy your Frontity site as a [Serverless](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9) function by using services such as [AWS Lambda](https://aws.amazon.com/lambda), [Netlify](https://www.netlify.com/) or [Google Functions](https://cloud.google.com/functions/), we highly recommend you to add a Cache Layer (such as a CDN) as it is key to improve your web performance.

{% hint style="info" %}
We have tested many solutions for CDN and `stale-while-revalidate`, and we consider that the best options for this approach are [KeyCDN](https://www.keycdn.com) and [StackPath](https://www.stackpath.com/).
{% endhint %}

### Managed by WordPress (Embedded Mode)

In the **Embedded Mode**, the main domain is connected to the WordPress server which will redirect the to the Frontity Web Server to get the proper HTML based on the data of the WP REST API.

In this case, a service to add a cache layer should be set in front of this WordPress server. This can be done easily though some of the [cache plugins available for WordPress](https://www.wpbeginner.com/plugins/best-wordpress-caching-plugins/)

{% hint style="warning" %}
As there is more routing involved in the Embedded Mode (WordPress makes a call to Frontity which makes a call to the WP REST API to then return the HTML to WordPress) _a caching plugin for the HTML is a necessity_ rather than simply a nice to have.
{% endhint %}

If the URL requested is cached, the plugin will return the content and no further requests will be done to the Frontity Server (or the WP REST API)

## Caching WP REST API Requests

Any Frontity project, no matter the architecture (or mode) implemented, uses the WordPress REST API to get the data need to generate the final HTML.

So, in both modes (**Decoupled and Embedded Mode**), adding a cache layer for the requests done to the WordPress REST API is also recommended  

This can also be done easily though a cache plugin that supports REST API such as [Simple Cache plugin](https://wordpress.org/plugins/simple-cache/)

{% hint style="info" %}
With [Simple Cache plugin](https://wordpress.org/plugins/simple-cache/) you'll have to [turn REST API and Headers options ON](https://frontity.org/wp-content/uploads/2021/05/simple-cache-settings.png), so REST API requests are properly cached
{% endhint %}
