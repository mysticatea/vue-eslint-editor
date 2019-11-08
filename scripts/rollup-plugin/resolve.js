/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
/*globals require, __dirname */
import path from "path"

export default () => ({
    name: "resolve",

    resolveId(id, importerPath) {
        if (id.startsWith(".")) {
            return null
        }

        const resultPath = require.resolve(id, {
            paths: [importerPath || path.dirname(__dirname)],
        })

        return resultPath
    },
})
