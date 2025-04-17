class MainMenuScene extends Scene {
	gameStartedEvent = new GameEvent();
	
	#soundManager;
	#inputIsLocked = true;
	#gameStartTimer;
	#panelUI;

	constructor() {
		super(PALE_YELLOW_COLOR);
	}

	init() {
		this.#soundManager = FrogGuy.getSoundManager();
		this.#gameStartTimer = new Timer(this.#soundManager.getSoundOfType(SoundType.GameStart).getDuration());
		this.#panelUI = new MainMenuScenePanelUI();

		this.#addListeners();
	}

	update(deltaTime) {
		this.#gameStartTimer.update(deltaTime);
		this.#panelUI.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#panelUI.draw();
	}

	processInput(key) {
		if(key !== GAME_START_KEY || this.#inputIsLocked) {
			return;
		}

		this.#inputIsLocked = true;

		this.gameStartedEvent.invoke();
		this.#gameStartTimer.startTimer();
		this.#resetGameData();
		this.#soundManager.playSoundOfType(SoundType.GameStart);
	}

	#addListeners() {
		this.#panelUI.getFadeScreenUI().fadeFinishedEvent.addListener(this.#onFadeFinished.bind(this));
		this.#gameStartTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
	}

	#resetGameData() {
		var gameData = FrogGuy.getData();

		gameData.resetPlayerScore();
		gameData.resetCurrentLevelNumber();
	}

	#onTimerFinished() {
		const fadeScreenUI = this.#panelUI.getFadeScreenUI();

		fadeScreenUI.setFadeOut(false);
		fadeScreenUI.startFading();
	}

	#onFadeFinished(fadeOut) {
		if(fadeOut) {
			this.#inputIsLocked = false;
		} else {
			FrogGuy.getSceneManager().switchScene(GAME_SCENE_NAME_KEY);
		}
	}
}