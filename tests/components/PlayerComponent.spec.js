import {expect} from 'chai';
import 'angular';
import 'angular-mocks/angular-mocks';

describe("PlayerComponent", () => {
    var scope, element;

    var height = 280;
    var width = 350;
    var videoid = 'WeW5nxVQcgQ';
    var options = '{controls:1}';

    beforeEach(module('youtube-player'));

    beforeEach(inject(($rootScope, $compile) => {
        scope = $rootScope.$new();
        element = angular.element('<youtube-player width="' + width + '" height="' + height + '" videoid="' + videoid + '" options="' + options + '"></youtube-player>');

        $compile(element)(scope);
    }));

    it('Should has height', () => {
        let elementHeight = element.children()[0].getElementsByClassName("player")[0].height;

        expect(elementHeight).toBe(height);
    });

    it('Should has width', () => {
        let elementWidth = element.children()[0].getElementsByClassName("player")[0].width;

        expect(elementWidth).toBe(width);
    });
});