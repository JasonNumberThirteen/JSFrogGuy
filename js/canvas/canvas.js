class Canvas {
	#canvas;
	#context;

	constructor() {
		this.#canvas = this.#createCanvas();
		this.#context = new CanvasContext(this.#canvas);

		document.body.appendChild(this.#canvas);
	}

	update(dt) {
		this.#context.update(dt);
		this.#context.draw();
	}

	#createCanvas() {
		const canvas = document.createElement("canvas");
		
		canvas.id = GAME_WINDOW_CANVAS_ID;
		canvas.width = BASE_GAME_WINDOW_WIDTH;
		canvas.height = BASE_GAME_WINDOW_HEIGHT;
		canvas.style.width = (BASE_GAME_WINDOW_WIDTH*GAME_WINDOW_SCALE) + "px";
		canvas.style.height = "auto";
		canvas.style.imageRendering = "pixelated";

		return canvas;
	}
}