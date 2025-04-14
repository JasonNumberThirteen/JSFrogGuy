class MovingSlicedSpritesGroup {
	#sprites = [];
	#initialMovementSpeed;
	#movementSpeed;
	#moveToRight;
	#field;
	#collisionRectangleOffset;

	constructor(position, movementSpeed, moveToRight) {
		this.#initialMovementSpeed = movementSpeed;
		this.#movementSpeed = this.#initialMovementSpeed;
		this.#moveToRight = moveToRight;

		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_LEVEL*(FrogGuy.getData().getCurrentLevelNumber() - 1));
		FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getGameManager().frogSavedEvent.addListener(this.#onFrogSaved.bind(this));
		this.setCollisionRectangleOffset(new Rectangle(new Point(), new Point()));
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

	getCollisionRectangle() {
		return RectangleMethods.getSumOf(this.getRectangle(), this.#collisionRectangleOffset);
	}

	getRectangle() {
		return new Rectangle(this.getPosition(), this.getSize());
	}

	update(deltaTime) {
		this.#sprites.forEach(sprite => sprite.update(deltaTime));

		const field = this.#getField();
		const fieldPosition = field.getPosition();
		const groupPosition = this.getPosition();
		const groupWidth = this.getSize().x;

		if(this.#reachedLeftEdgeOfField()) {
			groupPosition.x = fieldPosition.x + field.getSize().x + groupWidth;

			this.#adjustSpritesPositionIfNeeded(groupPosition.x);
		} else if(this.#reachedRightEdgeOfField()) {
			groupPosition.x = fieldPosition.x - groupWidth*2;

			this.#adjustSpritesPositionIfNeeded(groupPosition.x);
		}
	}

	draw() {
		this.#sprites.forEach(sprite => sprite.draw());
	}

	setCollisionRectangleOffset(offset) {
		this.#collisionRectangleOffset = offset;
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

	#reachedLeftEdgeOfField() {
		return !this.#moveToRight && this.getPosition().x < this.#getField().getPosition().x - this.getSize().x;
	}

	#reachedRightEdgeOfField() {
		const field = this.#getField();
		
		return this.#moveToRight && this.getPosition().x > field.getPosition().x + field.getSize().x;
	}

	#getField() {
		this.#field = this.#field || FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getField();

		return this.#field;
	}
}