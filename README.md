# vue-eslint-editor

[![npm version](https://img.shields.io/npm/v/vue-eslint-editor.svg)](https://www.npmjs.com/package/vue-eslint-editor)
[![Downloads/month](https://img.shields.io/npm/dm/vue-eslint-editor.svg)](http://www.npmtrends.com/vue-eslint-editor)
[![Build Status](https://travis-ci.org/mysticatea/vue-eslint-editor.svg?branch=master)](https://travis-ci.org/mysticatea/vue-eslint-editor)
[![Dependency Status](https://david-dm.org/mysticatea/vue-eslint-editor.svg)](https://david-dm.org/mysticatea/vue-eslint-editor)

A code editor component to play [ESLint].

## 🏁 Goal

This package provides [Vue.js] component of a code editor for [ESLint] playgrounds.

## 💿 Installation

Use [npm] to install.

```bash
npm install --save-dev eslint4b vue vue-eslint-editor
```

- [eslint4b] is the [Linter] class which works in browsers.

## 📖 Usage

```html
<template>
    <eslint-editor
        :linter="linter"
        :config="config"
        :code="code"
        @change="onChange"
    />
</template>

<script>
import ESLintEditor from "vue-eslint-editor"
import Linter from "eslint4b"

export default {
    components: {
        EslintEditor: ESLintEditor
    },

    data() {
        return {
            linter: new Linter(),
            config: {
                parserOptions: { ecmaVersion: 2015 },
                rules: {
                    "no-unused-vars": "error",
                    "no-undef": "error",
                },
            },
            code: "var foo = bar;",
        }
    },

    methods: {
        onChange({ code, fixedCode, messages, fixedMessages }) {
            //...
        }
    },
}
</script>
```

### Properties

Name | Type | Default value | Description
:----|:-----|:--------------|:-----------
linter | [Linter] | (*required*) | The [Linter] class to lint the input code.
code | string | `""` | The default code in the code editor.
config | object | `{}` | The config object to give to the `Linter#verify` method.
filename | string | `"a.js"` | The filename to give to the `Linter#verify` method.
fix | boolean | `false` | The flag to show fixed code.
format | object | `{insertSpaces: true, tabSize: 4}` | The format options for [monaco editor].
readonly | boolean | `false` | The flag to disallow editing the code editor.

### Events

Name | Event value type | Description
:----|:-----------------|:-----------
input | `string` | This is fired on every user input. The event value is the current code. This event is for `v-model`.
change | `{code: string, fixedCode: string, messages: Array, fixedMessages: Array}` | This is asynchronous fired on user input. The event value is the current code and linting messages.

## 📰 Changelog

See [GitHub releases](https://github.com/mysticatea/vue-eslint-editor/releases)

## ❤️ Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

### Development Tools

- `npm test` runs tests and measures coverage.

[ESLint]: https://eslint.org/
[Linter]: https://eslint.org/docs/developer-guide/nodejs-api#linter
[Vue.js]: https://vuejs.org/
[eslint4b]: https://www.npmjs.com/package/eslint4b
[monaco editor]: https://microsoft.github.io/monaco-editor/
[npm]: https://www.npmjs.com/
