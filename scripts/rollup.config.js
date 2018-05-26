/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import css from "./rollup-plugin/css"
import removeRequireCalls from "./rollup-plugin/remove-require-calls"
import resolve from "./rollup-plugin/resolve"
import worker from "./rollup-plugin/worker"

export default {
    experimentalDynamicImport: true,
    input: "./src/monaco.js",
    onwarn() {
        // Ignore.
    },
    output: {
        file: "./dist/monaco.js",
        format: "es",
    },
    plugins: [css(), removeRequireCalls(), resolve(), worker()],
}
