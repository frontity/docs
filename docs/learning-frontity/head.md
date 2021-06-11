# 10. Head

Taking control over your `<head>` tags is easy with Frontity because we have already configured it for you. It uses [React Helmet](https://github.com/nfl/react-helmet) internally, so you can work as if you were working with common HTML.

To adjust the `<head>`, you just have to import `Head` from `frontity` and write inside `<Head>` all the tags you want. Usually, you will want to import it at the `index.js` of your theme, in order for it to be loaded on all your pages.

```jsx
import { Head } from "frontity";

const Theme = () => (
    <Head>
        <title>My awesome blog</title>
        <meta name="description" content="This blog is just for being awesome" />
        <html lang="en" />
        <link rel="canonical" href="https://example.com" />
    </Head>
);
```

You can, of course, use variables or include code outside `<Head>` that will be rendered normally.

```jsx
import { Head, connect } from "frontity";

const Theme = ({ state }) => {
    const data = state.source.get(state.router.link);
    return (
        <>
            <Head>
                <title>{state.frontity.title}</title>
                <meta name="description" content={state.frontity.description} />
                <html lang="en" />
                <link rel="canonical" href={state.router.link} />
            </Head>

            <div>
                {data.isFetching && <Loading />}
                {data.isArchive && <List />}
                {data.isPostType && <Post />}
                {data.is404 && <Page404 />}
            </div>
        </>
    );
};

export default connect(Theme);
```

That's all, you just have to configure it at your will. Frontity uses [React Helmet](https://github.com/nfl/react-helmet) internally. You should check its docs out in case you want to understand it better.

{% hint style="info" %}
If you still have any questions about Head in Frontity, please check out the [**community forum**](https://community.frontity.org), which is packed full of answers and solutions to all sorts of Frontity questions. If you don't find what you're looking for, feel free to start a new post.
{% endhint %}

