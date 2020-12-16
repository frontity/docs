# Deploy Frontity on Heroku

To be able to deploy to Heroku you need to have a Heroku account. You can [signup here](https://signup.heroku.com/).

You will also need to install the [Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

> The Heroku CLI requires Git, the popular version control system. If you don’t already have Git installed, complete the following before proceeding: [Git installation](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) & [First-time Git setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)

Once you have an account and the Heroku CLI installed you have to login from the terminal

```text
> heroku login
```

---

These are the instructions to deploy a Frontity project on Heroku, once you are ready to deploy your project:

### Create a [heroku app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

Create an app on Heroku from the root of your project

```text
> heroku create
```

Heroku will generate a random name for your app (`shielded-gorge-51896` in the example), or you can pass a parameter to specify your own app name.

```text
⬢  my-frontity-project  master ⦾ heroku create
 ›   Warning: heroku update available from 7.25.0 to 7.38.2.
Creating app... done, ⬢ shielded-gorge-51896
https://shielded-gorge-51896.herokuapp.com/ | https://git.heroku.com/shielded-gorge-51896.git
```

When you create an app, a remote git repository (called `heroku`) is also created on Heroku and associated with your local git repository.

```
⬢  my-frontity-project  master ⦾ git remote -v
heroku	https://git.heroku.com/shielded-gorge-51896.git (fetch)
heroku	https://git.heroku.com/shielded-gorge-51896.git (push)
origin	git@github.com:frontity-demos/my-frontity-project.git (fetch)
origin	git@github.com:frontity-demos/my-frontity-project.git (push)
```

### Add a `start` script

Heroku will automatically execute your `start` script so add the following to your `scripts` section in the `package.json` file at the root of your project.

```json
"scripts": {
  "start": "frontity serve --port $PORT",
  "dev": "frontity dev",
  "build": "frontity build",
  "serve": "frontity serve"
},
```

Heroku will automatically execute your `build` script before starting your app. You should have this one already defined in your project.

> Notice how we're using $PORT to read this value from an environment variable. It is because Heroku will set a different port for each process and that port will be stored in a `PORT` environment variable

### Deploy

The way to deploy to Heroku by is pushing to the `heroku` git remote, so we can do

```text
git push heroku master
```

You should get something like this

```sh
⬢  my-frontity-project  master ⦾ git push heroku master
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 4 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 290 bytes | 290.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:        NODE_VERBOSE=false
remote:
remote: -----> Installing binaries
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:
remote:        Resolving node version 12.x...
remote:        Downloading and installing node 12.16.2...
remote:        Using default npm version: 6.14.4
remote:
remote: -----> Restoring cache
remote:        - node_modules
remote:
remote: -----> Installing dependencies
remote:        Installing node modules (package.json + package-lock)
remote:        audited 10234 packages in 7.144s
remote:
remote:        15 packages are looking for funding
remote:          run `npm fund` for details
remote:
remote:        found 0 vulnerabilities
remote:
remote:
remote: -----> Build
remote:        Running build
remote:
remote:        > my-frontity-project@1.0.0 build /tmp/build_00b81abd8c2a36d3f2525857753e0188
remote:        > frontity build
remote:
remote:        mode: production
remote:
remote:        Building es5 bundle
remote:        Building module bundle
remote:        Building server bundle
remote:
remote:
remote: -----> Caching build
remote:        - node_modules
remote:
remote: -----> Pruning devDependencies
remote:        audited 10234 packages in 6.44s
remote:
remote:        15 packages are looking for funding
remote:          run `npm fund` for details
remote:
remote:        found 0 vulnerabilities
remote:
remote:
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types     -> (none)
remote:        Default types for buildpack -> web
remote:
remote: -----> Compressing...
remote:        Done: 52.3M
remote: -----> Launching...
remote:        Released v14
remote:        https://shielded-gorge-51896.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/shielded-gorge-51896.git
   ee9c4d2..ab9b152  master -> master
```

_Heroku_ will assign you a domain (something like _your-project-name.herokuapp.com_) that will allow you to check your site online

---

## Deploy a production site

To [deploy your site under a custom domain in Heroku](https://devcenter.heroku.com/articles/custom-domains) you have to...

1. Add your custom domain in your Heroku app
2. Register a DNS record with your domain provider

...before deploying it

### Add your custom domain in your Heroku app

With the command `heroku domains:add` you can add a specific custom domain in your Heroku app

for example by doing:

```
heroku domains:add heroku domains:add www.variables-demo.com
```

you should get something like this

```
⬢  my-frontity-project  master ⦾ heroku domains:add www.variables-demo.com
 ›   Warning: heroku update available from 7.25.0 to 7.38.2.
Adding www.variables-demo.com to ⬢ shielded-gorge-51896... done
 ▸    Configure your app's DNS provider to point to the DNS Target damp-whale-rln632baq4jdhcj5aw495bst.herokudns.com.
 ▸    For help, see https://devcenter.heroku.com/articles/custom-domains

The domain www.variables-demo.com has been enqueued for addition
 ▸    Run heroku domains:wait 'www.variables-demo.com' to wait for completion
```

### Add a [`CNAME`](https://devcenter.heroku.com/articles/custom-domains) in your domain provider's DNS settings

Once you have added your domain to your Heroku app, you can use the command `heroku domains` to see the value for the `CNAME` record that you have to set in your domain settings.

```
⬢  my-frontity-project  master ⦾ heroku domains
 ›   Warning: heroku update available from 7.25.0 to 7.38.2.
=== shielded-gorge-51896 Heroku Domain
shielded-gorge-51896.herokuapp.com

=== shielded-gorge-51896 Custom Domains
Domain Name             DNS Record Type  DNS Target
──────────────────────  ───────────────  ─────────────────────────────────────────────────
www.variables-demo.com  CNAME            damp-whale-rln632baq4jdhcj5aw495bst.herokudns.com
```

With this info you can [add a CNAME](https://devcenter.heroku.com/articles/custom-domains) in your domain provider's DNS settings.

{% hint style="info" %}
If you don't know how to do this, contact your domain provider (GoDaddy, CloudFlare, etc)
{% endhint %}

### Deploy

Then, deploy Frontity using this command (from the root of your project):

```text
> git push heroku master
```

> If no changes are detected you may have to do:
> `npx frontity build` → to generate a new build
> `git commit --allow-empty` → to force a empty commit
> `git push heroku master` → to push this lateste build into heroku and launch its deploy process

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}
