class FadeScreenUI {
	#fadeTimer;
	#canvasContext;

	constructor() {
		this.#fadeTimer = new Timer(FADE_SCREEN_FADE_DURATION, false);
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
			this.#canvasContext = Frogger.getCanvasContext();
		}

		return this.#canvasContext;
	}

	#getRectColor() {
		const alpha = this.#fadeTimer.getProgressPercent();

		return "rgba(0, 0, 0, " + alpha + ")";
	}
}