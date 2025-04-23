class ScenePanelUI {
	#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
	#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
	#fadeScreenUI = new FadeScreenUI();

	constructor() {
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