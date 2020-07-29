# REST API URL in Frontity projects

One of the mandatory things we have to first set in a Frontity project is the WordPress REST API that is going to be the source of data of our project. 

This REST API URL is set as part of the `wp-source` package configuration in the `frontity.settings.js`. More specifically, this URL is set as the value of `state.source.api`

```
module.exports = {
  packages: [
    "@frontity/mars-theme",
    "@frontity/tiny-router",
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          api: "https://site.com/wp-json",
        },
      },
    },
  ],
};
```

But... For those who start working with Frontity, sometimes is not clear what is the REST API URL of their site

Well, for most of the cases, **to get the REST API URL, just append `/wp-json` to the end of your site**

For example, for the [`https://test.frontity.org`](http://test.frontity.org/) site, the URL of the REST API would be [`https://test.frontity.org/wp-json/`](https://test.frontity.org/wp-json/) 

The _formula_ of appending `/wp-json` to the site URL to get the REST API URL will work in several scenarios:
- **Self hosted WordPress installation with custom domain** → `self-hosted-custom-domain.com/wp-json`
- Local WordPress installation → `localhost/wp-json`
- Paid plan in Wordpress.com with custom domain → ``wp-com-custom-domain.com/wp-json`/wp-json`

### A special case: "Free plan" site in a wordpress.com subdomain

If you are using a "Free plan" WordPress site, you'll have a wordpress.com subdomain (for example `your-domain.wordpress.com`)

For wordpress.com subdomain sites, there's a route from where you can access the REST API of your site by adding your site ID after the `/sites` slug:

```
public-api.wordpress.com/wp/v2/sites/your-domain.wordpress.com
```

---

And that's 

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}







But there are some cases where 


The format of this URL vary depending on the type of WordPress installation you want to use as a source of data.

In this guide we'll explain the different formats of the REST API URL depending of your WordPress installation. 

But before that, let's first review the concept of [namespaces](https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/#namespaces) in the REST API

## Namespaces in the REST API

Routes in the WP REST API are grouped under namespaces. They're used to avoid collisions between endpoints and to organize them (core endpoints, plugins endpoints, ...)

There's a namespace reserved for (version `v2`) core endpoints which is:

```jsx
/wp/v2
```

This namespace is used for core endpoints such as:

```jsx
/wp/v2/posts
```

For example If you go to [https://test.frontity.org/wp-json/](https://test.frontity.org/wp-json/)

![guides-wp-rest-api-url.png](../.gitbook/assets/guides-wp-rest-api-url.png)

You can see the `/wp/v2` namespace is available along with some other namespaces, some of them from different plugins:

- `contact-form-7/v1` → Contact Form plugin REST API endpoints
- `yoast/v1` & `yoast/v1/myyoast` → Yoast plugin REST API endpoints
- `acf/v3` → Advanced Custom Fields plugin REST API endpoints
- And others…

{% hint style="info" %}
You can read more about namespaces, routes and endpoints [here](https://developer.wordpress.org/rest-api/extending-the-rest-api/routes-and-endpoints/#namespaces)
{% endhint %}

Now that we know what namespaces are about, let's check what is the format of your REST API URL depending on your WordPress installation

## REST API URL depending on WordPress installation

### Do you have a self-hosted WordPress site?

For a **self-hosted WordPress site** (i.e. local or web based) the format of the  REST API URL would be something like:

```
your-wp-domain.com/wp-json
```

From there, you can access the different endpoints available through different namespaces

For example. For the [`https://test.frontity.org`](http://test.frontity.org/) site the URL of the REST API would be [`https://test.frontity.org/wp-json/`](https://test.frontity.org/wp-json/) and from there we can access endpoints such as:

```jsx
test.frontity.org/wp-json/wp/v2/posts
test.frontity.org/wp-json/menus/v1/menus/social-links
```

### Do you have a "Free plan" wordpress.com site?

With this plan **we're not able to set a custom domain** so the URL of our site will be a wordpress.com subdomain URL 

```jsx
the-slug-of-your-site.wordpress.com
```
Also in this plan **we cannot install plugins**, and because of this we only have access to the core endpoints of the REST API of our site (`/wp/v2/` namespace)

To access the REST API of a "Free plan" wordpress.com site, there's a common route for all the  `wordpress.com` sites from where you can access the REST API of your site by adding your site ID after the `/sites` slug

```jsx
public-api.wordpress.com/wp/v2/sites/the-slug-of-your-site
```

For example, for the [`devrelfrontity.wordpress.com`](http://devrelfrontity.wordpress.com/) site the URL of the REST API would be [`public-api.wordpress.com/wp/v2/sites/devrelfrontity.wordpress.com`](https://public-api.wordpress.com/wp/v2/sites/devrelfrontity.wordpress.com) and from there we can access endpoints such as:

```jsx
public-api.wordpress.com/wp/v2/sites/devrelfrontity.wordpress.com/posts
```

As you can see with this format there's no way to access other namespace endopoints rather than those under `/wp/v2`

### Do you have a (Free plan) subdomain wordpress.com site?

With this plan we're not able to install plugins, and because of this we only have access to the core endpoints of the REST API of our site (`/wp/v2/` namespace)

There's a common route for all the  `wordpress.com` sites from where you can access the REST API of your site by adding your site ID after the `/sites` slug
 

```jsx
public-api.wordpress.com/wp/v2/sites/the-slug-of-your-site
```

For example. For the [`https://devrelfrontity.wordpress.com`](http://devrelfrontity.wordpress.com/) site the URL of the REST API would be [`https://public-api.wordpress.com/wp/v2/sites/devrelfrontity.wordpress.com`](https://public-api.wordpress.com/wp/v2/sites/devrelfrontity.wordpress.com) and from there we can access endpoints such as:

```jsx
public-api.wordpress.com/wp/v2/sites/devrelfrontity.wordpress.com/posts
```

As you can see with this format there's now way to access other namespace endopoints rather than those under `/wp/v2`


### Do you have a "Paid" plan wordpress.com site?

To be able to set a custom domain you have to be in some of the paid plans (Personal, Premium, Business or eCommerce) but only from the Business plan you're able to install plugins

Once you have a custom domain you should be able to access the REST API of your site through the `/wp-json` slug

For example. For the `https://my-custom-wp-domain.com` site, the URL of the REST API would be [`https://devrelfrontity.wpcomstaging.com/wp-json`](https://devrelfrontity.wpcomstaging.com/wp-json) and from there we can access endpoints such as:

```jsx
https://devrelfrontity.wpcomstaging.com/wp-json/wp/v2/posts
https://devrelfrontity.wpcomstaging.com/wp-json/newspack-blocks/v1/articles
```

## Summary

So, coming back to the initial question: What is the REST API URL of my site? Which URL should I set in the `state.source.api` of my Frontity project?

To answer this question, let's take the `wpsite` ID for a domain/subdomain and let's review the different types of installation your WordPress site may have

- **self-hosted WordPress site**
    - Site url: `wpsite.com`
    - REST API url: `wpsite.com/wp-json`
- **"Personal plan" (free) wordpress.com site**
    - Site url: `wpsite.wordpress.com`
    - REST API url: `public-api.wordpress.com/wp/v2/sites/wpsite.wordpress.com`
- **"Business plan" (paid) wordpress.com site**
    - Site url: `wpsite.wpcomstaging.com`
    - REST API url: `wpsite.wpcomstaging.com/wp-json`

Hope this guide has helped you to understand which REST API URL to set in your Frontity project

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}
