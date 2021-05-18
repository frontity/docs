# Caching 


{% hint style="info" %}
With a good CDN caching strategy your Frontity project can be as performant as a static site. 
{% endhint %}

In Frontity projects we can implement two main types of caching:

- **Distributed Caching (CDN)**: The responses of requests are cached and distributed on a Network of Servers (CDN) so next requests for the same content can be directly delivered from the closest server from your location
- **Server Caching (WordPress Cache Plugins)**: The responses of requests are cached and stored in the server so next requests for the same content can be directly delivered from memory saving processing time. This strategy will mostly be managed by WordPress Cache Plugins in Frontity Architectures. 

![](https://frontity.org/wp-content/uploads/2021/05/cdn-server-caches-embdeded-mode.png)

## Table of contents

<!-- toc -->

- [Distributed caching (CDN)](#distributed-caching-cdn)
  * [CDN for Frontity servers](#cdn-for-frontity-servers)
  * [CDN for WordPress servers](#cdn-for-wordpress-servers)
- [Server caching](#server-caching)
  * [Server caching for URL requests in WordPress servers](#server-caching-for-url-requests-in-wordpress-servers)
  * [Server caching for REST API requests in WordPress servers](#server-caching-for-rest-api-requests-in-wordpress-servers)

<!-- tocstop -->

## Distributed caching (CDN)

Adding a cache layer to cache your URL requests is the most effective way to speed up the delivery of your pages as most of them will be delivered from a server very close to the user's location and no processing time will be required

Based on our experience working with media publishers, we recommend that you select a service offering the [**stale-while-revalidate**](https://www.keycdn.com/blog/keycdn-supports-stale-while-revalidate) cache directive, which is the best cache technique for Frontity projects.

### CDN for Frontity servers

If you're using **Decoupled Mode** (main domain pointing to the Frontity server) our recommendation is that you host your Frontity site with [**Vercel**](https://vercel.com/) that includes a distributed cache network. 

In [their own words about caching](https://vercel.com/docs/edge-network/caching):

> The [Vercel Edge Network](https://vercel.com/docs/edge-network/overview) caches your content at the edge in order to serve data to your users as fast as possible.  

Vercel includes both a CDN and the `stale-while-revalidate` cache directive (which they call [Serverless Pre-Rendering](https://vercel.com/blog/serverless-pre-rendering)). Their service is the quickest and easiest to set up, and you can follow our guide to [deploying Frontity using Vercel](../deployment/deploy-using-vercel).

If you prefer another hosting or want to deploy your Frontity site as a [Serverless](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9) function by using services such as [AWS Lambda](https://aws.amazon.com/lambda), [Netlify](https://www.netlify.com/) or [Google Functions](https://cloud.google.com/functions/), we highly recommend you to add a CDN (such as a [Cloudflare](https://www.cloudflare.com/es-es/)) as it is key to improve your web performance.

{% hint style="info" %}
We have tested many solutions for CDN and `stale-while-revalidate`, and we consider that the best options for this approach are [KeyCDN](https://www.keycdn.com) and [StackPath](https://www.stackpath.com/).
{% endhint %}

### CDN for WordPress servers

If you're using **Embedded Mode** your main domain will point to your WordPress installation. In this architecture all the Cache solutions you were using for your WordPress will still be valid for Frontity using this Embedded Mode.

In WordPress there are several [solutions](https://wpbuffs.com/wordpress-cdn-plugins/) and [plugins](https://wordpress.org/plugins/tags/cdn/) to add a CDN Cache Layer to your site. This CDN implementation can be managed directly from your hosting provider or from a WordPress plugin

## Server caching 

Besides using a CDN to cache your requests, another cache layer can be added at a Server level. This cache will create a local copy of the requests so next time the same page is requested it will be delivered from the local copy (saving processing time)

### Server caching for URL requests in WordPress servers

In the **Embedded Mode**, the main domain is connected to the WordPress server which will redirect the to the Frontity Web Server to get the proper HTML based on the data of the WP REST API.

In this case, a service to cache the URL requests managed by WordPress can be implemented via a WordPress plugin. This can be done easily though some of the [cache plugins available for WordPress](https://www.wpbeginner.com/plugins/best-wordpress-caching-plugins/)

If the URL requested is cached, the plugin will return the content and no further requests will be done to the Frontity Server (or the WP REST API)

### Server caching for REST API requests in WordPress servers

Caching REST API requests is highly recommended in both Decoupled & Embedded Mode asi it will also speed up the general response time of your site


This can also be done easily though a [cache plugin that supports REST API](https://wordpress.org/plugins/wp-rest-cache/) such as [Simple Cache plugin](https://wordpress.org/plugins/simple-cache/)

{% hint style="info" %}
With [Simple Cache plugin](https://wordpress.org/plugins/simple-cache/) you'll have to [turn REST API and Headers options ON](https://frontity.org/wp-content/uploads/2021/05/simple-cache-settings.png), so REST API requests are properly cached
{% endhint %}

