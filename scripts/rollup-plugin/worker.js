/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import path from "path"
import fs from "fs-extra"
import rollup from "rollup"
import minify from "./minify"

// Caching
const CACHE_ROOT = path.resolve(".worker-cache")

export default () => ({
    name: "worker",

    async load(id) {
        if (!id.endsWith(".worker.js")) {
            return null
        }

        const cachePath = path.join(CACHE_ROOT, path.basename(id))
        try {
            const sourceStat = await fs.stat(id)
            const cacheStat = await fs.stat(cachePath)

            if (cacheStat.mtimeMs >= sourceStat.mtimeMs) {
                return await fs.readFile(cachePath, "utf8")
            }
        } catch (error) {
            if (error.code !== "ENOENT") {
                this.warn(error)
            }
            // Ignore.
        }

        // Build the worker.
        try {
            const bundle = await rollup.rollup({
                input: id,
                onwarn(w) {
                    if (w.code !== "THIS_IS_UNDEFINED") {
                        console.warn(w.message)
                    }
                },
                plugins: [minify()],
            })

            const { output } = await bundle.generate({
                format: "iife",
                name: path.basename(id, ".js").replace(/\./gu, ""),
            })
            if (output.length > 1) {
                throw new Error(`Multiple chunks were generated for '${id}'`)
            }

            const nameStr = JSON.stringify(path.basename(id))
            const codeStr = JSON.stringify(output[0].code)
            const content = `export const worker = new Worker(URL.createObjectURL(new Blob([${codeStr}], { type: "text/javascript" })), { name: ${nameStr} })`

            await fs.ensureDir(path.dirname(cachePath))
            await fs.writeFile(cachePath, content)

            return content
        } catch (error) {
            console.error(path.basename(id), error)
            throw error
        }
    },
})
