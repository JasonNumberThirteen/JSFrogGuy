class PlayerSlicedSprite extends SlicedSprite {
	destinationReachedEvent = new GameEvent();
	playerMovedFromInputEvent = new GameEvent();

	#hazardousPositionCheckTimer = new Timer(PLAYER_HAZARDOUS_POSITION_CHECK_FREQUENCY);
	#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
	#soundManager = FrogGuy.getSoundManager();
	#initialPosition;
	#parentObject;
	#field;
	#player;
	#input;
	#lives;
	
	constructor(position, player, field) {
		super(PLAYER_SPRITE_SHEET_FILENAME, position, PLAYER_SPRITE_DIMENSIONS);

		this.#initialPosition = this.getPosition();
		this.#field = field;
		this.#player = player;
		this.#input = this.#player.getInput();
		this.#lives = this.#player.getLives();

		this.#gameScene.getLevelStateManager().levelStateChangedEvent.addListener(this.#onLevelStateChanged.bind(this));
		this.#hazardousPositionCheckTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		this.#input.keyPressedEvent.addListener(this.#onKeyPressed.bind(this));
		this.#lives.livesChangedEvent.addListener(this.#onLivesChanged.bind(this));
		this.setCollisionRectangleOffset(new Rectangle(new Point(1, 1), new Point(-2, -2)));
	}

	update(deltaTime) {
		this.#hazardousPositionCheckTimer.update(deltaTime);
		this.#moveIfIsStandingOnObject(deltaTime);
	}

	#moveIfIsStandingOnObject(deltaTime) {
		if(!VariableMethods.variableIsDefined(this.#parentObject)) {
			return;
		}

		const fieldPosition = this.#field.getPosition();
		const fieldSize = this.#field.getSize();
		const speed = this.#parentObject.getMovementSpeed()*this.#parentObject.getMovementDirection()*deltaTime;
		const maxX = fieldPosition.x + fieldSize.x - PLAYER_SPRITE_DIMENSIONS.y;
		
		this.setX(MathMethods.clamp(this.getX() + speed, fieldPosition.x, maxX));
	}

	#onLevelStateChanged(levelState) {
		if(levelState === LevelState.Won) {
			this.#deactivate();
		}
	}

	#onTimerFinished() {
		if(this.#player.isStandingOnHazardousPosition()) {
			this.#onIntersectingWithHazardousObject(this.getPosition());
		}

		if(this.isActive()) {
			this.#hazardousPositionCheckTimer.startTimer();
		}
	}

	#onKeyPressed(inputKeyData) {
		this.#operateOnNextPosition(inputKeyData);
		this.setCurrentColumnIndex(inputKeyData.getAnimationIndex());
	}

	#operateOnNextPosition(inputKeyData) {
		const nextPosition = this.#getNextPosition(inputKeyData);

		if(this.#gameScene.getField().reachedAnyOfAvailableDestinations(nextPosition)) {
			this.#onDestinationReached(nextPosition);
		} else if(this.#player.positionIsHazardous(this.#getPositionCollisionRectangle(nextPosition))) {
			this.#onIntersectingWithHazardousObject(nextPosition);
		} else {
			this.#moveToPosition(nextPosition);
		}
	}

	#getNextPosition(inputKeyData) {
		const currentPosition = this.getPosition();
		const movementDirection = inputKeyData.getMovementDirection();
		const movementStep = PositionMethods.getMultiplicationOf(movementDirection, PLAYER_SPRITE_DIMENSIONS);

		return PositionMethods.getSumOf(currentPosition, movementStep);
	}

	#onDestinationReached(position) {
		this.destinationReachedEvent.invoke(position);
		this.#respawn();
	}

	#getPositionCollisionRectangle(position) {
		const rectangle = new Rectangle(position, this.getSize());
		
		return RectangleMethods.getSumOf(rectangle, this.getCollisionRectangleOffset());
	}

	#onIntersectingWithHazardousObject(position) {
		this.#soundManager.playSoundDependingOnHazardousObjectType(this.#player.getHazardousObjectType(this.#getPositionCollisionRectangle(position)));
		this.#lives.reduceLivesBy(1);
	}

	#moveToPosition(position) {
		this.#setPositionWithinField(position);

		this.#parentObject = this.#player.getObjectOnRiverOnPlayerPositionIfPossible();
	}

	#setPositionWithinField(position) {
		const fieldPosition = this.#field.getPosition();
		const fieldSize = this.#field.getSize();
		const spriteSize = this.getSize();
		const frogLocationFieldAreaHeight = this.#field.getFrogLocationFieldArea().getHeight();
		const minPosition = new Point(fieldPosition.x, fieldPosition.y + frogLocationFieldAreaHeight);
		const maxPosition = new Point(fieldPosition.x + fieldSize.x - spriteSize.x, fieldPosition.y + fieldSize.y - spriteSize.y - frogLocationFieldAreaHeight);
		const previousPosition = this.getPosition();
		
		this.setPosition(PositionMethods.clamp(position, minPosition, maxPosition));

		const currentPosition = this.getPosition();

		if(!previousPosition.equals(currentPosition)) {
			this.playerMovedFromInputEvent.invoke(currentPosition);
		}
	}

	#onLivesChanged(parameters) {
		if(parameters.numberOfLivesWasIncreased) {
			return;
		}
		
		if(parameters.lives > 0) {
			this.#respawn();
		} else {
			this.#deactivate();
		}
	}

	#respawn() {
		this.setPosition(this.#initialPosition);
		this.setCurrentColumnIndex(0);

		this.#parentObject = undefined;
	}

	#deactivate() {
		this.setActive(false);
	}
}