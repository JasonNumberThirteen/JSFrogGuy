class GameScenePanelUI {
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#playerLivesPanelUI;
	#levelTimerPanelUI;
	#currentLevelTextUI;
	#gameOverTextUI;
	#bonusPointsTextUI;
	#fadeScreenUI;
	#gameScene;

	constructor() {
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#playerLivesPanelUI = new PlayerLivesPanelUI(PLAYER_INITIAL_LIVES);
		this.#levelTimerPanelUI = new LevelTimerPanelUI();
		this.#currentLevelTextUI = new CurrentLevelTextUI();
		this.#gameOverTextUI = new GameOverTextUI();
		this.#bonusPointsTextUI = new BonusPointsTextUI();
		this.#fadeScreenUI = new FadeScreenUI(true, true);
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);

		this.#setCounterValues();
	}

	update(deltaTime) {
		this.#currentLevelTextUI.update(deltaTime);
		this.#bonusPointsTextUI.update(deltaTime);
		this.#fadeScreenUI.update(deltaTime);
		this.#levelTimerPanelUI.setCurrentValue(this.#gameScene.getLeftTime());
	}

	draw() {
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
		this.#playerLivesPanelUI.draw();
		this.#levelTimerPanelUI.draw();

		if(this.#gameScene.gameIsOver()) {
			this.#gameOverTextUI.draw();
		} else {
			this.#currentLevelTextUI.draw();
		}
		
		this.#bonusPointsTextUI.draw();
		this.#fadeScreenUI.draw();
	}

	getPlayerScoreIntCounterGroupUI() {
		return this.#playerScoreIntCounterGroupUI;
	}

	getHighScoreIntCounterGroupUI() {
		return this.#highScoreIntCounterGroupUI;
	}

	getPlayerLivesPanelUI() {
		return this.#playerLivesPanelUI;
	}

	getBonusPointsTextUI() {
		return this.#bonusPointsTextUI;
	}

	getFadeScreenUI() {
		return this.#fadeScreenUI;
	}

	updateHighScoreIfNeeded() {
		const currentPlayerScore = this.#playerScoreIntCounterGroupUI.getCounterValue();
		const currentHighScore = this.#highScoreIntCounterGroupUI.getCounterValue();

		if(currentPlayerScore > currentHighScore) {
			this.#highScoreIntCounterGroupUI.setCounterValue(currentPlayerScore);
		}
	}

	#setCounterValues() {
		const gameData = FrogGuy.getData();

		this.#playerScoreIntCounterGroupUI.setCounterValue(gameData.getPlayerScore());
		this.#highScoreIntCounterGroupUI.setCounterValue(gameData.getHighScore());
	}
}