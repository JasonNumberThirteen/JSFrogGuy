class VehicleAnimatedSprite extends AnimatedSprite {
	#movementSpeed;
	#moveToRight;
	#initialMovementSpeed;
	
	constructor(filename, position, columnIndex, frameWidth, frameHeight, movementSpeed, moveToRight) {
		super(filename, position, frameWidth, frameHeight);
		this.setCurrentColumnIndex(columnIndex);

		this.#initialMovementSpeed = movementSpeed;
		this.#movementSpeed = this.#initialMovementSpeed + (this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_LEVEL*(FrogGuy.getData().getCurrentLevelNumber() - 1));
		this.#moveToRight = moveToRight;

		console.log(this.#initialMovementSpeed);
		console.log(this.#movementSpeed);

		if(this.#moveToRight) {
			this.setCurrentRowIndex(1);
		}

		FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).frogSavedEvent.addListener(this.#onFrogSaved.bind(this));
	}

	update(deltaTime) {
		const position = this.getPosition();
		const movementDirection = this.#moveToRight ? 1 : -1;
		const leftSide = 68;
		const rightSide = 188;
		const frameWidth = this.getFrameWidth();

		position.x += this.#movementSpeed*movementDirection*deltaTime;

		if(!this.#moveToRight && position.x < leftSide - frameWidth) {
			position.x = rightSide + frameWidth;
		} else if(this.#moveToRight && position.x > rightSide) {
			position.x = leftSide - frameWidth*2;
		}

		this.setPosition(position);
	}

	#onFrogSaved() {
		this.#movementSpeed += this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_SAVED_FROG;
	}
}