# Deploy Frontity on Now

According to Zeit: _"_[_Now_](https://zeit.co/now) _is a global deployment network built on top of all existing cloud providers. It makes teams productive by removing servers and configuration, makes serverless application deployment easy."_

We strongly recommend this service as it is serverless, cheap, includes CDN, and really easy to set up. __It also supports the cache technique stale-while-revalidate \(they name it [Serverless Pre-Rendering](https://zeit.co/blog/serverless-pre-rendering)\), a powerful way to improve your website speed.

These are the instructions to deploy Now on Frontity:

**1. Install the  `now`  package in your project:**

```bash
npm install --save-dev now
```

**2. Add this  `now.json`  file, changing your url:**

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

**3. Add a CNAME of `www.your-site.com` to `alias.zeit.co` in your domain DNS settings.**

**4. Deploy Frontity using this command**

```text
npx frontity build && npx now --target production
```



{% hint style="info" %}
Still any doubts? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

