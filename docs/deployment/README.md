# 🌎 Deployment

Once you have your application working and ready to be deployed you can create a production version by running \(from the root of your project\)

```text
npx frontity build
```

This command will [generate a `build` folder](https://api.frontity.org/frontity-cli/build-commands#the-build-process) containing both your \(isomorphic\) React app and your Frontity \(Node.js\) server. This folder can be deployed to any hosting that is prepared to serve a Node.js app. The content of this `build` folder will be used by the command:

```text
npx frontity serve
```

Which is used to launch the Frontity app in production.

Here you have some guides about how to deploy a Frontity app in some popular hostings:

* [Deploy Frontity using Qovery](deploy-using-qovery.md)
* [Deploy Frontity using Vercel](deploy-using-vercel.md)
* [Deploy Frontity on Layer0](deploy-on-layer0.md)
* [Deploy Frontity on Heroku](deploy-on-heroku.md)

## Serving Static files

Sometimes you will want to serve your assets \(also called "static files" like images, fonts, JS chunk files\) from another domain or from a [CDN](../performance/caching.md#distributed-caching-cdn). In this case, you can modify the [`publicPath` parameter](./) when you run `npx frontity build`.

