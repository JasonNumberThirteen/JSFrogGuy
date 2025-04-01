class VehicleAnimatedSprite extends AnimatedSprite {
	#movementSpeed;
	#moveToRight;
	
	constructor(filename, position, columnIndex, frameWidth, frameHeight, movementSpeed, moveToRight) {
		super(filename, position, frameWidth, frameHeight);
		this.setCurrentColumnIndex(columnIndex);

		this.#movementSpeed = movementSpeed;
		this.#moveToRight = moveToRight;

		if(this.#moveToRight) {
			this.setCurrentRowIndex(1);
		}
	}

	update(deltaTime) {
		const position = this.getPosition();
		const movementDirection = this.#moveToRight ? 1 : -1;

		position.x += this.#movementSpeed*movementDirection*deltaTime;

		this.setPosition(position);
	}
}