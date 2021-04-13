# WordPress requirements for Frontity

To work with Frontity you will need a **WordPress installation**. This can be hosted locally, on a web-server, or you can also use a site hosted on wordpress.com

Any standard installation should work with Frontity but just to be thorough, let's review some basic stuff that needs to be taken into account on the WordPress side so everything works smoothly.

## WordPress requirements

### Have a recent WordPress version

Frontity depends on the [WordPress REST-API](https://developer.wordpress.org/rest-api/). If you have a recent version of WordPress installed, or if you're using wordpress.com then you should be good to go.

Any WordPress site running at least [version 4.7](https://wordpress.org/support/wordpress-version/version-4-7/) \(December 6, 2016\) has a REST API directly available \(no plugin needed\)

### Have public access to the REST API

If you have a recent version of WordPress then you should have public access to the REST API of your WordPress installation.

Anyway, you can check that your WordPress REST-API is working and publicly available.

The URL of this REST API may [vary depending on the type of WordPress installation](https://docs.frontity.org/guides/setting-url-wordpress-source-data) but for a typical self-hosted WordPress installation \(wp.org\) this URL can be got by adding `/wp-json/` to the end of your site’s URL.

From that URL you should see a structure of data representing the content of your WordPress \(something like [this](https://test.frontity.org/wp-json/wp/v2)\). Don't worry, this is JSON and Frontity is very happy with this.

### Have pretty permalinks activated

Frontiy requires that the WordPress data source uses one of the pretty permalinks options, rather than the plain one, in `Settings->Permalinks`.

![](../.gitbook/assets/wordpress-permalink-setting%20%281%29.png)

