class MainMenuScene extends Scene {
	gameStartedEvent = new GameEvent();
	
	#canvasContext;
	#gameLogoSpriteUI;
	#mainMenuCursorSpriteUI;
	#startGameTextUI;
	#creditsTextUI;
	#fadeScreenUI;
	#gameStartTimer;
	#inputIsLocked = false;

	init() {
		this.#gameLogoSpriteUI = new SpriteUI(GAME_LOGO_SPRITE_FILENAME, new Point());
		this.#startGameTextUI = new StartGameTextUI();
		this.#creditsTextUI = new TextUI(CREDITS_TEXT, new Point(GAME_WINDOW_WIDTH*0.5, GAME_WINDOW_HEIGHT - 8), BLACK_COLOR, CENTER_KEY);

		this.#gameLogoSpriteUI.setPosition(new Point(GAME_WINDOW_WIDTH*0.5 - this.#gameLogoSpriteUI.getImage().width*0.5, GAME_WINDOW_HEIGHT*0.5 - this.#gameLogoSpriteUI.getImage().height*0.5));
		
		this.#mainMenuCursorSpriteUI = new MainMenuCursorSpriteUI(new Point(this.#startGameTextUI.getWidth() - GAME_FONT_SIZE, GAME_WINDOW_HEIGHT*0.5 + this.#gameLogoSpriteUI.getImage().height));
		this.#fadeScreenUI = new FadeScreenUI();
		this.#gameStartTimer = new Timer(1, false);

		this.#gameStartTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		this.#fadeScreenUI.fadeFinishedEvent.addListener(this.#onFadeFinished.bind(this));
	}

	update(deltaTime) {
		this.#startGameTextUI.update(deltaTime);
		this.#mainMenuCursorSpriteUI.update(deltaTime);
		this.#fadeScreenUI.update(deltaTime);
		this.#gameStartTimer.update(deltaTime);
	}

	draw() {
		var canvasContext = this.#getCanvasContext();
		
		canvasContext.fillStyle = PALE_YELLOW_COLOR;

		canvasContext.fillRect(0, 0, GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT);
		this.#gameLogoSpriteUI.draw();
		this.#mainMenuCursorSpriteUI.draw();
		this.#startGameTextUI.draw();
		this.#creditsTextUI.draw();
		this.#fadeScreenUI.draw();
	}

	processInput(key) {
		if(key !== GAME_START_KEY || this.#inputIsLocked) {
			return;
		}

		this.#inputIsLocked = true;

		this.gameStartedEvent.invoke();
		this.#gameStartTimer.startTimer();
	}

	#getCanvasContext() {
		if(typeof(this.#canvasContext) === "undefined") {
			this.#canvasContext = FrogGuy.getCanvasContext();
		}

		return this.#canvasContext;
	}

	#onTimerFinished() {
		this.#fadeScreenUI.startFading();
	}

	#onFadeFinished() {
		FrogGuy.getSceneManager().switchScene("GAME");
	}
}