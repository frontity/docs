# WordPress Source

### Installation

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
          apiUrl: "https://site.com/wp-json"
          isWPCom: false
        }
      }  
    }
  ]
}
```

### Settings

There are only two settings you can change in your `frontity.settings.js` file:

#### state.source.isWPCom

Set it to `true` if your site is a wordpress.com site. It's `false` by default.

#### state.source.apiUrl

This is the url of your API. It can be from a self-hosted WordPress, like `https://site.com/wp-json` or from a wordpress.com site, like `https://public-api.wordpress.com/wp/v2/sites/site.wordpress.com`

### How to use

Let’s start by explaining how the state data is used and then how that data is requested and stored. The state works with two main concepts: **paths** and **entities**.

The state is designed so that you can know which entities correspond to which path, and then access the data of these entities in a simple way.

> **NOTE:** for the data to exist, it will be necessary to request them previously using the `fetch` action.

```jsx
import React from "react";
import { connect } from "@frontity/connect";

// In a React component that uses "connect":
const CategoryNature = connect(({ state, actions }) => {

  // 1. fetch data related to a path
  actions.source.fetch("/category/nature/");
  
  // 2. get data from frontity state
  const data = state.source.data("/category/nature/");
  
  // 3. get entities from frontity state
  if (data.isCategory) {
    // the category entity
    const category = state.source.category[data.id];
    
    // first page of posts from that category
    const posts = data.pages[1].map(
      ({ type, id }) => state.source[type][id]
    );
    
    // 4. render!
    return (
      <>
        <h1>{category.name}</h1>
        {posts.map(p => <a href={p.link}>{p.title.rendered}</a>)}
      </>
    );
    
  return null;
}
```

## API

### Actions

#### source.fetch

This action fetch all entities related to a `path`, i.e. the pathname of a URL in your site. That `path` could be passed as a single argument or inside an object with the property `page` for URLs that allow pagination.

All received data are populated in `state.source` and is accessible using the methods explained in the next section.

```javascript
// just the path
actions.source.fetch("/category/nature/");

// path and page
actions.source.fetch({ path: "/category/nature/", page: 2 });
```

### State

#### `source.data`

Returns an object that gives you info about the type of that path and related entities. For example,

```javascript
state.source.data("/category/nature/");
```

will return something like

```javascript
{
  // entity properties
  taxonomy: "category"
  id: 7
  
  // booleans that identify the type of path
  isArchive: true
  isCategory: true
  isTaxonomy: true
  
  // booleans that show the fetch status
  isFetching: false
  isReady: true
  
  // list of posts (if it's an archive)
  pages: [[{ type: "post", id: 60, link: "..." }, ...]]
  total: 10
  totalPages: 1
}
```

The information to distinguish each type of path is based on the [WP Template Hierarchy](https://wphierarchy.com/) and is as follows:

* archives: `isArchive`
  * taxonomy: `isTaxonomy`
    * category: `isCategory`
    * tag: `isTag`
    * deal: `isDeal`
  * author: `isAuthor`
  * postTypeArchive: `isPostTypeArchive`
    * post: `isHome`, `isPostArchive` \(`isFrontPage` optional\)
    * product: `isProductArchive`
  * date: `isDate`
* postTypes: `isPostType`
  * post: `isPost`
  * page: `isPage` \(`isFrontPage` optional\)
  * product: `isProduct`
  * media: `isMedia`, `isAttachment`
* 404: `is404`

Properties added to each type are also based in the [WP REST API](https://developer.wordpress.org/rest-api/reference/):

* taxonomy: `taxonomy`, `id`
* author: `id`
* postTypeArchive: `type`
* date: `year`, `month`, `date`
* postType: `type`, `id`



#### `source[taxonomy][id]`

Access category, tag, or custom taxonomy’s entities. This entities have the same schema as specified in the  [WP REST API](https://developer.wordpress.org/rest-api/reference/).

> NOTE: we are actually changing the WP REST API response, but **only for tags**, in which we are replacing the `taxonomy` value from `post_tag` to `tag`.

```text
source.category[2]
source.tag[13]
source.deal[3]
```



#### `source[type][id]`

Access posts, pages, attachments or custom post type’s entities. This entities have the same schema as specified in the  [WP REST API](https://developer.wordpress.org/rest-api/reference/).

```text
source.post[60]
source.page[7]
source.product[36]
```



#### `source.author[id]`

Access author entities. This entities have the same schema as specified in the  [WP REST API](https://developer.wordpress.org/rest-api/reference/).

```text
source.author[4]
```



### Libraries

#### `api.set({ apiUrl, isWpCom })`

Request entity to the WordPress REST API.

**arguments**

* `apiUrl`: URL pointing to a valid WP REST route.
* `isWPCom`: a boolean indicating if the WP REST route is from a WordPress.com hosted site.

**example**

```javascript
const { api } = libraries.source;

// for wp.org
api.init({
  apiUrl: "https://test.frontity.io/wp-json",
  isWPCom: false
});

// for wp.com
api.init({
  apiUrl: "https://public-api.wordpress.com/wp/v2/sites/test.frontity.io",
  isWPCom: false
});
```



#### `api.get({ endpoint, params, apiUrl?, isWpCom? })`

Request entity to the WordPress REST API.

**arguments**

* `endpoint`: name of the endpoint if is a `/wp/v2` endpoint \(e.g. `posts`\), or the full path of other REST endpoints \(e.g. `/frontity/v1/discovery`\)
* `params`: any parameter that will be included in the query params.
* `apiUrl` \(optional\): overrides the value set with `api.set`
* `isWpCom` \(optional\): overrides the value set with `api.set`

For more info, visit the [WP REST API reference](https://developer.wordpress.org/rest-api/reference).

**example**

```javascript
const { api } = libraries.source;

// Get posts from categories 2, 3 and 4
api.get({ endpoint: "posts", params: { _embed: true, categories: '2,3,4' } });

// Get the page 14
api.get({ endpoint: "pages", params: { _embed: true, include: '14' } });

// Other endpoints: 
api.get({ 
  endpoint: "/frontity/v1/discovery",
  params: { path: "/the-beauties-of-gullfoss" }
});
```

#### `populate(state, response)`

```javascript
libraries.source.populate(state, response);
```

#### resolver

```javascript
const { resolver } = libraries.source;

resolver.add("/category/:slug", categoryHandler);
const { handler, params } = resolver.match("/category/nature/");
```



{% hint style="info" %}
Still any doubts? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

