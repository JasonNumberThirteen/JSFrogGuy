class GameScene extends Scene {
	#fadeScreenUI;
	#canvasContext;

	init() {
		this.#fadeScreenUI = new FadeScreenUI(true, true);
	}

	update(deltaTime) {
		this.#fadeScreenUI.update(deltaTime);
	}

	draw() {
		var canvasContext = this.#getCanvasContext();
		
		canvasContext.fillStyle = DARK_BLUE_COLOR;

		canvasContext.fillRect(0, 0, GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT);
		this.#fadeScreenUI.draw();
	}

	#getCanvasContext() {
		if(typeof(this.#canvasContext) === "undefined") {
			this.#canvasContext = FrogGuy.getCanvasContext();
		}

		return this.#canvasContext;
	}
}