//@ts-check
import { canvas, ctx } from "./common/canvas.js";
import { rand } from "./utilities.js";

export class Enemy {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;

		const emojis = ["🦆", "🐒", "🦍", "🦧"];
		this.emoji = emojis[rand(0, emojis.length)];
		this.width = 40;
		this.height = 40;

		this.isActive = true;
		this.cooldown = {
			current: 0,
			duration: 1 * 1000,
		};

		this.speed = {
			min: 2,
			max: 7,
		};

		this.move = {
			x: {
				direction: rand(1, 10) < 5 ? -1 : 1,
				speed: 0,
			},
			y: {
				direction: rand(1, 10) < 5 ? -1 : 1,
				speed: 0,
			},
			randomize: function (min, max) {
				this.x.speed = rand(min, max);
				this.y.speed = rand(min, max);
			},
		};

		this.move.randomize(this.speed.min, this.speed.max);

		this.value = 1;
	}

	update(elapsedTime) {
		this.x += this.move.x.speed * this.move.x.direction;
		this.y += this.move.y.speed * this.move.y.direction;

		if (this.x < 0) {
			this.x = 0;
			this.move.x.direction = 1;
			this.move.randomize(this.speed.min, this.speed.max);
		}

		if (this.x + this.width > canvas.width) {
			this.x = canvas.width - this.width;
			this.move.x.direction = -1;
			this.move.randomize(this.speed.min, this.speed.max);
		}

		if (this.y < 0) {
			this.y = 0;
			this.move.y.direction = 1;
			this.move.randomize(this.speed.min, this.speed.max);
		}

		if (this.y + this.height > canvas.height) {
			this.y = canvas.height - this.height;
			this.move.y.direction = -1;
			this.move.randomize(this.speed.min, this.speed.max);
		}

		if (!this.isActive) {
			this.cooldown.current += elapsedTime;
			if (this.cooldown.current > this.cooldown.duration) {
				this.isActive = true;
				this.cooldown.current = 0;
			}
		}
	}

	draw() {
		ctx.save();
		// ctx.fillStyle = "red";
		// ctx.fillRect(this.x, this.y, this.width, this.height);

        if (!this.isActive) {
			ctx.globalAlpha = 0.3;
		}
		ctx.font = `${this.width}px serif`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		//https://emojipedia.org/
		ctx.fillText(
			this.emoji,
			this.x + this.width / 2,
			this.y + this.height / 2 + 4
		);
		ctx.restore();
	}
}
