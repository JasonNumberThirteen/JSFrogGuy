class Player {
	#lives;
	#sprite;

	constructor(field) {
		this.#lives = new PlayerLives(PLAYER_INITIAL_LIVES);
		this.#sprite = new PlayerSlicedSprite(this, field);
	}

	getLives() {
		return this.#lives;
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