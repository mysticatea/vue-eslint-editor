import "monaco-editor/esm/vs/editor/browser/controller/coreCommands"
import "monaco-editor/esm/vs/editor/browser/widget/codeEditorWidget"
import "monaco-editor/esm/vs/editor/browser/widget/diffEditorWidget"
import "monaco-editor/esm/vs/editor/browser/widget/diffNavigator"
import "monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching"
import "monaco-editor/esm/vs/editor/contrib/caretOperations/caretOperations"
import "monaco-editor/esm/vs/editor/contrib/caretOperations/transpose"
import "monaco-editor/esm/vs/editor/contrib/clipboard/clipboard"
import "monaco-editor/esm/vs/editor/contrib/codeAction/codeActionContributions"
import "monaco-editor/esm/vs/editor/contrib/comment/comment"
import "monaco-editor/esm/vs/editor/contrib/contextmenu/contextmenu"
import "monaco-editor/esm/vs/editor/contrib/find/findController"
import "monaco-editor/esm/vs/editor/contrib/folding/folding"
import "monaco-editor/esm/vs/editor/contrib/format/formatActions"
import "monaco-editor/esm/vs/editor/contrib/gotoError/gotoError"
import "monaco-editor/esm/vs/editor/contrib/hover/hover"
import "monaco-editor/esm/vs/editor/contrib/inPlaceReplace/inPlaceReplace"
import "monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations"
import "monaco-editor/esm/vs/editor/contrib/smartSelect/smartSelect"
import "monaco-editor/esm/vs/editor/contrib/suggest/suggestController"
import "monaco-editor/esm/vs/editor/contrib/wordHighlighter/wordHighlighter"
import "monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations"
import "monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp"
import "monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens"
import "monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard"
import "monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickOutline"
import "monaco-editor/esm/vs/editor/standalone/browser/quickOpen/gotoLine"
import "monaco-editor/esm/vs/editor/standalone/browser/quickOpen/quickCommand"
import * as monaco from "monaco-editor/esm/vs/editor/editor.api"

import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"
import "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution"
import "monaco-editor/esm/vs/basic-languages/css/css.contribution"
import "monaco-editor/esm/vs/basic-languages/html/html.contribution"
import "monaco-editor/esm/vs/language/typescript/monaco.contribution"
import "monaco-editor/esm/vs/language/css/monaco.contribution"
import "monaco-editor/esm/vs/language/json/monaco.contribution"
import "monaco-editor/esm/vs/language/html/monaco.contribution"

const workerPromises = Object.create(null)
const workers = Object.create(null)

/*globals window */
window.MonacoEnvironment = {
    getWorker(_, label) {
        if (workers[label]) {
            return workers[label]
        }
        if (workers.$editor) {
            return workers.$editor
        }
        throw new Error(`The language worker '${label}' was not found`)
    },
}

export function loadLanguage(label) {
    if (workers[label]) {
        return Promise.resolve()
    }

    switch (label) {
        case "javascript":
        case "typescript":
            if (!workerPromises[label]) {
                workerPromises[label] = import(
                    "monaco-editor/esm/vs/language/typescript/ts.worker"
                ).then(({ worker }) => {
                    workers[label] = worker
                })
            }
            return workerPromises[label]

        case "html":
            if (!workerPromises[label]) {
                workerPromises[label] = import(
                    "monaco-editor/esm/vs/language/html/html.worker"
                ).then(({ worker }) => {
                    workers[label] = worker
                })
            }
            return workerPromises[label]

        case "css":
            if (!workerPromises[label]) {
                workerPromises[label] = import(
                    "monaco-editor/esm/vs/language/css/css.worker"
                ).then(({ worker }) => {
                    workers[label] = worker
                })
            }
            return workerPromises[label]

        default:
            if (!workerPromises.$editor) {
                workerPromises.$editor = import(
                    "monaco-editor/esm/vs/editor/editor.worker"
                ).then(({ worker }) => {
                    workers.$editor = worker
                })
            }
            return workerPromises.$editor
    }
}

export { monaco }
