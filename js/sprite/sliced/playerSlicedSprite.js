class PlayerSlicedSprite extends SlicedSprite {
	destinationReachedEvent = new GameEvent();
	positionChangedEvent = new GameEvent();
	
	#initialPosition;
	#gameScene;
	#parentObject;
	#hazardousPositionCheckTimer;
	#field;
	#player;
	#input;
	#lives;
	
	constructor(player, field) {
		super(PLAYER_SPRITE_SHEET_FILENAME, new Point(HALF_OF_GAME_WINDOW_WIDTH - PLAYER_SPRITE_DIMENSIONS.x*0.5, PLAYER_INITIAL_Y), PLAYER_SPRITE_DIMENSIONS);

		this.#initialPosition = this.getPosition();
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
		this.#hazardousPositionCheckTimer = new Timer(PLAYER_HAZARDOUS_POSITION_CHECK_FREQUENCY, true);
		this.#field = field;
		this.#player = player;
		this.#input = this.#player.getInput();
		this.#lives = this.#player.getLives();

		this.#gameScene.getGameManager().gameWonEvent.addListener(this.#deactivate.bind(this));
		this.#hazardousPositionCheckTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		this.#input.keyPressedEvent.addListener(this.#onKeyPressed.bind(this));
		this.#lives.livesChangedEvent.addListener(this.#onLivesChanged.bind(this));
	}

	update(deltaTime) {
		this.#hazardousPositionCheckTimer.update(deltaTime);

		if(VariableMethods.variableIsDefined(this.#parentObject)) {
			var x = this.getPosition().x;
			const fieldPosition = this.#field.getPosition();
			const fieldSize = this.#field.getSize();
			
			x = MathMethods.clamp(x + this.#parentObject.getMovementSpeed()*this.#parentObject.getMovementDirection()*deltaTime, fieldPosition.x, fieldPosition.x + fieldSize.x - PLAYER_SPRITE_DIMENSIONS.y);
			this.getPosition().x = x;
		}
	}

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x + 1, position.y + 1), new Point(size.x - 2, size.y - 2));
	}

	#onKeyPressed(inputKeyData) {
		this.#operateOnNextPosition(inputKeyData);
		this.setCurrentColumnIndex(inputKeyData.getAnimationIndex());
	}

	#operateOnNextPosition(inputKeyData) {
		const nextPosition = this.#getNextPosition(inputKeyData);
		const playerSize = this.getSize();

		if(this.#gameScene.getField().reachedAnyOfAvailableDestinations(nextPosition)) {
			this.#onReachedDestinationPosition(nextPosition);
		} else if(this.#player.positionIsHazardous(new Rectangle(new Point(nextPosition.x + 1, nextPosition.y + 1), new Point(playerSize.x - 2, playerSize.y - 2)))) {
			this.#lives.reduceLivesBy(1);
		} else {
			this.#setPositionWithinField(nextPosition);

			this.#parentObject = this.#player.getObjectOnRiverOnPlayerPositionIfPossible();
		}
	}

	#getNextPosition(inputKeyData) {
		const currentPosition = this.getPosition();
		const movementDirection = inputKeyData.getMovementDirection();
		const movementStep = PositionMethods.getMultiplicationOf(movementDirection, PLAYER_SPRITE_DIMENSIONS);

		return PositionMethods.getSumOf(currentPosition, movementStep);
	}

	#onReachedDestinationPosition(position) {
		this.destinationReachedEvent.invoke(position);
		this.#respawn();
	}

	#onLivesChanged(lives) {
		if(lives > 0) {
			this.#respawn();
		} else {
			this.#deactivate();
		}
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
		const spriteSize = this.getSize();
		const frogLocationFieldAreaHeight = this.#field.getFrogLocationFieldArea().getSize().y;
		const minPosition = new Point(fieldPosition.x, fieldPosition.y + frogLocationFieldAreaHeight);
		const maxPosition = new Point(fieldPosition.x + fieldSize.x - spriteSize.x, fieldPosition.y + fieldSize.y - spriteSize.y - frogLocationFieldAreaHeight);
		
		this.setPosition(PositionMethods.clamp(position, minPosition, maxPosition));
	}

	#onTimerFinished() {
		if(this.#player.isStandingOnHazardousPosition()) {
			this.#lives.reduceLivesBy(1);
		}

		if(this.isActive()) {
			this.#hazardousPositionCheckTimer.startTimer();
		}
	}
}