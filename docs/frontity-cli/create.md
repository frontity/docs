# `create`

Creates a new Frontity project.

```shell
npx frontity create [options] [project-name]
```

## Arguments

### **`[options]`**

|     Option      | Description                                     |
| :-------------: | ----------------------------------------------- |
| `-h <theme>`, `--theme <theme>`  | The theme to use                 |
| `-t`, `--typescript`  | Adds support for TypeScript          |
| `-c`, `--use-cwd`  | Generates the project in the current directory |
| `-n`, `--no-prompt` | Skips prompting the user for options                                       |
| `-h`, `--help` | Output usage information                                       |

### **`[project-name]`**

The _name_ of your Frontity project.
It will also be the name of the folder that this command will create for you with the files of your Frontity project inside

## Examples

- Create a Frontity project named `my-awesome-project`

```shell
npx frontity create my-awesome-project
```

- Create a Frontity project named `my-awesome-project` using [Frontity Chakra theme](https://www.npmjs.com/package/frontity-chakra-theme)

```shell
npx frontity create -h frontity-chakra-theme cool-project
```

- If you leave out both of the arguments, the CLI will run an interactive shell asking for these inputs:

```shell
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
You can subscribe at any poin with npx frontity subscribe <email>.

Run cd awesome project && npx frontity dev and have fun! 🎉

You can find docs at https://docs.frontity.org/.
For technical support and assistance please join our community at https://community.frontity.org/.
```
