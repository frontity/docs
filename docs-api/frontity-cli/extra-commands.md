# Extra commands

* [`info`](extra-commands.md#info)
* [`subscribe`](extra-commands.md#info)

## Info

Get environment information for debugging and issue reporting.

```text
npx frontity info [options]
```

### Arguments

#### **`[options]`**

| Option | Description |
| :---: | :--- |
| `--help` | Output usage information |

### Examples

* Display info about my specific environment

> When we ask in the [community forum](https://community.frontity.org/) about some issue we're having in development mode, it is very helpful to add this info to the post \(so the community can check things like OS, Node version and so on\)

```text
> npx frontity info
...

## System:
 - OS: macOS Mojave 10.14.6
 - CPU: (4) x64 Intel(R) Core(TM) i7-7660U CPU @ 2.50GHz
 - Memory: 879.63 MB / 16.00 GB
 - Shell: 5.3 - /bin/zsh
## Binaries:
 - Node: 10.15.3 - /usr/local/bin/node
 - npm: 6.13.1 - /usr/local/bin/npm
## Browsers:
 - Chrome: 81.0.4044.138
 - Edge: Not Found
 - Firefox: 68.8.0
 - Safari: 13.1
## npmGlobalPackages:
 - frontity: Not Found
 - npx: Not Found


  System info copied in the clipboard!
  You can now paste it in the Frontity Community or GitHub issue.
```

## Subscribe

Suscribe to Frontity newsleter.

```text
npx frontity subscribe [options] [email]
```

### Arguments

#### **`[options]`**

| Option | Description |
| :---: | :--- |
| `--help` | Output usage information |

#### **`[email]`**

The Frontity newsletter will be sent to this _email_

