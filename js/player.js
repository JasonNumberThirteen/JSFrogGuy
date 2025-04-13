class Player {
	#sprite;

	constructor(field) {
		this.#sprite = new PlayerSlicedSprite(field);
	}

	getSprite() {
		return this.#sprite;
	}

	update(deltaTime) {
		this.#sprite.update(deltaTime);
	}

	draw() {
		this.#sprite.draw();
	}
}