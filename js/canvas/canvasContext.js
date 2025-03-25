class CanvasContext {
	#context;

	constructor(canvas) {
		this.#context = canvas.getContext("2d");
		this.#context.fillStyle = GAME_BACKGROUND_COLOR;
	}

	clear() {
		this.#context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	}
}