# Environment Variables

The Frontity CLI allows to define some options/flags for some of the Frontity commands via environment variables.

If some of these environment variables are detected the proper values will be set for the proper commands:

## [`create`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/create/README.md) & [`create-package`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/create-package/README.md)

### FRONTITY\_NAME

If you pass the [`--no-prompt`](environment-variables.md) flag to the [`create`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/create/README.md) and [`create-package`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/create-package/README.md), the CLI will use the name from this `FRONTITY_NAME` environment variable.

Read more about the [`--no-prompt`](environment-variables.md) option [here](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/create-commands/README.md)

## [`dev`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/dev/README.md)

### `FRONTITY_DEV_TARGET`

Create bundles with `es5`, `module` or `both`. Default target is `both`.

If detected, and no `--target <target>` option is defined for [`dev`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/dev/README.md) Frontity command, this environment variable value will be applied.

_Example:_

```text
FRONTITY_DEV_TARGET=module
FRONTITY_DEV_TARGET=es
```

### `FRONTITY_DEV_PORT`

Runs the server on a custom port. Default is `3000`.

If detected, and no `--port <port>` option is defined for [`dev`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/dev/README.md) Frontity command, this environment variable value will be applied.

_Example:_

```text
FRONTITY_DEV_PORT=3002
```

### `FRONTITY_DEV_HTTPS`

Runs the server using https.

_Example:_

```text
FRONTITY_DEV_HTTPS=true
```

### `FRONTITY_DEV_PRODUCTION`

`frontity dev` by default runs the server in "development mode" \(no optimizations, uses the dev build of react, etc.\). Setting this variable makes it run in "production mode".

_Example:_

```text
FRONTITY_DEV_PRODUCTION=true
```

### `FRONTITY_DEV_PUBLIC_PATH`

Set the public path for static assets. Default path is `/static/`.

If detected, and no `--publicPath` flag is defined for [`dev`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/dev/README.md) Frontity command, this environment variable value will be applied.

_Example:_

```text
FRONTITY_DEV_PUBLIC_PATH=/assets/
```

### `FRONTITY_DEV_DONT_OPEN_BROWSER`

Don't open a browser window after the Frontity server has been started.

_Example:_

```text
FRONTITY_DEV_DONT_OPEN_BROWSER=true
```

## [`build`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/build/README.md)

### `FRONTITY_BUILD_TARGET`

Create bundles with `es5`, `module` or `both`. Default target is `both`.

If detected, and no `--target <target>` option is defined for [`build`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/build/README.md) Frontity command, this environment variable will be applied.

_Example:_

```text
FRONTITY_BUILD_TARGET=module
FRONTITY_BUILD_TARGET=es
```

#### `FRONTITY_BUILD_DEVELOPMENT`

Frontity by default builds the server in "production mode". Setting this variable makes it run in "development mode" \(with disabled optimizations, etc.\)

_Example:_

```text
FRONTITY_BUILD_DEVELOPMENT=true
```

#### `FRONTITY_BUILD_PUBLIC_PATH`

Set the public path for static assets. Default path is `/static/`.

If detected, and no `--publicPath` flag is defined for [`build`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/build/README.md) Frontity command, this environment variable value will be applied.

_Example:_

```text
FRONTITY_BUILD_PUBLIC_PATH=/assets/
```

## [`serve`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/serve/README.md)

### `FRONTITY_SERVE_PORT`

Runs the server on a custom port. Default is `3000`.

If detected, and no `--port <port>` option is defined for [`serve`](https://github.com/frontity/docs/tree/0cac302e50492921e52b6af7888df35f3501f5d2/docs/frontity-cli/serve/README.md) Frontity command, this environment variable value will be applied.

_Example:_

```text
FRONTITY_SERVE_PORT=3002
```

### `FRONTITY_SERVE_HTTPS`

Runs the server using https.

_Example:_

```text
FRONTITY_SERVE_HTTPS=true
```

