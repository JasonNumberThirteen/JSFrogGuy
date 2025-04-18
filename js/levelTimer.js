class LevelTimer extends Timer {
	#gameScene;

	constructor() {
		super(LEVEL_TIME);
		
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
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