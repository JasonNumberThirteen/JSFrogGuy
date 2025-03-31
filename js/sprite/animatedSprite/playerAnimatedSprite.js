class PlayerAnimatedSprite extends AnimatedSprite {
	destinationReachedEvent = new GameEvent();
	livesChangedEvent = new GameEvent();
	positionChangedEvent = new GameEvent();
	
	#initialPosition;
	#frameIndexesToDirections = {
		0: new Point(0, -1),
		1: new Point(0, 1),
		2: new Point(-1, 0),
		3: new Point(1, 0)
	};
	#gameScene;
	#lives;
	
	constructor() {
		super(PLAYER_SPRITE_SHEET_FILENAME, new Point(GAME_WINDOW_WIDTH*0.5 - 4, GAME_WINDOW_HEIGHT - 24), 8, 8);

		this.#initialPosition = this.getPosition();
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
		this.#lives = PLAYER_INITIAL_LIVES;

		this.#gameScene.gameWonEvent.addListener(this.#onGameWon.bind(this));
	}

	getLives() {
		return this.#lives;
	}

	processInput(key) {
		if(!this.isActive() || !this.#pressedAnyInputKey(key)) {
			return;
		}

		const currentPosition = this.getPosition();
		const movementDirection = this.#getMovementDirection(key);
		const newPosition = new Point(currentPosition.x + movementDirection.x*8, currentPosition.y + movementDirection.y*8);

		if(this.#gameScene.reachedAnyOfLeftDestinationPositions(newPosition)) {
			this.setPosition(this.#initialPosition);
			this.destinationReachedEvent.invoke(newPosition);
		} else if(this.#gameScene.positionIsHazardous(newPosition)) {
			if(--this.#lives > 0) {
				this.setPosition(this.#initialPosition);
			} else {
				this.setActive(false);
			}

			this.livesChangedEvent.invoke(this.#lives);
		} else {
			this.#setClampedPosition(newPosition);
			this.positionChangedEvent.invoke(newPosition);
		}

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

	#setClampedPosition(position) {
		const clampedX = MathMethods.clamp(position.x, 68, 180);
		const clampedY = MathMethods.clamp(position.y, 32, 120);
		const clampedPosition = new Point(clampedX, clampedY);
		
		this.setPosition(clampedPosition);
	}

	#getIndexByMovementDirection(movementDirection) {
		return Object.keys(this.#frameIndexesToDirections).find(key => this.#frameIndexesToDirections[key] === movementDirection);
	}

	#onGameWon() {
		this.setActive(false);
	}
}