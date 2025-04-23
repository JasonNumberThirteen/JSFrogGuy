class GameScene extends Scene {
	#gameManager;
	#levelStateManager;
	#scoreManager;
	#soundManager;
	#nextSceneLoadTimer;
	#nextSceneKey;
	#field;
	#fieldObjectsContainer;
	#panelUI;
	#player;
	#flySprite;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		this.#gameManager = new GameManager();
		this.#levelStateManager = new LevelStateManager();
		this.#scoreManager = new ScoreManager();
		this.#soundManager = FrogGuy.getSoundManager();
		this.#nextSceneLoadTimer = new Timer(undefined, false);
		this.#field = new Field();
		this.#fieldObjectsContainer = new FieldObjectsContainer();
		this.#panelUI = new GameScenePanelUI();
		
		this.#field.init();
		this.#fieldObjectsContainer.init(this.#field);

		this.#player = this.#fieldObjectsContainer.getPlayer();
		this.#flySprite = this.#fieldObjectsContainer.getFlySprite();

		this.#nextSceneLoadTimer.timerFinishedEvent.addListener(this.#onNextSceneLoadTimerFinished.bind(this));
		this.#panelUI.init();
		this.#panelUI.getFadeScreenUI().fadeFinishedEvent.addListener(fadeOut => this.#onFadeFinished(fadeOut));
		this.#player.getLives().livesChangedEvent.addListener(parameters => this.#onLivesChanged(parameters));
		this.#player.getSprite().playerMovedFromInputEvent.addListener(position => this.#onPlayerMovedFromInput(position));
		this.#gameManager.init();
		this.#gameManager.fieldDestinationTaken.addListener(this.#onFieldDestinationTaken.bind(this));
		this.#levelStateManager.levelStateChangedEvent.addListener(this.#onLevelStateChanged.bind(this));
		this.#gameManager.closestPositionToFieldDestinationsUpdatedEvent.addListener(this.#onClosestPositionToFieldDestinationsUpdated.bind(this));
		this.#flySprite.flyWasEatenByPlayer.addListener(this.#onFlyWasEatenByPlayer.bind(this));
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

	getLevelStateManager() {
		return this.#levelStateManager;
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

	#onFieldDestinationTaken(fieldDestination) {
		this.#scoreManager.increasePlayerScoreBy(POINTS_FOR_REACHING_FIELD_DESTINATION);
		this.#soundManager.playSoundOfType(SoundType.ReachingFieldDestinationByPlayer);
	}

	#onFlyWasEatenByPlayer() {
		this.#scoreManager.increasePlayerScoreBy(POINTS_FOR_EATING_FLY);
		this.#soundManager.playSoundOfType(SoundType.EatingFlyByPlayer);
	}

	#onLevelStateChanged(levelState) {
		const gameIsOver = levelState === LevelState.Over;
		const soundType = gameIsOver ? SoundType.GameOver : SoundType.LevelCompletion;
		
		this.#nextSceneKey = gameIsOver ? MAIN_MENU_SCENE_NAME_KEY : GAME_SCENE_NAME_KEY;

		this.#soundManager.playSoundOfType(soundType);
		this.#nextSceneLoadTimer.startTimerWithSetDuration(this.#soundManager.getSoundOfType(soundType).getDuration());
	}

	#onClosestPositionToFieldDestinationsUpdated() {
		this.#scoreManager.increasePlayerScoreBy(POINTS_FOR_STEP_CLOSER_TO_FIELD_DESTINATIONS);
	}

	#onNextSceneLoadTimerFinished() {
		this.#gameManager.saveScoreData(this.#panelUI.getPlayerScoreIntCounterGroupUI().getCounterValue(), this.#panelUI.getHighScoreIntCounterGroupUI().getCounterValue());
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

	#onPlayerMovedFromInput(position) {
		this.#soundManager.playSoundOfType(SoundType.PlayerMovement);
	}
}