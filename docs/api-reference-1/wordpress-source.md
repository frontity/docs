# @frontity/wp-source

## Table of contents

<!-- toc -->

- [Installation](#installation)
- [Settings](#settings)
    + [`state.source.api` (required)](#statesourceapi-required)
    + [`state.source.subdirectory`](#statesourcesubdirectory)
    + [`state.source.homepage`](#statesourcehomepage)
    + [`state.source.postsPage`](#statesourcepostspage)
    + [`state.source.categoryBase`](#statesourcecategorybase)
    + [`state.source.tagBase`](#statesourcetagbase)
    + [`state.source.postEndpoint`](#statesourcepostendpoint)
    + [`state.source.params`](#statesourceparams)
    + [`state.source.postTypes`](#statesourceposttypes)
    + [`state.source.taxonomies`](#statesourcetaxonomies)
- [How to use](#how-to-use)
- [API Reference](#api-reference)
  * [Actions](#actions)
    + [`actions.source.fetch`](#actionssourcefetch)
  * [State](#state)
    + [`state.source.get`](#statesourceget)
    + [`state.source[taxonomy][id]`](#statesourcetaxonomyid)
    + [`state.source[type][id]`](#statesourcetypeid)
    + [`state.source.author[id]`](#statesourceauthorid)
  * [Libraries](#libraries)
    + [`libraries.api.init()`](#librariesapiinit)
    + [`libraries.source.api.get()`](#librariessourceapiget)
    + [`libraries.source.populate()`](#librariessourcepopulate)
    + [`libraries.source.handlers`](#librariessourcehandlers)
    + [`libraries.source.redirections`](#librariessourceredirections)
    + [`libraries.source.parse()`](#librariessourceparse)
    + [`libraries.source.stringify()`](#librariessourcestringify)
    + [`libraries.source.normalize()`](#librariessourcenormalize)

<!-- tocstop -->

## Installation

Add the `wp-source` package to your project:

```text
npm i @frontity/wp-source
```

And include it in your `frontity.settings.js` file:

```javascript
module.exports = {
  packages: [
    "@frontity/mars-theme",
    "@frontity/tiny-router",
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          api: "https://site.com/wp-json"
        }
      }  
    }
  ]
}
```

## Settings

These are the settings you can change in your `frontity.settings.js` file:

#### `state.source.api` (required)

The URL of your API. It can be from a self-hosted WordPress, like `https://site.com/wp-json` or from a WordPress.com site, like`https://public-api.wordpress.com/wp/v2/sites/site.wordpress.com`(see [WordPress REST API on WordPress.com](https://developer.wordpress.com/2016/11/11/wordpress-rest-api-on-wordpress-com/)).

#### `state.source.subdirectory`

A name or path indicating the subdirectory of your domain where your Frontity site lives. For example, if your site is in [https://mysite.com/blog](https://mysite.com/blog), you have to use it with the value of `blog` or `/blog`. It also transform links of the entities that come from the REST API.

#### `state.source.homepage`

This option allows you to show a specific page when accessing the homepage of your site. For example, if you set this value to `/about-us` then that page will be shown if you access `/`.

> **NOTE:** As this option overrides the `/` route, you should set `state.source.postsPage` as well in order to be able to access the posts archive in a different route.

{% hint style="warning" %}
You have to configure your WordPress with the same setting.
{% endhint %}

![](../.gitbook/assets/screen-shot-2019-08-30-at-13.08.35%20%283%29%20%281%29.png)

#### `state.source.postsPage`

This option allows you to show the posts archive when accessing a specific URL of your site, instead of the homepage. For example, if you set this value to `/blog`, then the posts archive will be shown if you access `/blog` instead of `/`. It is useful when used in combination with `state.source.homepage`.

{% hint style="warning" %}
You have to configure your WordPress with the same setting.
{% endhint %}

![](../.gitbook/assets/screen-shot-2019-08-30-at-13.08.35%20%283%29%20%282%29.png)

#### `state.source.categoryBase`

Change the base prefix of URLs for category pages with the indicated one.

> **NOTE:** for this option to work well, you have to put the same value in the WordPress site options.

#### `state.source.tagBase`

Change the base prefix of URLs for tag pages with the indicated one.

> **NOTE:** for this option to work well, you have to put the same value in the WordPress site options.

#### `state.source.postEndpoint`

Set the endpoint against which calls to the REST API are made **when posts are requested**, i.e. when fetching a single post, the post archive, date archives, categories, tags, authors, etc. This is useful when you want to use another post type as your default, for example “products”.

The default value is `"posts"`.

#### `state.source.params`

Object of params that will be used in every call to the WP REST API when using `actions.source.fetch`. This is useful to filter fields from the REST API, change the default `per_page` value and so on. For example, if you set this value to

```javascript
module.exports = {
  packages: [
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          api: "https://site.com/wp-json",
          params: {
            per_page: 5,
            type: ["post", "page"]
          }
        }
      }  
    }
  ]
}
```

and then you visit a URL (or use `actions.source.fetch`), the query part of the HTTP call to the REST API will be `per_page=5&type[]=post&type[]=page`.

#### `state.source.postTypes`

This option allows you to show the Custom Post Types you create at WordPress when accessing their URLs. It is an array of objects, each object being a different CPT. It has three arguments:

* `type` : Type slug. The slug you configured for your Custom Post Type. e.g. `movies`
* `endpoint` : REST API endpoint from where this post type can be fetched. e.g. `movies`
* `archive` (optional): the URL of the archive of this Custom Post Type, where all of them are listed. e.g. `/movies_archive` .

Differentiating `type` and `endpoint` may be confusing as they are usually the same. You can confirm you are doing it correctly going to the CPT `endpoint` :

![](../.gitbook/assets/https___test_frontity_io__rest_route__wp_v2_movies%20%282%29%20%281%29.png)

So in this case, the settings would be:

```javascript
postTypes: [
  {
    type: "movies",
    endpoint: "movies",
    archive: "/movies_archive"
  }
]
```

#### `state.source.taxonomies`

Similar to `postTypes`setting, this one allows you to show the lists of posts of a Custom Taxonomies you create at WordPress when accessing their URLs. It is an array of objects, each object being a different Custom Taxonomy. It has four arguments:

* `taxonomy` : Taxonomy slug. The slug you configured for your Custom Taxonomy. 
* `endpoint` : REST API endpoint from which this taxonomy can be fetched.
* `postTypeEndpoint` (optional): REST API endpoint from which posts of this taxonomy can be fetched. Default is "posts", but if the Custom Taxonomy is meant to load Custom Post Types instead, you have to add its endpoint here.
* `params` (optional): Extra params to be used while fetching the list of posts.

Again, differentiating `taxonomy` and `endpoint`may be confusing as they usually are the same too. You can confirm you are doing it correctly by going to the Custom Taxonomy `endpoint` :

![](../.gitbook/assets/https___test_frontity_io__rest_route__wp_v2_actor%20%282%29%20%281%29.png)

Note that in this case `taxonomy`and `endpoint`are different. In the next example, we will fetch CPT "movies" instead of "posts", and add some params. It would be something like this:

```javascript
taxonomies: [
  {
    taxonomy: "actors",
    endpoint: "actor",
    postTypeEndpoint: "movies",
    params: {
      per_page: 5,
      _embed: true
    }
  }
]
```

## How to use

Let’s start by explaining how the state data is used and then how that data is requested and stored. The state works with two main concepts: **links** and **entities**.

The state is designed so that you can know which entities correspond to which link, and then access the data of these entities in a simple way.

> **NOTE:** for the data to exist, it will be necessary to request them previously using the `fetch` action.

```jsx
import React, {useEffect} from "react";
import { connect } from "frontity";

// In a React component that uses "connect":
const CategoryNature = ({ state, actions }) => {


  // 1. fetch data related to a path
  // With this useEffect we make the call to fetch 
  // only the first time the component is rendered.
  // When the data is fetched, the state is updated with the new data
  // so the component is re-rendered and "data" will get proper content

  useEffect(() => {
    actions.source.fetch("/category/nature/");
  }, []);


  // 2. get data from frontity state
  const data = state.source.get("/category/nature/");

  // 3. get entities from frontity state
  if (data.isCategory) {
    // the category entity
    const category = state.source.category[data.id];

    // posts from that category
    const posts = data.items.map(
      ({ type, id }) => state.source[type][id]
    );

    // 4. render!
    return (
      <>
        <h1>{category.name}</h1>
        {posts.map(p => <a href={p.link}>{p.title.rendered}</a>)}
      </>
    );
  }

  return null;
}

export default connect(CategoryNature);
```

## API Reference

{% hint style="info" %}

The [`wp-source` package](https://github.com/frontity/frontity/tree/dev/packages/wp-source) implements the [interface defined in the `source` package](https://github.com/frontity/frontity/blob/dev/packages/source/types.ts) and [adds some extra API](https://github.com/frontity/frontity/blob/dev/packages/wp-source/types.ts)

{% endhint %}

### Actions

#### `actions.source.fetch` 

This action fetches all entities related to a `link`, i.e. the pathname of a URL in your site.

{% hint style="info" %}

`(link: string, options: object) => Promise`

- **Parameters**
  - **`link`**: string` Link representing a REST API endpoint or custom handler 
  - _`options`_: `object` _(optional)_
    - _`force`_: `boolean` The entities should be fetched again.

- **Return value**
  - `Promise` Promise resolving to data fetched

{% endhint %}

All received data are populated in `state.source` and are accessible using the methods explained in the next section.

```javascript
actions.source.fetch("/category/nature/").then(dataFetched => ...)
```

When `fetch` is called _again_ for the same `link` it does nothing, as all the entities have already been fetched and there is no need to request them again. If you do want to fetch them again, you can pass an options object to `source.fetch` with the following properties:

```javascript
actions.source.fetch("/category/nature/", { force: true }).then(dataFetched => ...)
```

### State

#### `state.source.get`

Returns an object that gives you info about the type of that link and related entities.

{% hint style="info" %}

`(link: string) => object`

- **Parameters**
  - **`link`**: `string` Link representing a REST API endpoint or custom handler 
  
- **Return value**
  - `object` Info about the type of data represented in the URL

{% endhint %}

For example:

```javascript
state.source.get("/category/nature/");
```

will return something like

```javascript
{
  // Entity properties.
  taxonomy: "category",
  id: 7,
  link: "/category/nature/page/3?s=park",
  query: {
    s: "park"
  },

  // Booleans that identify the type of link.
  isArchive: true,
  isCategory: true,
  isTaxonomy: true,

  // Booleans that show the fetch status.
  isFetching: false,
  isReady: true,

  // Archive properties.
  items: [{ type: "post", id: 60, link: "..." }, ...],
  total: 53,
  totalPages: 6,
  page: 3,
  route: "/category/nature",
  next: "/category/nature/page/4?s=park",
  previous: "/category/nature/page/2?s=park",

  // Search properties.
  isSearch: true,
  searchQuery: "park",
}
```

The information to distinguish each type of link is based on the [WP Template Hierarchy](https://wphierarchy.com/) and is as follows:

* archives: `isArchive`
  * taxonomy: `isTaxonomy`
    * category: `isCategory`
    * tag: `isTag`
    * deal: `isDeal`
  * author: `isAuthor`
  * postTypeArchive: `isPostTypeArchive`
    * post: `isHome`, `isPostArchive` (`isFrontPage` optional)
    * product: `isProductArchive`
  * date: `isDate`
* postTypes: `isPostType`
  * post: `isPost`
  * page: `isPage` (`isFrontPage` optional)
  * product: `isProduct`
  * media: `isMedia`, `isAttachment`
* 404: `is404`

Additionally, if calling `get()` has returned a status code higher than `400`, we add information about the error to the state. For example, if an error code was `500`, the state will include the following properties:

```javascript
{
  isError: true,
  is500: true,
  errorStatus: 500,
  errorStatusText: "Some string describing the error",

  // booleans that describe the fetch status
  isReady: true,
  isFetching: false
}
```

Properties added to each type are also based on the [WP REST API](https://developer.wordpress.org/rest-api/reference/):

* taxonomy: `taxonomy`, `id`
* author: `id`
* postTypeArchive: `type`
* date: `year`, `month`, `date`
* postType: `type`, `id`

#### `state.source[taxonomy][id]`

Access category, tag, or custom taxonomy’s entities. These entities have the same schema as specified in the [WP REST API](https://developer.wordpress.org/rest-api/reference/).

> NOTE: we are actually changing the WP REST API response, but **only for tags**, in which we are replacing the `taxonomy` value from `post_tag` to `tag`.

```text
source.category[2]
source.tag[13]
source.deal[3]
```

#### `state.source[type][id]`

Access posts, pages, attachments or custom post type’s entities. These entities have the same schema as specified in the [WP REST API](https://developer.wordpress.org/rest-api/reference/).

```text
source.post[60]
source.page[7]
source.product[36]
```

#### `state.source.author[id]`

Access author entities. These entities have the same schema as specified in the [WP REST API](https://developer.wordpress.org/rest-api/reference/).

```text
source.author[4]
```

### Libraries

#### `libraries.api.init()`

Set the URL to the WordPress REST API.

{% hint style="info" %}

`(link: string, options: object) => Promise`

- **Parameters**
  - `options: object`
    * **`api`**: `string` URL pointing to a valid WP REST route.
    * **`isWpCom`**: `boolean` if the WP REST route is from a WordPress.com hosted site.

{% endhint %}

**Example**

```javascript
const { api } = libraries.source;

// for wp.org
api.init({
  api: "https://test.frontity.io/wp-json",
  isWpCom: false
});

// for wp.com
api.init({
  api: "https://public-api.wordpress.com/wp/v2/sites/test.frontity.io",
  isWpCom: false
});
```

#### `libraries.source.api.get()`

Request entity from the WordPress REST API.

{% hint style="info" %}

`(options: object) => Promise`

- **Parameters**
  - `options: object`
    * **`endpoint`**: `string` Name of the endpoint if is a `/wp/v2` endpoint (e.g. `posts`), or the full path of other REST endpoints (e.g. `/frontity/v1/discovery`).
    * **`params`**: `string` Any parameter that will be included in the query params.
    * _`api`_: `string` _(optional)_ Overrides the value set with `api.set.`
    * _`isWpCom`_: `boolean` _(optional)_ Overrides the value set with `api.set.`
- **Return value**
  - `Promise` Promise resolving to data requested

{% endhint %}

For more info, visit the [WP REST API reference](https://developer.wordpress.org/rest-api/reference).

**Example**

```javascript
const { api } = libraries.source;

// Get posts from categories 2, 3 and 4
api.get({ endpoint: "posts", params: { _embed: true, categories: '2,3,4' } })
  .then(dataRequested => { /* do something with dataRequested */ })

// Get the page 14
api.get({ endpoint: "pages", params: { _embed: true, include: '14' } });
  .then(dataRequested => { /* do something with dataRequested */ })

// Other endpoints: 
api.get({ 
  endpoint: "/frontity/v1/discovery",
  params: { slug: "/the-beauties-of-gullfoss" }
})
.then(dataRequested => { /* do something with dataRequested */ })
```

#### `libraries.source.populate()`

Add entities to the Frontity state.

{% hint style="info" %}

`(options: object) => Promise`

- **Parameters**
  - `options: object`
    * **`response`**: `object` The response object returned by `api.get().`
    * **`state`**: `object` The state object from the Frontity store.
    * _`subdirectory`_: `string` _(optional)_ Domain's subdirectory where your Frontity site is accessible. When this options is passed, this subdirectory is added to the entities' links. By default, it takes the value defined in `state.source.subdirectory`.
    * _`force`_: `boolean` _(optional)_ Value indicating if the entities should be overwritten.`false` by default.
- **Return value**
  - `Array` An array of objects with attributes `type`, `id` and `link` representing the added entities.

{% endhint %}

Entities are normally never overwritten. So, if an entity already exists in the state and a new one is fetched, the one in the state will prevail. If you want to overwrite them, `populate` should be called with `force: true`.

**Example**

```javascript
libraries.source.api.get({ endpoint: "posts" })
  .then(response => libraries.source.populate({ response, state }))
  .then(entitiesAdded => {
    entitiesAdded.forEach(({type, id, link}) => {
      console.log({type, id, link}) 
    })
  })

```

#### `libraries.source.handlers`

Handlers are objects that associate a path pattern with a function that gets the entities contained in that path. These `handlers` are used when `actions.source.fetch` is called.

{% hint style="info" %}

A handler is defined by an object with the following properties:
* **`name`**: `string` Identifier of the handler.
* **`priority`**: `number` Number that lets `fetch` to know in which order handlers should be evaluated.
* **`pattern`**: `regExp` Pattern which paths are compared with. We use [path-to-regexp](https://github.com/pillarjs/path-to-regexp) under the hood, so check its documentation to know how to write patterns.
* **`func`**: `function`  Asynchronous function that retrieves entities and adds all info to the state.
  - Arguments
    - `options: object`
      * **`route`**: `string` The route that are being fetched.
      * **`params`**: values obtained from the pattern after a match
      * **`state`**: `object` Frontity state.
      * **`libraries`**: `object` Frontity libraries.
      * **`force`**: `boolean` If the entities should be fetched again. Internally, this parameter will be passed to the `actions.source.fetch` call.
  - Return value
    - `Promise` Promise resolving to custom data

{% endhint %}

`libraries.source.handlers` is an array., so **to add new handlers we can use `libraries.source.handlers.push()`**

**Example**

```javascript
// A handler example to retrieve products
libraries.source.handlers.push({
  name: "product",
  priority: 10,
  pattern: "/product/:slug",
  func: async ({ route, params, state, libraries, force }) => {
    // 1. get product
    const response = await libraries.source.api.get({
      endpoint: "products",
      params: { slug: params.slug }
    });

    // 2. add product to state
    const [product] = await libraries.source.populate({ response, state, force });

    // 3. add route to data
    Object.assign(state.source.data[route], {
      id: product.id,
      type: product.type,
      isPostType: true,
      isProduct: true
    });
  }
});
```

#### `libraries.source.redirections`

Redirections are objects that associate a path pattern with a function that returns a new path. These `redirections` are used when `actions.source.fetch` is executed, before `handlers`.

{% hint style="info" %}

A redirection is defined by an object with the following properties:

* **`name`**: `string` Identifier of the redirection.
* **`priority`**: `number` Let `fetch` to know in which order redirections should be evaluated.
* **`pattern`**: `regExp` Pattern which paths are compared with.
* **`func`**:  Function that returns a new path. It receives an object with the params obtained after a match.
  - Arguments
      - `options: object`
        * **`slug`**: `string` The route that is being fetched.        
    - Return value
      - `string` a new path

{% endhint %}

**Example**

```javascript
// A redirection example to change tag base prefix
libraries.source.redirections.push({
  name: "tags",
  priority: 10,
  pattern: "/tag/:slug/",
  func: ({ slug }) => `/label/${slug}/`
});
```

#### `libraries.source.parse()`

Utility for parsing routes.

{% hint style="info" %}

`(route: string) => object`

- **Parameters**
  * `route`: any route that points to entities in your site (links, custom lists, etc.)

- **Return value**
  - `object`
    * **`path`**: `string` Pathname without the page
    * **`page`**: `number` The page number
    * **`query`**: `object` Object with query parameters
    * **`hash`**: `string` The hash value (with `#`).

{% endhint %}

#### `libraries.source.stringify()`

Utility for building routes from its attributes.

{% hint style="info" %}

`(attributesRoute: object) => string`

- **Parameters**
  * **`path`**: `string` pathname without the page
  * _`page`_: `number` _(optional)_ The page number
  * _`query`_: `object` _(optional)_ Object with query parameters
  * _`hash`_: `string` _(optional)_ The hash value (with `#`).


- **Return value**
  * `route`: `string` Normalized route 

{% endhint %}

#### `libraries.source.normalize()`

{% hint style="info" %}

`(route: string) => string`

- **Parameters**
  * `route`: `string` Any route that points to entities in your site (links, custom  lists, etc.)
- **Return value**
  * `route`: `string` Normalized route 

{% endhint %}

{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

