![npm version](https://img.shields.io/npm/v/create-repro-ts-node-issue.svg?style=flat-square)

# create-repro-ts-node-issue

The entry point of this repository is at `./index.js`. It then load a `.ts` file
in `./src` to illustrate what happens when registering TS files that import
other modules.

## Running directly: 🌸

It runs fine when called directly with `./index` from the command line:

```sh
$ ./index
? Who is your favorite Teletubby? (Use arrow keys)
...
```

## Using `yarn link`: 🌼

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

## Using `yarn create`: 🥀

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
# Coming soon...
```
