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

import {YoutubePlayerController} from "./../controllers/YoutubePlayerController";

export class YoutubePlayerComponent {
    constructor() {
        this.bindings = {
            videoid: "@",
            height: "@",
            width: "@",
            currentTime: "@"
        };
        this.template = require('./../views/youtubePlayer.html');
        this.controller = YoutubePlayerController;
    }
    link(scope, element, attrs, $rootScope) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}