/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import path from "path"
import fs from "fs-extra"

export default () => {
    const contents = new Map()

    return {
        name: "css",

        async load(id) {
            if (path.extname(id) !== ".css") {
                return null
            }

            contents.set(id, await fs.readFile(id, "utf8"))

            return ""
        },

        renderChunk(source) {
            return `import "./monaco.css";\n${source}`
        },

        async writeBundle() {
            await fs.ensureDir("dist")
            await fs.writeFile(
                "dist/monaco.css",
                Array.from(contents.values()).join("\n\n"),
            )
        },
    }
}
