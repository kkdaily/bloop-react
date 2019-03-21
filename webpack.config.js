var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/Bloop.jsx',
    externals: {
        react: 'react'
    },
    output: {
        path: path.resolve('build'),
        filename: 'Bloop.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}