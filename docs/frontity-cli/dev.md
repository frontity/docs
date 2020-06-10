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
| `--target <target>` | Create bundles with "es5", "module" or "both". Default target is "both". |
| `--publicPath <path>` | Set the [public path](https://webpack.js.org/guides/public-path/) for static assets. Default path is "/static/".|
| `-h`, `--help` | Output usage information |

> More info about the `--publicPath` option can be found in the [`frontity build` page](build.md)

**Examples**

* Starts a server in development mode using https and port 3002

```text
npx frontity dev --https --port 3002
```

* Starts a server in development mode using the folder `assets` as the path for statics

```text
npx frontity dev --publicPath="/assets"
```

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

### Environments variables

The options can also be set via environment variables. If some of these environments variables are detected the proper values will be set for the `dev` command

#### `FRONTITY_DEV_TARGET` 

Create bundles with "es5", "module" or "both". Default target is "both".

_Example:_

```
FRONTITY_DEV_TARGET=module
FRONTITY_DEV_TARGET=es
```

#### `FRONTITY_DEV_PORT` 

Runs the server on a custom port. Default is 3000.

_Example:_

```
FRONTITY_DEV_PORT=3002
```

#### `FRONTITY_DEV_HTTPS` 

Runs the server using https.

_Example:_

```
FRONTITY_DEV_HTTPS=true
```

#### `FRONTITY_DEV_PRODUCTION`

Builds the project for production. 

_Example:_

```
FRONTITY_DEV_PRODUCTION=true
```

#### `FRONTITY_DEV_PUBLIC_PATH`
Set the [public path](https://webpack.js.org/guides/public-path/) for static assets. Default path is "/static/".

_Example:_

```
FRONTITY_DEV_PUBLIC_PATH=/assets/
```

#### `FRONTITY_DEV_DONT_OPEN_BROWSER` 

Don't open a browser window with the localhost.

_Example:_

```
FRONTITY_DEV_DONT_OPEN_BROWSER=true
```
