# `build`

Builds the project for production.

```shell
npx frontity build [options]
```

## Arguments

### **`[options]`**

|            Option            | Description                                                                                                                                  |
| :--------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------- |
|       `-d`, `--development`       | Builds the project for development.                                                                          |
|        `--target <target>`         | create bundles with "es5" or "module". Default target is "module".                                                                                      |
| `-h`, `--help`  | output usage information                                                                                                             |

## Examples

- Starts a server in development mode using https and port 3002

```shell
npx frontity dev --https --port 3002
```