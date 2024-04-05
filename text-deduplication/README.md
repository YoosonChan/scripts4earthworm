# Text Deduplication

## The problem of installation at the Windows system

If the current system is a Windows system, We need to add the following configuration in the `package.json` file:

```json
"engines": {
  "node": "^14.21.3"
}
```

### Requirements

|package|version|remarks|
|-|-|-|
|nodejieba|2.5.2||
|node|14.21.3||
|[vite](https://v4.vitejs.dev/)|[<5](https://www.npmjs.com/package/vite?activeTab=versions)|[Vite 5 no longer supports Node.js 14 / 16 / 17 / 19](https://vitejs.dev/guide/migration.html)|
|[vitest](https://github.com/vitest-dev/vitest/releases/tag/v0.34.6)|[<1](https://github.com/vitest-dev/vitest/releases)|[Vitest 1.0 requires Vite >=v5.0.0 and Node >=v18.00](https://vitest.dev/guide/#adding-vitest-to-your-project)|
|@vitejs/plugin-vue|4.6.2|same as vitest|

#### The requirements of `gyp`

We may encounter problems in the system environment that yield installation failure when building the package.

|modules|remarks|
|-|-|
|node-gyp|[node-gyp](https://nodejs.github.io/node-addon-examples/build-tools/node-gyp) requires [Python 2.7](https://www.python.org/downloads/release/python-2715/) or [Python 3.5+](https://www.python.org/downloads/) depending upon the operating system on which the native module is being built. |
|[node-pre-gyp](https://nodejs.github.io/node-addon-examples/build-tools/node-pre-gyp)|This requires each user to have the necessary **[C/C++ build tools](https://visualstudio.microsoft.com/vs/older-downloads/)** [installed](https://stackoverflow.com/questions/57879150/how-can-i-solve-error-gypgyp-errerr-find-vsfind-vs-msvs-version-not-set-from-c)|

### Recommended version

|package|version|
|-|-|
|nodejieba|2.5.2|
|node|14.21.3|
|vite|4.5.2|
|@vitejs/plugin-vue|4.6.2|
|vitest|0.34.6|

### Description

[Nodejieba](https://github.com/luckykaiyi/nodejieba) is a C++ addon of nodejs. The package from the release package will be downloaded, unpacked, and built when installing nodejieba through npm before the project starts. We may encounter a problem: the package is not found from the download address since the "node-pre-gyp" tools generate a wrong file name according to the [nodejs version](https://nodejs.org/en/about/previous-releases). So, we need to ensure that the version matches first.

From the [release page](https://github.com/luckykaiyi/nodejieba/releases/) of nodejieba, the stable and popular download version is [2.5.2](https://github.com/luckykaiyi/nodejieba/releases/tag/v2.5.2). At the same time, nodejieba depends on the specific [Node ABI](https://www.npmjs.com/package/node-abi) (application binary interface) of nodejs, which are 64, 72, 83, and 88 from the [release package](https://github.com/luckykaiyi/nodejieba/releases/) names similar to  "v-88". We can choose 88 because a high version of Node ABIs from the release packages can be better compatible with other new stable [packages]((https://docs.npmjs.com/cli/v10/configuring-npm/package-json#dependencies)) of the project.
