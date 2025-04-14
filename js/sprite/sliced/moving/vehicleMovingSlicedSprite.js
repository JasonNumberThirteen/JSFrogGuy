class VehicleMovingSlicedSprite extends MovingSlicedSprite {
	#initialMovementSpeed;
	#field;
	
	constructor(filename, position, columnIndex, frameDimensions, movementSpeed, moveToRight) {
		super(filename, position, columnIndex, frameDimensions, movementSpeed, moveToRight);
		this.setCollisionRectangleOffset(new Rectangle(new Point(0, 1), new Point(0, -2)));

		this.#initialMovementSpeed = movementSpeed;

		if(this.isMovingRight()) {
			this.setCurrentRowIndex(1);
		}

		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_LEVEL*(FrogGuy.getData().getCurrentLevelNumber() - 1));
		FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getGameManager().frogSavedEvent.addListener(this.#onFrogSaved.bind(this));
	}

	update(deltaTime) {
		super.update(deltaTime);
		
		const field = this.#getField();
		const fieldPosition = field.getPosition();
		const vehiclePosition = this.getPosition();
		const frameWidth = this.getFrameWidth();

		if(this.#reachedLeftEdgeOfField()) {
			vehiclePosition.x = fieldPosition.x + field.getSize().x + frameWidth;
		} else if(this.#reachedRightEdgeOfField()) {
			vehiclePosition.x = fieldPosition.x - frameWidth*2;
		}

		this.setPosition(vehiclePosition);
	}

	#onFrogSaved() {
		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_SAVED_FROG);
	}

	#increaseMovementSpeedIfPossibleBy(value) {
		this.setMovementSpeed(MathMethods.clamp(this.getMovementSpeed() + value, this.#initialMovementSpeed, OBJECTS_MOVEMENT_SPEED_UPPER_BOUND));
	}

	#reachedLeftEdgeOfField() {
		return !this.isMovingRight() && this.getPosition().x < this.#getField().getPosition().x - this.getFrameWidth();
	}

	#reachedRightEdgeOfField() {
		const field = this.#getField();
		
		return this.isMovingRight() && this.getPosition().x > field.getPosition().x + field.getSize().x;
	}

	#getField() {
		this.#field = this.#field || FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getField();

		return this.#field;
	}
}