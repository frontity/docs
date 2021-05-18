# 🏗 Architecture

In Frontity projects, WordPress is used as a [headless CMS](https://css-tricks.com/what-is-a-headless-cms/). Frontity uses data from the WP REST-API and generates the final HTML that is displayed in the browser using React. This means that WordPress is merely used for managing the content.

A Frontity project will always require two servers:

1. A **WordPress Server (PHP)**, either:
    - An Apache or Nginx web server running PHP
    - A hosted software-as-a-service (SaaS) platform with WordPress such as WordPress.com
2. A **Frontity Server (Node.js)**, either:
    - A server running Node.js
    - A hosted function-as-a-service (FaaS) platform allowing serverless computing, such as AWS Lambda or Netlify functions

There are then two main **[Frontity Modes](https://excalidraw.com/#json=5295841782792192,H5-J_CUaq_wM0KYYacHysg)** (architectures or configurations) that can be used to implement Frontity projects:

- [**Decoupled mode**](decoupled-mode.md)
- [**Embedded mode**](embedded-mode.md)

Depending on the mode used, the **main domain** (e.g. `www.domain.com`) will be connected either to the Wordpress/PHP Server _(in Embedded mode)_ or to the Frontity/Node.js server _(in Decoupled mode)_. The main domain is the one used by site visitors to access the HTML of the site.

The other server will get a secondary role and its domain can be either a **separate domain** (e.g. `project-d418mhwf5.vercel.app`) or a **sub-domain** of the main domain (e.g. `wp.domain.com`).

Both of the two possible Frontity architectures (i.e. Decoupled or Embedded Mode) feature:

- A _similar distribution of functionality across the servers_
  - WordPress is used as a CMS - to manage the content
  - Frontity is responsible for the presentation

- A _similar operation_
  - Frontity fetches the data from the WordPress REST API
  - Frontity generates the final HTML as an [Isomorphic](https://medium.com/capital-one-tech/why-everyone-is-talking-about-isomorphic-universal-javascript-and-why-it-matters-38c07c87905) React App

Both of these architectures (or modes) require _two different servers_ with _two different URLs_ but the communication workflow between these two servers differs in each case.

| Decoupled Mode | Embedded Mode |
| --- | ---- |
| ![](https://frontity.org/wp-content/uploads/2021/05/workflow-decoupled-mode.png) | ![](https://frontity.org/wp-content/uploads/2021/05/workflow-embedded-mode.png) |

{% hint style="info" %}
Implementing a [**caching strategy**](../performance/caching.md) in Frontity projects is highly recommended to improve response times. A [WordPress Cache plugin](https://wordpress.org/plugins/simple-cache/) is especially recommended to cache REST API requests in both architectures.
{% endhint %}


### Decoupled Mode

![](https://frontity.org/wp-content/uploads/2021/05/decoupled-mode-simple-diagram.png)

**[Decoupled mode](decoupled-mode.md)** is implemented as follows:
- It uses two domains, one for WordPress and another for Frontity.
- The main domain ([www.domain.com](http://www.domain.com/)) points to Frontity.
- A secondary domain (which can be a subdomain such as [wp.domain.com](http://wp.domain.com/)) points to WordPress.

In this mode site visitors access the site using the main domain and are served HTML pages directly from Frontity, and the secondary domain is used by content editors to access the WordPress admin pages. Frontity fetches data from the REST API located on the secondary domain, i.e. the WordPress installation.

{% hint style="info" %}
Decoupled mode needs no additional structural elements, such as plugins.
{% endhint %}


### Embedded Mode

![](https://frontity.org/wp-content/uploads/2021/05/embedded-mode-simple-diagram.png)

**[Embedded Mode](embedded-mode.md)** is implemented as follows:

- The main domain ([www.domain.com](http://www.domain.com/)) points to WordPress.
- The secondary domain (which can be a subdomain of the main domain) points to Frontity.
- All the requests are handled by WordPress. No reverse proxy is needed.
- The PHP theme is replaced with an internal HTTP request to the Frontity server.
- Other WordPress URLs (i.e. those not handled by Frontity) work normally.

In *Embedded mode* the main domain points to the WordPress installation, and the secondary domain points to the node.js server running Frontity. In this mode both site visitors and content editors use the same domain, i.e. the main domain, to either visit the site or access the admin pages. The secondary domain is never directly accessed.

Embedded mode requires the [Frontity Embedded Mode plugin](https://api.frontity.org/frontity-plugins/embedded-mode). This plugin uses a configuration setting that identifies the location of the Frontity server. The plugin replaces the WordPress theme with its own template file which fetches the HTML from the Frontity server. However, before Frontity can deliver the HTML it must request the content from the WordPress REST API.

Since, in embedded mode, the Frontity site is never directly accessed the secondary domain can be anything - including free domains allocated by the node.js hosting service.