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
Mind you cannot use `extends` and `env` settings in this config.
You have to use `globals` and `parserOptions` settings instead.
See also:

- [eslint/conf/environments.js](https://github.com/eslint/eslint/blob/master/conf/environments.js).
- [eslint/conf/eslint-recommended.js](https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js).
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

The flag to show fixed code [side by side](https://microsoft.github.io/monaco-editor/playground.html#creating-the-diffeditor-multi-line-example).

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
