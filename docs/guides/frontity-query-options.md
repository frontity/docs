# Frontity Query Options

"Frontity Query Options" are query string parameters added to the URL that start with `frontity_`.

For example:

```text
https://example.com/my_post?frontity_name=Site-name
```

Any query parameter in the URL that starts with `frontity_` is a "Frontity Query Option".

They can be used to dynamically configure certain options in the Frontity state.

> It is important to note that Frontity Query Options do not form part of the canonical link. This means that whatever is passed in the `frontity_` query parameter will not be matched by handlers or used to fetch data from WordPress. Its purpose is merely to allow dynamic configuration of Frontity.

Query string parameters that start with `frontity_` are reserved to **send special information to Frontity**, i.e. they are not related to the URL that needs to be rendered \(e.g. a post or a page\), but instead are used to change the Frontity configuration dynamically.

These parameters are removed from `state.frontity.initialLink` and `state.router.link` because they should not affect the content of what needs to be rendered such as a post or a page.

If Frontity Query Option parameters are present in the URL then they are added to `state.frontity.options`, and the properties are then available to any packages that need them.

> Note that the key names of parameters are camelCased when they are added to `state.frontity.options`. So, for example, the `frontity_source_auth` query string param will become `state.frontity.options.sourceAuth` once added.
>
> Only key names are transformed in this way, values remain unchanged.

Some "Frontity Query Options" are used by [`@frontity/core`](https://api.frontity.org/frontity-packages/core-package), such as:

* frontity\_name -&gt; state.frontity.options.name: The name of the site you want to load.

> Note that the `frontity_name` setting is used only in development and only in [Frontity multisite](https://docs.frontity.org/learning-frontity/settings#multiple-sites).

However packages can also make use of them, for example:

* frontity\_source\_auth -&gt; state.frontity.options.sourceAuth: An authentication token for the [source package](https://api.frontity.org/frontity-packages/features-packages/wp-source#state-source-auth).

{% hint style="info" %}
Currently these are the only Frontity Query Options that Frontity itself uses but it's intended that more will be added in the future. However, you can also add your own Frontity Query Options if you want to use them in your package or theme.
{% endhint %}

{% hint style="danger" %}
**Please note:** Frontity Query Options should be treated as untrusted user input and should never ever be passed as parameters to arbitrary functions.
{% endhint %}

