# Deploy Frontity using Vercel

In [their own words](https://vercel.com/docs) : _Vercel is a cloud platform for static sites and **Serverless Functions** that fits perfectly with your workflow. It enables developers to host Jamstack sites and web services that **deploy instantly**, **scale automatically**, and **requires no supervision**, all with **no configuration**._

We strongly recommend this service as it is serverless, cheap, [includes CDN](../performance/caching.md#cdn-for-frontity-servers), and really easy to set up.

It also supports the cache technique stale-while-revalidate (they name it [Serverless Pre-Rendering](https://vercel.com/blog/serverless-pre-rendering)), a powerful way to improve your site speed.

## Table of Contents

<!-- toc -->

- [Signup and Login into Vercel](#signup-and-login-into-vercel)
- [Deploy your site under a Vercel domain](#deploy-your-site-under-a-vercel-domain)
  * [Create a `vercel.json` file](#create-a-vercel-json-file)
  * [Run deployment](#run-deployment)
- [Deploy your site under a custom domain](#deploy-your-site-under-a-custom-domain)
  * [Add your custom domain from your Vercel project settings](#add-your-custom-domain-from-your-vercel-project-settings)
    + [Add a subdomain for your WordPress source](#add-a-subdomain-for-your-wordpress-source)
  * [Add Vercel nameservers in your domain provider](#add-vercel-nameservers-in-your-domain-provider)
  * [Deploy](#deploy)
- [Vercel and HTTPS](#vercel-and-https)

<!-- tocstop -->

## Signup and Login into Vercel

To be able to deploy with `vercel` you need to have a Vercel account. You can [signup here](https://vercel.com/signup).

Once you have an account you have to [login](https://vercel.com/docs/cli#commands/login) to Vercel from the terminal

```text
> npx vercel login
```

## Deploy your site under a Vercel domain

Deploying to Vercel is really easy and through the `vercel.json` file, all the required configuration for Frontity projects is automatically set for you.

So, to deploy your Frontity site under a Vercel domain you have to to:

1. [Signup and Login](#signup-and-login-into-vercel) (if you haven't already).
1. [Create a `vercel.json` file](#create-a-vercel-json-file).
1. [Run deployment](#run-deployment).


### Create a `vercel.json` file

Create this [`vercel.json`](https://vercel.com/docs/configuration#introduction/configuration-reference) file and save it in the root your Frontity project

```text
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@frontity/now"
    }
  ]
}
```

### Run deployment

Deploy Frontity using the [`vercel` command](https://vercel.com/docs/cli#getting-started) (from the root of your project):

```text
> npx vercel
```

You should get something like this

```text
Vercel CLI 19.2.0
? Set up and deploy “~/PROJECTS/2020/FRONTITY/DEMOS/my-frontity-project”? [Y/n] y
? Which scope do you want to deploy to? myVercelScope
? Link to existing project? [y/N] n
? What’s your project’s name? my-frontity-project
? In which directory is your code located? ./
🔗  Linked to vercel-username/head-tags (created .vercel)
🔍  Inspect: https://vercel.com/vercel-username/my-frontity-project/lofg8n03c [2s]
✅  Production: https://my-frontity-project.vercel.app [copied to clipboard] [1m]
```

> More about Vercel [scopes ](https://vercel.com/docs/v2/platform/users-and-teams)

Vercel will assign you a domain (something like _your-project-name.vercel.app_) that that will allow you to check your site online

From this deploy example we have got the following URL's:

* **Live URL:** `https://my-frontity-project.vercel.app` → Our temporary URL assigned automatically by Vercel, We can check (and share) our site online from this URL
* **Inspect:** `https://vercel.com/vercel-username/my-frontity-project/settings` → Here we can check the status of our site and check the logs among other things
* **Project Settings:** `https://vercel.com/vercel-username/my-frontity-project/settings` → Here we can change domain and build settings among other things

## Deploy your site under a custom domain

To deploy your site in Vercel under a custom domain you have to:

1. [Deploy your site under a Vercel domain](#deploy-your-site-under-a-vercel-domain) (if you haven't already).
1. [Add your custom domain in your Vercel project settings](#add-your-custom-domain-in-your-project-settings).
1. [Add Vercel nameservers for your custom domain from your domain provider](#add-vercel-nameservers-in-your-domain-provider)
1. [Run deployment](#deploy).

### Add your custom domain from your Vercel project settings

From the project settings URL provided in our previous deploy (`https://vercel.com/vercel-username/my-frontity-project/settings` in our example) we can set a custom domain

![](https://frontity.org/wp-content/uploads/2021/04//now-projects-settings.png)

Add it, and you will be provided by a [set of nameservers](https://vercel.com/docs/v2/custom-domains#step-4:-configuring-the-domain) you can use in your domain provider to point your custom domain to the Vercel nameservers

![vercel nameservers](https://frontity.org/wp-content/uploads/2021/04//vercel-nameservers.png)

#### Add a subdomain for your WordPress source

A subdomain can be used to separate your WordPress and Frontity deployments. They can be created within Vercel dashboard from the [domains section](https://vercel.com/dashboard/domains/).

To setup a subdomain for your WordPress source, simply select your desired domain from the [list](https://vercel.com/dashboard/domains/) and [add a new DNS Record](https://vercel.com/docs/v2/custom-domains#step-2:-add-dns-record) with type A and the IP address of your WordPress server.

### Add Vercel nameservers in your domain provider

You need to set [Vercel nameservers](https://vercel.com/docs/v2/custom-domains/#option-2:-using-external-nameservers) as custom DNS of your custom domain from your domain provider site

{% hint style="info" %}
If you don't know how to do this, contact your domain provider (GoDaddy, CloudFlare, etc)
{% endhint %}

### Deploy

Then, deploy Frontity using this command (from the root of your project):

```text
> npx vercel --prod
```

You should get something like this

```text
⬢  my-frontity-project  npx vercel --prod

🔍  Inspect: https://vercel.com/vercel-username/my-frontity-project/9ue4zsq9n [2s]
✅  Production: https://mycustomtomain.com [copied to clipboard] [4s]
```

This will create a deploy and assign it to your real site URL.

> More about Vercel [deployments](https://vercel.com/docs/v2/platform/deployments)

## Vercel and HTTPS

Vercel now forces all apps to be served over HTTPS. You therefore need to ensure that your WordPress site has a SSL certificate and that you connect to your WordPress API endpoint using HTTPS rather than HTTP.

```text
{
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "url": "https://your-wordpress-blog-url/",
        }
      }
    },
...
```

The effect of using a HTTP only connection on a Frontity project deployed on Vercel will result in navigation links not working and getting stuck in the `data.isFetching` state (although apparently working on the local dev machine). The reason is that Frontity won't be able to fetch the content from the WordPress backend over HTTP on a pure HTTPS site.

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

