class TurtleAnimatedSprite extends AnimatedSprite {
	#movementSpeed;
	#movementDirection = -1;
	#animationTimer;
	#animationFrames = [0, 1, 2, 3, 4, -1, 4, 3, 2, 1];
	#currentAnimationFrame = 0;
	#initialMovementSpeed;
	
	constructor(position, movementSpeed) {
		super(TURTLE_SPRITE_SHEET_FILENAME, position, 8, 8);

		this.#initialMovementSpeed = movementSpeed;
		this.#movementSpeed = this.#initialMovementSpeed + (this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_LEVEL*(FrogGuy.getData().getCurrentLevelNumber() - 1));
		this.#animationTimer = new Timer(0.25, true);

		this.setCurrentColumnIndex(this.#animationFrames[this.#currentAnimationFrame]);
		this.#animationTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).frogSavedEvent.addListener(this.#onFrogSaved.bind(this));
	}

	isHidden() {
		return this.getCurrentColumnIndex() === -1;
	}

	update(deltaTime) {
		const position = this.getPosition();
		
		position.x += this.#movementSpeed*this.#movementDirection*deltaTime;

		this.setPosition(position);
		this.#animationTimer.update(deltaTime);
	}

	getMovementSpeed() {
		return this.#movementSpeed;
	}

	getMovementDirection() {
		return this.#movementDirection;
	}

	#onTimerFinished() {
		this.#currentAnimationFrame = (this.#currentAnimationFrame + 1) % this.#animationFrames.length;

		this.setCurrentColumnIndex(this.#animationFrames[this.#currentAnimationFrame]);
		this.#animationTimer.startTimer();
	}

	#onFrogSaved() {
		this.#movementSpeed += this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_SAVED_FROG;
	}
}