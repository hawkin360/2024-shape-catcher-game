//@ts-check

import { SimpleGoodItem } from "./collectables/good.js";
import { canvas } from "./common/canvas.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";
import { ScoreBoard } from "./scoreboard.js";
import { rand } from "./utilities.js";

export class GameManager {
	constructor() {
		this.maxScore = 10;

		this.players = [];
		this.collectables = [];
		this.enemies = [];

		this.scoreboard = new ScoreBoard();
		this.isGameOver = false;

		this.goodSpawn = {
			lastTime: 0,
			nextTime: 0,
			next: function () {
				this.lastTime = 0;
				this.nextTime = rand(1 * 1000, 3 * 1000);
			},
		};

		this.enemySpawn = {
			lastTime: 0,
			nextTime: 0,
			next: function () {
				this.lastTime = 0;
				this.nextTime = rand(5 * 1000, 15 * 1000);
			},
		};

		this.spawner(0);
	}

	initialize() {
		this.players = [];
		let p1 = new Player(canvas.width / 2 - 50, canvas.height / 2);
		p1.x -= p1.width / 2;
		p1.y -= p1.height / 2;
		p1.keyBindings = {
			up: "KeyW",
			down: "KeyS",
			right: "KeyD",
			left: "KeyA",
		};

		this.players.push(p1);

		let p2 = new Player(canvas.width / 2 + 50, canvas.height / 2);
		p2.x -= p1.width / 2;
		p2.y -= p1.height / 2;
		p2.emoji = "🥸";

		this.players.push(p2);

		this.enemies = [];
		let e1 = new Enemy();
		this.enemies.push(e1);
	}

	update(elapsedTime) {
		if (this.isGameOver) {
			return;
		}

		this.spawner(elapsedTime);

		this.collectables = this.collectables.filter((c) => c.isCollectable);

		this.players.forEach((p) => {
			p.update();
		});

		this.collectables.forEach((c) => {
			c.update(elapsedTime);
		});

		this.enemies.forEach((e) => {
			e.update(elapsedTime);
		});

		this.checkCollisions();

		if (this.players.some((p) => p.score >= this.maxScore)) {
			this.isGameOver = true;
		}
	}

	checkCollisions() {
		this.players.forEach((p, i) => {
			this.collectables.forEach((c) => {
				if (c.isCollected) {
					return;
				}

				let isColliding = this.isColliding(
					p.x,
					p.y,
					p.width,
					p.height,
					c.x,
					c.y,
					c.width,
					c.height
				);

				if (isColliding) {
					//console.log("collision detected", p, c);
					c.isCollected = true;
					c.isCollectable = false;
					p.score += c.value;
					this.scoreboard.scores[i] = p.score;
				}
			});

			this.enemies.forEach((e) => {
				if (!e.isActive) {
					return;
				}

				let isColliding = this.isColliding(
					p.x,
					p.y,
					p.width,
					p.height,
					e.x,
					e.y,
					e.width,
					e.height
				);

				if (isColliding) {
					//console.log("collision detected", p, c);
					p.score -= e.value;
					e.isActive = false;

					// prevent the score from going negative
					// zero will be the lowest
					p.score = Math.max(0, p.score);
					this.scoreboard.scores[i] = p.score;
				}
			});
		});
	}

	isColliding(x1, y1, w1, h1, x2, y2, w2, h2) {
		// not overlapping in horizontal
		if (x1 + w1 < x2 || x1 > x2 + w2) {
			return false;
		}

		// not overlapping in vertical
		if (y1 + h1 < y2 || y1 > y2 + h2) {
			return false;
		}

		return true;
	}

	spawner(elapsedTime) {
		this.goodSpawn.lastTime += elapsedTime;
		this.enemySpawn.lastTime += elapsedTime;

		if (this.goodSpawn.lastTime > this.goodSpawn.nextTime) {
			// spawn a good item
			const buffer = 50;
			const sx = rand(buffer, canvas.width - buffer);
			const sy = rand(buffer, canvas.height - buffer);
			const item = new SimpleGoodItem(sx, sy);
			this.collectables.push(item);
			// reset the spawn timer and get a new spawn time
			this.goodSpawn.next();
			//debugger;
		}

		if (this.enemySpawn.lastTime > this.enemySpawn.nextTime) {
			// spawn a good item
			const buffer = 50;
			const sx = rand(buffer, canvas.width - buffer);
			const sy = rand(buffer, canvas.height - buffer);
			const item = new Enemy(sx, sy);
			this.enemies.push(item);
			// reset the spawn timer and get a new spawn time
			this.enemySpawn.next();
			//debugger;
		}
	}

	draw() {
		this.players.forEach((p) => {
			p.draw();
		});

		this.collectables.forEach((c) => {
			c.draw();
		});

		this.enemies.forEach((e) => {
			e.draw();
		});

		this.scoreboard.draw();
	}
}
