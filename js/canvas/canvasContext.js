class CanvasContext {
	#context;
	#gameLogoSpriteUI;
	#mainMenuCursorSpriteUI;
	#startGameTextUI;
	#creditsTextUI;

	constructor(canvas) {
		this.#context = canvas.getContext("2d");
		this.#context.font = GAME_FONT_SIZE + PIXELS_UNIT + " '" + GAME_FONT_NAME + "'";

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
		this.#context.fillStyle = PALE_YELLOW_COLOR;

		this.#context.fillRect(0, 0, GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT);
		this.drawImage(this.#gameLogoSpriteUI);
		this.drawImage(this.#mainMenuCursorSpriteUI);
		this.drawLabel(this.#startGameTextUI.getLabel());
		this.drawLabel(this.#creditsTextUI.getLabel());
	}

	drawImage(image) {
		const position = image.getPosition();
		
		this.#context.drawImage(image.getImage(), position.x, position.y);
	}

	drawLabel(label) {
		this.#context.fillStyle = label.fillStyle;
		this.#context.textAlign = label.alignment;

		this.#context.fillText(label.text, label.position.x, label.position.y);
	}
}