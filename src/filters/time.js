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

export function time() {
    return function (input) {
        var inputs = parseInt(input, 10);
        var hours = Math.floor(inputs / 3600);
        var minutes = Math.floor((inputs - (hours * 3600)) / 60);
        var seconds = inputs - (hours * 3600) - (minutes * 60);

        return (hours > 0 ? ((hours < 10 ? "0" + hours : hours) + ':') : '') + (minutes < 10 ? "0" + minutes : minutes) + ':' + (seconds < 10 ? "0" + seconds : seconds);
    };
}