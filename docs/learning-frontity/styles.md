# 9. Styles

You should now know all the concepts needed to master **Frontity**, so let's see how you can customize your theme.

Frontity takes a different approach than WordPress when customizing themes. While in WordPress you have different `style.css` files and you add classes to your elements, **Frontity** uses **CSS in JS** instead. But don't worry, you don't have to learn a new language, it is CSS at the end.

CSS in JS, apart from having a better developer experience while working with React, has many other advantages like:

* **Only loads the CSS needed** for each page which improves the performance
* You **don't have to worry about classes** and its problems with duplication, typos, etc
* You **don't have to worry about vendor prefixing** so you can write your CSS based on the current standard and Frontity handles the rest for you
* You can use all the **power of JavaScript** to style your components and create dynamic styles with much less code

{% hint style="info" %}
In this video the DevRel team talks about CSS In JS in Frontity:

* 📺 [Frontity Talks 2020-01 - wp-source & CSS In JS \[26:49\]](https://www.youtube.com/watch?v=e-_66W8pfdY&t=1609s) 
{% endhint %}

Let's learn some of the CSS in JS concepts to be able to use it with Frontity:

## Styled

In order to style your app, you will usually create new React components from HTML tags \(or even other React components\) with new styles attached to them. To do so, we will import `styled` from `frontity`, and create styled-components.

When styling HTML tags, you just use `styled` followed by the HTML tag, and then a template string with the CSS, like this:

```jsx
import { styled } from "frontity";

const StyledDiv = styled.div`
    width: 100%;
    text-align: center;
    color: white;
`;
```

If you want to style another React component, you use `styled` like a function. The `styled` method works perfectly on all of your own or any third-party component, as long as they attach the passed `className` prop to a DOM element.

```jsx
import { styled } from "frontity";

const Link = ({ className, href, children }) => (
    <a href={href} className={className}>
        {children}
    </a>
);

const StyledDiv = styled(Link)`
    width: 100%;
    text-align: center;
    color: white;
`;
```

Then, you use those styled-components in React.

```jsx
import { styled } from "frontity";
import Link from "./link";

const Component = () => (
    <StyledDiv> // This StyledDiv is defined later.
        <GreenLink> // This GreenLink is defined later.
            Click Me!
        </GreenLink>
    </StyledDiv>
);

// We create a variable to use later as example.
const linkColor = "green";

// We create a new component, that is a div with these styles.
const StyledDiv = styled.div`
    width: 100%;
    text-align: center;
    color: white;
`;

// We create a new component from Link and use a variable.
const GreenLink = styled(Link)`
    background-color: ${linkColor};
`;
```

As you can see, it is really easy to work with, and you are still using common CSS. There are some important things to note:

* You can create styled-components from HTML tags or React components, although the syntax is slightly different
* You can use JavaScript inside the template strings

  In this case we are using a variable `linkColor` but you can do anything you want

## The `CSS` prop

Sometimes, you won't need to create a new component, and you will just want to add some CSS to an element. This is similar to inline styles, and you can do this by importing `css` from `frontity` .

```jsx
import { css } from "frontity";

const Component = () => (
    <div css={css`background: pink`}>
        Styling my theme
    </div>
);
```

This way, we will be styling just that div.

## Dynamic CSS using props

You can pass a function to a styled component's template string to adapt it based on its props. This `button` component has a `color` prop that changes, well, its color.

```jsx
const Button = styled.button`
  color: ${props => props.color || "red"};
`;

const Component = () => (
  <>
    <Button>This is red</Button>
    <Button color="palevioletred">This is palevioletred</Button>
  </>
);
```

## React's `style` prop

{% hint style="warning" %}
React has its own way of adding inline style, using the `style` prop, but **you should not use it** because the CSS you write there won't be optimized by Frontity!
{% endhint %}

**You should not use `style`!**

```jsx
const Page = () => (
  <div style={{
      margin: '40px',
      border: '5px solid pink'
  }}>
    This style cannot be optimized by Frontity! :(
  </div>
);
```

Instead, use the **CSS prop** or create a **styled component**:

```jsx
const Page = () => (
    <div css={css`
        margin: 40px;
        border: 5px solid pink;
    `}>
        This style can be optimized by Frontity! :)
    </div>
);
```

```jsx
const Page = () => (
    <StyledDiv>
        This style can be optimized by Frontity! :)
    </StyledDiv>
);

const StyledDiv = styled.div`
    margin: 40px;
    border: 5px solid pink;
`;
```

## `<Global>`

There will be times when you want to add styles for the whole app. For example defining styles for the `h1` , `h2` or `body` tags. In Frontity, this can be done with the `Global` component.

```jsx
import { Global, css } from "frontity";

const Page = () => (
    <>
        <Global
          styles={css`
            body {
                margin: 0;
                font-family: "Roboto";
            }
          `}
        />
        <OtherContent />
    </>
);
```

You will usually add this in the `index.js` of your theme, so you can make sure it loads on all your pages.

Frontity will include the CSS defined inside a `<Global>` component only if it is present in the DOM. You can use that ability to add conditional CSS, like this:

```jsx
const Background = ({ state }) =>
  state.theme.darkTheme ? (
    <Global styles={css`
      body { background-color: black; }
    `} />
  ) : null;
```

{% hint style="warning" %}
**Using `<Global>` for anything other than HTML tags is not recommended** because Frontity is not able to optimize it. That means you can use it for tags like `html`, `body` , `a`, `img`, and so on... But **avoid it for classes**. Use either the CSS prop or styled-components instead.
{% endhint %}

**You should not use `<Global>` for classes!**

```jsx
const Component = () => (
    <>
        <Global styles={css`
            .my-class {
                margin: 40px;
                border: 5px solid pink;
            }
          `}
        />
        <div className="my-class">
            This style cannot be optimized by Frontity! :(
        </div>
    </>
);
```

Instead, use the **CSS prop** or create a **styled component**:

```jsx
const Page = () => (
    <div css={css`
        margin: 40px;
        border: 5px solid pink;
    `}>
        This style can be optimized by Frontity! :)
    </div>
);
```

```jsx
const Page = () => (
    <StyledDiv>
        This style can be optimized by Frontity! :)
    </StyledDiv>
);

const StyledDiv = styled.div`
    margin: 40px;
    border: 5px solid pink;
`;
```

## External CSS files

External CSS files should be imported using the `<Global>` component.

{% hint style="info" %}
When you import a CSS file in Frontity, it is just a string of CSS.
{% endhint %}

Add the `<Global>` component with the external styles to your theme:

```jsx
import { Global, css } from "frontity";
import externalCss from "some-library/styles.css";

const Theme = ({ state }) => {
  ...

  return (
    <>
      <Head>
        ...
      </Head>
      <Body>
        ...
      </Body>

      <Global styles={css(externalCss)} />
    </>
  );
};
```

{% hint style="warning" %}
**Using `<Global>` for anything other than HTML tags is not recommended** because Frontity is not able to optimize it. That means you can use it to import external styles, but if you really want Frontity to be able to optimize it, you should extract that CSS and move it to styled-components instead.
{% endhint %}

## Keyframes

Finally, the last import you may need is `keyframes`. This one is used to define and use animations in your CSS.

```jsx
import { styled, keyframes } from "frontity";

// Create the keyframes.
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Add the animation to Button.
const Button = styled.button`
  background-color: hotpink;
  animation: ${rotate} 2s linear infinite;
`;

const Component = () => (
  <Button>Styling my theme</Button>
);
```

And that's all you need to style your theme!

## Emotion Documentation

For managing the styles shown above, Frontity has integrated and configured [Emotion](https://emotion.sh/docs/styled).

If you want to go deeper, you should take a look at their docs. You don't need to read the docs on how to install and configure Emotion, we have already done that work for you. The items below are particularly useful to learn more about:

* [Styled-components](https://emotion.sh/docs/styled)
* [Composition](https://emotion.sh/docs/composition)
* [Nested Selectors](https://emotion.sh/docs/nested)
* [Media Queries](https://emotion.sh/docs/media-queries)
* [Global Styles](https://emotion.sh/docs/globals)
* [Keyframes](https://emotion.sh/docs/keyframes)

That's it! You are now a master of CSS in JS.

## From Sass to CSS in JS

### Why can I not use SASS?

Frontity is an "opinionated framework" because it comes with its own State Manager and CSS solution.

That's not common among the JS framework space, but it gives Frontity some advantages we deem crucial for its success: all the Frontity packages use the same system for state managing and styling. That means things like:

* They are able to communicate between each other 
* They all use the same modules so the bundle size is not increased when you add a new package
* We can offer out-of-the-box optimizations other frameworks can't

For a more in-depth explanation about the reasons we believe it's a good approach to stick to CSS in JS vs other CSS solutions, please take a look at this [community thread](https://community.frontity.org/t/use-css-or-scss-instead-of-emotion/451/9?u=luisherranz).

### Sass to CSS in JS resources

CSS in JS supports all the Sass features. If you are used to SASS, our recommendation is to learn CSS in JS. It won't take you more than 30 minutes to learn how to do the very same things you are used to doing in Sass.

These are some resource you might find useful to make the transition to CSS in JS: 

{% embed url="https://medium.com/styled-components/getting-sassy-with-sass-styled-theme-9a375cfb78e8" caption="" %}

{% embed url="https://egghead.io/courses/convert-scss-sass-to-css-in-js" caption="" %}

{% embed url="https://jsramblings.com/2017/10/29/migrating-to-styled-components-cheatsheet.html" caption="" %}

### Migrating from Sass to CSS in JS

If you already have a base of Sass you want to migrate, you can use these tools to extract your variables and use them directly in JavaScript:

* [https://github.com/adamgruber/sass-extract-js](https://github.com/adamgruber/sass-extract-js)
* [https://github.com/jgranstrom/sass-extract](https://github.com/jgranstrom/sass-extract)


{% hint style="info" %}
Still have questions? Ask [the community](https://community.frontity.org/)! We are here to help 😊
{% endhint %}

