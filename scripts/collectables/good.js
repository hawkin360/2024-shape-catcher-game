//@ts-check
import { CollectableItem } from "./collectable-base.js";

export class SimpleGoodItem extends CollectableItem {
	constructor(x = 0, y = 0) {
		super(x, y);
	}
}
