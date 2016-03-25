(function () {
    'use strict';

    angular
        .module('App')
        .controller('MainController', MainController);

    function MainController() {
        var vm = this;

        vm.video = {
            width: '100%',
            height: '800',
            videoid: 'WeW5nxVQcgQ'
        };
    }

})();