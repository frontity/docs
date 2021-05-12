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


### Managed by WordPress (Embedded Mode)

In the **Embedded Mode**, the main domain is connected to the WordPress server which will redirect the to the Frontity Web Server to get the proper HTML based on the data of the WP REST API.

In this case, a service to add a cache layer should be set in front of this WordPress server. This can be done easily though some of the [cache plugins available for WordPress](https://www.wpbeginner.com/plugins/best-wordpress-caching-plugins/)

{% hint style="warning" %}
As there is more routing involved in the Embedded Mode (WordPress makes a call to Frontity which makes a call to the WP REST API to then return the HTML to WordPress) _a caching plugin for the HTML is a necessity_ rather than simply a nice to have.
{% endhint %}

If the URL requested is cached, the plugin will return the content and no further requests will be done to the Frontity Server (or the WP REST API)

## Caching WP REST API Requests

