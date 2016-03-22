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

'use strict';

var webpackConfig = require('./webpack/webpack.test.js');
require('phantomjs-polyfill')
webpackConfig.entry = {};

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'test/**/*.ts'
        ],
        exclude: [
        ],
        preprocessors: {
            'test/**/*.spec.ts': ['webpack'],
            'src/**/!(*.spec)+(.js)': ['coverage']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        reporters: [
            'progress',
            'coverage'
        ],
        coverageReporter: {
            reporters: [
                {
                    dir: 'reports/coverage/',
                    subdir: '.',
                    type: 'html'
                }
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    });
};