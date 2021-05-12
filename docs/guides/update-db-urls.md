# URLs in a Migration from WordPress to Frontity Decoupled Mode

If you are **migrating an existing WordPress site to Frontity** using [**Decoupled Mode**](decoupled-mode.md), you will need to change the URL of your WordPress site. You will need to do this as the primary domain (i.e. the one that site visitors use) will point to the Frontity site.

![](https://frontity.org/wp-content/uploads/2021/05/decoupled-mode-features.png)

## The issue with URLs in this scenario

Let's take as an example a WordPress site under the domain `www.domain.com`. Let's suppose that we want to migrate this to Frontity in Decoupled Mode. We will need to make the following changes:

- `www.domain.com` will point to the Frontity server
- `wp.domain.com` will point to the WordPress server

In this scenario internal links that exist in the content when the WordPress URL is changed to `wp.domain.com` will still point to `www.domain.com`. However, if any content is added after the change then internal links will point to `wp.domain.com`. This creates a situation where internal links in the content are inconsistent with "old" links pointing to `wp.domain.com` and "new" links pointing to `www.domain.com`.

{% hint style="info" %}
**Note that** WordPress always uses absolute links internally, rather than relative links. WordPress uses the [internal URL `Settings`](https://wordpress.org/support/article/changing-the-site-url/) to determine where the internal links should point to.
{% endhint %}

Also the [link processor](https://api.frontity.org/frontity-packages/collections-packages/components#the-link-processor) uses the same domain as the WordPress data source (which will now be `wp.domain.com`) to convert links to a <Link /> component. So if the internal links are left pointing to `www.domain.com` the link processor won't work on those links because it will only convert links pointing to `wp.domain.com`, i.e. the URL of the WordPress data source.

## Updating the URLs in WordPress

You will therefore need to change [the `WordPress Address` and the `Site Address`](https://wordpress.org/support/article/changing-the-site-url/) in the "Settings" page of the WordPress admin so they point to new URL (e.g. `wp.domain.com`).

![](https://frontity.org/wp-content/uploads/2021/05/migration-wordpress-frontity-settings.png)

Also, for the reasons stated above, any URLs in the content stored in the database also need to be updated to reflect the new domain (e.g. `wp.domain.com`). This can be done in 2 ways:

- With a WordPress plugin
- Updating the URLs manually

### Using a plugin

To change the URLs in the content stored in the database you can use a plugin such as [Velvet Blues Update URLs](https://wordpress.org/plugins/velvet-blues-update-urls/), [Go Live Update Urls](https://en-gb.wordpress.org/plugins/go-live-update-urls/), or [Better Search Replace](https://wordpress.org/plugins/better-search-replace/).

### Updating manually

You can also update the links manually by running the following SQL commands using either `phpMyAdmin` or an application such as [Sequel Pro](https://www.sequelpro.com/) or [Sequel Ace](https://sequel-ace.com/).

{% hint style="warn" %}
**IMPORTANT!!!** Before running the commands below ensure that you have **a backup of your database**!
{% endhint %}

```sql
UPDATE wp_options SET option_value = replace(option_value, 'https://www.domain.com', 'https://wp.domain.com') WHERE option_name = 'home' OR option_name = 'siteurl’;
```

```sql
UPDATE wp_posts SET guid = replace(guid, 'https://www.domain.com', 'https://wp.domain.com');
```

```sql
UPDATE wp_posts SET post_content = replace(post_content, 'https://www.domain.com', 'https://wp.domain.com');
```
