class PlayerSlicedSprite extends SlicedSprite {
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
	#parentObject;
	#hazardousPositionCheckTimer;
	#field;
	
	constructor(field) {
		super(PLAYER_SPRITE_SHEET_FILENAME, new Point(HALF_OF_GAME_WINDOW_WIDTH - 4, PLAYER_INITIAL_Y), 8, 8);

		this.#initialPosition = this.getPosition();
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
		this.#lives = PLAYER_INITIAL_LIVES;
		this.#hazardousPositionCheckTimer = new Timer(PLAYER_HAZARDOUS_POSITION_CHECK_FREQUENCY, true);
		this.#field = field;

		this.#gameScene.gameWonEvent.addListener(this.#deactivate.bind(this));
		this.#hazardousPositionCheckTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
	}

	update(deltaTime) {
		this.#hazardousPositionCheckTimer.update(deltaTime);

		if(typeof(this.#parentObject) !== "undefined") {
			var x = this.getPosition().x;
			const fieldPosition = this.#field.getPosition();
			const fieldSize = this.#field.getSize();
			
			x = MathMethods.clamp(x + this.#parentObject.getMovementSpeed()*this.#parentObject.getMovementDirection()*deltaTime, fieldPosition.x, fieldPosition.x + fieldSize.x - 8);
			this.getPosition().x = x;
		}
	}

	getLives() {
		return this.#lives;
	}

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x + 1, position.y + 1), new Point(size.x - 2, size.y - 2));
	}

	processInput(key) {
		if(!this.isActive() || this.#gameScene.gameIsOver()) {
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

		if(this.#gameScene.reachedAnyOfAvailableFieldDestinations(nextPosition)) {
			this.#onReachedDestinationPosition(nextPosition);
		} else if(this.#gameScene.playerIsStandingOnHazardousPosition(nextPosition)) {
			this.#onReachedHazardousPosition();
		} else {
			this.#setPositionWithinField(nextPosition);

			this.#parentObject = this.#gameScene.getObjectOnRiverOnPlayerPositionIfPossible();
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
		this.destinationReachedEvent.invoke(position);
		this.#respawn();
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

		this.#parentObject = undefined;
	}

	#deactivate() {
		this.setActive(false);
	}

	#setPositionWithinField(position) {
		const fieldPosition = this.#field.getPosition();
		const fieldSize = this.#field.getSize();
		const minPosition = new Point(fieldPosition.x, fieldPosition.y + this.#field.getFrogLocationFieldArea().getSize().y);
		const maxPosition = new Point(fieldPosition.x + fieldSize.x, fieldPosition.y + fieldSize.y);
		const previousPosition = this.getPosition();
		
		this.setPosition(PositionMethods.clamp(position, minPosition, maxPosition));

		const currentPosition = this.getPosition();

		if(!previousPosition.equals(currentPosition)) {
			this.positionChangedEvent.invoke(position);
		}
	}

	#onTimerFinished() {
		if(this.#gameScene.playerIsStandingOnHazardousPosition()) {
			this.#onReachedHazardousPosition();
		}

		if(this.isActive()) {
			this.#hazardousPositionCheckTimer.startTimer();
		}
	}
}