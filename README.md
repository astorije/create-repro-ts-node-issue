![npm version](https://img.shields.io/npm/v/create-repro-ts-node-issue.svg?style=flat-square)

# create-repro-ts-node-issue

The entry point of this repository is at `./index.js`. It then load a `.ts` file
in `./src` to illustrate what happens when registering TS files that import
other modules.

## Problem description

### Running directly: 🌸

It runs fine when called directly with `./index` from the command line:

```
$ ./index
? Who is your favorite Teletubby? (Use arrow keys)
...
```

### Using `yarn link`: 🌼

It also runs fine when globally linked and run using the `bin` entry point:

```
$ yarn link
yarn link v1.7.0
success Registered "create-repro-ts-node-issue".
info You can now run `yarn link "create-repro-ts-node-issue"` in the projects where you want to use this package and it will be used instead.
✨  Done in 0.10s.
```

Then run from any directory on the file system:

```
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

```
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

```
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

## Attempts

- **v0.1.0**: contains a [`tsconfig.json`](https://github.com/astorije/create-repro-ts-node-issue/blob/v0.1.0/tsconfig.json) similar to the case we are encountering in our private repo. Same context, exact same issue.
- **v0.2.0**: [Tried with `"target": "es5"` in `tsconfig.json`](https://github.com/astorije/create-repro-ts-node-issue/commit/5ae9bd9541b0de7ce027f2cd3a6af9d461f9e814)
- **v0.3.0**: [Tried with `"module": "commonjs"` in `tsconfig.json`](https://github.com/astorije/create-repro-ts-node-issue/commit/43546c1defa5cecf85012129801bd891e984bca1)
- **v0.4.0**: [Tried with both `"target": "es5"` and `"module": "commonjs"` in `tsconfig.json`](https://github.com/astorije/create-repro-ts-node-issue/commit/ec5d9be15514e9fdd4251a65d7592fd2fb32b027)

It looks as though [`require('src')` in `index.js`](https://github.com/astorije/create-repro-ts-node-issue/blob/3d3f9db59a2a9721177df627b0f230c2577f7b9a/index.js#L7) correctly loads `src/index.ts` but does not transpile in a Node module resolution context **when installed globally only**.

The `tsconfig.json` file passed in the `project` option is correctly found, because pointing to a fake location does indeed produce an error:

```
TSError: ⨯ Unable to compile TypeScript:
error TS5058: The specified path does not exist: '/Users/astorije/.config/yarn/global/node_modules/create-repro-ts-node-issue/foobar-tsconfig.json'.
```

`ts-node` is correctly registered for future `.ts` file, because not specifying the `project` option altogether does indeed produce an error since there is no `./src/index.js` file:

```
Error: Cannot find module './src'
```

## Versions

```
$ node --version
v8.11.3

$ yarn --version
1.7.0

$ uname -v
Darwin Kernel Version 17.6.0: Tue May  8 15:22:16 PDT 2018; root:xnu-4570.61.1~1/RELEASE_X86_64
```
