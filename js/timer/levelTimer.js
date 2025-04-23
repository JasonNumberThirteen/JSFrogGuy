class LevelTimer extends Timer {
	#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);

	constructor() {
		super(LEVEL_TIME);
	}
	
	update(deltaTime) {
		if(!this.#gameScene.getGameManager().gameIsOver()) {
			super.update(deltaTime);
		}
	}

	getLeftTime() {
		return this.getDuration() - this.getCurrentTime();
	}
}