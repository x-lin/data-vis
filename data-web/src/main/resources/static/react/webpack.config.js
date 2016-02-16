var webpack = require("webpack")

module.exports = {
    devtool: "eval",
    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
        "./src/index.js", //path of root component -> renders other components -> starting point
    ],
    output: {
        path: __dirname + '/script/',
        filename: 'bundle.js',
        publicPath: '/script/'
    },
    module: {
        loaders: [      //what to do with Main.js and all of its children components
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "react-hot",
            },
            {           //babel loader
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["react", "es2015"] //which transformation to do to code; es2015=es6
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

//webpack takes entry -> run transformations -> create output bundle