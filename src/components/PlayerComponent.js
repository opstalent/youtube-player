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

import {PlayerController} from "../controllers/PlayerController";

export class PlayerComponent {

    constructor() {
        this.bindings = {
            videoid: "@",
            height: "@",
            width: "@",
            options: "@"
        };
        this.template = require('./../views/player.html');
        this.controller = PlayerController;
    }
}