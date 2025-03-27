class MainMenuScene extends Scene {
	gameStartedEvent = new GameEvent();
	
	#canvasContext;
	#gameLogoSpriteUI;
	#mainMenuCursorSpriteUI;
	#startGameTextUI;
	#creditsTextUI;
	#inputIsLocked = false;

	init() {
		this.#gameLogoSpriteUI = new SpriteUI(GAME_LOGO_SPRITE_FILENAME, new Point());
		this.#startGameTextUI = new StartGameTextUI();
		this.#creditsTextUI = new TextUI(CREDITS_TEXT, new Point(GAME_WINDOW_WIDTH*0.5, GAME_WINDOW_HEIGHT - 8), BLACK_COLOR, CENTER_KEY);

		this.#gameLogoSpriteUI.setPosition(new Point(GAME_WINDOW_WIDTH*0.5 - this.#gameLogoSpriteUI.getImage().width*0.5, GAME_WINDOW_HEIGHT*0.5 - this.#gameLogoSpriteUI.getImage().height*0.5));
		
		this.#mainMenuCursorSpriteUI = new SpriteUI(MAIN_MENU_CURSOR_SPRITE_FILENAME, new Point(this.#startGameTextUI.getWidth() - GAME_FONT_SIZE, GAME_WINDOW_HEIGHT*0.5 + this.#gameLogoSpriteUI.getImage().height));
	}

	update(deltaTime) {
		this.#startGameTextUI.update(deltaTime);
	}

	draw() {
		var canvasContext = this.#getCanvasContext();
		
		canvasContext.fillStyle = PALE_YELLOW_COLOR;

		canvasContext.fillRect(0, 0, GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT);
		this.#drawImage(this.#gameLogoSpriteUI);
		this.#drawImage(this.#mainMenuCursorSpriteUI);
		this.#drawLabel(this.#startGameTextUI.getLabel());
		this.#drawLabel(this.#creditsTextUI.getLabel());
	}

	processInput(key) {
		if(key !== GAME_START_KEY || this.#inputIsLocked) {
			return;
		}

		this.#inputIsLocked = true;

		this.gameStartedEvent.invoke();
	}

	#getCanvasContext() {
		if(typeof(this.#canvasContext) === "undefined") {
			this.#canvasContext = Frogger.getCanvasContext();
		}

		return this.#canvasContext;
	}

	#drawImage(image) {
		const position = image.getPosition();
		
		this.#getCanvasContext().drawImage(image.getImage(), position.x, position.y);
	}

	#drawLabel(label) {
		var canvasContext = this.#getCanvasContext();
		
		canvasContext.fillStyle = label.fillStyle;
		canvasContext.textAlign = label.alignment;

		canvasContext.fillText(label.text, label.position.x, label.position.y);
	}
}