# Deploy Frontity on Now

According to Zeit: _"[Now](https://zeit.co/now) is a global deployment network built on top of all existing cloud providers. It makes teams productive by removing servers and configuration, makes serverless application deployment easy."_

We strongly recommend this service as it is serverless, cheap, includes CDN, and really easy to set up. _It also supports the cache technique stale-while-revalidate (they name it [Serverless Pre-Rendering](https://zeit.co/blog/serverless-pre-rendering)), a powerful way to improve your website speed.

To be able to deploy with now you need to have a Now account. You can [signup here](https://zeit.co/signup).

Once you have an account you have to login from the terminal 

```text
> npx now login
```
---


These are the instructions to deploy a Frontity project on Now, once you are ready to deploy your project:

### Create a [`now.json`](https://zeit.co/docs/configuration?query=now.json#introduction/configuration-reference)

1. Create this `now.json` file and save it in the r oot your Frontity project.

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


### Deploy

Deploy Frontity using this command (from the root of your project):

```text
> npx now
```

*Now* will assign you a domain (something like *your-project-name.now.sh*) that that will allow you to check your site online

## Deploy a production site

To deploy your site under a custom domain you have to...

- configure your Frontity app to point to that custom domain 
- configure your custom domain in the ZEIT server
- add proper registries in your domain provider so the DNS communication is properly done

...before deploying it

### Add an `alias` in your [`now.json`](https://zeit.co/docs/configuration?query=now.json#introduction/configuration-reference)

1. Add the alias field (`"www.your-site.com"`) with your custom domain in your `now.json`.

```text
{
  "alias": "www.your-site.com",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@frontity/now"
    }
  ]
}
```

### Add a [`CNAME`](https://zeit.co/docs/v2/custom-domains/#option-2:-using-external-nameservers)

You need to [add a CNAME](https://zeit.co/docs/v2/custom-domains/#option-2:-using-external-nameservers) of `www.your-site.com` to `alias.zeit.co` in your domain DNS settings.

{% hint style="info" %}
If you don't know how to do this, contact your domain provider (GoDaddy, CloudFlare, etc)
{% endhint %}

### Deploy

Then, deploy Frontity using this command (from the root of your project):

```text
> npx now --prod
```

This will create a deploy and assign it to your real site url.


{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

