# Installation requirements

These are the things you need to get started with Frontity.

## A WordPress installation

Well, this one was obvious, wasn't it?

## The WordPress REST API

**Frontity** accesses your content through a special URL on your site that retrieves data in a format called JSON, instead of the usual HTML.

If you haven't modified it, the URL where it lives is: [https://www.your-blog.com/wp-json/](https://test.frontity.io/wp-json/).

You can take a look at the REST API of our test blog to see what it looks like: [https://test.frontity.io/wp-json/wp/v2/posts](https://test.frontity.io/wp-json/wp/v2/posts). For a human, it looks pretty ugly but Frontity is ok with that 🤓

If your **/wp-json** URL is not working, visit [our community forum](https://community.frontity.org/) and ask for help!

## Node installed in your computer

You can get **Node** from [the official site](https://nodejs.org/). Alternatively, you can install Node using **nvm** \([node version manager](https://github.com/creationix/nvm)\). Any of these methods will install **NPM** and **NPX** along with Node.

> For those coming from WordPress it might be worth noting that **Frontity** runs on **Node**, so it needs to be deployed in a different server than your WordPress. If you want to learn more about this, visit our [GitHub repo](https://github.com/frontity/frontity#why-a-different-nodejs-server).
