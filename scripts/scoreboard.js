//@ts-check

import { canvas, ctx } from "./common/canvas.js";

export class ScoreBoard {
	constructor() {
		this.scores = [0, 0];
	}

	update() {}

	draw() {
		ctx.save();
		ctx.globalAlpha = 0.5;
		ctx.fillStyle = "yellow";
		ctx.font = "50px fantasy";
		ctx.textBaseline = "top";

		ctx.textAlign = "left";
		ctx.fillText(this.scores[0].toString(), 10, 10);

		ctx.textAlign = "right";
		ctx.fillText(this.scores[1].toString(), canvas.width - 10, 10);

		ctx.restore();
	}
}
