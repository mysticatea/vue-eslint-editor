<template>
    <eslint-editor
        v-model="code"
        :linter="linter"
        :config="config"
        class="eslint-playground"
        dark
        fix
    />
</template>

<script>
//eslint-disable-next-line @mysticatea/node/no-missing-import
import EslintEditor from "../../../dist/index.vue"

export default {
    name: "ESLintPlayground",
    components: { EslintEditor },

    data() {
        return {
            code: `import Vue from "vue";

new Vue({
    el: "#app",
     template: '<p>{{ message }}</p>',
  data: {
        message: 'Hello Vue.js!'
    }
})
`,
            config: {
                globals: {
                    // ES2015 globals
                    ArrayBuffer: false,
                    DataView: false,
                    Float32Array: false,
                    Float64Array: false,
                    Int16Array: false,
                    Int32Array: false,
                    Int8Array: false,
                    Map: false,
                    Promise: false,
                    Proxy: false,
                    Reflect: false,
                    Set: false,
                    Symbol: false,
                    Uint16Array: false,
                    Uint32Array: false,
                    Uint8Array: false,
                    Uint8ClampedArray: false,
                    WeakMap: false,
                    WeakSet: false,
                },
                rules: {
                    // eslint:recommended rules
                    "constructor-super": "error",
                    "no-case-declarations": "error",
                    "no-class-assign": "error",
                    "no-compare-neg-zero": "error",
                    "no-cond-assign": "error",
                    "no-console": "error",
                    "no-const-assign": "error",
                    "no-constant-condition": "error",
                    "no-control-regex": "error",
                    "no-debugger": "error",
                    "no-delete-var": "error",
                    "no-dupe-args": "error",
                    "no-dupe-class-members": "error",
                    "no-dupe-keys": "error",
                    "no-duplicate-case": "error",
                    "no-empty": "error",
                    "no-empty-character-class": "error",
                    "no-empty-pattern": "error",
                    "no-ex-assign": "error",
                    "no-extra-boolean-cast": "error",
                    "no-extra-semi": "error",
                    "no-fallthrough": "error",
                    "no-func-assign": "error",
                    "no-global-assign": "error",
                    "no-inner-declarations": "error",
                    "no-invalid-regexp": "error",
                    "no-irregular-whitespace": "error",
                    "no-mixed-spaces-and-tabs": "error",
                    "no-new-symbol": "error",
                    "no-obj-calls": "error",
                    "no-octal": "error",
                    "no-redeclare": "error",
                    "no-regex-spaces": "error",
                    "no-self-assign": "error",
                    "no-sparse-arrays": "error",
                    "no-this-before-super": "error",
                    "no-undef": "error",
                    "no-unexpected-multiline": "error",
                    "no-unreachable": "error",
                    "no-unsafe-finally": "error",
                    "no-unsafe-negation": "error",
                    "no-unused-labels": "error",
                    "no-unused-vars": "error",
                    "no-useless-escape": "error",
                    "require-yield": "error",
                    "use-isnan": "error",
                    "valid-typeof": "error",

                    // a few style rules.
                    semi: "error",
                    quotes: "error",
                    indent: ["error", 4],
                },
                parserOptions: {
                    ecmaVersion: 2020,
                    sourceType: "module",
                },
            },
            linter: null,
        }
    },

    async mounted() {
        // Read content.
        if (this.$slots && this.$slots.default && this.$slots.default.length) {
            this.code = this.$slots.default
                .map(n => n.text || "")
                .join("")
                .trim()
        }

        // Load linter.
        const { default: Linter } = await import("eslint4b")
        this.linter = new Linter()
    },
}
</script>

<style>
.eslint-playground {
    width: 100%;
    height: calc(100vh - 400px);
    min-height: 240px;
    box-sizing: border-box;
    border: 1px solid gray;
    box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.5);
}
</style>
