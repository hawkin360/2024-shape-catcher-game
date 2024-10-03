//@ts-check
import { canvas, ctx } from "./common/canvas.js";
import { Player } from "./player.js";

let player = new Player();

let lastTimestamp = 0;

function gameLoop(timestamp) {
	let elapsedTime = timestamp - lastTimestamp;
	lastTimestamp = timestamp;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	player.update();
	player.draw();

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
