class MovingSlicedSprite extends SlicedSprite {
	#movementSpeed;
	#moveToRight;

	constructor(filename, position, columnIndex, frameDimensions, movementSpeed, moveToRight) {
		super(filename, position, frameDimensions);
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
		this.addX(this.#movementSpeed*this.getMovementDirection()*deltaTime);
	}
}