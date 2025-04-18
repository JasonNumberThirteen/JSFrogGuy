class TurtleMovingSlicedSprite extends MovingSlicedSprite {
	#animationTimer;
	#animationFrames = [0, 1, 2, 3, 4, -1, 4, 3, 2, 1];
	#currentAnimationFrame = 0;
	
	constructor(position, movementSpeed, isHiding) {
		super(TURTLE_SPRITE_SHEET_FILENAME, position, 0, TURTLE_SPRITE_DIMENSIONS, movementSpeed, false);
		this.setCollisionRectangleOffset(new Rectangle(new Point(1, 1), new Point(-2, -2)));

		if(isHiding) {
			this.#animationTimer = new Timer(TURTLE_HIDING_ANIMATION_STEP_DELAY);

			this.#animationTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		}
	}

	isHidden() {
		return this.getCurrentColumnIndex() === -1;
	}

	update(deltaTime) {
		super.update(deltaTime);

		if(VariableMethods.variableIsDefined(this.#animationTimer)) {
			this.#animationTimer.update(deltaTime);
		}
	}

	#onTimerFinished() {
		this.#currentAnimationFrame = (this.#currentAnimationFrame + 1) % this.#animationFrames.length;

		this.setCurrentColumnIndex(this.#animationFrames[this.#currentAnimationFrame]);

		if(VariableMethods.variableIsDefined(this.#animationTimer)) {
			this.#animationTimer.startTimer();
		}
	}
}