# 🏗 Architecture

## Introduction

With Frontity, WordPress is used as a [headless CMS](https://css-tricks.com/what-is-a-headless-cms/) and Frontity generates the final HTML that is displayed in the browser. This means that WordPress is merely used for managing the content.

- Frontity uses the WordPress REST-API to retrieve content and it then generates the final HTML
- Frontity is also able to generate AMP pages with the same React code and CSS

There are two possible architectures, or configurations, when using Frontity:

- [Decoupled mode](decoupled-mode.md)
- [Embedded mode](embedded-mode.md)

With both of these two possible architectures you will require:

- two servers
- two domains (or a domain and a sub-domain)

### Servers

In either case you will need two servers:

- Apache/nginx + PHP _(for WordPress)_
- Node.js/serverless function _(for Frontity)_

One server will be the "main" server that delivers the site to the end user, the other will be a supporting, or "auxiliary" server. Which is the main server and which is the auxiliary server will depend on which of the two possible architectures is being used.

### Domains

In either of the two architectures you will also need two domains:

- a primary domain - _for the "main" server_
- a secondary domain - _for the "auxiliary" server_

In both the decoupled and embedded architectures the primary domain will be point to the main server, i.e. the one that the site visitor uses to access the public part of the site, and the secondary domain will point to the auxiliary server, i.e. the one that is not directly publicly accessible.

The secondary domain can be either a separate domain or a sub-domain of the primary domain.

## Comparison of the architectures

In this section we'll look at both the similarities in, and the differences between, these two possible architectures in order to compare them one against the other.

### Similarities

Both architectures feature:

- a similar distribution of functionality across the servers
  - WordPress is used as a CMS - to manage the content
  - Frontity is responsible for the presentation

- similar operation
  - Frontity fetches the data from the WordPress REST API
  - Frontity generates the final HTML

It is recommended that there should be [a WordPress cache](https://www.wpbeginner.com/plugins/best-wordpress-caching-plugins/) in both architectures.

### Differences

Despite the above similarities there are significant differences between the two architectures.

With **[Decoupled mode](decoupled-mode.md)** the primary domain points to the node.js server running Frontity, and the secondary domain points to the WordPress installation. In this mode site visitors access the site using the primary domain and are served HTML pages directly from Frontity, and the secondary domain is used by content editors to access the WordPress admin pages. Frontity fetches data from the REST API located on the secondary domain, i.e. the WordPress installation.

Decoupled mode needs no additional structural elements, such as plugins.

With **[Embedded mode](embedded-mode.md)** the primary domain points to the WordPress installation, and the secondary domain points to the node.js server running Frontity. In this mode both site visitors and content editors use the same domain, i.e. the primary domain, to either visit the site or access the admin pages. The secondary domain is never directly accessed.

Embedded mode requires the [Frontity Embedded Mode plugin](https://api.frontity.org/frontity-plugins/embedded-mode). This plugin uses a configuration setting that identifies the location of the Frontity server. The plugin replaces the WordPress theme with its own template file which fetches the HTML from the Frontity server. However, before Frontity can deliver the HTML it must request the content from the WordPress REST API.

Whereas [a WordPress cache](https://www.wpbeginner.com/plugins/best-wordpress-caching-plugins/) is recommended in either architecture, because of the two way data flow in Embedded mode [an additional cache for the REST API](https://wordpress.org/plugins/wp-rest-cache/) is very highly recommended.

Since, in embedded mode, the Frontity site is never directly accessed the secondary domain can be anything - including free domains allocated by the node.js hosting service.

Furthermore, since in decoupled mode site visitors do not access the WordPress site directly a wordpress.com site with a your-site.wordpress.com type of address can be used if it's sufficient for your purposes. More complex backends may require a self-hosted wordpress.org site.