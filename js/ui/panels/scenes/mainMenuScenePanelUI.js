class MainMenuScenePanelUI extends ScenePanelUI {
	#gameLogoSprite;
	#mainMenuCursorSprite;
	#startGameTextUI;
	#creditsTextUI;

	constructor() {
		super();
		
		this.#gameLogoSprite = new Sprite(GAME_LOGO_SPRITE_FILENAME, new Point(), this.#onGameLogoSpriteLoad.bind(this));
		this.#mainMenuCursorSprite = new MainMenuCursorSprite();
		this.#startGameTextUI = new StartGameTextUI();
		this.#creditsTextUI = new TextUI(CREDITS_TEXT, new Point(HALF_OF_GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT - 8), BLACK_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);
	}

	update(deltaTime) {
		this.#mainMenuCursorSprite.update(deltaTime);
		this.#startGameTextUI.update(deltaTime);
		super.update(deltaTime);
	}

	draw() {
		this.#gameLogoSprite.draw();
		this.#mainMenuCursorSprite.draw();
		this.#startGameTextUI.draw();
		this.#creditsTextUI.draw();
		super.draw();
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
		this.#mainMenuCursorSprite.setInitialX(x);
	}
}