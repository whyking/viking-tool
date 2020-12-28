@whyking/viking-tool
====================

These stuff are my personal CLI tools.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@whyking/viking-tool.svg)](https://npmjs.org/package/@whyking/viking-tool)
[![Downloads/week](https://img.shields.io/npm/dw/@whyking/viking-tool.svg)](https://npmjs.org/package/@whyking/viking-tool)
[![License](https://img.shields.io/npm/l/@whyking/viking-tool.svg)](https://github.com/whyking/viking-tool/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @whyking/viking-tool
$ viking-tool COMMAND
running command...
$ viking-tool (-v|--version|version)
@whyking/viking-tool/1.0.0-milestone.1-snapshot linux-x64 node-v14.15.2
$ viking-tool --help [COMMAND]
USAGE
  $ viking-tool COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`viking-tool hello [FILE]`](#viking-tool-hello-file)
* [`viking-tool help [COMMAND]`](#viking-tool-help-command)

## `viking-tool hello [FILE]`

describe the command here

```
USAGE
  $ viking-tool hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ viking-tool hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/whyking/viking-tool/blob/v1.0.0-milestone.1-snapshot/src/commands/hello.ts)_

## `viking-tool help [COMMAND]`

display help for viking-tool

```
USAGE
  $ viking-tool help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_
<!-- commandsstop -->
