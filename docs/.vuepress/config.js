"use strict"

module.exports = {
    title: "vue-eslint-editor",
    description: "A code editor component to play ESLint.",
    head: [["link", { rel: "icon", href: "favicon.png" }]],
    serviceWorker: true,

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

        serviceWorker: {
            updatePopup: true,
        },
    },

    evergreen: true,
}
