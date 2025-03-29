class GameScene extends Scene {
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#playerAnimatedSpriteUI;
	#fadeScreenUI;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#playerAnimatedSpriteUI = new PlayerAnimatedSpriteUI();
		this.#fadeScreenUI = new FadeScreenUI(true, true);
	}

	update(deltaTime) {
		this.#fadeScreenUI.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
		this.#playerAnimatedSpriteUI.draw();
		this.#fadeScreenUI.draw();
	}

	processInput(key) {
		this.#playerAnimatedSpriteUI.processInput(key);
	}
}