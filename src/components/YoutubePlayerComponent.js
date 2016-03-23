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

import YoutubePlayerController from "./../controllers/YoutubePlayerController";

export default class YoutubePlayerComponent {

    constructor() {
        console.log("3");
        this.bindings = {
            videoid: "@",
            height: "@",
            width: "@",
            autoplay: "@",
            html5: "@",
            theme: "@",
            modesbranding: "@",
            color: "@",
            iv_load_policy: "@",
            showinfo: "@",
            controls: "@"
        };
        this.template = require('./../views/youtubePlayer.html');
        this.controller = YoutubePlayerController;
    }

    link(scope, element, attrs, $rootScope) {
        console.log("2");
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;
        var playerElement = element.children()[0].getElementsByClassName("player")[0];

        YouTubeLoader.whenLoaded().then(function () {
            player = new YT.Player(playerElement, {
                playerVars: {
                    autoplay: (scope.autoplay) ? scope.autoplay : 0,
                    html5:  (scope.html5) ? scope.html5 : 1,
                    theme: (scope.theme) ? scope.theme : "light",
                    modesbranding: (scope.modesbranding) ? scope.modesbranding : 0,
                    color: (scope.color) ? scope.color : "white",
                    iv_load_policy: (scope.iv_load_policy) ? scope.iv_load_policy : 3,
                    showinfo: (scope.showinfo) ? scope.showinfo : 0,
                    controls: (scope.controls) ? scope.controls : 1
                },

                height: scope.height,
                width: scope.width,
                videoId: scope.videoid,

                events: {
                    'onReady': function (event) {
                        var data = {
                            duration: player.getDuration()
                        };

                        scope.$apply(function () {
                            scope.$emit(YT_event.PLAYER_READY, data);
                        });
                    },
                    'onStateChange': function (event) {
                        var data = {
                            message: "",
                            player: player
                        };

                        switch (event.data) {
                            case YT.PlayerState.PLAYING:
                                data.message = "PLAYING";
                                break;
                            case YT.PlayerState.ENDED:
                                data.message = "ENDED";
                                break;
                            case YT.PlayerState.UNSTARTED:
                                data.message = "NOT PLAYING";
                                break;
                            case YT.PlayerState.PAUSED:
                                data.message = "PAUSED";
                                break;
                        }

                        scope.$apply(function () {
                            scope.$emit(YT_event.STATUS_CHANGE, data);
                        });
                    }
                }
            });
        });

        scope.$watch('height + width', function (newValue, oldValue) {
            if (newValue == oldValue) {
                return;
            }

            player.setSize(scope.width, scope.height);
        });

        scope.$watch('videoid', function (newValue, oldValue) {
            if (newValue == oldValue) {
                return;
            }

            player.cueVideoById(scope.videoid);
        });

        scope.$watch('currentTime', function (newValue, oldValue) {
            if (newValue == oldValue) {
                return;
            }

            if (newValue !== null) {
                player.seekTo(newValue);
            }
        });

        scope.$on(YT_event.STOP, function () {
            player.stopVideo();
            scope.currentTime = 0;
        });

        scope.$on(YT_event.PLAY, function () {
            player.playVideo();
            scope.currentTime = null;
        });

        scope.$on(YT_event.PAUSE, function () {
            player.pauseVideo();
            scope.currentTime = player.getCurrentTime();
        });

        scope.$on(YT_event.MOVE, function (event, args) {
            scope.currentTime = args.currentTime;
        });
    }
}