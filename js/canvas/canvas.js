class Canvas {
	#canvas;
	#context;

	constructor() {
		this.#canvas = this.#createCanvas();
		this.#context = new CanvasContext(this.#canvas);

		document.body.appendChild(this.#canvas);
	}

	update(timeStamp) {
		this.#context.clear();
	}

	#createCanvas() {
		const canvas = document.createElement("canvas");
		
		canvas.id = GAME_WINDOW_CANVAS_ID;
		canvas.width = GAME_WIDTH;
		canvas.height = GAME_HEIGHT;

		return canvas;
	}
}