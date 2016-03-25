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

export class PlayerController {

    /**
     * @param $scope
     * @param $interval
     * @param $element
     * @param Loader
     */
    constructor($scope, $interval, $element, Loader) {
        this.$interval = $interval;
        this.$element = $element;
        this.playerStatus = "NOT PLAYING";
        this.playerStatuses = {
            PLAYING: "PLAYING",
            ENDED: "ENDED",
            UNSTARTED: "NOT PLAYING",
            BUFFERING: "BUFFERING",
            CUED: "CUED",
            PAUSED: "PAUSED"
        };
        this.interval = undefined;
        this.player = undefined;
        this.progress = 0;
        this.time = 0;

        Loader.whenLoaded().then(this.whenLoaded.bind(this));

        $scope.$watch('height + width', this.onSize.bind(this));
        $scope.$watch('videoid', this.onId.bind(this));
    }

    stop() {
        if (this.player) {
            this.player.stopVideo();
            return this.playerStatuses.UNSTARTED;
        }
        return false;
    }

    play() {
        if (this.player) {
            this.player.playVideo();
            return this.playerStatuses.PLAYING;
        }
        return false;
    }

    pause() {
        if (this.player) {
            this.player.pauseVideo();
            return this.playerStatuses.PAUSED;
        }
        return false;
    }

    move(event) {
        var bar = event.target.className === 'progress-bar progress-bar-info' ? event.target.parentNode : event.target;

        var duration = this.player.getDuration();
        var currentTime = event.offsetX / bar.offsetWidth * duration;

        this.time = currentTime;
        this.progress = currentTime / duration * 100;

        if (this.player) {
            this.player.seekTo(currentTime);
            return currentTime;
        }
        return false;
    }

    showProgress() {
        this.time = this.player.getCurrentTime();
        this.progress = this.time / this.player.getDuration() * 100;

        if (this.playerStatus === 'PLAYING') {
            this.interval = this.$interval(() => {
                this.time = this.player.getCurrentTime();
                this.progress = this.time / this.player.getDuration() * 100;
            }, 500);
        } else {
            if (angular.isDefined(this.interval)) {
                this.$interval.cancel(this.interval);
                this.interval = undefined;
            }
        }
        return this.progress;
    }

    onSize(newValue, oldValue) {
        if (!this.player || newValue == oldValue) {
            return;
        }

        this.player.setSize(this.width, this.height);
        return {width: this.width, height: this.height};
    }

    onId(newValue, oldValue) {
        if (!this.player || newValue == oldValue) {
            return;
        }

        this.player.loadVideoById(this.videoid);
        return this.videoid;
    }

    whenLoaded() {
        let playerElement = this.$element.children()[0].getElementsByClassName("player")[0];

        this.player = new YT.Player(playerElement, {
            playerVars: this.options || {
                autoplay: 0,
                html5: 1,
                theme: "light",
                modesbranding: 0,
                color: "white",
                iv_load_policy: 3,
                showinfo: 0,
                controls: 0
            },
            height: this.height,
            width: this.width,
            videoId: this.videoid,

            events: {
                'onStateChange': (event) => {
                    console.log(event);
                    switch (event.data) {
                        case YT.PlayerState.PLAYING:
                            this.playerStatus = "PLAYING";
                            break;
                        case YT.PlayerState.ENDED:
                            this.playerStatus = "ENDED";
                            break;
                        case YT.PlayerState.UNSTARTED:
                            this.playerStatus = "NOT PLAYING";
                            break;
                        case YT.PlayerState.BUFFERING:
                            this.playerStatus = "BUFFERING";
                            break;
                        case YT.PlayerState.CUED:
                            this.playerStatus = "CUED";
                            break;
                        case YT.PlayerState.PAUSED:
                            this.playerStatus = "PAUSED";
                            break;
                    }
                }
            }
        });
        return this.playerStatus;
    }
}

PlayerController.$inject = ['$scope', '$interval', '$element', 'Loader'];