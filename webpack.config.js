module.exports = {
    mode: "development",
    // mode: "production",
    entry: "./src/index.ts",
    devtool: "source-map",
    target: "node",
    node: {
        process: false
    },
    output: {
        filename: "whatstpl.js",
        // filename: "whatstpl.min.js",
        library: "whatstpl",
        libraryTarget: "umd",
        globalObject: "this",
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    }
};