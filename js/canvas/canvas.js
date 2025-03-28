class Canvas {
	#canvas;
	#context;
	#sceneManager;

	constructor() {
		this.#canvas = this.#createCanvas();
		this.#context = new CanvasContext(this.#canvas);

		document.body.appendChild(this.#canvas);
	}

	update(deltaTime) {
		const sceneManager = this.#getSceneManager();
		
		sceneManager.updateScene(deltaTime);
		sceneManager.drawScene();
	}

	getContext() {
		return this.#context.getContext();
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

	#getSceneManager() {
		if(typeof(this.#sceneManager) === "undefined") {
			this.#sceneManager = FrogGuy.getSceneManager();
		}

		return this.#sceneManager;
	}
}