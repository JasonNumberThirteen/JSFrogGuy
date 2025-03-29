class PlayerAnimatedSpriteUI extends AnimatedSpriteUI {
	#frameIndexesToDirections = {
		0: new Point(0, -1),
		1: new Point(0, 1),
		2: new Point(-1, 0),
		3: new Point(1, 0)
	};
	
	constructor() {
		super(PLAYER_SPRITE_FILENAME, new Point(GAME_WINDOW_WIDTH*0.5 - 4, GAME_WINDOW_HEIGHT - 12), 8, 8);
	}

	processInput(key) {
		const currentPosition = this.getPosition();
		const movementDirection = this.#getMovementDirection(key);
		const newPosition = new Point(currentPosition.x + movementDirection.x*8, currentPosition.y + movementDirection.y*8);

		this.setPosition(newPosition);
		this.setCurrentColumnIndex(this.#getIndexByMovementDirection(movementDirection));
	}

	#getMovementDirection(key) {
		switch (key) {
			case PLAYER_UP_MOVEMENT_KEY:
				return this.#frameIndexesToDirections[0];
			case PLAYER_DOWN_MOVEMENT_KEY:
				return this.#frameIndexesToDirections[1];
			case PLAYER_LEFT_MOVEMENT_KEY:
				return this.#frameIndexesToDirections[2];
			case PLAYER_RIGHT_MOVEMENT_KEY:
				return this.#frameIndexesToDirections[3];
			default:
				return new Point();
		}
	}

	#getIndexByMovementDirection(movementDirection) {
		return Object.keys(this.#frameIndexesToDirections).find(key => this.#frameIndexesToDirections[key] === movementDirection);
	}
}