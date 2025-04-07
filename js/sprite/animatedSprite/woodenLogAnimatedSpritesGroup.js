class WoodenLogAnimatedSpritesGroup {
	#segments = [];
	#movementSpeed;
	#movementDirection = 1;
	#initialMovementSpeed;

	constructor(position, movementSpeed, numberOfMiddleSegments) {
		this.#createAndAddSegment(position, movementSpeed, 0);

		for (let i = 1; i <= numberOfMiddleSegments; ++i) {
			this.#createAndAddSegment(new Point(position.x + 8*i, position.y), movementSpeed, 1);
		}

		this.#createAndAddSegment(new Point(position.x + 8*(numberOfMiddleSegments + 1), position.y), movementSpeed, 2);

		this.#initialMovementSpeed = movementSpeed;
		this.#movementSpeed = this.#initialMovementSpeed;

		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_LEVEL*(FrogGuy.getData().getCurrentLevelNumber() - 1));
		FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).frogSavedEvent.addListener(this.#onFrogSaved.bind(this));
	}

	update(deltaTime) {
		this.#segments.forEach(segment => segment.update(deltaTime));

		const position = this.getPosition();
		const leftSide = 68;
		const rightSide = 188;
		const frameWidth = this.getSize().x;

		if(position.x > rightSide) {
			position.x = leftSide - frameWidth*2;

			for (let i = 0; i < this.#segments.length; ++i) {
				this.#segments[i].getPosition().x = position.x + i*8;
			}
		}
	}

	draw() {
		this.#segments.forEach(segment => segment.draw());
	}

	getPosition() {
		return this.#segments[0].getPosition();
	}

	getSize() {
		return new Point(this.#segments.length*8, 8);
	}

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x + 1, position.y + 1), new Point(size.x - 4, size.y - 1));
	}

	getMovementSpeed() {
		return this.#movementSpeed;
	}

	getMovementDirection() {
		return this.#movementDirection;
	}

	#createAndAddSegment(position, movementSpeed, frameIndex) {
		const segment = new WoodenLogAnimatedSprite(position, movementSpeed, frameIndex);

		this.#segments.push(segment);
	}

	#onFrogSaved() {
		this.#increaseMovementSpeedIfPossibleBy(this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_SAVED_FROG);
	}

	#increaseMovementSpeedIfPossibleBy(value) {
		this.#movementSpeed = MathMethods.clamp(this.#movementSpeed + value, this.#initialMovementSpeed, OBJECTS_MOVEMENT_SPEED_UPPER_BOUND);

		this.#segments.forEach(segment => segment.setMovementSpeed(this.#movementSpeed));
	}
}