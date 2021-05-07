# Update the URLs in the content

If you are using Frontity in [**Decoupled Mode**](decoupled-mode.md) and are migrating an existing WordPress site to Frontity then you will need to change the URL of your WordPress site. You will need to do this as the primary domain (i.e. the one that site visitors use) will point to the Frontity site.

You will therefore need to change the `WordPress Address` and the `Site Address` in the "Settings" page of the WordPress admin. Any URLs in the content stored in the database will also need to be updated to reflect the new domain.

## Using a plugin

To change the URLs in the content stored in the database you can use a plugin such as [Velvet Blues Update URLs](https://wordpress.org/plugins/velvet-blues-update-urls/), [Go Live Update Urls](https://en-gb.wordpress.org/plugins/go-live-update-urls/), or [Better Search Replace](https://wordpress.org/plugins/better-search-replace/).

## Updating manually

You can also update the links manually by running the following SQL commands using either `phpMyAdmin` or an application such as [Sequel Pro](https://www.sequelpro.com/) or [Sequel Ace](https://sequel-ace.com/).

% hint style="warn" %}
**IMPORTANT!!!** Before running the commands below ensure that you have **a backup of your database**!
{% endhint %}

```sql
UPDATE wp_options SET option_value = replace(option_value, 'https://www.oldaddress.com', 'https://www.newaddress.com') WHERE option_name = 'home' OR option_name = 'siteurl’;
```

```sql
UPDATE wp_posts SET guid = replace(guid, 'https://www.oldaddress.com', 'https://www.newaddress.com');
```

```sql
UPDATE wp_posts SET post_content = replace(post_content, 'https://www.oldaddress.com', 'https://www.newaddress.com');
```