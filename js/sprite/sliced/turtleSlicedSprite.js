class TurtleSlicedSprite extends SlicedSprite {
	#movementSpeed;
	#movementDirection = -1;
	#animationTimer;
	#animationFrames = [0, 1, 2, 3, 4, -1, 4, 3, 2, 1];
	#currentAnimationFrame = 0;
	
	constructor(position, movementSpeed, isHiding) {
		super(TURTLE_SPRITE_SHEET_FILENAME, position, 8, 8);

		this.#movementSpeed = movementSpeed;

		if(isHiding) {
			this.#animationTimer = new Timer(0.25, true);

			this.#animationTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		}
		
		this.setCurrentColumnIndex(this.#animationFrames[this.#currentAnimationFrame]);
	}

	isHidden() {
		return this.getCurrentColumnIndex() === -1;
	}

	update(deltaTime) {
		const position = this.getPosition();
		
		position.x += this.#movementSpeed*this.#movementDirection*deltaTime;

		this.setPosition(position);

		if(typeof(this.#animationTimer) !== "undefined") {
			this.#animationTimer.update(deltaTime);
		}
	}

	setMovementSpeed(movementSpeed) {
		this.#movementSpeed = movementSpeed;
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

	#onTimerFinished() {
		this.#currentAnimationFrame = (this.#currentAnimationFrame + 1) % this.#animationFrames.length;

		this.setCurrentColumnIndex(this.#animationFrames[this.#currentAnimationFrame]);

		if(typeof(this.#animationTimer) !== "undefined") {
			this.#animationTimer.startTimer();
		}
	}
}