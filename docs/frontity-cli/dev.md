# `dev`

Starts a server in development mode.

```shell
npx frontity dev [options]
```

## Arguments

### **`[options]`**

|            Option            | Description                                                                                                                                  |
| :--------------------------: | -------------------------------------------------------------------------------------------------------------------------------------------- |
|       `-p`, `--production`       | Builds the project for production.                                                                          |
|        `--port <port>`         | Runs the server on a custom port. Default is 3000.                                                                                      |
|         `-s`, `--https`          | Runs the server using https. |
| `--dont-open-browser` | Don't open a browser window with the localhost.                                    |
|     `--target <target>`      | create bundles with "es5" or "module". Default target is "module".                                                                 |
| `-h`, `--help`  | output usage information                                                                                                             |

## Examples

- Starts a server in development mode using https and port 3002

```shell
npx frontity dev --https --port 3002
```

