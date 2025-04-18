class ScoreManager {
	playerScoreChangedEvent = new GameEvent();
	
	#gameScenePanelUI;
	
	increasePlayerScoreBy(points) {
		const panelUI = this.#getGameScenePanelUI();
		
		panelUI.getPlayerScoreIntCounterGroupUI().increaseCounterValue(points);
		panelUI.updateHighScoreIfNeeded();
		this.playerScoreChangedEvent.invoke(panelUI.getPlayerScoreIntCounterGroupUI().getCounterValue());
	}

	#getGameScenePanelUI() {
		this.#gameScenePanelUI = this.#gameScenePanelUI || FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getPanelUI();
		
		return this.#gameScenePanelUI;
	}
}