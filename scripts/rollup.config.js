/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import css from "./rollup-plugin/css"
import removeRequireCalls from "./rollup-plugin/remove-require-calls"
import resolve from "./rollup-plugin/resolve"
import worker from "./rollup-plugin/worker"

export default {
    input: "./src/monaco.js",
    onwarn(w) {
        if (w.code === "THIS_IS_UNDEFINED") {
            return
        }
        console.warn("%s", w)
    },
    output: {
        chunkFileNames: "[name].js",
        dir: "./dist",
        format: "es",
    },
    plugins: [css(), removeRequireCalls(), resolve(), worker()],
}
