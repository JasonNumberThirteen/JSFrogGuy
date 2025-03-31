class Scene {
	#backgroundColor;
	#canvas;

	constructor(backgroundColor) {
		this.#backgroundColor = backgroundColor;
	}
	
	init() {}
	update(deltaTime) {}
	draw() {}
	processInput(key) {}

	clearScreen() {
		this.#getCanvasContext().clearScreen(this.#backgroundColor);
	}

	#getCanvasContext() {
		this.#canvas = this.#canvas || FrogGuy.getCanvas();

		return this.#canvas;
	}
}