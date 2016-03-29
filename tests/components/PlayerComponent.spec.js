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

import './../../src/index';

describe("PlayerComponent", function () {
    var scope, element;

    var height = 280;
    var width = 350;
    var videoid = 'WeW5nxVQcgQ';
    var options = '{controls:1}';

    beforeEach(angular.module('youtube-player'));

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<youtube-player width="' + width + '" height="' + height + '" videoid="' + videoid + '" options="' + options + '"></youtube-player>');

        element = $compile(element)(scope);
    }));

    it('Should has height', function () {
        var elementHeight = element.children()[0].getElementsByClassName("player")[0].height;

        expect(elementHeight).toBe(height);
    });

    it('Should has width', function () {
        var elementWidth = element.children()[0].getElementsByClassName("player")[0].width;

        expect(elementWidth).toBe(width);
    });
});
