class GameCanvas {
	#canvas;
	#context;
	#sceneManager;

	constructor() {
		this.#canvas = this.#createCanvas();
		this.#context = this.#createCanvasContext();

		document.body.appendChild(this.#canvas);
	}

	getContext() {
		return this.#context;
	}

	update(deltaTime) {
		const sceneManager = this.#getSceneManager();
		
		sceneManager.updateScene(deltaTime);
		sceneManager.drawScene();
	}

	clearScreen(color) {
		const position = new Point();
		const size = new Point(GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT);
		const rectangle = new Rectangle(position, size);

		CanvasMethods.fillRect(this.#context, color, rectangle);
	}

	#createCanvas() {
		const canvas = document.createElement("canvas");
		const scaledWindowWidth = GAME_WINDOW_WIDTH*GAME_WINDOW_SCALE;
		
		canvas.id = GAME_WINDOW_CANVAS_ID;
		canvas.width = GAME_WINDOW_WIDTH;
		canvas.height = GAME_WINDOW_HEIGHT;
		canvas.style.width = scaledWindowWidth + PIXELS_UNIT;
		canvas.style.height = "auto";
		canvas.style.imageRendering = GAME_WINDOW_CANVAS_IMAGE_RENDERING;

		return canvas;
	}

	#createCanvasContext() {
		const context = this.#canvas.getContext("2d");

		context.font = GAME_FONT_SIZE + PIXELS_UNIT + " '" + GAME_FONT_NAME + "'";
		
		return context;
	}

	#getSceneManager() {
		this.#sceneManager = this.#sceneManager || FrogGuy.getSceneManager();

		return this.#sceneManager;
	}
}