/*eslint-env node */
"use strict"

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
