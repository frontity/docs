# Create commands

These commands will allow you to either create a Frontity project or a Frontity package

* [`create`](create.md)
* [`create-package`](create-package.md)

{% hint style="info" %}
Have a look at the [environment variables](./environment-variables) page to check which ones can be used with these commands
{% endhint %}


## `create`

Creates a new Frontity project.

```text
npx frontity create [project-name] [options]
```

### Arguments

#### **`[project-name]`**

The _name_ of your Frontity project.
It will also be the name of the folder that this command will create for you with the files of your Frontity project inside

#### **`[options]`**

| Option | Description |
| :---: | :--- |
| `-h <theme>`, `--theme <theme>` | The theme to use |
| `-t`, `--typescript` | Adds support for TypeScript |
| `-c`, `--use-cwd` | Generates the project in the current directory |
| [`-n`, `--no-prompt`](#) | Skips prompting the user for options.  </br> Related environment variable: [`FRONTITY_NAME`](./environment-variables#FRONTITY_NAME)  </br> Read more about this option [here](#)|
| `-h`, `--help` | Output usage information |

##### The `--theme` option

You can pick one of Frontity's "official" two themes ([`--theme mars-theme`](https://github.com/frontity/frontity/tree/dev/packages/mars-theme) or [`--theme twentytwenty-theme`](https://github.com/frontity/frontity/tree/dev/packages/twentytwenty-theme)).
But you can also use any custom theme as long as it's published on npm.
Just pass the theme name on the command-line like `--theme ThemesPackageNameInNPM`

##### The `--no-prompt` option

If you pass the `--no-prompt` flag to the [`create`](./create) or [`create-package`](./create-package) , the CLI will use the name from this `FRONTITY_NAME` environment variable.

If the CLI cannot find a `FRONTITY_NAME` environmental variable, it will prompt for the name of the package

This is the scheme followed by the CLI to get the name of the package

![](../.gitbook/assets/cli-arguments.png)



### Examples

* Create a Frontity project named `my-awesome-project`

```text
npx frontity create my-awesome-project
```

* Create a Frontity project named `my-awesome-project` using [Frontity Chakra theme](https://www.npmjs.com/package/frontity-chakra-theme)

```text
npx frontity create --theme frontity-chakra-theme cool-project
```

* If you leave out both of the arguments, the CLI will run an interactive shell asking for these inputs:

```text
> npx frontity create
...
? Enter a name for the project: awesome project
? Pick a starter theme to clone: @frontity/mars-theme (recommended)
✔ Creating README.md.
✔ Creating package.json.
✔ Creating frontity.settings.js.
✔ Cloning @frontity/mars-theme.
✔ Installing dependencies.
✔ Downloading favicon.ico.

Frontity project created.

? Do you want to receive framework updates by email? No

Ok, that's fine! 😉
You can subscribe at any point with npx frontity subscribe <email>.

Run cd awesome project && npx frontity dev and have fun! 🎉

You can find docs at https://docs.frontity.org/.
For technical support and assistance please join our community at https://community.frontity.org/.
```

## `create-package`

The `create-package` command creates a new Frontity package in a project.
Launch this command from the root of the Frontity project

```text
npx frontity create-package [package-name] [options]
```

### Arguments

#### **`[package-name]`**

This argument sets the _name_ of your Frontity package.
The `create-package` command will create a folder named `[package-name]` under `packages`.
It will also add the proper dependency in the `package.json` of your Frontity project

#### **`[options]`**

| Option | Description |
| :---: | :--- |
| `-n <value>`, `--namespace <value>` | Sets the [namespace](https://docs.frontity.org/learning-frontity/namespaces) for this package |
| [`-n`, `--no-prompt`](#) | Skips prompting the user for options.  </br> Related environment variable: [`FRONTITY_NAME`](./environment-variables#FRONTITY_NAME)|
| `-h`, `--open` | Output usage information |

### Examples

* Create a custom theme package named `my-custom-project`

```text
>  npx frontity create-package my-custom-theme
? Enter the namespace of the package: theme
✔ Adding package.json.
✔ Adding src/index.js.
✔ Installing package my-custom-theme.

New package "my-custom-theme" created.
```