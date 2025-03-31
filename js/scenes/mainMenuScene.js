class MainMenuScene extends Scene {
	gameStartedEvent = new GameEvent();
	
	#gameLogoSpriteUI;
	#mainMenuCursorSpriteUI;
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#startGameTextUI;
	#creditsTextUI;
	#fadeScreenUI;
	#gameStartTimer;
	#inputIsLocked = true;

	constructor() {
		super(PALE_YELLOW_COLOR);
	}

	init() {
		const that = this;
		
		this.#gameLogoSpriteUI = new SpriteUI(GAME_LOGO_SPRITE_FILENAME, new Point());
		this.#startGameTextUI = new StartGameTextUI();
		this.#creditsTextUI = new TextUI(CREDITS_TEXT, new Point(GAME_WINDOW_WIDTH*0.5, GAME_WINDOW_HEIGHT - 8), BLACK_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);
		this.#mainMenuCursorSpriteUI = new MainMenuCursorSpriteUI();
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#fadeScreenUI = new FadeScreenUI(true, true);
		this.#gameStartTimer = new Timer(1, false);

		const gameData = FrogGuy.getData();

		this.#playerScoreIntCounterGroupUI.setCounterValue(gameData.getPlayerScore());
		this.#highScoreIntCounterGroupUI.setCounterValue(gameData.getHighScore());

		this.#gameStartTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		this.#fadeScreenUI.fadeFinishedEvent.addListener(this.#onFadeFinished.bind(this));
		
		this.#gameLogoSpriteUI.getImage().onload = function() {
			that.#gameLogoSpriteUI.setPosition(new Point(GAME_WINDOW_WIDTH*0.5 - that.#gameLogoSpriteUI.getImage().width*0.5, GAME_WINDOW_HEIGHT*0.5 - that.#gameLogoSpriteUI.getImage().height*0.5));
			that.#mainMenuCursorSpriteUI.setPosition(new Point(that.#startGameTextUI.getTextWidth() - GAME_FONT_SIZE, GAME_WINDOW_HEIGHT*0.5 + that.#gameLogoSpriteUI.getImage().height));
		};
	}

	update(deltaTime) {
		this.#startGameTextUI.update(deltaTime);
		this.#mainMenuCursorSpriteUI.update(deltaTime);
		this.#fadeScreenUI.update(deltaTime);
		this.#gameStartTimer.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#gameLogoSpriteUI.draw();
		this.#mainMenuCursorSpriteUI.draw();
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
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

	#onTimerFinished() {
		this.#fadeScreenUI.setFadeOut(false);
		this.#fadeScreenUI.startFading();
	}

	#onFadeFinished(fadeOut) {
		if(!fadeOut) {
			FrogGuy.getSceneManager().switchScene(GAME_SCENE_NAME_KEY);
		} else {
			this.#inputIsLocked = false;
		}
	}
}