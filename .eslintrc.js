"use strict"

module.exports = {
    root: true,
    extends: "plugin:@mysticatea/es2020",

    overrides: [
        // Use ES Modules syntax in source code.
        {
            files: [
                "docs/.vuepress/components/**/*.{js,vue}",
                "src/**/*.{js,vue}"
            ],
            extends: "plugin:@mysticatea/+modules"
        },
        // Use the latest espree in vue files.
        {
            files: "**/*.vue",
            parserOptions: {
                parser: require.resolve("espree")
            }
        },
        // Use Node.js stuff in config.js.
        {
            files: "docs/.vuepress/config.js",
            extends: "plugin:@mysticatea/+node"
        },
    ]
}
