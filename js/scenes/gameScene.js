class GameScene extends Scene {
	#gameManager;
	#scoreManager;
	#nextSceneLoadTimer;
	#nextSceneKey = GAME_SCENE_NAME_KEY;
	#field;
	#fieldObjectsContainer;
	#panelUI;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		this.#gameManager = new GameManager();
		this.#scoreManager = new ScoreManager();
		this.#nextSceneLoadTimer = new Timer(NEXT_SCENE_LOAD_IN_GAME_SCENE_DELAY);
		this.#field = new Field();
		this.#fieldObjectsContainer = new FieldObjectsContainer(this.#field);
		this.#panelUI = new GameScenePanelUI();
		
		this.#field.init();
		this.#nextSceneLoadTimer.timerFinishedEvent.addListener(this.#onNextSceneLoadTimerFinished.bind(this));
		this.#panelUI.getFadeScreenUI().fadeFinishedEvent.addListener(fadeOut => this.#onFadeFinished(fadeOut));
		this.#fieldObjectsContainer.getPlayer().getLives().livesChangedEvent.addListener(lives => this.#onLivesChanged(lives));
		this.#gameManager.init();
		this.#gameManager.frogSavedEvent.addListener(this.#onFrogSaved.bind(this));
		this.#gameManager.gameWonEvent.addListener(this.#onGameWon.bind(this));
		this.#gameManager.gameLostEvent.addListener(this.#onGameLost.bind(this));
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
		this.#fieldObjectsContainer.getPlayer().getSprite().processInput(key);
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

	getRandomAvailableFrogLocation() {
		return ListMethods.getRandomElement(this.#field.getFrogLocationFieldArea().getFreeFrogLocations());
	}

	reachedAnyOfAvailableFieldDestinations(position) {
		return this.#field.getFrogLocationFieldArea().getFreeFrogLocations().some(frogLocation => this.#gameManager.positionIsSufficientlyCloseToFrogLocationDestination(frogLocation.getDestination(), position));
	}

	playerIsStandingOnHazardousPosition(position) {
		const playerPosition = position || this.#fieldObjectsContainer.getPlayer().getSprite().getPosition();
		const playerIsStandingOnWater = this.#field.positionIsWithinAreaOfType(playerPosition, FieldAreaType.WATER) && !this.playerIntersectsWithAnyWoodenLogGroup(position) && !this.playerIntersectsWithAnyTurtlesGroup(position);

		return this.playerIntersectsWithAnyVehicle(position) || playerIsStandingOnWater;
	}

	playerIntersectsWithAnyVehicle(position) {
		const rectangle = this.#fieldObjectsContainer.getPlayer().getSprite().getRectangle();

		if(VariableMethods.variableIsDefined(position)) {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#fieldObjectsContainer.getVehicles().some(vehicle => rectangle.intersectsWith(vehicle.getRectangle()));
	}

	playerIntersectsWithAnyWoodenLogGroup(position) {
		const rectangle = this.#fieldObjectsContainer.getPlayer().getSprite().getRectangle();

		if(VariableMethods.variableIsDefined(position)) {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#fieldObjectsContainer.getWoodenLogGroups().some(woodenLogGroup => rectangle.intersectsWith(woodenLogGroup.getRectangle()));
	}

	playerIntersectsWithAnyTurtlesGroup(position) {
		const rectangle = this.#fieldObjectsContainer.getPlayer().getSprite().getRectangle();

		if(VariableMethods.variableIsDefined(position)) {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#fieldObjectsContainer.getTurtleGroups().some(turtleGroup => !turtleGroup.isHidden() && rectangle.intersectsWith(turtleGroup.getRectangle()));
	}

	getObjectOnRiverOnPlayerPositionIfPossible() {
		const objectsOnRiver = this.#fieldObjectsContainer.getWoodenLogGroups().slice();

		this.#fieldObjectsContainer.getTurtleGroups().forEach(turtleGroup => objectsOnRiver.push(turtleGroup));
		
		return objectsOnRiver.find(objectOnRiver => this.#fieldObjectsContainer.getPlayer().getSprite().getRectangle().intersectsWith(objectOnRiver.getRectangle()));
	}

	#onLivesChanged(lives) {
		this.#panelUI.getPlayerLivesPanelUI().setNumberOfSprites(lives);
	}

	#onFrogSaved(points) {
		this.#scoreManager.increasePlayerScoreBy(points);
	}

	#onGameWon() {
		this.#nextSceneLoadTimer.startTimer();
	}

	#onGameLost() {
		this.#nextSceneKey = MAIN_MENU_SCENE_NAME_KEY;

		this.#nextSceneLoadTimer.startTimer();
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