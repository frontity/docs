# React

In order to master Frontity and the React aspects needed for it, you should first understand HTML and [JavaScript's](javascript-basics.md) basic concepts. 

As you may know, React is a JavaScript library that lets you build amazing user interfaces in an easy way, while having outstanding web performance. It has a lot of functionalities, but just the key concepts are needed in order to understand and use it with Frontity. We take care of the rest.

These are the concepts you should familiarize yourself with:

* [JSX](react-basic.md#jsx)
* [Elements](react-basic.md#elements)
* [Components](react-basic.md#components)
* [Props](react-basic.md#props)
* [Hooks](react-basic.md#hooks)
* [Special cases](react-basic.md#special-cases)
* [State manager - Frontity Connect](react-basic.md#state-manager-frontity-connect)

{% hint style="info" %}
Note that this guide's purpose is to give you a better understanding of React concepts you need to learn in order to understand Frontity by providing a brief explanation. If you want a more detailed explanation or want to learn more about React, you can check out their own docs: [React docs](https://reactjs.org/docs/hello-world.html).
{% endhint %}

### JSX

JSX \(JavaScript XML\) is an extension to the JavaScript language syntax. This allows you to use JavaScript logic within HTML, which makes your coding experience better and your code more readable. However, there are some differences we have to keep in mind:

* In order to use JavaScript inside HTML, you simply include the code you want to be treated as JavaScript within curly braces **`{ 'This would be javascript' }`**.
* You **can't use the word `class`** to define HTML classes, as it is reserved for JavaScript. Instead, you have to use **`className`**.
* The naming convention for **all HTML attributes and event references in JSX is camelCase**. For example, a click event in JSX is onClick, instead of onclick.

Here you have an example of a React element using a Javascript variable \(between curly braces\) inside it.

```jsx
const name = 'Jon';
const Example = () => (
    <div className='main-section'>
        <p>Hi {name}, nice to meet you</p>
    </div>
);
```

### Elements

Elements are the smallest building blocks of React. They should not be confused with [components](react-basic.md#components). Elements are what components are made of.

* **All elements must be closed**. For example, line breaks must be coded as `<br />` . `<br>` is not valid.
* Any element **can be written with a self-closing tag**. For example, a `<div>`can be written as `<div />` or `<div>something inside</div>`. The difference is that in the first syntax version there is no way to include anything inside it.

### Components

Components are the core of React. They are reusable pieces of code intended for one specific job, usually to render some HTML. There are some aspects you should take into account:

* A React component **must start with a Capital letter**.

```jsx
const Example = () => <div><h1>Website title</h1></div>;
```

* **There must be a parent element** wrapping the rest of the nested elements. If no parent is needed, you can use `<>` and `</>` .

```jsx
const Example = () => (
  <>
    <h1>Website title</h1>
    <h2>Website description</h2>
  </>
);
```

* You can use **components inside components**.

```jsx
const Title = () => <h1>Website title</h1>;
const Description = () => <h2>Website description</h2>;

const Example = () => (
  <>
    <Title />
    <Description />
  </>
);
```

* You can differentiate React components from common HTML because they start with Capital letters.

```jsx
import { Div } from "./components";

const Example = () => (
  <>
    <div>This is inside a normal div tag</div>
    <Div>This is inside a React component called Div</Div>
  </>
);
```

There are two ways to create React components, although we recommend sticking only to function components.

_**Function components:**_ Components built using a function. They can be created with regular functions or arrow functions, although the second way is more common.

These two are equivalent:

```jsx
function Example() {
    return <div><h1>Website title</h1></div>;
}

const Example = () => <div><h1>Website title</h1></div>;
```

_**Class components:**_ They are created using JavaScript classes. All the things that required classes in the past can now easily be done with [React hooks](react-basic.md#hooks) \(explained later\) so we won't explain classes in detail. 

{% hint style="info" %}
If you want, you can take a look at [React docs](https://reactjs.org/docs/components-and-props.html), since some other tutorials or external npm packages may still use them.
{% endhint %}

```jsx
class Example extends React.Component {
    render() {
        return <div><h1>Website title</h1></div>;
    }
}
```

### Props

If we think about React components as functions, props would be the parameters. Depending on the props you pass to the component, the result will be different. This lets you reuse your components depending on the input. Here you have an example of how to define a component with props and how to use it with specific values:

_**Create the component with props**_

```jsx
const Example = (props) => <h1>Hi {props.name}, nice to meet you!</h1>;
```

You can also use [ES6 destructuring](javascript-basics.md#destructuring-assignment) to extract the props directly in the function definition:

```jsx
const Example = ({ name }) => <h1>Hi {name}, nice to meet you!</h1>;
```

_**Render the component with specific props**_

```jsx
<Example name='Jon' /> // Outputs: <h1>Hi Jon, nice to meet you!</h1>

<Example name='Sansa' /> // Outputs: <h1>Hi Sansa, nice to meet you!</h1>
```

There are some things you have to know about props:

* You can use variables, objects, arrays or **anything you want as props**.
* You can **create a default value for the prop** in case it is not passed when the component is used, so it renders something instead of leaving it blank.

```jsx
const Example = ({ name = "Aria" }) => <h1>Hi {name}, nice to meet you!</h1>;
```

In this case, if we use the component without the name prop \(`<Example />`\), the value will be `Hi Aria, nice to meet you!`.

* You can use the **prop children** to pass down the content included inside the component tags:

```jsx
const Example = ({ children }) => (
  <div className='mainContainer'>
    {children}
  </div>
);
```

This let you include any content inside the `<div>`, just by nesting elements inside the Component:

```jsx
<Example>
    <h1>Hi there!</h1>
</Example>
```

This will place the `<h1>` where we defined the `children`, so the final HTML would be:

```jsx
<div class='mainContainer'>
    <h1>Hi there!</h1>
</div>
```

### Hooks

Hooks are a new concept introduced by React that lets you reuse logic between components in an easy way. There are lots of hooks created already, and you can also create your own hooks. For now, we will focus on understanding two basic ones:

#### useState

React components can have their own internal state.

This hook lets you create local state variables for components without using classes and with a really simple method:

```jsx
const state = useState(initialValue);

// "state" is an array. The first item is the value of the state:
const value = state[0];
// and the second is a function to change it:
const setValue = state[1];
```

You can also use [ES6 destructuring](javascript-basics.md#destructuring-assignment) to get the first and second value of the array directly in the assignment.

```jsx
const [value, setValue] = useState(initialValue);
```

We are using

* **`value`**: the name of the state variable you want to be changed after any events you define.
* **`setValue`**:  the name of the function we will use to update the value of `value`.
* **`initialValue`**: the value of `value` at the first render.

Let's see another example. We will create a count with initial value `0` and two buttons to update it: one to update the value directly to `5` when clicking it, and the other one to add `1` to the actual count:

```jsx
const Example = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Value: {count}</h1>
            <button onClick={() => setCount(5)}>Set value to 5</button>
            <button onClick={() => setCount(count + 1)}>Sum 1</button>
        </div>    
    );
}
```

This is the basic functionality of this hook, and it is enough to understand how we use it in Frontity. It has more features which you can check out at [React docs](https://reactjs.org/docs/hooks-state.html).

#### useEffect

This hook lets you run code after the component has been mounted to the DOM and each time it is rendered again. A good example of where to use this hook could be subscriptions or data fetch.

To use it we must define a function inside it. The code inside this `useEffect` will run each time the component re-renders.

```jsx
useEffect(() => {
    // Whatever you want to perform after each render.
});
```

If you want the code to run just once on the first render, you can specify it by adding an empty array `[]` as a second argument.

```jsx
useEffect(() => {
    // Whatever you want to perform only on the first render.
}, []);
```

For example, Frontity uses this to fetch the next post once the initial one has been rendered. This won't affect the initial load and will make the load of the next post instant.

Finally, if you want to run code each time a prop changes, you can include that prop in the array of the second argument, like this:

```jsx
const Example = ({ name }) => {
    useEffect(() => {
        // Whatever you want to perform on the first render and
        // each time `name` changes.
    }, [name]);
    
    return <h1>Hi {name}, nice to meet you!</h1>;
}
```

This is the basic functionality of this hook, and it is enough to understand how we use it in Frontity. It has more features which you can check out at [React docs](https://reactjs.org/docs/hooks-effect.html).

### Special cases

#### If-else statements don't work

In JSX, we can't use if-else statements, but don't worry, we can use operators and ternary expressions:

* We can use **the operator &&** \(`condition && resultIfTrue`\) when we want to return something if the condition is true, and nothing if not. In the example below, it will return the `<p>It is right</p>` element if value is &gt; 20 and nothing if it isn't.

```jsx
const Example = ({ value }) => (
    <div>
        <h1>Hi there!</h1>
        {value > 20 && <p>It is right!</p>}
    </div>
);
```

* We can use a **ternary expression** \(`condition ? resultIfTrue : resultIfFalse`\) if we want to return something if the statement is false. In the example below, it will return the `<p>It is right</p>` element if value is &gt; 20 and will render `<p>It is NOT right</p>` if that statement is not true.

```jsx
const Example = ({ value }) => (
    <div>
        <h1>Hi there!</h1>
        {value > 20 ? <p>It is right!</p> : <p>It is NOT right!</p>}
    </div>
);
```

If you don't want to return anything in a ternary expression, you can return `null`:

```jsx
const Example = ({ value }) => (
    <div>
        <h1>Hi there!</h1>
        {value > 20 ? <p>It is right!</p> : null}
    </div>
);

<Example value={3} />
```

_This is actually the same behaviour as the first example._

#### **Arrays must have keys**

One of the benefits of React is that it only updates DOM elements that have changed which improves the performance of the web. This is important in order to understand why **while iterating through an array, its elements must have a key**. If you don't define a key, it may cause some trouble. 

Keys help React identify which items have changed, are added, or are removed. We can see keys as unique identifiers for each element.

Let's look at an example where we are using the `map()` method:

```javascript
const items = [
    { title: "title 1", id: 23 },
    { title: "my other title", id: 45 },
    { title: "another one", id: 72 },
];

{items.map(item => <Item key={item.id} item={item} />)}
```

Imagine that we reorder the titles and the third object, with id 72, moves to the second place. If we don't define a key, React would interpret that both objects \(ids 45 and 72\) have changed, when they have just reordered, and React would re-render them.

By defining a key with an unique id, React would be able to understand that the title of id 45 is still the same, as well as id 72, and they have just reordered. This may not seem useful, but if you are working with big objects, it can save a lot of resources.

This is just an example of why it is important to assign keys properly to arrays. To learn more you can visit [React docs](https://reactjs.org/docs/lists-and-keys.html).

{% hint style="info" %}
These are the main React concepts used in Frontity. If you understand them, you will be able to understand Frontity code. If you want to delve deeper into learning React, we recommend you refer to [their docs](https://reactjs.org/docs/hello-world.html), and if you have questions don't hesitate to ask them of [our community](https://community.frontity.org/c/dev-talk-questions) ☺️. 
{% endhint %}

### State Manager - Frontity Connect

Usually React is used with a State Manager that exposes a global `state` tree which can be accessed from any component of the app. This helps you keep different components in sync, and it is also a medium to communicate between them.

There are many state managers, like Redux or Mobx, but in **Frontity** we have created our own state manager named **Frontity Connect.** To learn more see [Learning Frontity - State](../learning-frontity/state.md).

Here is an example of how `state` is used and how easy it is to manage it with **Frontity Connect**. As said before, you should imagine the state as an object with info about the app:

```javascript
{
 state: {
    frontity: {
        title: "My awesome blog",
        description: "The best place to read about awesome things",
        ...
    },
    theme: {
        menu: ["Home", "Nature", "Travel"],
        ...
    },
    ...
}
```

With this in mind, you can use all this info in your components and change it depending on different events. In order to use the global state properly inside a component, you have to:

* Import `connect` from the `"frontity"` package.
* Pass `state` as a prop in the component.
* Connect the component after defining it with `connect(Component)` .

```jsx
import { connect } from "frontity";

const Component = ({ state }) => (
    <h1>{state.frontity.title}</h1>
);

const ConnectedComponent = connect(Component);
```

It's common to use `connect` only on the default export of the file:

```jsx
import { connect } from "frontity";

const Component = ({ state }) => (
    <h1>{state.frontity.title}</h1>
);

export default connect(Component);
```

Now, if you create an action that changes the title after a user interaction, this component will be updated with the new title.

**Frontity Connect** can also be used to pass `actions` and `libraries` to the components, like this:

```jsx
import { connect } from "frontity";

const Component = ({ actions, libraries, content }) => {
    const HTML2React = libraries.html2react.Component;
    const changeTitle = () => actions.theme.changeTitle("Other Title");
    
    return (
        <>
            <button onClick={changeTitle}>
                Change title
            </button>
            <HTML2React html={content} />
        </>
    );
};

export default connect(Component);
```

