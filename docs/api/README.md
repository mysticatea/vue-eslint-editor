---
sidebarDepth: 3
---

# API References

## 🔧 Properties

### linter

```html
<vue-eslint-editor :linter="linter" />
```

- **Type:** [Linter] | `null`
- **Default value:** `null`

The [Linter] object to does linting and fixing the input code.

This component requires this property in order to work properly, but this property can be `null` in order to use dynamic imports.

::: tip
The [eslint4b] package is useful as the [Linter] class which works in browsers.
:::

### code

```html
<vue-eslint-editor :code="code" />
<vue-eslint-editor v-model="code" />
```

- **Type:** `string`
- **Default value:** `""`

The source code which is shown in this code editor.

Users can edit the source code. You can bind a property with `v-model` to receive the edits.

### config

```html
<vue-eslint-editor :config="config" />
```

- **Type:** `object`
- **Default value:** `{}`

The config object to lint.

This config object is given to the second argument of `Linter#verify()` method.
Define parser options and rules.

::: warning NOTE
Use `Linter#defineParser()` method before you use the `parser` field. Otherwise, the [Linter] object throws a not-found error.
:::

::: warning NOTE
Mind you cannot use `env`, `extends`, `overrides`, `plugins`, and `processor` fields in this config. This is a limitation of [Linter] class.

- Use `globals` and `parserOptions` fields instead of the `env` field.
- Merge your configurations manually instead of the `extends` field.
- Switch your configuration for each file manually instead of the `overrides` field.
- Use `Linter#defineRule()` method with every rule of plugins instead of the `plugins` field.
- Use [preprocess](#preprocess) and [postprocess](#postprocess) attributes instead of the `processor` field.
:::

### dark

```html
<vue-eslint-editor dark />
```

- **Type:** `boolean`
- **Default value:** `false`

The flag to use dark theme.

### filename

```html
<vue-eslint-editor filename="a.js" />
```

- **Type:** `string`
- **Default value:** `"a.js"`

The filename of the source code.

Some rules use filenames to lint.
You can customize the filename with this property.

### fix

```html
<vue-eslint-editor fix />
```

- **Type:** `boolean`
- **Default value:** `false`

The flag to show the "Preview" button that shows fixed code [side by side](https://microsoft.github.io/monaco-editor/playground.html#creating-the-diffeditor-multi-line-example).

### format

```html
<vue-eslint-editor :format="format" />
```

- **Type:** [ITextModelUpdateOptions](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.itextmodelupdateoptions.html)
- **Default value:** `{ insertSpaces: true, tabSize: 4 }`

The format option object for [Monaco Editor].

### language

```html
<vue-eslint-editor language="javascript" />
```

- **Type:** `string`
- **Default value:** `"javascript"`

The language option object for [Monaco Editor].

You can change syntax highlights and language services in order to play ESLint with custom parsers.

### postprocess

```html
<vue-eslint-editor :postprocess="postprocess" />
```

- **Type:** `((messages: Message[][], filename: string) => Message[]) | undefined`
- **Default value:** `undefined`

The post-process function.

This function is given to the third argument of `Linter#verify()` method.

### preprocess

```html
<vue-eslint-editor :preprocess="preprocess" />
```

- **Type:** `((code: string, filename: string) => string[]) | undefined`
- **Default value:** `undefined`

The pre-process function.

This function is given to the third argument of `Linter#verify()` method.

## 🔔 Events

### input

```html
<vue-eslint-editor @input="onInputCode" />
```

- **Type:** `string`

The event which is fired on every edit.

This event is for `v-model` functionality.

### change

```html
<vue-eslint-editor @change="onChange" />
```

- **Type:** `{code: string, fixedCode: string, messages: Array, fixedMessages: Array}`

The event which is fired on edits asynchronously.

The first argument has the following properties:

- `code` is the current source code.
- `fixedCode` is the autofixed code.
- `messages` is the errors that ESLint reported.
- `fixedMessages` is the errors which are remained after autofix.


[Linter]: https://eslint.org/docs/developer-guide/nodejs-api#linter
[Monaco Editor]: https://microsoft.github.io/monaco-editor/
[eslint4b]: https://www.npmjs.com/package/eslint4b
