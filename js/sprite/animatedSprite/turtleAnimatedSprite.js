class TurtleAnimatedSprite extends AnimatedSprite {
	#movementSpeed;
	#movementDirection = -1;
	#animationTimer;
	#animationFrames = [0, 1, 2, 3, 4, -1, 4, 3, 2, 1];
	#currentAnimationFrame = 0;
	
	constructor(position, movementSpeed) {
		super(TURTLE_SPRITE_SHEET_FILENAME, position, 8, 8);

		this.#movementSpeed = movementSpeed;
		this.#animationTimer = new Timer(0.25, true);

		this.setCurrentColumnIndex(this.#animationFrames[this.#currentAnimationFrame]);
		this.#animationTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
	}

	isHidden() {
		return this.getCurrentColumnIndex() === -1;
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
		this.#animationTimer.update(deltaTime);
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
		this.#animationTimer.startTimer();
	}
}