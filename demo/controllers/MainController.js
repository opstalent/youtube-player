(function () {
    'use strict';

    angular
        .module('App')
        .controller('MainController', MainController);

    function MainController() {
        var vm = this;

        vm.video = {
            width: 345,
            height: 190,
            name: 'video1',
            currentTime: 0,
            videoid: 'M7lc1UVf-VE',
            views: 123000
        };
    }

})();