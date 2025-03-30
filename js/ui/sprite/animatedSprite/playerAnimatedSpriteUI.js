class PlayerAnimatedSpriteUI extends AnimatedSpriteUI {
	#frameIndexesToDirections = {
		0: new Point(0, -1),
		1: new Point(0, 1),
		2: new Point(-1, 0),
		3: new Point(1, 0)
	};
	
	constructor() {
		super(PLAYER_SPRITE_FILENAME, new Point(GAME_WINDOW_WIDTH*0.5 - 4, GAME_WINDOW_HEIGHT - 24), 8, 8);
	}

	processInput(key) {
		if(!this.#pressedAnyInputKey(key)) {
			return;
		}
		
		const currentPosition = this.getPosition();
		const movementDirection = this.#getMovementDirection(key);
		const newX = MathMethods.clamp(currentPosition.x + movementDirection.x*8, 68, 180);
		const newY = MathMethods.clamp(currentPosition.y + movementDirection.y*8, 32, 120);
		const newPosition = new Point(newX, newY);

		this.setPosition(newPosition);
		this.setCurrentColumnIndex(this.#getIndexByMovementDirection(movementDirection));
	}

	#pressedAnyInputKey(key) {
		const inputKeys = [PLAYER_UP_MOVEMENT_KEY, PLAYER_DOWN_MOVEMENT_KEY, PLAYER_LEFT_MOVEMENT_KEY, PLAYER_RIGHT_MOVEMENT_KEY];
		
		return inputKeys.some(inputKey => inputKey === key);
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