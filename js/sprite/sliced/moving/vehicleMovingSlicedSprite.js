class VehicleMovingSlicedSprite extends MovingSlicedSprite {
	#initialMovementSpeed;
	#field;
	
	constructor(filename, position, columnIndex, frameWidth, frameHeight, movementSpeed, moveToRight) {
		super(filename, position, columnIndex, frameWidth, frameHeight, movementSpeed, moveToRight);

		this.#initialMovementSpeed = movementSpeed;

		if(this.isMovingRight()) {
			this.setCurrentRowIndex(1);
		}

		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_LEVEL*(FrogGuy.getData().getCurrentLevelNumber() - 1));
		FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).frogSavedEvent.addListener(this.#onFrogSaved.bind(this));
	}

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x, position.y + 1), new Point(size.x, size.y - 2));
	}

	update(deltaTime) {
		super.update(deltaTime);
		
		const field = this.#getField();
		const fieldPosition = field.getPosition();
		const fieldSize = field.getSize();
		const vehiclePosition = this.getPosition();
		const leftSide = fieldPosition.x;
		const rightSide = fieldPosition.x + fieldSize.x;
		const frameWidth = this.getFrameWidth();
		const isMovingRight = this.isMovingRight();

		if(!isMovingRight && vehiclePosition.x < leftSide - frameWidth) {
			vehiclePosition.x = rightSide + frameWidth;
		} else if(isMovingRight && vehiclePosition.x > rightSide) {
			vehiclePosition.x = leftSide - frameWidth*2;
		}

		this.setPosition(vehiclePosition);
	}

	#onFrogSaved() {
		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_SAVED_FROG);
	}

	#increaseMovementSpeedIfPossibleBy(value) {
		this.setMovementSpeed(MathMethods.clamp(this.getMovementSpeed() + value, this.#initialMovementSpeed, OBJECTS_MOVEMENT_SPEED_UPPER_BOUND));
	}

	#getField() {
		this.#field = this.#field || FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getField();

		return this.#field;
	}
}