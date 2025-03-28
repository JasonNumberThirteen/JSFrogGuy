class GameScene extends Scene {
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#fadeScreenUI;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#fadeScreenUI = new FadeScreenUI(true, true);
	}

	update(deltaTime) {
		this.#fadeScreenUI.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
		this.#fadeScreenUI.draw();
	}
}