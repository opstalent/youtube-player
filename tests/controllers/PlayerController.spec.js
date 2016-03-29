import { expect } from 'chai';
import {PlayerController as Controller} from "/src/controllers/PlayerController";

describe("ArticleController", () => {
    var controller;

    beforeEach(() => {
        controller = new Controller();
    });

    it("Test Play function", () => {
        expect(controller.play()).to.equal('PLAYING');
    });
});