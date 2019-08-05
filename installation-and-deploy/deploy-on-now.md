# Deploy Frontity on Now

According to Zeit: _"_[_Now_](https://zeit.co/now) _is a global deployment network built on top of all existing cloud providers. It makes teams productive by removing servers and configuration, makes serverless application deployment easy."_

We strongly recommend this service as it is serverless, cheap, includes CDN, and really easy to set up. __It also supports the cache technique stale-while-revalidate \(they name it [Serverless Pre-Rendering](https://zeit.co/blog/serverless-pre-rendering)\), a powerful way to improve your website speed.

{% hint style="info" %}
First of all, you have to develop your project following the steps at [Quick start guide](../getting-started/quick-start-guide.md). This deploy is supposed to be made once you have finished and you want to deploy it on production.
{% endhint %}

These are the instructions to deploy Now on Frontity, once you are ready to deploy your project:

### Before deploying

1. Create this `now.json` file with your preferred text editor, change the url and save it in your Frontity project.

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

2. Create an account on Now. You can [signup here](https://zeit.co/signup).

3. Log in the terminal:

```text
> npx now login
```

### Deploy a test site

Deploy Frontity using this command:

```text
> npx now
```

**Now** will assign you a domain \(something like **your-site.now.sh**\) that works exactly like your real domain would where you can check that everything is ok.

### Deploy a production site

You need to [add a CNAME](https://zeit.co/docs/v2/custom-domains/#option-2:-using-external-nameservers) of `www.your-site.com` to `alias.zeit.co` in your domain DNS settings.

{% hint style="info" %}
If you don't know how to do this, contact your domain provider \(GoDaddy, CloudFlare, etc\)
{% endhint %}

Then, deploy Frontity using this command:

```text
> npx now --target production
```

That will create a a deploy and assign it to your real site url.



{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

