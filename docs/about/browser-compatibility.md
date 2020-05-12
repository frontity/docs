# Browser compatibility

The approach adopted by Frontity is as follows:
- Prioritize the performance and user experience for the large majority of users that run modern browsers.
- Do this while keeping as much compatibility as possible for the small minority of users that still use older browsers, such as IE11.

> _"as much compatibility as possible" here means that at the very least the page loads, the content can be viewed and read, and the user can navigate to other parts of the site._

| Platform                           | Support                 |
|------------------------------------|-------------------------|
| [Browsers with Proxy](https://caniuse.com/#feat=proxy)                | Full hydration          |
| Browsers without Proxy (like IE11) | No hydration (SSR-only) |

We don’t expect feature parity between the SSR-only version and the fully hydrated version. You can think of the SSR-only version as an alternative version of your page, without the enhanced experience provided by React.

{% hint style="warning" %}
If you need to provide the feature parity in IE11, then Frontity is probably not the best option for you.
{% endhint %}