class ScenePanelUI {
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#fadeScreenUI;

	constructor() {
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#fadeScreenUI = new FadeScreenUI();

		this.#setCounterValues();
	}

	update(deltaTime) {
		this.#fadeScreenUI.update(deltaTime);
	}

	draw() {
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
		this.#fadeScreenUI.draw();
	}

	getPlayerScoreIntCounterGroupUI() {
		return this.#playerScoreIntCounterGroupUI;
	}

	getHighScoreIntCounterGroupUI() {
		return this.#highScoreIntCounterGroupUI;
	}

	getFadeScreenUI() {
		return this.#fadeScreenUI;
	}

	#setCounterValues() {
		const gameData = FrogGuy.getData();

		this.#playerScoreIntCounterGroupUI.setCounterValue(gameData.getPlayerScore());
		this.#highScoreIntCounterGroupUI.setCounterValue(gameData.getHighScore());
	}
}