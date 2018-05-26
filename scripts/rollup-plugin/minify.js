/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import uglify from "uglify-es"

export default () => ({
    name: "minify",

    transformBundle(source) {
        return uglify.minify(source).code
    },
})
