//@ts-check

export class CollectableItem {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;

        this.isCollected = false;
        this.value = 0;
    }

    update() {}
    draw() {}
}