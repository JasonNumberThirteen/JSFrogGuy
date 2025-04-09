class MovingSlicedSpritesGroup {
	#sprites = [];
	#initialMovementSpeed;
	#movementSpeed;
	#moveToRight;

	constructor(position, movementSpeed, moveToRight) {
		this.#initialMovementSpeed = movementSpeed;
		this.#movementSpeed = this.#initialMovementSpeed;
		this.#moveToRight = moveToRight;

		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_LEVEL*(FrogGuy.getData().getCurrentLevelNumber() - 1));
		FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).frogSavedEvent.addListener(this.#onFrogSaved.bind(this));
	}

	getSprites() {
		return this.#sprites;
	}

	getMovementSpeed() {
		return this.#movementSpeed;
	}

	getMovementDirection() {
		return this.#moveToRight ? 1 : -1;
	}

	getPosition() {
		return this.#sprites[0].getPosition();
	}

	getSize() {
		return new Point(this.#sprites.length*8, 8);
	}

	getRectangle() {
		return new Rectangle(this.getPosition(), this.getSize());
	}

	update(deltaTime) {
		this.#sprites.forEach(sprite => sprite.update(deltaTime));

		const position = this.getPosition();
		const leftSide = 68;
		const rightSide = 188;
		const frameWidth = this.getSize().x;

		if(!this.#moveToRight && position.x < leftSide - frameWidth) {
			position.x = rightSide + frameWidth;

			this.#adjustSpritesPositionIfNeeded(position.x);
		} else if(this.#moveToRight && position.x > rightSide) {
			position.x = leftSide - frameWidth*2;

			this.#adjustSpritesPositionIfNeeded(position.x);
		}
	}

	draw() {
		this.#sprites.forEach(sprite => sprite.draw());
	}

	#onFrogSaved() {
		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_SAVED_FROG);
	}

	#increaseMovementSpeedIfPossibleBy(value) {
		this.#movementSpeed = MathMethods.clamp(this.#movementSpeed + value, this.#initialMovementSpeed, OBJECTS_MOVEMENT_SPEED_UPPER_BOUND);

		this.#sprites.forEach(sprite => sprite.setMovementSpeed(this.#movementSpeed));
	}

	#adjustSpritesPositionIfNeeded(x) {
		const numberOfSprites = this.#sprites.length;
		
		for (let i = 0; i < numberOfSprites; ++i) {
			this.#sprites[i].getPosition().x = x + i*8;
		}
	}
}