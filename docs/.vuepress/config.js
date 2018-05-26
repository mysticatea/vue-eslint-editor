/*eslint-env node */
"use strict"

// const path = require("path")
// const fs = require("fs")

// const dist = path.resolve(__dirname, "../../dist")
// const vee = path.resolve(__dirname, "components/vue-eslint-editor")
// if (!fs.existsSync(vee)) {
//     fs.symlinkSync(dist, vee, "junction")
// }

module.exports = {
    base: "/vue-eslint-editor/",
    title: "vue-eslint-editor",
    description: "A code editor component to play ESLint.",
    head: [["link", { rel: "icon", href: "favicon.png" }]],
    serviceWorker: true,
    ga: "UA-12936571-6",

    themeConfig: {
        repo: "mysticatea/vue-eslint-editor",
        docsRepo: "mysticatea/vue-eslint-editor",
        docsDir: "docs",
        docsBranch: "master",
        editLinks: true,

        nav: [
            { text: "Guide", link: "/guide/" },
            { text: "API Reference", link: "/api/" },
        ],

        sidebar: ["/", "/guide/", "/api/"],
    },

    evergreen: true,
}
