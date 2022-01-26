let path = require("path");
let VueLoaderPlugin = require("vue-loader/lib/plugin");


module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                ]
            }
        ]
    },
    plugins : [
        new VueLoaderPlugin()
    ]
}