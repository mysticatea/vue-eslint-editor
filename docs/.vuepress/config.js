"use strict"

module.exports = {
    title: "vue-eslint-editor",
    description: "A code editor component to play ESLint.",
    evergreen: true,

    plugins: {
        "@vuepress/pwa": {
            serviceWorker: true,
            updatePopup: true,
        },
    },

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
}
