# 🏗 Architecture

In the Frontity Architecture, WordPress is used as a [headless CMS](https://css-tricks.com/what-is-a-headless-cms/) and we use Frontity to generate the final HTML that is displayed in the browser. This means that WordPress is used just for managing the content.

* Frontity uses the WordPress REST-API to retrieve content and it then generates the final HTML
* Frontity is also able to generate AMP pages with the same React code and CSS

![](.gitbook/assets/frontity-architecture%20%282%29%20%288%29%20%288%29.png)

This solution requires **a PHP Server for WordPress and a Node.js Server for Frontity**, as well as a new domain for your WordPress site as the main one will be used by Frontity, although you can use a sub-domain on your existing domain.

Some advantages of this approach:

* Perfect fit for users with free wordpress.com blogs \(e.g. myblog.wordpress.com\)
* Fastest server-side rendering \(no useless WordPress request needed\)

Some things to take into account:

* Users need to change their WordPress domain
* A Node.js server to run Frontity is needed \(besides the WP one\)
* The server-side rendering is still slow if the WordPress site is slow, so it may need a cache layer on top

### Server hostings

You will need to have one or two servers. At the very least, you will need a PHP server to run your WordPress and, in most of the cases, you will also need a Node.js server to run Frontity.

**💡 Recommendation:**

1. PHP Server: In this case, we recommend to **continue using your actual server** for WordPress site or select your preferred hosting service such as [Siteground](https://www.siteground.com), [Raiola Networks](https://raiolanetworks.es/), [Webempresa](https://www.webempresa.com/) or any other
2. Node.js Server: In case you need this one, we would recommend to choose a [**serverless**](https://about.gitlab.com/topics/serverless/) **solution** as it will make it cheap, easy and infinitely scalable.

   We would select [Vercel](https://vercel.com/docs/cli#commands/overview) because it is really easy to set up and includes a CDN too, but there are other good options like [AWS Lambda](https://aws.amazon.com/lambda), [Netlify](https://www.netlify.com/) or [Google Functions](https://cloud.google.com/functions/)

You can check out our documentation [how to deploy Frontity with Vercel](https://docs.frontity.org/deployment/deploy-using-vercel).

{% hint style="info" %}
If you want to know more about what Serverless means you should check out [this article](https://hackernoon.com/what-is-serverless-architecture-what-are-its-pros-and-cons-cc4b804022e9).
{% endhint %}

### Domains

You will need to have two different domains, or a separate sub-domain on your existing domain:

* One for the WordPress dashboard
* And the other one to show the content retrieved from the API.

**💡 Recommendation:**

1. Point your main domain **www.mydomain.com to Frontity,** as it will be the domain your users will visit
2. **Create a new subdomain** for your admin dashboard, where you will access the UI to edit your content.

   Using a subdomain will prevent you from buying a new one.

   You could use, for example, **wp.mydomain.com**

Hint: https://wordpress.org/support/article/moving-wordpress/#changing-your-domain-name-and-urls

{% hint style="info" %}
In case you use WordPress.com, you can use **mydomain.wordpress.com** to manage your content and point Frontity to **www.mydomain.com**.
{% endhint %}

### Add a cache layer on top

If your hosting service doesn't provide cache, you may want to look for an additional solution \(it could be a CDN\), as it is key to improving your web performance.

Furthermore, according to our experience working with media publishers, we suggest that you to look for a service offering [**stale-while-revalidate**](https://www.keycdn.com/blog/keycdn-supports-stale-while-revalidate), which is the best cache technique for this type of architecture.

**💡 Recommendation:**

We have tested many solutions for CDN and stale-while-revalidate, and we consider that the best options for this approach are [KeyCDN](https://www.keycdn.com) and [StackPath](https://www.stackpath.com/).

If you use Vercel, the serverless option we recommend, you won't have to worry about these as it offers both things: a CDN and the stale-while-revalidate technique \(or [Serverless Pre-Rendering](https://vercel.com/blog/serverless-pre-rendering) as they call it\). This way, you won't have to add anything else.

## Our recommended solution

Although there are some other ways to have a have a Frontity site running in production and the final solution may be different depending on the website, for the majority of sites we recommend:

1. Having the WordPress dashboard in a PHP server and Frontity in a Node.js Server
2. **Keep the actual PHP server** you are using for WordPress for your backend \(or select a new one\), and [**deploy Frontity using Vercel**](https://docs.frontity.org/deployment/deploy-using-vercel), a serverless, cheap, infinitely scalable and easy to set up solution
3. Point your main domain www.myblog.com to Frontity and use a subdomain \(wp.myblog.com\) for WordPress
4. If you have selected Vercel as your Node.js server solution, you won't need to worry about this, as it offers a CDN and the stale-while-revalidate technique \(or [Serverless Pre-Rendering](https://vercel.com/blog/serverless-pre-rendering) as they name it\).

   If you selected another solution, we would recommend you to use [KeyCDN](https://www.keycdn.com) or [StackPath](https://www.stackpath.com/) as additional services

{% hint style="info" %}
Still have questions? Ask in the [community](https://community.frontity.org)! We are here to help 😊
{% endhint %}

