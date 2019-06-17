# Deploy Frontity on Now

According to Zeit: _"_[_Now_](https://zeit.co/now) _is a global deployment network built on top of all existing cloud providers. It makes teams productive by removing servers and configuration, makes serverless application deployment easy."_

We strongly recommend this service as it is serverless, cheap, includes CDN, and really easy to set up. __It also supports the cache technique stale-while-revalidate \(they name it [Serverless Pre-Rendering](https://zeit.co/blog/serverless-pre-rendering)\), a powerful way to improve your website speed.

{% hint style="info" %}
First of all, you have to develop your project following the steps at [Quick start guide](../getting-started/quick-start-guide.md). This deploy is supposed to be made once you have finished and you want to deploy it on production.
{% endhint %}

These are the instructions to deploy Now on Frontity, once you are ready to deploy your project:

**1. Make sure you have an account on Now**

If you don't have one, you can signup [here](https://zeit.co/signup).

**2. Make sure you are in your Frontity folder in the command line**

**3. Install the  `now`  package in your project:**

```bash
npm install --save-dev now
```

**4. In your Frontity folder, create this  `now.json`  file and change your site url**

You should create a JSON file with your preferred text editor and save it in your project folder with name **now.json** .

{% hint style="info" %}
Delete the comment `//CHANGE THIS!` after changing the alias.
{% endhint %}

```javascript
{
  "version": 2,
  "alias": ["www.your-site.com"], // CHANGE THIS!
  "builds": [
    {
      "src": "build/static/*",
      "use": "@now/static"
    },
    {
      "src": "favicon.ico",
      "use": "@now/static"
    },
    {
      "src": "build/server.js",
      "use": "@now/node"
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "max-age=31536000,s-maxage=31536000,immutable"
      },
      "dest": "/build/static/$1"
    },
    { "src": "/favicon.ico", "dest": "/favicon.ico" },
    {
      "src": "/(.*)",
      "headers": { "cache-control": "s-maxage=1,stale-while-revalidate" },
      "dest": "/build/server.js"
    }
  ]
}
```

**5. Add a CNAME of `www.your-site.com` to `alias.zeit.co` in your domain DNS settings.**

{% hint style="info" %}
If you don't know how to do this, contact your domain provider \(GoDaddy, CloudFlare, etc\)
{% endhint %}

**6. Deploy Frontity using this command**

```text
npx frontity build && npx now --target production
```

### EXTRA: Deploy without having a real domain yet

If you don't want to setup your domain yet, just skip point 5 and 6 and deploy your site using:

```text
npx frontity build && npx now
```

**Now** will assign you a domain \(something like **your-site.now.sh**\) that works exactly like your real domain would once you use the `--target production` command.

{% hint style="info" %}
Still any doubts? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

