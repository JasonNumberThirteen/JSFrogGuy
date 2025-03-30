class FadeScreenUI {
	fadeFinishedEvent = new GameEvent();
	
	#fadeOut;
	#fadeTimer;
	#canvasContext;

	constructor(fadeOut, startFadingImmediately) {
		this.#fadeOut = typeof(fadeOut) === "undefined" ? false : fadeOut;
		this.#fadeTimer = new Timer(FADE_SCREEN_FADE_DURATION, startFadingImmediately);

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
		var canvasContext = this.#getCanvasContext();
		
		canvasContext.fillStyle = this.#getRectColor();

		canvasContext.fillRect(0, 0, GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT);
	}

	#getCanvasContext() {
		if(typeof(this.#canvasContext) === "undefined") {
			this.#canvasContext = FrogGuy.getCanvasContext();
		}

		return this.#canvasContext;
	}

	#getRectColor() {
		const percent = this.#fadeTimer.getProgressPercent();
		const alpha = this.#fadeOut ? (1 - percent) : percent;

		return "rgba(0, 0, 0, " + alpha + ")";
	}

	#onTimerFinished() {
		this.fadeFinishedEvent.invoke(this.#fadeOut);
	}
}