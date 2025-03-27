class CanvasContext {
	#context;

	constructor(canvas) {
		this.#context = canvas.getContext("2d");
		this.#context.font = GAME_FONT_SIZE + PIXELS_UNIT + " '" + GAME_FONT_NAME + "'";
	}

	getContext() {
		return this.#context;
	}
}