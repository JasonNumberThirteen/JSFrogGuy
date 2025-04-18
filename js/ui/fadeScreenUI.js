class FadeScreenUI {
	fadeFinishedEvent = new GameEvent();
	
	#fadeOut;
	#fadeTimer;
	#canvasContext;

	constructor() {
		this.#fadeOut = true;
		this.#fadeTimer = new Timer(FADE_SCREEN_FADE_DURATION);

		this.#fadeTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
	}

	setFadeOut(fadeOut) {
		this.#fadeOut = fadeOut;
	}

	startFading() {
		this.#fadeTimer.startTimer();
	}

	update(deltaTime) {
		this.#fadeTimer.update(deltaTime);
	}

	draw() {
		const position = new Point();
		const size = new Point(GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT);
		const rectangle = new Rectangle(position, size);

		CanvasMethods.fillRect(this.#getCanvasContext(), this.#getRectColor(), rectangle);
	}

	#getCanvasContext() {
		this.#canvasContext = this.#canvasContext || FrogGuy.getCanvasContext();

		return this.#canvasContext;
	}

	#getRectColor() {
		const percent = this.#fadeTimer.getProgressPercent();
		const alpha = this.#fadeOut ? (1 - percent) : percent;
		
		return ColorMethods.hexToRGBA(BLACK_COLOR, alpha);
	}

	#onTimerFinished() {
		this.fadeFinishedEvent.invoke(this.#fadeOut);
	}
}