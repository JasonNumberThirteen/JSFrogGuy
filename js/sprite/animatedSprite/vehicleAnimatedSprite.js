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
		const leftSide = 68;
		const rightSide = 188;
		const frameWidth = this.getFrameWidth();

		position.x += this.#movementSpeed*movementDirection*deltaTime;

		if(!this.#moveToRight && position.x < leftSide - frameWidth) {
			position.x = rightSide + frameWidth;
		} else if(this.#moveToRight && position.x > rightSide) {
			position.x = leftSide - frameWidth*2;
		}

		this.setPosition(position);
	}
}