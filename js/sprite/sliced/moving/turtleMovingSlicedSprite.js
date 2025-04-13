class TurtleMovingSlicedSprite extends MovingSlicedSprite {
	#animationTimer;
	#animationFrames = [0, 1, 2, 3, 4, -1, 4, 3, 2, 1];
	#currentAnimationFrame = 0;
	
	constructor(position, movementSpeed, isHiding) {
		super(TURTLE_SPRITE_SHEET_FILENAME, position, 0, new Point(8, 8), movementSpeed, false);

		if(isHiding) {
			this.#animationTimer = new Timer(TURTLE_HIDING_ANIMATION_STEP_DELAY, true);

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

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x + 1, position.y + 1), new Point(size.x - 2, size.y - 2));
	}

	#onTimerFinished() {
		this.#currentAnimationFrame = (this.#currentAnimationFrame + 1) % this.#animationFrames.length;

		this.setCurrentColumnIndex(this.#animationFrames[this.#currentAnimationFrame]);

		if(VariableMethods.variableIsDefined(this.#animationTimer)) {
			this.#animationTimer.startTimer();
		}
	}
}