# 11. Head

Taking control over your `<head>` tags is easy with Frontity, because we have already configured it for you. It uses internally [React Helmet](https://github.com/nfl/react-helmet), so you can work as if you were working with common HTML.

For doing so, you just have to import `Head` from `frontity` and write inside `<Head>` all the tags you want. Usually, you will want to import it at the `index.js` of your theme, in order to be loaded in all your pages.

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

You can of course use variables or include code outside `<Head>` that will be rendered normally.

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

That's all, you just have to configure it at your will. Frontity uses internally [React Helmet](https://github.com/nfl/react-helmet). You should check its docs in case you want to understand it better.

