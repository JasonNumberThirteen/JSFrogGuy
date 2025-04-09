class MovingSlicedSprite extends SlicedSprite {
	#movementSpeed;
	#moveToRight;

	constructor(filename, position, columnIndex, frameWidth, frameHeight, movementSpeed, moveToRight) {
		super(filename, position, frameWidth, frameHeight);
		this.setCurrentColumnIndex(columnIndex);

		this.#movementSpeed = movementSpeed;
		this.#moveToRight = moveToRight;
	}

	getMovementSpeed() {
		return this.#movementSpeed;
	}

	getMovementDirection() {
		return this.#moveToRight ? 1 : -1;
	}

	isMovingRight() {
		return this.#moveToRight;
	}

	setMovementSpeed(movementSpeed) {
		this.#movementSpeed = movementSpeed;
	}

	update(deltaTime) {
		this.getPosition().x += this.#movementSpeed*this.getMovementDirection()*deltaTime;
	}
}