class GameScenePanelUI extends ScenePanelUI {
	#currentLevelTextUI;
	#playerLivesPanelUI;
	#levelTimerPanelUI;
	#gameOverTextUI;
	#bonusPointsTextUI;
	#gameManager;

	constructor() {
		super();
		
		this.#currentLevelTextUI = new CurrentLevelTextUI();
		this.#playerLivesPanelUI = new PlayerLivesPanelUI(PLAYER_INITIAL_LIVES);
		this.#levelTimerPanelUI = new LevelTimerPanelUI();
		this.#gameOverTextUI = new GameOverTextUI();
		this.#bonusPointsTextUI = new BonusPointsTextUI();
		this.#gameManager = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getGameManager();
	}

	update(deltaTime) {
		this.#currentLevelTextUI.update(deltaTime);
		this.#levelTimerPanelUI.setCurrentValue(this.#gameManager.getLevelTimer().getLeftTime());
		this.#bonusPointsTextUI.update(deltaTime);
		super.update(deltaTime);
	}

	draw() {
		this.#gameOverTextUI.draw();
		this.#currentLevelTextUI.draw();
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