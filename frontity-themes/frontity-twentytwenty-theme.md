# @frontity/twentytwenty-theme

## Description

The **Twenty Twenty** default WordPress theme was included in WordPress 5.3 and we ported it over to Frontity so users can use it in a headless setup as well. You can check out its **code** and structure on our [GitHub repo](https://github.com/frontity/frontity/tree/dev/packages/twentytwenty-theme) and find it on [npm](https://www.npmjs.com/package/@frontity/twentytwenty-theme).

These are some of the key features included in this theme:

**Accessibility Ready**

The theme is accessible and screen-reader friendly. We added the proper landmarks, roles and labels. We also paid attention to trap focus within modals, ensure focus indicator is visible for all interactive elements.

**Custom Colors**

You can give your website or blog a personal touch by changing the background colors, text colors and primary/accent color in the theme settings. You change the color in one place, all visual elements get updated.

**Search**

The theme comes with a built-in search box to make it easy for your readers to look for specific content. Search box is powered by the robust and performant search engine built into WordPress.

**Featured Images**

Show beautiful featured images for your blog posts. Frontity uses the featured image uploaded to WordPress and renders it on every blog post. You can also opt out of this in the theme settings.

**Content Prefetch**

You can prefetch page for any link to provide an almost instant user experience. All you need do is to change your settings to prefetch pages when the user "hovers" on a link, when the link is visible on screen, or prefetch all links on the current page.

**Pagination**

Frontity's theme has the same pagination as the original WordPress theme. This way you can have access to different pages in the footer, and navigate easily between pages.

## Demo

![Homepage view in Twenty Twenty Frontity Theme.](../https://github.com/frontity/gitbook-docs/blob/gitbook/.gitbook/assets/homepage-view-twentytwenty-frontity-theme.png)

You can check out all the features in this [**theme demo**](https://twentytwenty.frontity.org/), ****or even in our [Frontity blog](https://blog.frontity.org/).

## Settings

In this theme, apart from changing the colors, you can select other options. You can configured it via the `frontity.settings.js` file. The theme options can be specified in the `state.theme` property.

Here you have an example of a possible configuration \(each setting is explained later in detail\):

```javascript
{
  name: "@frontity/twentytwenty-theme",
  state: {
    theme: {
      menu: [
        ["Home", "/"],
        ["Nature", "/category/nature/"],
        ["Travel", "/category/travel/"],
        ["Japan", "/tag/japan/"],
        ["About Us", "/about-us/"]
      ],
      colors: {
        primary: "#E6324B",
        headerBg: "#ffffff",
        footerBg: "#ffffff",
        bodyBg: "#f5efe0"
      },
      showSearchInHeader: true,
      showAllContentOnArchive: false,
      featuredMedia: {
        showOnArchive: true,
        showOnPost: true
      },
      autoPreFetch: "hover",
      fontSets: "us-ascii"
    }
  }
},
```

All the settings and their description:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Key</th>
      <th style="text-align:left">Description</th>
      <th style="text-align:left">Default value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><b>menu</b>
      </td>
      <td style="text-align:left">Menu links to display in the header</td>
      <td style="text-align:left">[]</td>
    </tr>
    <tr>
      <td style="text-align:left"><em>colors</em>.<b>primary</b>
      </td>
      <td style="text-align:left">Used throughout most of the application to style links and other common
        elements.</td>
      <td style="text-align:left"><code>#cd2653</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><em>colors</em>.<b>headerBg</b>
      </td>
      <td style="text-align:left">Color of the header background.</td>
      <td style="text-align:left"><code>#ffffff</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><em>colors</em>.<b>footerBg</b>
      </td>
      <td style="text-align:left">Color of the footer background.</td>
      <td style="text-align:left"><code>#ffffff</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><em>colors</em>.<b>bodyBg</b>
      </td>
      <td style="text-align:left">Color of the body background.</td>
      <td style="text-align:left"><code>#f5efe0</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><b>showSearchInHeader</b>
      </td>
      <td style="text-align:left">Whether to show the search button in page header</td>
      <td style="text-align:left">true</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>showAllContentOnArchive</b>
      </td>
      <td style="text-align:left">Whether to show all post content or only excerpt in archive view</td>
      <td
      style="text-align:left">false</td>
    </tr>
    <tr>
      <td style="text-align:left"><em>featuredMedia</em>.<b>showOnArchive</b>
      </td>
      <td style="text-align:left">Whether to show featured image on archive view</td>
      <td style="text-align:left">true</td>
    </tr>
    <tr>
      <td style="text-align:left"><em>featuredMedia</em>.<b>showOnPost</b>
      </td>
      <td style="text-align:left">Whether to show featured media on post view</td>
      <td style="text-align:left">true</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>autoPreFetch</b>
      </td>
      <td style="text-align:left">
        <p>Whether to auto-fetch links on a page. Possible values:</p>
        <ul>
          <li><code>no</code>: don&apos;t auto-tech any links</li>
          <li><code>all</code>: auto-fetch all the links of the page</li>
          <li><code>in-view</code> : auto-fetch just the links that are in-view</li>
          <li><code>hover</code> : auto-fetch links when hover</li>
        </ul>
      </td>
      <td style="text-align:left">no</td>
    </tr>
    <tr>
      <td style="text-align:left"><b>fontSets</b>
      </td>
      <td style="text-align:left">
        <p>Which font set to use:</p>
        <ul>
          <li><code>us-ascii</code>
          </li>
          <li><code>latin</code>
          </li>
          <li><code>all</code> 
          </li>
        </ul>
      </td>
      <td style="text-align:left">all</td>
    </tr>
  </tbody>
</table>## API Reference

### Actions

There are some actions used along the theme that you may need useful:

#### actions.theme.openMobileMenu

It changes `state.theme.isMobileMenuOpen` to `true`, so it opens the mobile menu.

#### actions.theme.closeMobileMenu

It changes `state.theme.isMobileMenuOpen` to `false`, so it closes the mobile menu.

#### actions.theme.openSearchModal

It changes `state.theme.isSearchModalOpen` to `true`, so it opens the search bar.

#### actions.theme.closeSearchModal

It changes `state.theme.isSearchModalOpen` to `false`, so it closes the search bar.

### Libraries

This theme doesn't have its own libraries, but it includes the image processor of [@frontity/html2react](../api-reference-1/frontity-html2react.md), so all the `<img>` tags are converted into the [`<Image />` component](../api-reference-1/frontity-components.md#image).

