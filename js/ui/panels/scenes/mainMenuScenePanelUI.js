class MainMenuScenePanelUI {
	#gameLogoSprite;
	#mainMenuCursorSprite;
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#startGameTextUI;
	#creditsTextUI;
	#fadeScreenUI;

	constructor() {
		this.#gameLogoSprite = new Sprite(GAME_LOGO_SPRITE_FILENAME, new Point(), this.#onGameLogoSpriteLoad.bind(this));
		this.#startGameTextUI = new StartGameTextUI();
		this.#creditsTextUI = new TextUI(CREDITS_TEXT, new Point(HALF_OF_GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT - 8), BLACK_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);
		this.#mainMenuCursorSprite = new MainMenuCursorSprite();
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#fadeScreenUI = new FadeScreenUI(true, true);

		this.#setCounterValues();
	}

	update(deltaTime) {
		this.#startGameTextUI.update(deltaTime);
		this.#mainMenuCursorSprite.update(deltaTime);
		this.#fadeScreenUI.update(deltaTime);
	}

	draw() {
		this.#gameLogoSprite.draw();
		this.#mainMenuCursorSprite.draw();
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
		this.#startGameTextUI.draw();
		this.#creditsTextUI.draw();
		this.#fadeScreenUI.draw();
	}

	getFadeScreenUI() {
		return this.#fadeScreenUI;
	}

	#onGameLogoSpriteLoad(sprite) {
		const image = sprite.getImage();
		
		this.#setPositionOfGameLogoSprite(image);
		this.#setPositionOfMainMenuCursorSprite(image);
	}

	#setPositionOfGameLogoSprite(image) {
		const x = HALF_OF_GAME_WINDOW_WIDTH - image.width*0.5;
		const y = HALF_OF_GAME_WINDOW_HEIGHT - image.height*0.5;
		
		this.#gameLogoSprite.setPosition(new Point(x, y));
	}

	#setPositionOfMainMenuCursorSprite(image) {
		const x = this.#startGameTextUI.getTextWidth() - GAME_FONT_SIZE;
		const y = HALF_OF_GAME_WINDOW_HEIGHT + image.height;
		
		this.#mainMenuCursorSprite.setPosition(new Point(x, y));
	}

	#setCounterValues() {
		const gameData = FrogGuy.getData();

		this.#playerScoreIntCounterGroupUI.setCounterValue(gameData.getPlayerScore());
		this.#highScoreIntCounterGroupUI.setCounterValue(gameData.getHighScore());
	}
}