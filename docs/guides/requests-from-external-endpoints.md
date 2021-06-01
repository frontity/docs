# How to do requests to external endpoints

## Using a private API key

To do requests to an external API while keeping the API key private you have several options:

## No custom endpoints

### From Frontity

Using the `beforeSSR ` as I explained in my previous response → this allows you to perform a request to an external API before any page is served from the server 

In the future, we will add server extensibility. It’ll be something like this: [Express middleware](https://community.frontity.org/t/express-middleware/652)

## Custom endpoints

### From Wordpress

If you need several endpoints and you don't want to use an extra server you can also prepare some custom endpoints in your Wordpress → https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/ 

### From a serverless function

Another quick (and elegant) way of preparing some custom endpoints is using a serverless function. We recommend you to use Now →  https://zeit.co/docs/v2/serverless-functions/introduction

### From another webserver

And of course, the solution you suggested 

> Normally, what I would do is create a REST endpoint in my server code (for example, localhost:XXXX/my-custom-endpoint) that, when called, would execute this function for me without ever exposing the API key to the client.

You can prepare an extra server (w/ Node & Express for example) with all the custom endpoints you need

---

As you want to do these requests as a result of triggering an event, these custom endpoints should be called from the client-side of your React app 

https://reactjs.org/docs/faq-ajax.html

Hope this helps