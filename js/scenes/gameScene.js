class GameScene extends Scene {
	frogSavedEvent = new GameEvent();
	gameWonEvent = new GameEvent();
	
	#scoreManager;
	#nextSceneLoadTimer;
	#levelTimer;
	#nextSceneKey = GAME_SCENE_NAME_KEY;
	#closestYToFieldDestinations;
	#gameIsOver;
	#field;
	#fieldObjectsContainer;
	#panelUI;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		this.#scoreManager = new ScoreManager();
		this.#nextSceneLoadTimer = new Timer(NEXT_SCENE_LOAD_IN_GAME_SCENE_DELAY);
		this.#levelTimer = new LevelTimer();
		this.#gameIsOver = false;
		this.#field = new Field();
		this.#fieldObjectsContainer = new FieldObjectsContainer(this.#field);
		this.#panelUI = new GameScenePanelUI();
		
		this.#field.init();
		this.#nextSceneLoadTimer.timerFinishedEvent.addListener(this.#onNextSceneLoadTimerFinished.bind(this));
		this.#levelTimer.timerFinishedEvent.addListener(this.#setGameAsOverIfNeeded.bind(this));
		this.#addListenersToPlayer();
		this.#panelUI.getFadeScreenUI().fadeFinishedEvent.addListener(fadeOut => this.#onFadeFinished(fadeOut));
		this.#resetClosestYToFieldDestinations();
	}

	update(deltaTime) {
		this.#nextSceneLoadTimer.update(deltaTime);
		this.#levelTimer.update(deltaTime);
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
		this.#fieldObjectsContainer.getPlayerSlicedSprite().processInput(key);
	}

	getField() {
		return this.#field;
	}

	getPanelUI() {
		return this.#panelUI;
	}

	getLeftTime() {
		return this.#levelTimer.getLeftTime();
	}

	gameIsOver() {
		return this.#gameIsOver;
	}

	getRandomAvailableFrogLocation() {
		return ListMethods.getRandomElement(this.#field.getFrogLocationFieldArea().getFreeFrogLocations());
	}

	reachedAnyOfAvailableFieldDestinations(position) {
		return this.#field.getFrogLocationFieldArea().getFreeFrogLocations().some(frogLocation => this.#positionIsSufficientlyCloseToFrogLocationDestination(frogLocation.getDestination(), position));
	}

	playerIsStandingOnHazardousPosition(position) {
		const playerPosition = position || this.#fieldObjectsContainer.getPlayerSlicedSprite().getPosition();
		const playerIsStandingOnWater = this.#field.positionIsWithinAreaOfType(playerPosition, FieldAreaType.WATER) && !this.playerIntersectsWithAnyWoodenLogGroup(position) && !this.playerIntersectsWithAnyTurtlesGroup(position);

		return this.playerIntersectsWithAnyVehicle(position) || playerIsStandingOnWater;
	}

	playerIntersectsWithAnyVehicle(position) {
		const rectangle = this.#fieldObjectsContainer.getPlayerSlicedSprite().getRectangle();

		if(typeof(position) !== "undefined") {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#fieldObjectsContainer.getVehicles().some(vehicle => rectangle.intersectsWith(vehicle.getRectangle()));
	}

	playerIntersectsWithAnyWoodenLogGroup(position) {
		const rectangle = this.#fieldObjectsContainer.getPlayerSlicedSprite().getRectangle();

		if(typeof(position) !== "undefined") {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#fieldObjectsContainer.getWoodenLogGroups().some(woodenLogGroup => rectangle.intersectsWith(woodenLogGroup.getRectangle()));
	}

	playerIntersectsWithAnyTurtlesGroup(position) {
		const rectangle = this.#fieldObjectsContainer.getPlayerSlicedSprite().getRectangle();

		if(typeof(position) !== "undefined") {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#fieldObjectsContainer.getTurtleGroups().some(turtleGroup => !turtleGroup.isHidden() && rectangle.intersectsWith(turtleGroup.getRectangle()));
	}

	getObjectOnRiverOnPlayerPositionIfPossible() {
		const objectsOnRiver = this.#fieldObjectsContainer.getWoodenLogGroups().slice();

		this.#fieldObjectsContainer.getTurtleGroups().forEach(turtleGroup => objectsOnRiver.push(turtleGroup));
		
		return objectsOnRiver.find(objectOnRiver => this.#fieldObjectsContainer.getPlayerSlicedSprite().getRectangle().intersectsWith(objectOnRiver.getRectangle()));
	}

	#addListenersToPlayer() {
		const playerSlicedSprite = this.#fieldObjectsContainer.getPlayerSlicedSprite();
		
		playerSlicedSprite.destinationReachedEvent.addListener(position => this.#onFieldDestinationReached(position));
		playerSlicedSprite.livesChangedEvent.addListener(lives => this.#onLivesChanged(lives));
		playerSlicedSprite.positionChangedEvent.addListener(position => this.#onPositionChanged(position));
	}

	#positionIsSufficientlyCloseToFrogLocationDestination(destination, position) {
		const destinationPosition = destination.getPosition();
		const differenceInPositionXIsSufficientlySmall = Math.abs(destinationPosition.x - position.x) <= DESTINATION_POSITION_X_THRESHOLD;

		return differenceInPositionXIsSufficientlySmall && destinationPosition.y === position.y;
	}

	#resetClosestYToFieldDestinations() {
		this.#closestYToFieldDestinations = PLAYER_INITIAL_Y;
	}

	#onFieldDestinationReached(position) {
		const availableFieldDestination = this.#field.getFrogLocationFieldArea().getFreeFrogLocations().find(frogLocation => this.#positionIsSufficientlyCloseToFrogLocationDestination(frogLocation.getDestination(), position));

		if(typeof(availableFieldDestination) === "undefined") {
			return;
		}

		const availableFieldDestinationRectangle = availableFieldDestination.getRectangle();
		const flySprite = this.#fieldObjectsContainer.getFlySprite();
		const playerIntersectsWithFly = flySprite.isActive() && availableFieldDestinationRectangle.intersectsWith(flySprite.getRectangle());

		if(playerIntersectsWithFly) {
			const availableFieldDestinationPosition = availableFieldDestinationRectangle.getPosition();
			const availableFieldDestinationSize = availableFieldDestinationRectangle.getSize();
			
			flySprite.setActive(false);
			this.#panelUI.getBonusPointsTextUI().display(new Point(availableFieldDestinationPosition.x + availableFieldDestinationSize.x*0.5, availableFieldDestinationPosition.y + availableFieldDestinationSize.y), POINTS_FOR_EATING_FLY.toString());
		}

		availableFieldDestination.setAsTaken(true);
		this.frogSavedEvent.invoke();
		this.#scoreManager.increasePlayerScoreBy(playerIntersectsWithFly ? POINTS_FOR_REACHING_FIELD_DESTINATION + POINTS_FOR_EATING_FLY : POINTS_FOR_REACHING_FIELD_DESTINATION);
		ListMethods.removeElementByReferenceIfPossible(this.#field.getFrogLocationFieldArea().getFreeFrogLocations(), availableFieldDestination);
		this.#resetClosestYToFieldDestinations();
		this.#affectLevelTimerDependingOnGameState();
		this.#checkIfWonGame();
	}

	#affectLevelTimerDependingOnGameState() {
		if(this.#allFrogLocationsAreTaken()) {
			this.#levelTimer.setAsPaused(true);
		} else {
			this.#levelTimer.startTimer();
		}
	}

	#checkIfWonGame() {
		if(!this.#allFrogLocationsAreTaken()) {
			return;
		}

		this.gameWonEvent.invoke();
		this.#nextSceneLoadTimer.startTimer();
		FrogGuy.getData().increaseCurrentLevelNumberBy(1);
	}

	#allFrogLocationsAreTaken() {
		return this.#field.getFrogLocationFieldArea().getFreeFrogLocations().length === 0;
	}

	#onLivesChanged(lives) {
		this.#panelUI.getPlayerLivesPanelUI().setNumberOfSprites(lives);
	
		if(lives <= 0) {
			this.#setGameAsOverIfNeeded();
		}
	}

	#onPositionChanged(position) {
		if(position.y >= this.#closestYToFieldDestinations || this.#field.positionIsWithinAreaOfType(position, FieldAreaType.WALKWAY)) {
			return;
		}
		
		this.#closestYToFieldDestinations = position.y;

		this.#scoreManager.increasePlayerScoreBy(POINTS_FOR_STEP_CLOSER_TO_FIELD_DESTINATIONS);
	}

	#setGameAsOverIfNeeded() {
		if(this.#gameIsOver) {
			return;
		}
		
		this.#nextSceneKey = MAIN_MENU_SCENE_NAME_KEY;
		this.#gameIsOver = true;

		this.#nextSceneLoadTimer.startTimer();
	}

	#onNextSceneLoadTimerFinished() {
		this.#updateGameData();
		this.#startFading();
	}

	#updateGameData() {
		const gameData = FrogGuy.getData();

		gameData.setPlayerScore(this.#panelUI.getPlayerScoreIntCounterGroupUI().getCounterValue());
		gameData.setHighScore(this.#panelUI.getHighScoreIntCounterGroupUI().getCounterValue());
		gameData.saveValues();
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