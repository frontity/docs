# Lazy loading


As [defined by MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)

> Lazy loading is a strategy to identify resources as non-blocking (non-critical) and load these only when needed. It's a way to shorten the length of [the critical rendering path](https://developer.mozilla.org/en-US/docs/Web/Performance/Critical_rendering_path), which translates into reduced page load times.

So, by applying lazy-loading strategies your page will load much faster as the assets will be loaded only when they're really needed (when they first appear in the viewable area for the user).

A good example of this are images: you won't probably need to load all the images in your page as you only need those images that appear in the viewable area for the user on first load. A better strategy is to load only the images that are in the viewable area for the user, and then load those images as they enter into this viewable area (if the user do not scroll, those images will never be loaded).

The same strategy can be applied to iframes and other resources that require a request to the server.


# How to apply lazy-loading in Frontity projects

Frontity provides the [`<Image />`](https://api.frontity.org/frontity-packages/collections-packages/components#image) and [`<Iframe />`](https://api.frontity.org/frontity-packages/collections-packages/components#iframe)  React components that adds lazy-loading to them. They're available through the [`@frontity/components`](https://api.frontity.org/frontity-packages/collections-packages/components) package.


The [`<Link>`](https://api.frontity.org/frontity-packages/collections-packages/components#link) component provides a sort-of lazy-loading behaviour called [**link prefeching**](https://docs.frontity.org/performance/link-prefetching). 

Finally, with the [Intersection Observer Hooks](https://api.frontity.org/frontity-packages/collections-packages/hooks/intersection-observer-hooks) provided by the [`@frontity/hooks`](https://api.frontity.org/frontity-packages/collections-packages/hooks) package you can create your custom logic to be triggered only when the React element reaches the viewable area.
