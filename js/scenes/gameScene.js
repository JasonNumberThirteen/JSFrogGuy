class GameScene extends Scene {
	frogSavedEvent = new GameEvent();
	gameWonEvent = new GameEvent();
	
	#nextSceneLoadTimer;
	#remainingTimeTimer;
	#nextSceneKey = GAME_SCENE_NAME_KEY;
	#closestYToFieldDestinations;
	#gameIsOver;
	#fieldObjectsContainer;
	#panelUI;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		this.#nextSceneLoadTimer = new Timer(NEXT_SCENE_LOAD_IN_GAME_SCENE_DELAY);
		this.#remainingTimeTimer = new Timer(LEVEL_TIME, true);
		this.#gameIsOver = false;
		this.#fieldObjectsContainer = new FieldObjectsContainer();
		this.#panelUI = new GameScenePanelUI();
		
		this.#nextSceneLoadTimer.timerFinishedEvent.addListener(this.#onNextSceneLoadTimerFinished.bind(this));
		this.#remainingTimeTimer.timerFinishedEvent.addListener(this.#setGameAsOverIfNeeded.bind(this));
		this.#addListenersToPlayer();
		this.#panelUI.getFadeScreenUI().fadeFinishedEvent.addListener(fadeOut => this.#onFadeFinished(fadeOut));
		this.#resetClosestYToFieldDestinations();
	}

	update(deltaTime) {
		this.#nextSceneLoadTimer.update(deltaTime);

		if(!this.#gameIsOver) {
			this.#remainingTimeTimer.update(deltaTime);
		}

		this.#fieldObjectsContainer.update(deltaTime);
		this.#panelUI.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#fieldObjectsContainer.draw();
		this.#panelUI.draw();
	}

	processInput(key) {
		this.#fieldObjectsContainer.getPlayerSlicedSprite().processInput(key);
	}

	getLeftTime() {
		return this.#remainingTimeTimer.getDuration() - this.#remainingTimeTimer.getCurrentTime();
	}

	gameIsOver() {
		return this.#gameIsOver;
	}

	getRandomAvailableDestination() {
		return ListMethods.getRandomElement(this.#fieldObjectsContainer.getAvailableFieldDestinations());
	}

	reachedAnyOfAvailableFieldDestinations(position) {
		return this.#fieldObjectsContainer.getAvailableFieldDestinations().some(fieldDestination => this.#positionIsSufficientlyCloseToFieldDestination(fieldDestination, position));
	}

	playerIsStandingOnHazardousPosition(position) {
		const playerPosition = position || this.#fieldObjectsContainer.getPlayerSlicedSprite().getPosition();
		const playerIsWithinRiverField = playerPosition.y >= 32 && playerPosition.y <= 64;
		const playerIsStandingOnRiver = playerIsWithinRiverField && !this.playerIntersectsWithAnyWoodenLogGroup(position) && !this.playerIntersectsWithAnyTurtlesGroup(position);

		return this.playerIntersectsWithAnyVehicle(position) || playerIsStandingOnRiver;
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

	#positionIsSufficientlyCloseToFieldDestination(destination, position) {
		const destinationPosition = destination.getPosition();
		const differenceInPositionXIsSufficientlySmall = Math.abs(destinationPosition.x - position.x) <= DESTINATION_POSITION_X_THRESHOLD;

		return differenceInPositionXIsSufficientlySmall && destinationPosition.y == position.y;
	}

	#resetClosestYToFieldDestinations() {
		this.#closestYToFieldDestinations = PLAYER_INITIAL_Y;
	}

	#onFieldDestinationReached(position) {
		const availableFieldDestination = this.#fieldObjectsContainer.getAvailableFieldDestinations().find(fieldDestination => this.#positionIsSufficientlyCloseToFieldDestination(fieldDestination, position));

		if(typeof(availableFieldDestination) === "undefined") {
			return;
		}

		const availableFieldDestinationRectangle = availableFieldDestination.getRectangle();
		const flySprite = this.#fieldObjectsContainer.getFlySprite();
		const playerIntersectsWithFly = availableFieldDestinationRectangle.intersectsWith(flySprite.getRectangle());
		const points = playerIntersectsWithFly ? POINTS_FOR_REACHING_FIELD_DESTINATION + POINTS_FOR_EATING_FLY : POINTS_FOR_REACHING_FIELD_DESTINATION;

		if(playerIntersectsWithFly) {
			const availableFieldDestinationPosition = availableFieldDestinationRectangle.getPosition();
			const availableFieldDestinationSize = availableFieldDestinationRectangle.getSize();
			
			flySprite.setActive(false);
			this.#panelUI.getBonusPointsTextUI().display(new Point(availableFieldDestinationPosition.x + availableFieldDestinationSize.x*0.5, availableFieldDestinationPosition.y + availableFieldDestinationSize.y), POINTS_FOR_EATING_FLY.toString());
		}

		this.#fieldObjectsContainer.getSavedFrogs().push(new SavedFrogSprite(availableFieldDestination.getPosition()));
		this.frogSavedEvent.invoke();
		this.#panelUI.getPlayerScoreIntCounterGroupUI().increaseCounterValue(points);
		ListMethods.removeElementByReferenceIfPossible(this.#fieldObjectsContainer.getAvailableFieldDestinations(), availableFieldDestination);
		this.#resetClosestYToFieldDestinations();
		this.#remainingTimeTimer.startTimer();
		this.#checkIfWonGame();
	}

	#checkIfWonGame() {
		if(this.#fieldObjectsContainer.getAvailableFieldDestinations().length > 0) {
			return;
		}

		this.gameWonEvent.invoke();
		this.#nextSceneLoadTimer.startTimer();
		FrogGuy.getData().increaseCurrentLevelNumberBy(1);
	}

	#onLivesChanged(lives) {
		this.#panelUI.getPlayerLivesPanelUI().setNumberOfSprites(lives);
	
		if(lives <= 0) {
			this.#setGameAsOverIfNeeded();
		}
	}

	#onPositionChanged(position) {
		if(position.y >= this.#closestYToFieldDestinations) {
			return;
		}
		
		this.#closestYToFieldDestinations = position.y;
			
		this.#panelUI.getPlayerScoreIntCounterGroupUI().increaseCounterValue(POINTS_FOR_STEP_CLOSER_TO_FIELD_DESTINATIONS);
		this.#panelUI.updateHighScoreIfNeeded();
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