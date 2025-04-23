class MovingSlicedSpritesGroup {
	#sprites = [];
	#initialMovementSpeed;
	#movementSpeed;
	#moveToRight;
	#field;
	#collisionRectangleOffset = new Rectangle();

	constructor(position, movementSpeed, moveToRight) {
		this.#initialMovementSpeed = movementSpeed;
		this.#movementSpeed = this.#initialMovementSpeed;
		this.#moveToRight = moveToRight;

		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_LEVEL*(FrogGuy.getData().getCurrentLevelNumber() - 1));
		FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getGameManager().fieldDestinationTaken.addListener(this.#onFieldDestinationTaken.bind(this));
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

	getX() {
		return this.getPosition().x;
	}

	getY() {
		return this.getPosition().y;
	}

	getPosition() {
		return this.#sprites[0].getPosition();
	}

	getWidth() {
		return this.getSize().x;
	}

	getHeight() {
		return this.getSize().y;
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
		const groupWidth = this.getWidth();

		if(this.#reachedLeftEdgeOfField()) {
			groupPosition.x = fieldPosition.x + field.getWidth() + groupWidth;

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

	#onFieldDestinationTaken(fieldDestination) {
		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_SAVED_FROG);
	}

	#increaseMovementSpeedIfPossibleBy(value) {
		this.#movementSpeed = MathMethods.clamp(this.#movementSpeed + value, this.#initialMovementSpeed, OBJECTS_MOVEMENT_SPEED_UPPER_BOUND);

		this.#sprites.forEach(sprite => sprite.setMovementSpeed(this.#movementSpeed));
	}

	#adjustSpritesPositionIfNeeded(x) {
		const numberOfSprites = this.#sprites.length;
		
		for (let i = 0; i < numberOfSprites; ++i) {
			this.#sprites[i].setX(x + i*8);
		}
	}

	#reachedLeftEdgeOfField() {
		return !this.#moveToRight && this.getX() < this.#getField().getX() - this.getWidth();
	}

	#reachedRightEdgeOfField() {
		const field = this.#getField();
		
		return this.#moveToRight && this.getX() > field.getX() + field.getWidth();
	}

	#getField() {
		this.#field = this.#field || FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getField();

		return this.#field;
	}
}