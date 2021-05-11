# 🏗 Architecture

In Frontity projects, WordPress is used as a [headless CMS](https://css-tricks.com/what-is-a-headless-cms/) and _Frontity uses the WP REST-API to generate the final HTML_ that is displayed in the browser. This means that WordPress is merely used for managing the content.

Frontity runs a Node.js web server while WordPress requires a PHP server to work.

Taking this into account, there are two main **Frontity Modes** (architectures or configurations), recommended for Frontity projects:

- [Decoupled mode](decoupled-mode.md)
- [Embedded mode](embedded-mode.md)

Both of these architectures will require **two different servers** with **two different URLs** but the communication workflow between these two servers is different in each case

| Decoupled Mode | Embedded Mode |
| --- | ---- |
| ![](https://frontity.org/wp-content/uploads/2021/05/workflow-decoupled-mode.png) | ![](https://frontity.org/wp-content/uploads/2021/05/workflow-embedded-mode.png) |   

## Servers and Domains

A Frontity project will always require two servers:

- A **WordPress Server (PHP)**
  - Apache or Nginx web server running PHP
  - Hosted software-as-a-service (SaaS) platform with WordPress such as WordPress.com
- A **Frontity Server (Node.js)**
  - Server running Node.js
  - Hosted function-as-a-service (FaaS) platform allowing serverless computing such as AWS Lambda or Netlify functions


Depending on the mode, the **primary domain** will be connected to the Wordpress/PHP Server (Embedded) or to the Frontity/Node.js server (Decoupled). The primary domain is the one used by users to access the HTML of the site.

The other server will get a secondary role and its domain can be either a separate domain or a sub-domain of the primary domain.

## Caching

With a good CDN caching strategy your Frontity project can be as performant as a static site. In Decoupled Mode there are two types of requests that can be cached to minimize the computing time and to take advantage of the proximity of CDN servers:

- **URL requests**: Any URL of your Frontity site
- **REST API requests**: Any endpoint of your Frontity site


## Overview of Frontity Modes

Any Frontity architecture (Decoupled or Embedded Mode) features:

- A _similar distribution of functionality across the servers_
  - WordPress is used as a CMS - to manage the content
  - Frontity is responsible for the presentation

- A _similar operation_
  - Frontity fetches the data from the WordPress REST API
  - Frontity generates the final HTML

{% hint style="info" %}
A [WordPress cache plugin](https://wordpress.org/plugins/simple-cache/) is recommended to cache the REST API requests in both architectures. 
{% endhint %}



### Differences

Despite the above similarities there are significant differences between the two architectures.

With **[Decoupled mode](decoupled-mode.md)** the primary domain points to the node.js server running Frontity, and the secondary domain points to the WordPress installation. In this mode site visitors access the site using the primary domain and are served HTML pages directly from Frontity, and the secondary domain is used by content editors to access the WordPress admin pages. Frontity fetches data from the REST API located on the secondary domain, i.e. the WordPress installation.

Decoupled mode needs no additional structural elements, such as plugins.

With **[Embedded mode](embedded-mode.md)** the primary domain points to the WordPress installation, and the secondary domain points to the node.js server running Frontity. In this mode both site visitors and content editors use the same domain, i.e. the primary domain, to either visit the site or access the admin pages. The secondary domain is never directly accessed.

Embedded mode requires the [Frontity Embedded Mode plugin](https://api.frontity.org/frontity-plugins/embedded-mode). This plugin uses a configuration setting that identifies the location of the Frontity server. The plugin replaces the WordPress theme with its own template file which fetches the HTML from the Frontity server. However, before Frontity can deliver the HTML it must request the content from the WordPress REST API.

Whereas [a WordPress cache](https://www.wpbeginner.com/plugins/best-wordpress-caching-plugins/) is recommended in either architecture, because of the two way data flow in Embedded mode [an additional cache for the REST API](https://wordpress.org/plugins/wp-rest-cache/) is very highly recommended.

Since, in embedded mode, the Frontity site is never directly accessed the secondary domain can be anything - including free domains allocated by the node.js hosting service.

Furthermore, since in decoupled mode site visitors do not access the WordPress site directly a wordpress.com site with a your-site.wordpress.com type of address can be used if it's sufficient for your purposes. More complex backends may require a self-hosted wordpress.org site.