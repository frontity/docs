# Environment variables

The Frontity CLI allows to define some options/flags for some of the Frontity commands via environment variables.

If some of these environment variables are detected the proper values will be set for the proper commands:

## [`create`](./create) & [`create-package`](./create-package)

### `FRONTITY_NAME`

If you pass the [`--no-prompt`](#) flag to the [`create`](./create) and [`create-package`](./create-package), the CLI will use the name from this `FRONTITY_NAME` environment variable.

Read more about the [`--no-prompt`](#) option [here](./create-commands)

## [`dev`](./dev)

### `FRONTITY_DEV_TARGET`

Create bundles with `es5`, `module` or `both`.
Default target is `both`.

If detected, and no `--target <target>` option is defined for [`dev`](./dev) Frontity command, this environment variable value will be applied.

_Example:_

```
FRONTITY_DEV_TARGET=module
FRONTITY_DEV_TARGET=es
```

### `FRONTITY_DEV_PORT`

Runs the server on a custom port.
Default is `3000`.

If detected, and no `--port <port>` option is defined for [`dev`](./dev) Frontity command, this environment variable value will be applied.

_Example:_

```
FRONTITY_DEV_PORT=3002
```

### `FRONTITY_DEV_HTTPS`

Runs the server using https.

_Example:_

```
FRONTITY_DEV_HTTPS=true
```

### `FRONTITY_DEV_PRODUCTION`

Builds the project for production.

_Example:_

```
FRONTITY_DEV_PRODUCTION=true
```

### `FRONTITY_DEV_PUBLIC_PATH`

Set the public path for static assets.
Default path is `/static/`.

If detected, and no `--publicPath` flag is defined for [`dev`](./dev) Frontity command, this environment variable value will be applied.

_Example:_

```
FRONTITY_DEV_PUBLIC_PATH=/assets/
```

### `FRONTITY_DEV_DONT_OPEN_BROWSER`

Don't open a browser window after the Frontity server has been started.

_Example:_

```
FRONTITY_DEV_DONT_OPEN_BROWSER=true
```

## [`build`](./build)

### `FRONTITY_BUILD_TARGET`

Create bundles with `es5`, `module` or `both`.
Default target is `both`.

If detected, and no `--target <target>` option is defined for [`build`](./build) Frontity command, this environment variable will be applied.

_Example:_

```
FRONTITY_BUILD_TARGET=module
FRONTITY_BUILD_TARGET=es
```

#### `FRONTITY_BUILD_DEVELOPMENT`

Builds the project for development.

_Example:_

```
FRONTITY_BUILD_DEVELOPMENT=true
```

#### `FRONTITY_BUILD_PUBLIC_PATH`

Set the public path for static assets.
Default path is `/static/`.

If detected, and no `--publicPath` flag is defined for [`build`](./build) Frontity command, this environment variable value will be applied.

_Example:_

```
FRONTITY_BUILD_PUBLIC_PATH=/assets/
```

## [`serve`](./serve)

### `FRONTITY_SERVE_PORT`

Runs the server on a custom port.
Default is `3000`.

If detected, and no `--port <port>` option is defined for [`serve`](./serve) Frontity command, this environment variable value will be applied.

_Example:_

```
FRONTITY_SERVE_PORT=3002
```

### `FRONTITY_SERVE_HTTPS`

Runs the server using https.

_Example:_

```
FRONTITY_SERVE_HTTPS=true
```
