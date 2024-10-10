export function rand(min, max) {
	let upper = max - min;
	let r = Math.floor(Math.random() * upper) + min;
	return r;
}
