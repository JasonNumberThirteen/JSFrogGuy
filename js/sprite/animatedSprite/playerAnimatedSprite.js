class PlayerAnimatedSprite extends AnimatedSprite {
	destinationReachedEvent = new GameEvent();
	livesChangedEvent = new GameEvent();
	positionChangedEvent = new GameEvent();
	
	#inputKeyData = [
		new PlayerInputKeyData(PLAYER_UP_MOVEMENT_KEY, new Point(0, -1), 0),
		new PlayerInputKeyData(PLAYER_DOWN_MOVEMENT_KEY, new Point(0, 1), 1),
		new PlayerInputKeyData(PLAYER_LEFT_MOVEMENT_KEY, new Point(-1, 0), 2),
		new PlayerInputKeyData(PLAYER_RIGHT_MOVEMENT_KEY, new Point(1, 0), 3)
	];
	#initialPosition;
	#gameScene;
	#lives;
	
	constructor() {
		super(PLAYER_SPRITE_SHEET_FILENAME, new Point(GAME_WINDOW_WIDTH*0.5 - 4, GAME_WINDOW_HEIGHT - 24), 8, 8);

		this.#initialPosition = this.getPosition();
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
		this.#lives = PLAYER_INITIAL_LIVES;

		this.#gameScene.gameWonEvent.addListener(this.#deactivate.bind(this));
	}

	getLives() {
		return this.#lives;
	}

	processInput(key) {
		if(!this.isActive()) {
			return;
		}

		const inputKeyData = this.#inputKeyData.find(inputKeyData => inputKeyData.getInputKey() === key);

		this.#operateOnInputKeyData(inputKeyData);
	}

	#operateOnInputKeyData(inputKeyData) {
		if(typeof(inputKeyData) === "undefined") {
			return;
		}
		
		this.#operateOnNextPosition(inputKeyData);
		this.setCurrentColumnIndex(inputKeyData.getAnimationIndex());
	}

	#operateOnNextPosition(inputKeyData) {
		const nextPosition = this.#getNextPosition(inputKeyData);

		if(this.#gameScene.reachedAnyOfLeftDestinationPositions(nextPosition)) {
			this.#onReachedDestinationPosition(nextPosition);
		} else if(this.#gameScene.positionIsHazardous(nextPosition)) {
			this.#onReachedHazardousPosition();
		} else {
			this.#setPositionWithinField(nextPosition);
		}
	}

	#getNextPosition(inputKeyData) {
		const currentPosition = this.getPosition();
		const movementDirection = inputKeyData.getMovementDirection();
		const x = currentPosition.x + movementDirection.x*8;
		const y = currentPosition.y + movementDirection.y*8;

		return new Point(x, y);
	}

	#onReachedDestinationPosition(position) {
		this.#respawn();
		this.destinationReachedEvent.invoke(position);
	}

	#onReachedHazardousPosition() {
		if(--this.#lives > 0) {
			this.#respawn();
		} else {
			this.#deactivate();
		}

		this.livesChangedEvent.invoke(this.#lives);
	}

	#respawn() {
		this.setPosition(this.#initialPosition);
	}

	#deactivate() {
		this.setActive(false);
	}

	#setPositionWithinField(position) {
		const minPosition = new Point(68, 32);
		const maxPosition = new Point(180, 120);
		
		this.setPosition(PositionMethods.clamp(position, minPosition, maxPosition));
		this.positionChangedEvent.invoke(position);
	}
}