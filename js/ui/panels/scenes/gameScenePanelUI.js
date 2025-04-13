class GameScenePanelUI extends ScenePanelUI {
	#currentLevelTextUI;
	#playerLivesPanelUI;
	#levelTimerPanelUI;
	#gameOverTextUI;
	#bonusPointsTextUI;
	#gameScene;

	constructor() {
		super();
		
		this.#currentLevelTextUI = new CurrentLevelTextUI();
		this.#playerLivesPanelUI = new PlayerLivesPanelUI(PLAYER_INITIAL_LIVES);
		this.#levelTimerPanelUI = new LevelTimerPanelUI();
		this.#gameOverTextUI = new GameOverTextUI();
		this.#bonusPointsTextUI = new BonusPointsTextUI();
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
	}

	update(deltaTime) {
		this.#currentLevelTextUI.update(deltaTime);
		this.#levelTimerPanelUI.setCurrentValue(this.#gameScene.getGameManager().getLevelTimer().getLeftTime());
		this.#bonusPointsTextUI.update(deltaTime);
		super.update(deltaTime);
	}

	draw() {
		if(this.#gameScene.getGameManager().gameIsOver()) {
			this.#gameOverTextUI.draw();
		} else {
			this.#currentLevelTextUI.draw();
		}
		
		this.#playerLivesPanelUI.draw();
		this.#levelTimerPanelUI.draw();
		this.#bonusPointsTextUI.draw();
		super.draw();
	}

	getPlayerLivesPanelUI() {
		return this.#playerLivesPanelUI;
	}

	getBonusPointsTextUI() {
		return this.#bonusPointsTextUI;
	}

	updateHighScoreIfNeeded() {
		const highScoreIntCounterGroupUI = this.getHighScoreIntCounterGroupUI();
		const currentPlayerScore = this.getPlayerScoreIntCounterGroupUI().getCounterValue();
		const currentHighScore = highScoreIntCounterGroupUI.getCounterValue();

		if(currentPlayerScore > currentHighScore) {
			highScoreIntCounterGroupUI.setCounterValue(currentPlayerScore);
		}
	}
}