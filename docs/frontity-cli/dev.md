# dev

Starts a server in development mode.

```text
npx frontity dev [options]
```

## Arguments

### **`[options]`**

| Option | Description |
| :---: | :--- |
| `-p`, `--production` | Builds the project for production. |
| `--port <port>` | Runs the server on a custom port. Default is 3000. |
| `-s`, `--https` | Runs the server using https. |
| `--dont-open-browser` | Don't open a browser window with the localhost. |
| `--target <target>` | create bundles with "es5" or "module". Default target is "module". |
| `--publicPath <path>` | Set the [public path](https://webpack.js.org/guides/public-path/) for static assets. Default path is "/static/". |
| `-h`, `--help` | Output usage information |

> More info about the `--publicPath` option can be found in the [`frontity build` page]()

## Examples

* Starts a server in development mode using https and port 3002

```text
npx frontity dev --https --port 3002
```

* Starts a server in development mode using the folder `assets` as the path for statics

```text
npx frontity dev --publicPath="/assets"
```

