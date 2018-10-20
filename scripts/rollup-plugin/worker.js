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

            const { code } = await bundle.generate({
                format: "iife",
                name: path.basename(id, ".js").replace(/\./gu, ""),
            })

            const content = `export default URL.createObjectURL(new Blob([${JSON.stringify(
                code
            )}], { type: "text/javascript" }))`

            await fs.ensureDir(path.dirname(cachePath))
            await fs.writeFile(cachePath, content)

            return content
        } catch (error) {
            console.error(path.basename(id), error)
            throw error
        }
    },
})
