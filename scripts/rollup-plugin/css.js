/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import path from "path"
import fs from "fs-extra"

export default () => {
    const contents = new Map()
    const files = new Map()

    async function extractFiles(importerId, cssText) {
        const pattern = /url\((["']?)(.+?)\1\)/gu
        const promises = []

        let m = null
        while ((m = pattern.exec(cssText)) != null) {
            const href = m[2]
            if (/^(?:data|https?):/u.test(href)) {
                continue
            }
            const filePath = path.resolve(path.dirname(importerId), href)
            const filename = path.basename(filePath)
            const promise = fs.readFile(filePath).then(content => {
                // Check conflict
                const file = files.get(filename)
                if (file) {
                    if (content.equals(file.content)) {
                        return
                    }
                    const cwd = process.cwd()
                    const importers = [
                        path.relative(cwd, importerId),
                        path.relative(cwd, file.importerId),
                    ].join('" and "')
                    throw new Error(
                        `Naming conflicted: "${filename}" (from "${importers}")`,
                    )
                }
                // Store it
                files.set(filename, { content, importerId })
            })
            promises.push(promise)
        }

        await Promise.all(promises)
    }

    return {
        name: "css",

        async load(id) {
            if (path.extname(id) !== ".css") {
                return null
            }

            const content = await fs.readFile(id, "utf8")
            contents.set(id, content)
            await extractFiles(id, content)

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
            for (const [filename, { content }] of files) {
                await fs.writeFile(`dist/${filename}`, content)
            }
        },
    }
}
