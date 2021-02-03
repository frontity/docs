# Next steps

Now that you've set Frontity up and connected it to your WordPress site you're now ready to start customising Frontity to render the content and appearance that you want for your site.

This is where the fun begins. 🙌

{% hint style="info" %}
Now might be a good time to run through our brand new [step-by-step tutorial](https://tutorial.frontity.org/).
{% endhint %}

## Edit the starter theme

With Frontity you won't have your site code in the root folder as you would with `gatsbyjs` or `next.js`. Instead you work with Frontity packages and in order to personalize your site you'll edit a theme package.

If you're just starting out with Frontity then the theme you should have selected when you ran `npx frontity create` will be `@frontity/mars-theme`. You can find it in `packages/mars-theme/`. Go ahead and edit any of its files while running Frontity and the site will refresh automatically.

Move onto the [**Core Concepts**](../learning-frontity/) section to dig in to the details of Frontity and how you can work with it.

> `npx frontity create` will install the `mars-theme` in `packages/` so the theme can be edited by the developer. However, this theme doesn't need to reside in `packages/` if you don't want to edit it. It can be installed directly with `npm` inside `node_modules/` and it will work exactly the same.

## Production mode

Once you are happy with your site and are ready to deploy it to production you can use

```text
npx frontity build
```

To create a production-ready bundle.

It will create a `/build` folder with a `server.js` file and a `/static` folder with all your JavaScript files and other assets. You can either

* Use `npx frontity serve` to run it like a normal Node.js app
* Upload your `static` folder to a CDN and your server.js file to a `serverless` service, like [Vercel](../deployment/deploy-using-vercel.md) or [Netlify](https://www.netlify.com/?ref=frontity)

For more info on deploying your site please refer to the [Deployment](../deployment/) section.

{% hint style="info" %}
Still have questions? Come and join us in [the community](https://community.frontity.org/) and ask there! We are here to help 😊
{% endhint %}

