class GameScene extends Scene {
	#gameManager;
	#scoreManager;
	#soundManager;
	#nextSceneLoadTimer;
	#nextSceneKey;
	#field;
	#fieldObjectsContainer;
	#panelUI;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		this.#gameManager = new GameManager();
		this.#scoreManager = new ScoreManager();
		this.#soundManager = FrogGuy.getSoundManager();
		this.#nextSceneLoadTimer = new Timer(undefined, false);
		this.#field = new Field();
		this.#fieldObjectsContainer = new FieldObjectsContainer();
		this.#panelUI = new GameScenePanelUI();
		
		this.#field.init();
		this.#fieldObjectsContainer.init(this.#field);
		this.#nextSceneLoadTimer.timerFinishedEvent.addListener(this.#onNextSceneLoadTimerFinished.bind(this));
		this.#panelUI.getFadeScreenUI().fadeFinishedEvent.addListener(fadeOut => this.#onFadeFinished(fadeOut));
		this.#fieldObjectsContainer.getPlayer().getLives().livesChangedEvent.addListener(parameters => this.#onLivesChanged(parameters));
		this.#gameManager.init();
		this.#gameManager.frogSavedEvent.addListener(this.#onFrogSaved.bind(this));
		this.#gameManager.gameWonEvent.addListener(() => this.#onGameStateChanged(false));
		this.#gameManager.gameLostEvent.addListener(() => this.#onGameStateChanged(true));
		this.#gameManager.closestPositionToFieldDestinationsUpdatedEvent.addListener(this.#onClosestPositionToFieldDestinationsUpdated.bind(this));
	}

	update(deltaTime) {
		this.#gameManager.update(deltaTime);
		this.#nextSceneLoadTimer.update(deltaTime);
		this.#fieldObjectsContainer.update(deltaTime);
		this.#panelUI.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#field.draw();
		this.#fieldObjectsContainer.draw();
		this.#panelUI.draw();
	}

	processInput(key) {
		this.#fieldObjectsContainer.getPlayer().processInput(key);
	}

	getGameManager() {
		return this.#gameManager;
	}

	getScoreManager() {
		return this.#scoreManager;
	}

	getField() {
		return this.#field;
	}

	getFieldObjectsContainer() {
		return this.#fieldObjectsContainer;
	}

	getPanelUI() {
		return this.#panelUI;
	}

	#onLivesChanged(parameters) {
		this.#panelUI.getPlayerLivesPanelUI().setNumberOfSprites(parameters.lives);
	}

	#onFrogSaved(points) {
		this.#scoreManager.increasePlayerScoreBy(points);
	}

	#onGameStateChanged(gameIsOver) {
		const soundType = gameIsOver ? SoundType.GameOver : SoundType.LevelCompletion;
		
		this.#nextSceneKey = gameIsOver ? MAIN_MENU_SCENE_NAME_KEY : GAME_SCENE_NAME_KEY;

		this.#soundManager.playSoundOfType(soundType);
		this.#nextSceneLoadTimer.startTimerWithSetDuration(this.#soundManager.getSoundOfType(soundType).getDuration());
	}

	#onClosestPositionToFieldDestinationsUpdated() {
		this.#scoreManager.increasePlayerScoreBy(POINTS_FOR_STEP_CLOSER_TO_FIELD_DESTINATIONS);
	}

	#onNextSceneLoadTimerFinished() {
		this.#gameManager.updateGameData(this.#panelUI.getPlayerScoreIntCounterGroupUI().getCounterValue(), this.#panelUI.getHighScoreIntCounterGroupUI().getCounterValue());
		this.#startFading();
	}

	#startFading() {
		const fadeScreenUI = this.#panelUI.getFadeScreenUI();
		
		fadeScreenUI.setFadeOut(false);
		fadeScreenUI.startFading();
	}

	#onFadeFinished(fadeOut) {
		if(!fadeOut) {
			FrogGuy.getSceneManager().switchScene(this.#nextSceneKey);
		}
	}
}