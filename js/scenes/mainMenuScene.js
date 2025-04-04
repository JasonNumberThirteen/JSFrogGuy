class MainMenuScene extends Scene {
	gameStartedEvent = new GameEvent();
	
	#gameLogoSprite;
	#mainMenuCursorSprite;
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
		this.#gameLogoSprite = new Sprite(GAME_LOGO_SPRITE_FILENAME, new Point(), this.#onGameLogoSpriteLoad.bind(this));
		this.#startGameTextUI = new StartGameTextUI();
		this.#creditsTextUI = new TextUI(CREDITS_TEXT, new Point(GAME_WINDOW_WIDTH*0.5, GAME_WINDOW_HEIGHT - 8), BLACK_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);
		this.#mainMenuCursorSprite = new MainMenuCursorSprite();
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#fadeScreenUI = new FadeScreenUI(true, true);
		this.#gameStartTimer = new Timer(GAME_START_DELAY);

		this.#setCounterValues();
		this.#gameStartTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		this.#fadeScreenUI.fadeFinishedEvent.addListener(this.#onFadeFinished.bind(this));
	}

	update(deltaTime) {
		this.#startGameTextUI.update(deltaTime);
		this.#mainMenuCursorSprite.update(deltaTime);
		this.#fadeScreenUI.update(deltaTime);
		this.#gameStartTimer.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#gameLogoSprite.draw();
		this.#mainMenuCursorSprite.draw();
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
		this.#resetGameData();
	}

	#resetGameData() {
		var gameData = FrogGuy.getData();

		gameData.resetPlayerScore();
		gameData.resetCurrentLevelNumber();
	}

	#onGameLogoSpriteLoad(image) {
		this.#setPositionOfGameLogoSprite(image);
		this.#setPositionOfMainMenuCursorSprite(image);
	}

	#setPositionOfGameLogoSprite(image) {
		const x = GAME_WINDOW_WIDTH*0.5 - image.width*0.5;
		const y = GAME_WINDOW_HEIGHT*0.5 - image.height*0.5;
		
		this.#gameLogoSprite.setPosition(new Point(x, y));
	}

	#setPositionOfMainMenuCursorSprite(image) {
		const x = this.#startGameTextUI.getTextWidth() - GAME_FONT_SIZE;
		const y = GAME_WINDOW_HEIGHT*0.5 + image.height;
		
		this.#mainMenuCursorSprite.setPosition(new Point(x, y));
	}

	#setCounterValues() {
		const gameData = FrogGuy.getData();

		this.#playerScoreIntCounterGroupUI.setCounterValue(gameData.getPlayerScore());
		this.#highScoreIntCounterGroupUI.setCounterValue(gameData.getHighScore());
	}

	#onTimerFinished() {
		this.#fadeScreenUI.setFadeOut(false);
		this.#fadeScreenUI.startFading();
	}

	#onFadeFinished(fadeOut) {
		if(fadeOut) {
			this.#inputIsLocked = false;
		} else {
			FrogGuy.getSceneManager().switchScene(GAME_SCENE_NAME_KEY);
		}
	}
}