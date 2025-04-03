class TurtlesAnimatedSpritesGroup {
	#turtles = [];
	#movementSpeed;
	#movementDirection = -1;

	constructor(position, movementSpeed) {
		for (let i = 0; i < 3; ++i) {
			this.#turtles.push(new TurtleAnimatedSprite(new Point(position.x + i*8, position.y), movementSpeed));
		}

		this.#movementSpeed = movementSpeed;
	}

	update(deltaTime) {
		this.#turtles.forEach(turtle => turtle.update(deltaTime));
	}

	draw() {
		this.#turtles.forEach(turtle => turtle.draw());
	}

	getPosition() {
		return this.#turtles[0].getPosition();
	}

	getSize() {
		return new Point(this.#turtles.length*8, 8);
	}

	getRectangle() {
		return new Rectangle(this.getPosition(), this.getSize());
	}

	getMovementSpeed() {
		return this.#movementSpeed;
	}

	getMovementDirection() {
		return this.#movementDirection;
	}
}