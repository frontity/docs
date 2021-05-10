# Decoupled Mode

In **Decoupled mode** the primary domain points to the nodejs server, or serverless function, hosting Frontity. This is the site that visitors access directly in order to view the content.

![](../.gitbook/assets/frontity-architecture%20%282%29%20%288%29%20%288%29.png)

This architecture requires:

- **two servers**
- **two domains** (or a domain and a sub-domain)

The two servers that are required are:

- **Apache/nginx + PHP** - for WordPress
- **Node.js/serverless function** - for Frontity

You will also need two domains:

- **a primary domain** - for the node.js server hosting Frontity
- **a secondary domain** - for the Apache/nginx + PHP server hosting WordPress

In this mode site visitors access the site using the primary domain and are served HTML pages directly from Frontity. The secondary domain is used by content editors to access the WordPress admin pages.

Frontity fetches data from the REST API located on the secondary domain, i.e. the WordPress installation. The `state.source.url` property set in the `frontity.settings.js` file located at the root of your Frontity project configures the address of the WordPress installation.


## Advantages of Decoupled Mode

Decoupled mode needs no additional structural elements, such as extra plugins in the WordPress installation.

It works happily with wordpress.com sites, so long as the WordPress installation doesn't have any requirements beyond the limitations imposed by wordpress.com.

Faster execution - just a single call in SSR is made to the WP REST API, with no round-robin request for content and return of HTML.

The Frontity app can be distributed across a network of CDN servers.

Your WordPress site is more secure as it's not on the public-facing domain.

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

### Node.js

For node.js we recommend that you choose a [serverless](https://about.gitlab.com/topics/serverless/) solution as it will make it cheap, easy and infinitely scalable.

### Caching

If your node.js/serverless function hosting service doesn't provide a cache, you may want to consider a separate solution \(such as a CDN\), as it is key to improving your web performance.

Furthermore, based on our experience working with media publishers, we recommend that you select a service offering the[**stale-while-revalidate**](https://www.keycdn.com/blog/keycdn-supports-stale-while-revalidate) cache directive, which is the best cache technique for this type of architecture.

{% hint style="info" %}
We have tested many solutions for CDN and `stale-while-revalidate`, and we consider that the best options for this approach are [KeyCDN](https://www.keycdn.com) and [StackPath](https://www.stackpath.com/).
{% endhint %}

Although options such as [AWS Lambda](https://aws.amazon.com/lambda), [Netlify](https://www.netlify.com/) or [Google Functions](https://cloud.google.com/functions/), exist and you are free to select one of them or any other, our recommendation is that you host your Frontity site with [**Vercel**](https://vercel.com/). Vercel offer both a CDN and the `stale-while-revalidate` cache directive (which they call [Serverless Pre-Rendering](https://vercel.com/blog/serverless-pre-rendering)). Their service is the quickest and easiest to set up, and you can follow our guide to [deploying Frontity using Vercel](../deployment/deploy-using-vercel).

{% hint style="info" %}
The addition of a [cache for the REST API](https://wordpress.org/plugins/wp-rest-cache/) is recommended to speed up the initial SSR.
{% endhint %}

{% hint style="info" %}
If you want to know more about what Serverless means you should check out [this article](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9).
{% endhint %}

{% hint style="info" %}
Still have questions? Ask in the [community](https://community.frontity.org)!
{% endhint %}

