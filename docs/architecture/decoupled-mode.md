# Decoupled Mode

In **Decoupled mode** the _primary domain points to the Node.js server hosting Frontity_. This is the site that visitors access directly in order to view the content.

![](../.gitbook/assets/frontity-architecture%20%282%29%20%288%29%20%288%29.png)

As already mentioned, [a Frontity architecture requires 2 servers](README.md#servers-and-domains). In this decoupled mode we have:

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

## Caching in Decoupled Mode

With a good CDN caching strategy your Frontity project can be as performant as a static site. In Decoupled Mode there are two types of requests that can be cached to minimize the computing time and to take advantage of the proximity of CDN servers:

- **URL requests**: Any URL of your Frontity site
- **REST API requests**: Any endpoint of your Frontity site

![](https://frontity.org/wp-content/uploads/2021/05/cache-decoupled-mode.png)

### Caching URL Requests

Using a [CDN Cache layer](https://en.wikipedia.org/wiki/Content_delivery_network) to manage first the URL requests will minimize the processing time of the Frontity Server while improving the response time as it will be delivered from the closest location

Based on our experience working with media publishers, we recommend that you select a service offering the [**stale-while-revalidate**](https://www.keycdn.com/blog/keycdn-supports-stale-while-revalidate) cache directive, which is the best cache technique for this type of architecture.

Our recommendation is that you host your Frontity site with [**Vercel**](https://vercel.com/). Vercel offer both a CDN and the `stale-while-revalidate` cache directive (which they call [Serverless Pre-Rendering](https://vercel.com/blog/serverless-pre-rendering)). Their service is the quickest and easiest to set up, and you can follow our guide to [deploying Frontity using Vercel](../deployment/deploy-using-vercel).

If you deploy your Frontity site as a [Serverless](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9) function by using services such as [AWS Lambda](https://aws.amazon.com/lambda), [Netlify](https://www.netlify.com/) or [Google Functions](https://cloud.google.com/functions/), we highly recommend you to add a Cache Layer (such as a CDN) as it is key to improve your web performance.

{% hint style="info" %}
We have tested many solutions for CDN and `stale-while-revalidate`, and we consider that the best options for this approach are [KeyCDN](https://www.keycdn.com) and [StackPath](https://www.stackpath.com/).
{% endhint %}

## Caching REST API requests

{% hint style="info" %}
The addition of a [cache for the REST API](https://wordpress.org/plugins/wp-rest-cache/) is recommended to speed up the initial SSR.
{% endhint %}


### Recommendations for the Decoupled Mode








## Considerations to take into account

For existing WP sites the domain will need changing. You will therefore need to change the `WordPress Address` and the 'Site Address' in the "Settings" page of the WordPress admin. Any URLs in the content stored in the database will also need to be updated to reflect the new domain.

{% hint style="info" %}
If you need information on how to change the URLs in the content stored in the database see [this page](update-db-urls.md).
{% endhint %}

wordpress.com sites have certain limitations, so if your WordPress installation has more complex requirements than a self-hosted wordpress.org site may be necessary.

A REST API cache is recommended to optimise requests to the REST API.

A service offering the `stale-while-revalidate` caching directive is recommended as the best cache technique for this type of architecture - we recommend Vercel as a host for Frontity as they have this functionality built-in to their service.

## Recommendations

### WordPress

If you have an existing WordPress site that you're transitioning to Frontity we recommend that you continue using your existing hosting.

If your site has special requirements, i.e. it needs custom code such as plugins, then a self-hosted wordpress.org site is needed.

If the functional requirements of your site fall within the restrictions imposed by wordpress.com then we recommend using that for your WordPress hosting. Frontity allows you to create a custom theme separate from the ones allowed by wordpress.com.

To prevent your WordPress site from being accessed, and to direct all non-authorised traffic to the Frontity site, we recommend the [Headless Mode plugin](https://wordpress.org/plugins/headless-mode/).

### Node.js

For node.js we recommend that you choose a [serverless](https://about.gitlab.com/topics/serverless/) solution as it will make it cheap, easy and infinitely scalable.

### Caching

