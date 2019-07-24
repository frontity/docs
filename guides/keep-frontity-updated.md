# Keep Frontity Updated

As in most projects, keeping Frontity and its packages updated is always a good practice. Not only you could use new features added, but also some security issues are usually detected and solved during these updates.

At this point, it is important to distinguish between your **dependencies** \(npm packages you won't modify and reside in `node_modules`folder\) and your **local packages** \(packages you create or change at your will, and reside in `packages`folder\). For more info you can check the page [Learning Frontity - Packages](../learning-frontity/packages.md).

### Update dependencies

Essential packages such as `frontity` ,  `@frontity/core`  or  `@frontity/tiny-router` ,  and all your dependencies, are included in this part. These can be treated as common npm packages, so you can use the following command:

```text
npm update
```

With this, **you will update all your dependencies at `node_modules`**, including Frontity, which means all your project will be updated except your local packages.

If you want to update just one package you can do it with this other command:

```text
npm update my-package
```

### Update local packages

These local packages, included in `packages` folder, are supposed to be modified by the users, so they won't be updated with `npm update`, because changes would be lost.

We are working in other ways to let you update these packages too without affecting your changes, or show what has been modified from your version.



{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

