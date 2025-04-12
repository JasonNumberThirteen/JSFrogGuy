class ScoreManager {
	#gameScenePanelUI;
	
	increasePlayerScoreBy(points) {
		const panelUI = this.#getGameScenePanelUI();
		
		panelUI.getPlayerScoreIntCounterGroupUI().increaseCounterValue(points);
		panelUI.updateHighScoreIfNeeded();
	}

	#getGameScenePanelUI() {
		this.#gameScenePanelUI = this.#gameScenePanelUI || FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getPanelUI();
		
		return this.#gameScenePanelUI;
	}
}