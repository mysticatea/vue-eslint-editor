<template>
    <div :class="{ 'eslint-editor-dark': dark }" class="eslint-editor-root"><!-- eslint-disable-line @mysticatea/prettier, @mysticatea/vue/comma-dangle, @mysticatea/vue/multiline-html-element-content-newline -->
        <transition name="eslint-editor-fade" @before-enter="fadeIn">
            <div
                v-if="monaco"
                key="editor"
                class="eslint-editor-swap-container"
            >
                <div ref="monaco" class="eslint-editor-monaco" />
                <div v-if="fix" class="eslint-editor-actions">
                    <label>
                        <input v-model="previewFix" type="checkbox"><!-- eslint-disable-line @mysticatea/prettier -->
                        Preview
                    </label>
                    <button @click="applyAutofix">
                        Apply
                    </button>
                </div>
            </div>
            <div v-else key="placeholder" class="eslint-editor-swap-container">
                <code class="eslint-editor-placeholder-code">{{ code }}</code>
                <transition name="eslint-editor-fade">
                    <div
                        v-if="monacoLoadingError"
                        key="error"
                        class="eslint-editor-placeholder-error"
                    >
                        Failed to load this editor
                    </div>
                    <div
                        v-else
                        key="loading"
                        class="eslint-editor-placeholder-loading"
                    >
                        <div class="eslint-editor-placeholder-loading-icon">
                            <div />
                            <div />
                            <div />
                        </div>
                        <div class="eslint-editor-placeholder-loading-message">
                            Now loading...
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
const EDITOR_OPTS = {
    autoIndent: true,
    automaticLayout: true,
    find: {
        autoFindInSelection: true,
        seedSearchStringFromSelection: true,
    },
    minimap: { enabled: false },
    renderControlCharacters: true,
    renderIndentGuides: true,
    renderWhitespace: "boundary",
    scrollBeyondLastLine: false,
}

/**
 * Ensure that a given value is a positive value.
 * @param {number|undefined} value The value to check.
 * @param {number} defaultValue The default value which is used if the `value` is undefined.
 * @returns {number} The positive value as the result.
 */
function ensurePositiveInt(value, defaultValue) {
    return Math.max(1, (value !== undefined ? value : defaultValue) | 0)
}

/**
 * Update the value of a given editor.
 * @param {monaco.editor.IStandaloneEditor} editor The editor to update.
 * @param {string} value The new value.
 * @returns {void}
 */
function updateValue(editor, value) {
    const model = editor.getModel()
    if (model != null && value !== model.getValue()) {
        model.setValue(value)
    }
}

/**
 * Dispose.
 * @param {any} x The target object.
 * @returns {void}
 */
function dispose(x) {
    if (x == null) {
        return
    }

    if (x.getOriginalEditor) {
        dispose(x.getOriginalEditor())
    }
    if (x.getModifiedEditor) {
        dispose(x.getModifiedEditor())
    }
    if (x.getModel) {
        dispose(x.getModel())
    }
    if (x.dispose) {
        x.dispose()
    }
}

export default {
    name: "ESLintEditor",

    model: {
        prop: "code",
        event: "input",
    },

    props: {
        linter: {
            type: Object,
            default: null,
        },
        code: {
            type: String,
            default: "",
        },
        config: {
            type: Object,
            default() {
                return {}
            },
        },
        dark: {
            type: Boolean,
        },
        filename: {
            type: String,
            default: "a.js",
        },
        preprocess: {
            type: Function,
            default: null,
            required: false,
        },
        postprocess: {
            type: Function,
            default: null,
            required: false,
        },
        fix: {
            type: Boolean,
        },
        format: {
            type: Object,
            default() {
                return { insertSpaces: true, tabSize: 4 }
            },
        },
        language: {
            type: String,
            default: "javascript",
        },
    },

    data() {
        return {
            monaco: null,
            monacoLoadingError: null,
            loadLanguage: null,
            editor: null,
            editing: false,
            messages: [],
            fixedCode: this.code,
            fixedMessages: [],
            previewFix: false,
            requestFix: false,
        }
    },

    computed: {
        codeEditor() {
            const editor = this.editor
            if (editor != null) {
                if (editor.getOriginalEditor != null) {
                    return editor.getOriginalEditor()
                }
                return editor
            }
            return null
        },

        fixedCodeEditor() {
            const editor = this.editor
            if (editor != null && editor.getModifiedEditor != null) {
                return editor.getModifiedEditor()
            }
            return null
        },
    },

    watch: {
        linter() {
            this.invalidate()
        },

        code(value) {
            this.updateCode(value)
        },

        previewFix() {
            this.initialize()
        },

        config: {
            handler() {
                this.invalidate()
            },
            deep: true,
        },

        filename() {
            this.invalidate()
        },

        fix() {
            this.initialize()
        },

        fixedCode(value) {
            const editor = this.fixedCodeEditor
            if (editor != null) {
                updateValue(editor, value)
            }
        },

        // But it's not shown.
        // See https://github.com/mysticatea/vue-eslint-demo/issues/5
        fixedMessages(value) {
            const editor = this.fixedCodeEditor
            if (editor != null) {
                this.updateMarkers(editor, value)
            }
        },

        format(value) {
            const editor = this.codeEditor
            if (editor != null) {
                editor.getModel().updateOptions(value)
            }
        },

        messages(value) {
            const editor = this.codeEditor
            if (editor != null) {
                this.updateMarkers(editor, value)
            }
        },

        language(value) {
            const { monaco, loadLanguage } = this
            if (monaco == null) {
                // Skip because the initialization logic does this.
                return
            }

            ;(async () => {
                // Load the language editor of the current language.
                await loadLanguage(value)

                // Skip if the language is not latest
                if (value !== this.language) {
                    return
                }

                // Set the language to the current editors.
                for (const editor of [this.codeEditor, this.fixedCodeEditor]) {
                    if (editor != null) {
                        monaco.editor.setModelLanguage(editor.getModel(), value)
                    }
                }
            })().catch(error => {
                console.error("Failed to set the language '%s':", value, error)
            })
        },
    },

    mounted() {
        ;(async () => {
            // Load the monaco editor lazily.
            const { monaco, loadLanguage } = await import("./monaco")
            // Load the language editor of the current language.
            await loadLanguage(this.language)
            // Finish loading.
            this.monaco = monaco
            this.loadLanguage = loadLanguage
        })().catch(error => {
            console.error("Failed to load Monaco editor:", error)
            this.monacoLoadingError = error
        })
    },

    beforeDestroy() {
        dispose(this.editor)
        this.$refs.monaco.innerHTML = ""
        this.editor = null
    },

    methods: {
        fadeIn(el) {
            if (this.$refs.monaco && this.$refs.monaco.parentNode === el) {
                this.initialize()
            }
        },

        initialize() {
            if (this.monaco != null) {
                dispose(this.editor)
                this.$refs.monaco.innerHTML = ""
                this.editor = this.previewFix
                    ? this.createTwoPaneEditor()
                    : this.createEditor()
                this.lint()
            }
        },

        createEditor() {
            const { code, dark, format, language, messages, monaco } = this

            // Create model.
            const model = monaco.editor.createModel(code, language)
            model.updateOptions(format)
            model.onDidChangeContent(() => {
                this.$emit("input", model.getValue())
                this.invalidate()
            })

            // Create editor.
            const editor = monaco.editor.create(this.$refs.monaco, {
                model,
                theme: dark ? "vs-dark" : "vs",
                ...EDITOR_OPTS,
            })
            this.updateMarkers(editor, messages)

            return editor
        },

        createTwoPaneEditor() {
            const {
                code,
                dark,
                fixedCode,
                fixedMessages,
                format,
                language,
                messages,
                monaco,
            } = this

            // Somehow `createDiffEditor` doesn't have `model` option.
            const editor = monaco.editor.createDiffEditor(this.$refs.monaco, {
                originalEditable: true,
                theme: dark ? "vs-dark" : "vs",
                ...EDITOR_OPTS,
            })
            const original = monaco.editor.createModel(code, language)
            const modified = monaco.editor.createModel(fixedCode, language)
            const leftEditor = editor.getOriginalEditor()
            const rightEditor = editor.getModifiedEditor()

            rightEditor.updateOptions({ readOnly: true })
            original.updateOptions(format)

            // Set change event.
            original.onDidChangeContent(() => {
                const newCode = original.getValue()

                this.fixedCode = newCode
                this.$emit("input", newCode)
                this.invalidate()
            })

            // Set model.
            editor.setModel({ original, modified })

            // Set markers.
            this.updateMarkers(leftEditor, messages)
            this.updateMarkers(rightEditor, fixedMessages)

            return editor
        },

        messageToMarker(message) {
            const { monaco } = this
            const startLineNumber = ensurePositiveInt(message.line, 1)
            const startColumn = ensurePositiveInt(message.column, 1)
            const endLineNumber = ensurePositiveInt(
                message.endLine,
                startLineNumber,
            )
            const endColumn = ensurePositiveInt(
                message.endColumn,
                startColumn + 1,
            )

            return {
                severity: monaco.MarkerSeverity.Error,
                source: "ESLint",
                message: `${message.message} (${message.ruleId || "FATAL"})`,
                startLineNumber,
                startColumn,
                endLineNumber,
                endColumn,
            }
        },

        updateMarkers(editor, messages) {
            const { monaco } = this
            const model = editor.getModel()
            const id = editor.getId()
            const markers = messages.map(this.messageToMarker, this)

            monaco.editor.setModelMarkers(model, id, markers)
        },

        updateCode(value) {
            const editor = this.codeEditor
            if (editor != null) {
                updateValue(editor, value)
            }
            this.invalidate()
        },

        invalidate() {
            if (this.editor != null && !this.editing) {
                this.editing = true
                setTimeout(() => {
                    this.lint()
                    this.editing = false
                }, 667)
            }
        },

        lint() {
            const {
                codeEditor: editor,
                config,
                filename,
                preprocess,
                postprocess,
                linter,
            } = this
            if (editor == null || linter == null) {
                return
            }
            const model = editor.getModel()
            const code = model.getValue()

            // Lint
            try {
                this.messages = linter.verify(code, config, {
                    filename,
                    preprocess,
                    postprocess,
                })
            } catch (err) {
                this.messages = [
                    {
                        fatal: true,
                        severity: 2,
                        message: err.message,
                        line: 1,
                        column: 0,
                    },
                ]
            }

            // Fix
            try {
                const ret = linter.verifyAndFix(code, config, { filename })
                this.fixedCode = ret.fixed ? ret.output : code
                this.fixedMessages = ret.messages
            } catch (err) {
                this.fixedCode = code
                this.fixedMessages = [
                    {
                        fatal: true,
                        severity: 2,
                        message: err.message,
                        line: 1,
                        column: 0,
                    },
                ]
            }

            this.$emit("change", {
                code,
                messages: this.messages,
                fixedCode: this.fixedCode,
                fixedMessages: this.fixedMessages,
            })

            if (this.requestFix) {
                this.requestFix = false
                if (this.fixedCode !== this.code) {
                    this.$emit("input", this.fixedCode)
                    this.updateCode(this.fixedCode)
                }
            }
        },

        applyAutofix() {
            const { code, fixedCode, editing } = this
            if (editing) {
                this.requestFix = true
            } else if (fixedCode !== code) {
                this.$emit("input", fixedCode)
                this.updateCode(fixedCode)
            }
        },
    },
}
</script>

<style>
.eslint-editor-root {
    position: relative;
}

.eslint-editor-swap-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.eslint-editor-monaco {
    width: 100%;
    height: 100%;
}

.eslint-editor-actions {
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 20px;
    bottom: 8px;
    border: 1px solid gray;
    border-radius: 4px;
    opacity: 0.3;
    transition: opacity 0.3s;
}
.eslint-editor-actions:hover {
    opacity: 1;
}
.eslint-editor-actions::before {
    content: "🔧";
    display: inline-block;
    margin: 2px;
    padding: 5px;
    font-size: 1em;
    vertical-align: middle;
}

.eslint-editor-actions,
.eslint-editor-actions button {
    background-color: #ffffff;
    color: #1e1e1e;
}

.eslint-editor-dark .eslint-editor-actions,
.eslint-editor-dark .eslint-editor-actions button {
    background-color: #1e1e1e;
    color: #d4d4d4;
}

.eslint-editor-actions > * {
    display: inline-block;
    box-sizing: border-box;
    width: 80px;
    margin: 2px;
    padding: 4px 8px;
    border: 1px solid gray;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1em;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
}
.eslint-editor-root .eslint-editor-actions > *:hover {
    background-color: rgba(128, 128, 128, 0.2);
}
.eslint-editor-root .eslint-editor-actions > *:active {
    background-color: rgba(128, 128, 128, 0.4);
}
.eslint-editor-actions input[type="checkbox"] {
    display: none;
}

.eslint-editor-root .eslint-editor-placeholder-code {
    display: block;
    box-sizing: border-box;
    height: 100%;
    white-space: pre;
    background-color: #ffffff;
    color: #1e1e1e;
}
.eslint-editor-root.eslint-editor-dark .eslint-editor-placeholder-code {
    background-color: #1e1e1e;
    color: #d4d4d4;
}

.eslint-editor-placeholder-loading,
.eslint-editor-placeholder-error {
    position: absolute;
    right: 8px;
    bottom: 8px;
    pointer-events: none;
}

.eslint-editor-placeholder-loading {
    line-height: 1.5em;
}

.eslint-editor-placeholder-error {
    color: #f44336;
}

.eslint-editor-placeholder-loading-icon {
    display: inline-block;
    position: relative;
    width: 1.5em;
    height: 1.5em;
    margin-right: 4px;
    vertical-align: middle;
}
.eslint-editor-placeholder-loading-icon > div {
    position: absolute;
    border-radius: 50%;
    border-color: #3eaf7c;
    border-width: 2px;
    border-style: none solid none solid;
    animation: ESLintEditorLoadingIcon 1s linear infinite;
}
.eslint-editor-placeholder-loading-icon > div:nth-child(1) {
    height: 100%;
    width: 100%;
    animation-duration: 1.3s;
}
.eslint-editor-placeholder-loading-icon > div:nth-child(2) {
    top: 1px;
    left: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 2px);
    animation-duration: 0.7s;
}
.eslint-editor-placeholder-loading-icon > div:nth-child(3) {
    top: 2px;
    left: 4px;
    width: calc(100% - 8px);
    height: calc(100% - 4px);
    animation-duration: 1s;
}

.eslint-editor-placeholder-loading-message {
    display: inline-block;
    color: gray;
    vertical-align: middle;
}

@keyframes ESLintEditorLoadingIcon {
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(210deg);
    }
    100% {
        transform: rotateY(360deg);
    }
}

.eslint-editor-fade-enter-active,
.eslint-editor-fade-leave-active {
    transition: opacity 0.3s ease;
}
.eslint-editor-fade-enter,
.eslint-editor-fade-leave-to {
    opacity: 0;
}
</style>
