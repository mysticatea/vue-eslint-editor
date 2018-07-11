# Guide

## 💿 Installation

Use [npm] to install.

```bash
npm install vue-eslint-editor
```

## 📖 Usage

Basically, the `vue-eslint-parser` component requires three attributes; `linter`, `config`, and `code`.

- `linter` is the [Linter] object to does linting and fixing.
- `config` is the configuration object for the [Linter] object.
- `code` is the source code that the editor shows initially.

::: tip
The [eslint4b] package is useful as the [Linter] class which works in browsers.
:::

For example:

```html
<template>
    <eslint-editor
        :linter="linter"
        :config="config"
        :code="code"
    />
</template>

<script>
import EslintEditor from "vue-eslint-editor"

export default {
    components: { EslintEditor },

    /* omitting */

    async mounted() {
        // Load linter asynchronously.
        const { default: Linter } = await import("eslint4b")
        this.linter = new Linter()
    },
}
</script>

<style>
/* omitting */
</style>
```

::: tip
See [playground.vue](https://github.com/mysticatea/vue-eslint-editor/blob/master/docs/.vuepress/components/eslint-playground.vue) for a complete example.
That is the editor which is in <a :href="$withBase('/')">Home</a>.
:::

Then use a bundler which has the code splitting feature, such as [Webpack].
The `vue-eslint-editor` will load the editor implementation with the dynamic import syntax since it's very large.

For example, a webpack config:

```js
const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
    entry: {
        index: "src/index.js",
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
}
```

### VuePress integrations

VuePress has a bug on SSR builds: [vuepress#451](https://github.com/vuejs/vuepress/issues/451).

Please use the relative path instead of the module path. E.g.,

```js
import EslintEditor from "../../../node_modules/vue-eslint-editor"
```

[Linter]: https://eslint.org/docs/developer-guide/nodejs-api#linter
[MonacoEditor]: https://microsoft.github.io/monaco-editor/
[Webpack]: https://webpack.js.org/
[eslint4b]: https://www.npmjs.com/package/eslint4b
[npm]: https://www.npmjs.com/
