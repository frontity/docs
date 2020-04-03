# Possible Installations

With Frontity you can structure your application using these two main architectures:

* [Direct to Frontity](possible-architectures.md#direct-to-frontity)
* [PHP Theme Bridge](possible-architectures.md#php-theme-bridge) ![](https://img.shields.io/badge/coming_soon-yellow) 

We strongly recommend the "**Direct to Frontity**" approach as it matches most user's needs, but we are developing new options in case it doesn't fit yours.

{% hint style="info" %}
Before choosing this solution, you may want to check out our recommendations about selecting a server, your domains and the cache technique at "[Decisions you should take](./#decisions-you-should-take)".
{% endhint %}

## Direct to Frontity

With this architecture, WordPress is used as a headless CMS and we use Frontity to generate and show the final HTML. This means that WordPress is used just for managing the content.

* Frontity uses the WP API to retrieve content and generate the final HTML.
* Frontity is also able to generate AMP pages with the same React code and CSS.

![](../.gitbook/assets/direct-to-frontity.png)

This solution requires a PHP Server for WordPress and a Node Server for Frontity, as well as a new domain for your WordPress site as the main one will be used by Frontity.

| **✅ Pros** | ❌ **Cons** |
| :--- | :--- |
| Perfect fit for users with free WP.com blogs \(myblog.wordpress.com\). | Users need to change their WordPress domain. |
| Fastest server side rendering \(no useless WordPress request needed\). | A Frontity server is needed. |
|  | The server side rendering is still slow if the WordPress site is slow, so it may need a cache layer on top. |

## PHP Theme Bridge ![](https://img.shields.io/badge/coming_soon-yellow)

{% hint style="warning" %}
🛠 We're still working on this solution \(but it's a priority for us\). [Feel free to ask](https://community.frontity.org/c/framework) any questions you might have.
{% endhint %}

This is a PHP theme that doesn’t generate any HTML. Instead, it does an HTTP call to the Frontity server to retrieve the HTML and outputs that.

![](../.gitbook/assets/php-theme-bridge.png)

With this solution, you won't need a new domain for your WordPress site, but you will still need a PHP Server for WordPress and a Node Server for Frontity.

| ✅ **Pros** | ❌ **Cons** |
| :--- | :--- |
| Users don’t need to change their WordPress domain. | A Frontity server is needed. |
| The cache can be done with WordPress plugins, which know when to invalidate it intelligently. | There is more routing involved \(it goes to WordPress, then Frontity, then WordPress outputs the HTML\). |
|  | Users **must** use a cache plugin or it will be very slow. |

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

