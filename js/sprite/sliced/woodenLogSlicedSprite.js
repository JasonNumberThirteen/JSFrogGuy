class WoodenLogSlicedSprite extends SlicedSprite {
	#movementSpeed;
	#movementDirection = 1;
	
	constructor(position, movementSpeed, frameIndex) {
		super(WOODEN_LOG_SPRITE_SHEET_FILENAME, position, 8, 8);

		this.#movementSpeed = movementSpeed;

		this.setCurrentColumnIndex(frameIndex);
	}

	update(deltaTime) {
		this.getPosition().x += this.#movementSpeed*this.#movementDirection*deltaTime;
	}

	setMovementSpeed(movementSpeed) {
		this.#movementSpeed = movementSpeed;
	}

	getMovementSpeed() {
		return this.#movementSpeed;
	}

	getMovementDirection() {
		return this.#movementDirection;
	}

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x + 1, position.y + 1), new Point(size.x - 4, size.y - 1));
	}
}