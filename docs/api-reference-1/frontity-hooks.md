# @frontity/hooks

This package is a collection of React hooks that have proven to be pretty useful for a Frontity project.

## Installation

Add the `@frontity/hooks` package to your project:

```text
npm i @frontity/hooks
```

## How to use

In order to use it, you just have to import the hook you want to use in your theme from `@frontity/hooks/` and place it wherever needed.
For example, if we want to use the `useInView` hook:

```javascript
import useInView from "@frontity/hooks/useInView";
```

## Hooks

### `useInView`

It tracks when an element enters or leaves the viewport.

The hook just wraps the [`react-intersection-observer`](https://github.com/thebuilder/react-intersection-observer) library which uses internally the [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) API.
As some old browsers don't support it, `useInView` also returns a `supported` prop indicating if it's supported or not.

#### Parameters

It accepts a single object with the following props:

| Name              | Type               | Default | Required | Description                                                                                                                                                    |
| ----------------- | ------------------ | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`root`**        | Element            | window  | false    | The Element that is used as the viewport for checking visibility of the target. Defaults to the browser viewport (`window`) if not specified or if null.       |
| **`rootMargin`**  | string             | '0px'   | false    | Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).                             |
| **`threshold`**   | number \| number[] | 0       | false    | Number between 0 and 1 indicating the percentage that should be visible before triggering. Can also be an array of numbers, to create multiple trigger points. |
| **`triggerOnce`** | boolean            | false   | false    | Only trigger this method once                                                                                                                                  |

#### Return value

An object with the following properties:

| Name            | Type            | Description                                                                                                                                        |
| :-------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`ref`**       | React.RefObject | React reference object pointing to the DOM element. It must be passed to the element you want to track.                                            |
| **`inView`**    | boolean         | Boolean indicating if the element is visible. The value is always `true` if **`supported`** is `false`.                                            |
| **`supported`** | boolean         | Boolean indicating if [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) is supported by the browser. |

#### Usage

```javascript
import useInView from "@frontity/hooks/useInView";

const MyLazyElement = ({ children }) => {
  // Get the reference and the visibility status.
  const { ref, inView } = useInView({ triggerOnce: true });

  // Pass the reference to the container and render `children` if
  // the container is visible, or a placeholder otherwise.
  return <div ref={ref}>{inView ? children : <MyPlaceholder />}</div>;
};
```

### `useFills`

```javascript
const fills = useFills("someNamedSlot");
```

#### Parameters

| Name                | Type   | Default   | Required | Description                                   |
| ------------------- | ------ | --------- | -------- | --------------------------------------------- |
| **`someNamedSlot`** | string | undefined | true     | A string that refers to the name of the Slot. |

#### Return value

`Object[]`

A list of objects that you can use to create the fills.
The values in those objects will come from the fills defined by the user of the slot in `state.fills`.
Mind that a user might define more than one fill for a particular slot.
Because of this, we always return a list of slots sorted in **ascending order** by their `priority`.
Each object is of structure:

| Name           | Type           | Description                                                                                                                                                                                                 |
| -------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`Fill`**     | ReactComponent | The component that you can render.                                                                                                                                                                          |
| **`slot`**     | string         | The name of the slot. Mind that a user can define multiple fills that fill the same slot, so there might exist more than one object with the same `slot` property. Defined in `state.fills[fillName].slot`. |
| **`props`**    | object         | The props passed to the component. Defined in `state.fills[fillName].props`.                                                                                                                                |
| **`library`**  | string         | The name of the library that is using the fill. defined in `state.fills[fillName].library`.                                                                                                                 |
| **`priority`** | number         | The priority of the fill. By default, the fills are sorted in ascending order according to this value. Defined in `state.fills[fillName].priority`.                                                         |
| **`key`**      | string         | This is a unique value that identifes the particular fill. It is the `fillName` in `state.fills[fillName]`.                                                                                                 |

#### Example

Import the hook in your react component and use it to create a component:

```js
import useFills from "@frontity/hooks/use-fills";

const Component = connect(() => {
  const fills = useFills("slot 1");

  return (
    <>
      {fills.map(({ Fill, props, key }) => (
        <Fill key={key} {...props} />
      ))}
    </>
  );
});
```

{% hint style="info" %}
You need to wrap the component that uses the `useFills` hook with `connect()` in order for that component to work!
{% endhint %}
