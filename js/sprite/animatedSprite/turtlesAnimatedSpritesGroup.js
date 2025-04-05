class TurtlesAnimatedSpritesGroup {
	#turtles = [];
	#movementSpeed;
	#movementDirection = -1;

	constructor(position, movementSpeed) {
		const isHiding = Math.random() < CHANCE_FOR_HIDING_TURTLES_GROUP;
		
		for (let i = 0; i < 3; ++i) {
			this.#turtles.push(new TurtleAnimatedSprite(new Point(position.x + i*8, position.y), movementSpeed, isHiding));
		}

		this.#movementSpeed = movementSpeed;
	}

	update(deltaTime) {
		this.#turtles.forEach(turtle => turtle.update(deltaTime));

		const position = this.getPosition();
		const leftSide = 68;
		const rightSide = 188;
		const frameWidth = this.getSize().x;

		if(position.x < leftSide - frameWidth) {
			position.x = rightSide + frameWidth;

			for (let i = 0; i < 3; ++i) {
				this.#turtles[i].getPosition().x = position.x + i*8;
			}
		}
	}

	draw() {
		this.#turtles.forEach(turtle => turtle.draw());
	}

	isHidden() {
		return this.#turtles.some(turtle => turtle.isHidden());
	}

	getPosition() {
		return this.#turtles[0].getPosition();
	}

	getSize() {
		return new Point(this.#turtles.length*8, 8);
	}

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x + 1, position.y + 1), new Point(size.x - 2, size.y - 2));
	}

	getMovementSpeed() {
		return this.#movementSpeed;
	}

	getMovementDirection() {
		return this.#movementDirection;
	}
}