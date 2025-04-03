class TurtleAnimatedSprite extends AnimatedSprite {
	#movementSpeed;
	#movementDirection = -1;
	
	constructor(position, movementSpeed) {
		super(TURTLE_SPRITE_SHEET_FILENAME, position, 8, 8);

		this.#movementSpeed = movementSpeed;
	}

	update(deltaTime) {
		const position = this.getPosition();
		const leftSide = 68;
		const rightSide = 188;
		const frameWidth = this.getFrameWidth();

		position.x += this.#movementSpeed*this.#movementDirection*deltaTime;

		if(position.x < leftSide - frameWidth) {
			position.x = rightSide + frameWidth;
		}

		this.setPosition(position);
	}

	getMovementSpeed() {
		return this.#movementSpeed;
	}

	getMovementDirection() {
		return this.#movementDirection;
	}
}