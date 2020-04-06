/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import path from "path"
import fs from "fs-extra"

const URL_PATTERN = /url\((["']?)(.+?)\1\)/gu

export default () => {
    const contents = new Map()
    const files = new Map()

    function extractFiles(cssText, importerId, outLoadingPromises) {
        return cssText.replace(URL_PATTERN, (code, _quote, href) => {
            if (/^(?:data|https?):/u.test(href)) {
                return code
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
            outLoadingPromises.push(promise)

            return `url(${JSON.stringify(filename)})`
        })
    }

    return {
        name: "css",

        async load(id) {
            if (path.extname(id) !== ".css") {
                return null
            }

            // Load this CSS file
            const rawContent = await fs.readFile(id, "utf8")

            // Resolve files of `url(...)`
            const loadingPromises = []
            const content = extractFiles(
                rawContent,
                id,
                /* out */ loadingPromises,
            )
            // Wait for loading of the files.
            await Promise.all(loadingPromises)

            // Store it
            contents.set(id, content)

            // Make it empty.
            // The CSS content will be outputed as single `monaco.css` file.
            return ""
        },

        renderChunk(code, chunk) {
            if (chunk.name !== "monaco") {
                return null
            }
            return `import "./monaco.css";\n${code}`
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
