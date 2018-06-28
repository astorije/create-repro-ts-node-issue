![npm version](https://img.shields.io/npm/v/create-repro-ts-node-issue.svg?style=flat-square)

# create-repro-ts-node-issue

The entry point of this repository is at `./index.js`. It then load a `.ts` file
in `./src` to illustrate what happens when registering TS files that import
other modules.

## Problem description

### Running directly: 🌸

It runs fine when called directly with `./index` from the command line:

```sh
$ ./index
? Who is your favorite Teletubby? (Use arrow keys)
...
```

### Using `yarn link`: 🌼

It also runs fine when globally linked and run using the `bin` entry point:

```sh
$ yarn link
yarn link v1.7.0
success Registered "create-repro-ts-node-issue".
info You can now run `yarn link "create-repro-ts-node-issue"` in the projects where you want to use this package and it will be used instead.
✨  Done in 0.10s.
```

Then run from any directory on the file system:

```sh
$ create-repo-ts-node-issue
? Who is your favorite Teletubby? (Use arrow keys)
...
```

So far, so good.

### Using `yarn create`: 🥀

[`yarn create`](https://yarnpkg.com/lang/en/docs/cli/create/) is a very handy
shortcut to bootstrap projects.
When running `yarn create thingy`, yarn will globally install a package called
`create-thingy` then run its executable located in `bin`, so _in theory_, it
_should_ be very similar to run the `yarn link`ed version.

To achieve this, I had to publish this repo into the
[`create-repro-ts-node-issue` npm package](https://www.npmjs.com/package/create-repro-ts-node-issue).

Then when running the `yarn create` command, we get:

```sh
$ yarn create repro-ts-node-issue
yarn create v1.7.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Installed "create-repro-ts-node-issue@0.1.0" with binaries:
      - create-repro-ts-node-issue
/Users/astorije/.config/yarn/global/node_modules/create-repro-ts-node-issue/src/index.ts:1
(function (exports, require, module, __filename, __dirname) { import inquirer from "inquirer";
                                                              ^^^^^^

SyntaxError: Unexpected token import
    at createScript (vm.js:80:10)
    at Object.runInThisContext (vm.js:139:10)
    at Module._compile (module.js:616:28)
    at Module._extensions..js (module.js:663:10)
    at Object.require.extensions.(anonymous function) [as .ts] (/Users/astorije/.config/yarn/global/node_modules/create-repro-ts-node-issue/node_modules/ts-node/src/index.ts:431:14)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Module.require (module.js:596:17)
    at require (internal/module.js:11:18)
error Command failed.
Exit code: 1
Command: /usr/local/bin/create-repro-ts-node-issue
Arguments:
Directory: /private/tmp/cht-foo
Output:
```

### Installing globally: 🥀

To reproduce this, we went on using a globally installed version, and got the
same result:

```sh
$ yarn global add create-repro-ts-node-issue
yarn global v1.7.0
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Installed "create-repro-ts-node-issue@0.1.0" with binaries:
      - create-repro-ts-node-issue
✨  Done in 6.50s.

$ create-repro-ts-node-issue
/Users/astorije/.config/yarn/global/node_modules/create-repro-ts-node-issue/src/index.ts:1
(function (exports, require, module, __filename, __dirname) { import inquirer from "inquirer";
                                                              ^^^^^^

SyntaxError: Unexpected token import
    at createScript (vm.js:80:10)
    at Object.runInThisContext (vm.js:139:10)
    at Module._compile (module.js:616:28)
    at Module._extensions..js (module.js:663:10)
    at Object.require.extensions.(anonymous function) [as .ts] (/Users/astorije/.config/yarn/global/node_modules/create-repro-ts-node-issue/node_modules/ts-node/src/index.ts:431:14)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Module.require (module.js:596:17)
    at require (internal/module.js:11:18)
```

## Versions

```sh
$ node --version
v8.11.3

$ yarn --version
1.7.0

$ uname -v
Darwin Kernel Version 17.6.0: Tue May  8 15:22:16 PDT 2018; root:xnu-4570.61.1~1/RELEASE_X86_64
```
