# dev

Starts a development server.

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
| `--publicPath <path>` | Set the [public path](https://webpack.js.org/guides/public-path/) for static assets. Default path is "/static/". [Same behaviour as in `build`](build#the-publicpath-option)|
| `-h`, `--help` | Output usage information |

> More info about the `--publicPath` option can be found in the [`frontity build` page](/frontity-cli/build#the-publicpath-option)

##### The `--production` option

This flag correspond to [webpack’s mode parameter](https://webpack.js.org/configuration/mode/) so it will run webpack in the production mode as described [there](https://webpack.js.org/configuration/mode/) before launching the development server.

So, if you do:

```
npx frontity dev --production
```

The webpack bundler internally will do things like..

- Enable certain webpack-specific optimizations and minify the code
- Also disable hot-module reloading (HMR)
- Not create source maps
- Append hashes to filenames so for caching purposes

Normally, you would always use the development server in development mode, but sometimes you may want to check that everything works in production mode, or check the bundle analyzer (the files at `/build/analyze`) for the production bundle.

## Examples

* Starts a server in development mode using https and port 3002

```text
npx frontity dev --https --port 3002
```

* Starts a server in development mode using the folder `assets` as the path for statics

```text
npx frontity dev --publicPath="/assets"
```

