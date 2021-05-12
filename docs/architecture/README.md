# 🏗 Architecture

In Frontity projects, WordPress is used as a [headless CMS](https://css-tricks.com/what-is-a-headless-cms/) and _Frontity uses the WP REST-API to generate the final HTML (with React)_ displayed in the browser. This means that WordPress is merely used for managing the content.

A Frontity project will always require two servers:

- A **WordPress Server (PHP)**
  - Apache or Nginx web server running PHP
  - Hosted software-as-a-service (SaaS) platform with WordPress such as WordPress.com
- A **Frontity Server (Node.js)**
  - Server running Node.js
  - Hosted function-as-a-service (FaaS) platform allowing serverless computing such as AWS Lambda or Netlify functions

Taking this into account, there are two main **Frontity Modes** (architectures or configurations), recommended for Frontity projects:

- [Decoupled mode](decoupled-mode.md)
- [Embedded mode](embedded-mode.md)

Depending on the mode, the **main domain** (e.g. `www.domain.com`) will be connected to the Wordpress/PHP Server (_Embedded_) or to the Frontity/Node.js server (_Decoupled_). The main domain is the one used by users to access the HTML of the site.

The other server will get a secondary role and its domain can be either a separate domain (e.g. `project-d418mhwf5.vercel.app`) or a sub-domain (e.g. `wp.domain.com`).

Any Frontity architecture (Decoupled or Embedded Mode) features:

- A _similar distribution of functionality across the servers_
  - WordPress is used as a CMS - to manage the content
  - Frontity is responsible for the presentation

- A _similar operation_
  - Frontity fetches the data from the WordPress REST API
  - Frontity generates the final HTML as an [Isomorphic](https://medium.com/capital-one-tech/why-everyone-is-talking-about-isomorphic-universal-javascript-and-why-it-matters-38c07c87905) React App

Both of these architectures (or modes) require _two different servers_ with _two different URLs_ but the communication workflow between these two servers is different in each case

| Decoupled Mode | Embedded Mode |
| --- | ---- |
| ![](https://frontity.org/wp-content/uploads/2021/05/workflow-decoupled-mode.png) | ![](https://frontity.org/wp-content/uploads/2021/05/workflow-embedded-mode.png) |   

{% hint style="info" %}
Implementing a cache strategy in Frontity projects is highly recommended to improve response times. A [WordPress Cache plugin](https://wordpress.org/plugins/simple-cache/) is especially recommended to cache REST API requests in both architectures. 
{% endhint %}


### Decoupled Mode

**[Decoupled mode](decoupled-mode.md)** works around the following *key ideas*:
- It uses two domains, one for WordPress and another for Frontity.
- The main domain ([www.domain.com](http://www.domain.com/)) points to Frontity.
- A subdomain ([wp.domain.com](http://wp.domain.com/)) points to WordPress.

In this mode site visitors access the site using the main domain and are served HTML pages directly from Frontity, and the secondary domain is used by content editors to access the WordPress admin pages. Frontity fetches data from the REST API located on the secondary domain, i.e. the WordPress installation.

{% hint style="info" %}
Decoupled mode needs no additional structural elements, such as plugins.
{% endhint %}



### Embedded Mode

**[Embedded Mode](embedded-mode.md)** works around the following *key ideas*:

- A single domain is used for both WordPress and Frontity.
- The main domain ([www.domain.com](http://www.domain.com/)) points to WordPress.
- All the requests are handled by WordPress. No reverse proxy is needed.
- The PHP theme is replaced with an internal HTTP request to the Frontity server.
- The rest of WordPress URLs work normally.

In *Embedded mode* the main domain points to the WordPress installation, and the secondary domain points to the node.js server running Frontity. In this mode both site visitors and content editors use the same domain, i.e. the main domain, to either visit the site or access the admin pages. The secondary domain is never directly accessed.

Embedded mode requires the [Frontity Embedded Mode plugin](https://api.frontity.org/frontity-plugins/embedded-mode). This plugin uses a configuration setting that identifies the location of the Frontity server. The plugin replaces the WordPress theme with its own template file which fetches the HTML from the Frontity server. However, before Frontity can deliver the HTML it must request the content from the WordPress REST API.

![](https://frontity.org/wp-content/uploads/2021/05/embedded-mode-features.png)

Since, in embedded mode, the Frontity site is never directly accessed the secondary domain can be anything - including free domains allocated by the node.js hosting service.

#### Technical considerations when using Embedded Mode

Due to the one-domain nature of this mode and the fact that the routing is managed by WordPress, the developers don’t need to take care of any of the issues mentioned in the Decoupled Mode:

- **Not needed anymore**
    - URL replacements
    - Cross-domain 301 redirections
    - CORS headers
    - Purge page cache
    - Proxy WordPress resources from the Frontity server
    - WordPress posts 301 redirections
    - Maintain the reverse proxy configuration

This mode doesn’t require support from the hosting provider to configure the reverse proxy because the routing is managed by WordPress.

In this mode we can also get a 100% transparent experience for the content editors, just like in the Reverse-Proxy mode:

- Render the admin bar for logged in users.
- Make 100% transparent post previews.

### Differences

Despite the above similarities there are significant differences between the two architectures.


Whereas [a WordPress cache](https://www.wpbeginner.com/plugins/best-wordpress-caching-plugins/) is recommended in either architecture, because of the two way data flow in Embedded mode [an additional cache for the REST API](https://wordpress.org/plugins/wp-rest-cache/) is very highly recommended.


Furthermore, since in decoupled mode site visitors do not access the WordPress site directly a wordpress.com site with a your-site.wordpress.com type of address can be used if it's sufficient for your purposes. More complex backends may require a self-hosted wordpress.org site.