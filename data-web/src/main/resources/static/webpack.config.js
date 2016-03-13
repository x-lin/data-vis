var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/index.js", //path of root component -> renders other components -> starting point
    output: {
        path: __dirname + '/script/',
        filename: 'bundle.js',
        publicPath: '/script/'
    },
    module: {
        loaders: [      //what to do with Main.js and all of its children components
            {           //babel loader
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["react", "es2015"] //which transformation to do to code; es2015=es6
                }
            }, {
                test: /\.css$/, // Only .css files
                exclude: /node_modules/,
                loader: 'style!css' // Run both loaders
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/index.html', to: '../../../../../target/classes/static/src/index.html' },
            { from: 'src/style.css', to: '../../../../../target/classes/static/src/style.css' },
            { from: 'script', to: '../../../../../target/classes/static/script' }
        ])
    ]
};

//webpack takes entry -> run transformations -> create output bundle