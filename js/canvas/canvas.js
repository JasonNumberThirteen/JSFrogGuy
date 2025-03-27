class Canvas {
	#canvas;
	#context;

	constructor() {
		this.#canvas = this.#createCanvas();
		this.#context = new CanvasContext(this.#canvas);

		document.body.appendChild(this.#canvas);
	}

	update(deltaTime) {
		this.#context.update(deltaTime);
		this.#context.draw();
	}

	#createCanvas() {
		const canvas = document.createElement("canvas");
		
		canvas.id = GAME_WINDOW_CANVAS_ID;
		canvas.width = GAME_WINDOW_WIDTH;
		canvas.height = GAME_WINDOW_HEIGHT;
		canvas.style.width = (GAME_WINDOW_WIDTH*GAME_WINDOW_SCALE) + PIXELS_UNIT;
		canvas.style.height = "auto";
		canvas.style.imageRendering = GAME_WINDOW_CANVAS_IMAGE_RENDERING;

		return canvas;
	}
}