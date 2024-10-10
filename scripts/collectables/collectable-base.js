//@ts-check
import { ctx } from "../common/canvas.js";

export class CollectableItem {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;

		this.emoji = "⭐";

		this.width = 10;
		this.height = 10;

		this.isCollectable = true;
		this.isCollected = false;
		this.value = 1;
		this.alpha = 0;
	}

	update(elapsedTime) {}

	draw() {
		ctx.save();
		// ctx.fillStyle = "yellow";
		// ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = this.alpha;
		ctx.font = `${this.width}px serif`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		ctx.fillText(
			this.emoji,
			this.x + this.width / 2,
			this.y + this.height / 2 + 2
		);
		ctx.restore();
	}
}
