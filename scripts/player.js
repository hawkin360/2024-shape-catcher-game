//@ts-check
import { canvas, ctx } from "./common/canvas.js";

export class Player {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
		this.width = 75;
		this.height = 25;
	}

	update() {}

	draw() {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
