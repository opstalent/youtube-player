/**
 * This file is part of the youtube-player package.
 *
 * (c) Opstalent http://www.opstalent.com/
 * (c) Szymon Kunowski <szymon.kunowski@opstalent.it>
 * (c) Mateusz Bosek <mateusz.bosek@opstalent.it>
 * (c) Rafał Lorenz <rafal.lorenz@opstalent.it>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var loaders = require("./loaders");
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'angular-youtube-player.min.js',
        path: 'dist'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.js']
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    externals: {
        'angular': 'angular'
    },
    plugins: [
        new webpack.ProvidePlugin({_: 'lodash'}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(
            {
                warning: false,
                mangle: true,
                comments: false
            }
        )
    ],
    module: {
        loaders: loaders
    }
};