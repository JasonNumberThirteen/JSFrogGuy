class GameOverTextUI extends TextUI {
	#gameManager;
	
	constructor() {
		super(GAME_OVER_TEXT, new Point(HALF_OF_GAME_WINDOW_WIDTH, HALF_OF_GAME_WINDOW_HEIGHT), RED_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);

		this.#gameManager = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getGameManager();
	}

	draw() {
		if(this.#gameManager.gameIsOver()) {
			super.draw();
		}
	}
}