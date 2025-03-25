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
		canvas.style.width = (GAME_WIDTH*GAME_SCREEN_SCALE) + "px";
		canvas.style.height = "auto";
		canvas.style.imageRendering = "pixelated";

		return canvas;
	}
}