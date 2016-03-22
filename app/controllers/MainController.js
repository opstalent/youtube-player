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

(function () {
    'use strict';

    angular
        .module('MainCtr')
        .controller('MainController', MainController);

    function MainController() {
        var vm = this;

        vm.video = {
            name: 'Javascript ES6 Cheatsheet - the best of JS ES6',
            currentTime: 0,
            videoid: 'AfWYO8t7ed4',
            width: 345,
            height: 190,
        };
    }

})();