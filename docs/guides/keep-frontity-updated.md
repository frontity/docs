# Keep Frontity Updated

As in most projects, keeping Frontity and its packages updated is always a good practice. Not only you could use new features added, but also some security issues are usually detected and solved during these updates.

At this point, it is important to distinguish between your **dependencies** \(npm packages you won't modify and reside in `/node_modules` folder\) and your **local packages** \(packages you create or change at your will, and reside in `/packages` folder\). For more info you can check the page [Learning Frontity - Packages](../learning-frontity/packages.md).

### Update project dependencies

Essential packages such as `frontity`, `@frontity/core` or `@frontity/tiny-router`, and all your dependencies, are included in this part. These can be treated as common npm packages, so you can use the following command to update your `package.json` to the latest versions:

```bash
npx npm-check-updates -u -t minor
npm install
```

{% hint style="info" %}
Note that using the `-t minor` switch ensures that only minor updates will be applied. This avoids introducing potential breaking changes that a major update might introduce.
{% endhint %}

With this, **you will update your `package.json` and all your dependencies in `node_modules`**, including the Frontity packages installed in **`node_modules`**.

If you want to update just one package you can do it with this other command:

```bash
npm install my-package@latest
```

### Update local package dependencies

These local packages, included in `packages` folder, are supposed to be modified by the users, so any dependency won't be updated when you update your project dependencies.

To update the dependencies of your local package dependencies, go to their folder and run the same command:

```bash
cd package/my-local-package
npx npm-check-updates -u -t minor
# DO NOT RUN "npm install" this time!
```

Do that for each local package found in your `packages` folder.

After you've finished, go to the root folder of your Frontity project and run `npm install` there:

```bash
cd ../.. # Go back to the root folder
npm install
```

## Troubleshooting

### Delete all the dependencies and start over

If you are having problems, follow these steps to install everything from scratch:

1. Make sure you have updated all your dependencies in:
   * The root `package.json` of your project.
   * All the `package.json` files of your local packages.
2. Delete all the `node_modules` folders of:
   * The root of your project.
   * All your local packages.
3. Delete all the `package-lock.json` file of:
   * The root of your project.
   * All your local packages.
4. Run `npm install` again.

Everything should work after this.

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

