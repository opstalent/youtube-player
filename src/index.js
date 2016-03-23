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

import YoutubePlayerComponent from "./components/YoutubePlayerComponent";

(function (root, factory) {
    'use strict';
    //if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    //} else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    //    module.exports = factory(require('angular'));
    //} else {
    //    return factory(root.angular);
    //}
}(this, repository));

function repository(angular) {
    'use strict';

    var moduleName = 'YoutubePlayer';

    angular
        .module(moduleName, [])
        .component("youtube-player", YoutubePlayerComponent)
    ;

    return moduleName;
}