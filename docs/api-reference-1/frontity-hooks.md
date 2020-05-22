# @frontity/hooks

This package provides the common hooks that can be used in a frontity app.

## Installation

Add the `@frontity/hooks` package to your project:

```text
npm i @frontity/hooks
```

## `useFills`

```javascript
const fills = useFills("someNamedSlot");
```

**Arguments**

- `string` A string that refers to the name of the Slot.

**Return value**

- `Object[]` A list of objects that you can use to create the fills. Those values will come from the fills defined by the user of the slot in `state.fills`. Mind that a user might define more than one fill for a particular slot. Because of this, we always return a list of slots sorted in ascending order by their `priority`. Each object is of structure:
  - **Fill** `ReactComponent`: The component that you can render
  - **slot** `string`: The name of the slot. Mind that a user can define multiple fills that fill the same slot, so there might exist more than one object with the same `slot` property. Defined in `state.fills[fillName].slot`.
  - **props** `object`: The props passed to the component. Defined in `state.fills[fillName].props`.
  - **library** `string` : The name of the library that is using the fill. defined in `state.fills[fillName].library`.
  - **priority** `number`: The priority of the fill. By default, the fills are sorted in ascending order according to this value. Defined in `state.fills[fillName].priority`.
  - **key** `string`: This is a unique value that identifes the particular fill. It is the `fillName` in `state.fills[fillName]`.

**Example**

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
