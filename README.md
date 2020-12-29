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
@whyking/viking-tool/1.0.0-milestone.2-snapshot linux-x64 node-v14.15.2
$ viking-tool --help [COMMAND]
USAGE
  $ viking-tool COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`viking-tool cleanup-projects`](#viking-tool-cleanup-projects)
* [`viking-tool help [COMMAND]`](#viking-tool-help-command)
* [`viking-tool quote`](#viking-tool-quote)

## `viking-tool cleanup-projects`

clean up build files of projects

```
USAGE
  $ viking-tool cleanup-projects

DESCRIPTION
  Cleans up the build files of the projects on your machine:
  This command:
    * deletes build files of Maven projects,
    * deletes build files of npm projects,
    * prunes docker containers/images

EXAMPLE
  $ viking-tool cleanup-projects
      ,       ,  /\_[]_/\
      |\ ___ /| |] _||_ [|
       -/___\-   \/ || \/
       (|o o|)      ||
     __/{\U/}\_ ___/vvv
    / \  {~}   / _|_ |
    | /\  ~   /_/   []
    |_| (____)     ╭─────────────────────────────────────╮
    \_]/______\    │         Viking's CLI Tools.         │
       _\_||_/_    │ Version: 1.0.0-milestone.2-snapshot │
      (_,_||_,_)   ╰─────────────────────────────────────╯
  [Viking's CLI Tools] Clean up finished.
```

_See code: [src/commands/cleanup-projects.ts](https://github.com/whyking/viking-tool/blob/v1.0.0-milestone.2-snapshot/src/commands/cleanup-projects.ts)_

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

## `viking-tool quote`

print a random quote

```
USAGE
  $ viking-tool quote
```

_See code: [src/commands/quote.ts](https://github.com/whyking/viking-tool/blob/v1.0.0-milestone.2-snapshot/src/commands/quote.ts)_
<!-- commandsstop -->
