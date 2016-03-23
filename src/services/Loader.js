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

export class Loader {

    /**
     * @param $q
     * @param $window
     */
    constructor($q, $window) {
        this.delay = $q.defer();
        this.window = $window;

        this.load();
    }

    load() {
        var tag = document.createElement('script');
        var firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.window.onYouTubeIframeAPIReady = () => {
            this.delay.resolve();
        };
    }

    whenLoaded() {
        return this.delay.promise;
    }
}

Loader.$inject = ['$q', '$window'];