class GameScene extends Scene {
	#fadeScreenUI;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		this.#fadeScreenUI = new FadeScreenUI(true, true);
	}

	update(deltaTime) {
		this.#fadeScreenUI.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#fadeScreenUI.draw();
	}
}