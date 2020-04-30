# Deploy Frontity on Now

According to Zeit: _"_[_Now_](https://zeit.co/now) _is a global deployment network built on top of all existing cloud providers. It makes teams productive by removing servers and configuration, makes serverless application deployment easy."_

We strongly recommend this service as it is serverless, cheap, includes CDN, and really easy to set up. \_It also supports the cache technique stale-while-revalidate \(they name it [Serverless Pre-Rendering](https://zeit.co/blog/serverless-pre-rendering)\), a powerful way to improve your website speed.

To be able to deploy with now you need to have a Now account. You can [signup here](https://zeit.co/signup).

Once you have an account you have to login from the terminal

```text
> npx now login
```

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

Deploy Frontity using this command \(from the root of your project\):

```text
> npx now
```

You should get something like this

```text
? Set up and deploy “~/PROJECTS/2020/FRONTITY/DEMOS/my-frontity-project”? [Y/n] y
? Which scope do you want to deploy to? myZeitScope
? Link to existing project? [y/N] n
? What’s your project’s name? my-frontity-project
? In which directory is your code located? my-frontity-project/
🔗  Linked to zeit-username/my-frontity-project (created .now and added it to .gitignore)
🔍  Inspect: https://zeit.co/zeit-username/my-frontity-project/9ue4zsq9n [26s]
✅  Production: https://my-frontity-project.now.sh [copied to clipboard] [1m]
📝  Deployed to production. Run `now --prod` to overwrite later (https://zeit.ink/2F).
💡  To change the domain or build command, go to https://zeit.co/zeit-username/my-frontity-project/settings
```

> More about Zeit [scopes ](https://zeit.co/docs/v2/platform/users-and-teams)

_Now_ will assign you a domain \(something like _your-project-name.now.sh_\) that that will allow you to check your site online

From this deploy example we have got the following URL's:

* **Live URL** \([https://my-frontity-project.now.sh](https://my-frontity-project.now.sh)\) → Our temporary URL assigned automatically by Now, We can check \(and share\) our site online from this URL 
* **Inspect** \([https://zeit.co/zeit-username/my-frontity-project/settings](https://zeit.co/zeit-username/my-frontity-project/settings)\) → Here we can check the status of our site and check the logs among other things
* **Project Settings** \([https://zeit.co/zeit-username/my-frontity-project/settings](https://zeit.co/zeit-username/my-frontity-project/settings)\) → Here we can change domain and build settings among other things

## Deploy your site under a custom domain

To deploy your site under a custom domain you have to

* configure your Frontity app to point to that custom domain 
* configure your custom domain for your project in the ZEIT settings
* add ZEIT nameservers for your custom domain from your domain provider 

...before deploying it

### Add your custom domain in your project settings

From the project settings URL provided in our previous deploy \([https://zeit.co/zeit-username/my-frontity-project/settings](https://zeit.co/zeit-username/my-frontity-project/settings) in our example\) we can set a custom domain ![](../.gitbook/assets/now-projects-settings.png)

Add it, and you will be provided by a set a nameservers you can use in your domain provider to point your custom domain to the ZEIT nameservers

```text
a.zeit-world.co.uk
c.zeit-world.org
d.zeit-world.net
e.zeit-world.com
```

### Add ZEIT nameservers in your domain provider

You need to set [ZEIT nameservers](https://zeit.co/docs/v2/custom-domains/#option-2:-using-external-nameservers) as custom DNS of your custom domain from your domain provider site

{% hint style="info" %}
If you don't know how to do this, contact your domain provider \(GoDaddy, CloudFlare, etc\)
{% endhint %}

### Deploy

Then, deploy Frontity using this command \(from the root of your project\):

```text
> npx now --prod
```

You should get something like this

```text
⬢  my-frontity-project  npx now --prod

🔍  Inspect: https://zeit.co/zeit-username/my-frontity-project/9ue4zsq9n [2s]
✅  Production: https://mycustomtomain.com [copied to clipboard] [4s]

This will create a deploy and assign it to your real site url.

> More about Zeit [deployments](https://zeit.co/docs/v2/platform/deployments)
```

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

