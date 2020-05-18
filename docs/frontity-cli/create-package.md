# `create-package`

Creates a new Frontity package in a project.
Should be executed from the root of your Frontity project (the folder you created w/ `npx frontity create ...`)

```shell
npx frontity create-package [package-name] [options]
```

## Arguments

### **`[package-name]`**

The _name_ of your Frontity package.
This command will create a `[package-name]` folder under `packages` and will add the proper dependency in the `package.json` of your Frontity project

### **`[options]`**

|     Option      | Description                                     |
| :-------------: | ----------------------------------------------- |
| `-n <value>`, `--namespace <value>`  | Sets the [namespace](https://docs.frontity.org/learning-frontity/namespaces) for this package                 |
| `--no-prompt`  | Skips prompting the user for options          |
| `-h`, `--open`  | Output usage information |

##### `--no-prompt`

This flag is intended for programmatic use of the CLI.

The name of the package [can also be set as an environmental variable called `FRONTITY_NAME`](https://github.com/frontity/frontity/blob/107d3543ce5463186809b7e6f50ca31ffbdc107d/packages/frontity/src/cli/create-package.ts#L32). In this case, if you pass the `--no-prompt` flag, the CLI will use the name from that variable.

If no `FRONTITY_NAME` is set, the CLI will prompt you for the name of the package

This is the scheme followed by the CLI to get the name of the package 

![](../.gitbook/assets/cli-arguments.png)


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
