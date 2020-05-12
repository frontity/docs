# `create-package`

Creates a new Frontity package in a project. Should be executed from the root of your Frontity project (the folder you created w/ `npx frontity create ...`)

```shell
npx frontity create-package [package-name] [options]
```

## Arguments

### **`[package-name]`**

The _name_ of your Frontity package. This command will create a `[package-name]` folder under `packages` and will add the proper dependency in the `package.json` of your Frontity project

### **`[options]`**

|     Option      | Description                                     |
| :-------------: | ----------------------------------------------- |
| `-n <value>`, `--namespace <value>`  | Sets the [namespace](https://docs.frontity.org/learning-frontity/namespaces) for this package                 |
| `--no-prompt`  | Skips prompting the user for options          |
| `-h`, `--open`  | output usage information |


## Examples

- Create a custom theme package named `my-custom-project`

```shell
>  npx frontity create-package my-custom-theme
? Enter the namespace of the package: theme
✔ Adding package.json.
✔ Adding src/index.js.
✔ Installing package my-custom-theme.

New package "my-custom-theme" created.
```
