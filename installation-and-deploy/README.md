# 🏗 Deployment

The 

## The Frontity Architecture 

In the Frontity Architecture, WordPress is used as a headless CMS and we use Frontity to generate the final HTML that is displayed in the browser. This means that WordPress is used just for managing the content.

* Frontity uses the WP API to retrieve content and generate the final HTML.
* Frontity is also able to generate AMP pages with the same React code and CSS.

![](../https://github.com/frontity/gitbook-docs/blob/gitbook/.gitbook/assets/direct-to-frontity.png)

This architecture requires **a PHP Server for WordPress and a Node Server for Frontity**, as well as a new domain for your WordPress site as the main one will be used by Frontity.

| **✅ Pros** | ❌ **Cons** |
| :--- | :--- |
| Perfect fit for users with free WP.com blogs (myblog.wordpress.com). | Users need to change their WordPress domain. |
| Fastest server side rendering (no useless WordPress request needed). | A Frontity server is needed. |
|  | The server side rendering is still slow if the WordPress site is slow, so it may need a cache layer on top. |


### Server hostings

You will need to have one or two servers. At the very least, you will need a PHP server to run your WordPress and, in most of the cases, you will also need a Node server to run Frontity.

**💡 Recommendation:**

1. PHP Server: In this case, we recommend to **continue using your actual server** for WordPress site or select your preferred hosting service such as [Siteground](https://www.siteground.com), [Raiola Networks](https://raiolanetworks.es/), [Webempresa](https://www.webempresa.com/) or any other.
2. Node Server: In case you need this one, we would recommend to choose a **serverless solution** as it will make it cheap, easy and infinitely scalable. We would select [Zeit Now](https://zeit.co/now) because it is really easy to set up and includes a CDN too, but there are other good options like [AWS Lambda](https://aws.amazon.com/lambda), [Netlify](https://www.netlify.com/) or [Google Functions](https://cloud.google.com/functions/).

You can check out our documentation [how to deploy Frontity on Now](deploy-on-now.md).

{% hint style="info" %}
If you want to know more about what Serverless means you should check out [this article](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9).
{% endhint %}

### Domains

You will need to have two different domains:
- one for the WordPress dashboard
- and the other one to show the content retrieved from the API. 

**💡 Recommendation:**

1. Point your main domain **www.mydomain.com to Frontity,** as it will be the domain your users will visit.
2. **Create a new subdomain** for your admin dashboard, where you will access the UI to edit your content. Using a subdomain will prevent you from buying a new one. You could use, for example, **wp.mydomain.com**.

{% hint style="info" %}
In case you use WordPress.com, you can use **www.mydomain.wordpress.com** to manage your content and point Frontity to **www.mydomain.com**.
{% endhint %}

### Add a cache layer on top

If your hosting service doesn't provide cache, you may want to look for an additional solution (it could be a CDN), as it is key to improve your web performance.

Furthermore, according to our experience working with media publishers, we suggest you to look for a service offering [**stale-while-revalidate**](https://www.keycdn.com/blog/keycdn-supports-stale-while-revalidate), the best cache technique for this type of architecture.

**💡 Recommendation:** 

We have tested many solutions for CDN and stale-while-revalidate, and we consider that the best options for this approach are [KeyCDN](https://www.keycdn.com) and [StackPath](https://www.stackpath.com/).

If you use Zeit Now, the serverless option we recommend, you won't have to worry about these as it offers both things: a CDN and the stale-while-revalidate technique (or [Serverless Pre-Rendering](https://zeit.co/blog/serverless-pre-rendering) as they name it). This way, you don't have to add anything else.

## Our recommended solution

If you have read the "Decisions you should take" section, you might already know what our recommendation is, as we have explained each part in detail. Although the recommendation may vary depending on each particular case and the solution may be different depending on the website, for the majority of sites we recommend:

1. Use the installation solution **Direct to Frontity**, where you will have your WordPress dashboard in a PHP server and Frontity in a Node Server.
2. **Keep the actual PHP server** you are using for WordPress for your backend (or select a new one), and [**deploy Frontity on Now**](deploy-on-now.md), a serverless, cheap, infinitely scalable and easy to set up solution.
3. Point your main domain www.myblog.com to Frontity and use a subdomain (wp.myblog.com) for WordPress.
4. If you have selected Now as your Node server solution, you won't need to worry about this, as it offers a CDN and the stale-while-revalidate technique (or [Serverless Pre-Rendering](https://zeit.co/blog/serverless-pre-rendering) as they name it). If you selected another solution, we would recommend you to use [KeyCDN](https://www.keycdn.com) or [StackPath](https://www.stackpath.com/) as additional services.

If you want more detail about each solution, you can check out the previous section [Decisions you should take](./#decisions-you-should-take)**.**

{% hint style="info" %}
Still have questions? Ask the community! We are here to help 😊
{% endhint %}

