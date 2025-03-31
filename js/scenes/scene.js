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
		this.#getCanvas().clearScreen(this.#backgroundColor);
	}

	#getCanvas() {
		this.#canvas = this.#canvas || FrogGuy.getCanvas();

		return this.#canvas;
	}
}