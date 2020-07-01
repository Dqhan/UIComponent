const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        react: [
            'react',
            'react-dom'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './dist_vendor/'),
        // library: '[name]_dll_[hash]'
        library: '[name]_dll'
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            // name: '[name]_dll_[hash]',
            name: '[name]_dll',
            path: path.join(__dirname, './dist_vendor/', '[name].manifest.json')
        })
    ]
}