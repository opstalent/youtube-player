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

export default class YoutubePlayerController {

    /**
     * @param $scope
     * @param $interval
     * @param YT_event
     */
    constructor($scope, $interval, YT_event) {
        this.scope = $scope;
        this.interval = $interval;
        this.YT_event = YT_event;

        this.progress = 0;
        this.duration = 0;
        this.playerStatus = "NOT PLAYING";
        this.currentTime = 0;


        scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
            var player = data.player;

            this.playerStatus = data.message;
            this.currentTime = player.getCurrentTime();

            this.showProgress(player);
        });

        scope.$on(YT_event.PLAYER_READY, function (event, data) {
            this.duration = data.duration;
        });
    }

    sendControlEvent(ctrlEvent, args) {
        if (args) {
            this.scope.$broadcast(ctrlEvent, args);
        } else {
            this.scope.$broadcast(ctrlEvent);
        }
    }

    move(event) {
        var bar = event.target.className === 'progress-bar progress-bar-info'
            ? event.target.parentNode
            : event.target;

        this.currentTime = event.offsetX / bar.offsetWidth * vm.duration;

        this.progress = this.currentTime / vm.duration * 100;
        this.sendControlEvent(this.YT_event.MOVE, {currentTime: this.currentTime});
    }

    showProgress(player) {
        if (this.currentTime !== null) {
            this.progress = this.currentTime / this.duration * 100;
        }
        if (this.playerStatus === 'PLAYING') {
            this.interval = $interval(function () {
                this.progress = player.getCurrentTime() / this.duration * 100;
            }, 500);
        } else {
            if (angular.isDefined(this.interval)) {
                $interval.cancel(this.interval);
                this.interval = undefined;
            }
        }
    }
}

YoutubePlayerController.$inject = ['$scope', '$interval', 'YT_event'];