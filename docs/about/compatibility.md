# Compatibility

The approach of Frontity is:
- Prioritize the performance and user experience of the immense majority of users that run modern browsers.
- While keeping only moderate compatibility for the small minority of users still on old browsers, like IE11.

_Moderate compatibility means that the page loads, the content can be read and viewed, and the user can navigate to other parts of the site._

| Platform                           | Support                 |
|------------------------------------|-------------------------|
| Node                               | 10+                     |
| Browsers with Proxy                | Full hydration          |
| [Browsers without Proxy](https://caniuse.com/#feat=proxy) (like IE11) | No hydration (SSR-only) |

We don’t expect feature parity between the SSR-only version and the fully hydrated version. You can think of the SSR-only version as an alternative version of your page, without the enhanced experience of React.

> _If you need to provide the feature parity in IE11, then Frontity is probably not the best option for you._

