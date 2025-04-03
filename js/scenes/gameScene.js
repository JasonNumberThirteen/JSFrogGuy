class GameScene extends Scene {
	gameWonEvent = new GameEvent();
	
	#fieldSprite;
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#playerAnimatedSprite;
	#playerLivesSpritesGroup;
	#remainingTimePanelUI;
	#fadeScreenUI;
	#availableDestinationPositions;
	#savedFrogs;
	#vehicles;
	#woodenLogs;
	#turtleGroups;
	#fieldEdgesCover;
	#nextSceneLoadTimer;
	#remainingTimeTimer;
	#nextSceneKey = GAME_SCENE_NAME_KEY;
	#closestYToDestinationPoints;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		const objectsGenerator = new ObjectsGenerator();
		
		this.#fieldSprite = new Sprite(FIELD_SPRITE_FILENAME, new Point(), this.#onFieldSpriteLoad.bind(this));
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#playerAnimatedSprite = new PlayerAnimatedSprite();
		this.#playerLivesSpritesGroup = new PlayerLivesSpritesGroup(this.#playerAnimatedSprite.getLives());
		this.#remainingTimePanelUI = new RemainingTimePanelUI();
		this.#fadeScreenUI = new FadeScreenUI(true, true);
		this.#savedFrogs = [];
		this.#vehicles = objectsGenerator.createVehicles();
		this.#woodenLogs = objectsGenerator.createWoodenLogs();
		this.#turtleGroups = objectsGenerator.createTurtleGroups();
		this.#fieldEdgesCover = new FieldEdgesCover();
		this.#nextSceneLoadTimer = new Timer(NEXT_SCENE_LOAD_IN_GAME_SCENE_DELAY);
		this.#remainingTimeTimer = new Timer(LEVEL_TIME, true);
		
		this.#setCounterValues();
		this.#playerAnimatedSprite.destinationReachedEvent.addListener(position => this.#onDestinationReached(position));
		this.#playerAnimatedSprite.livesChangedEvent.addListener(lives => this.#onLivesChanged(lives));
		this.#playerAnimatedSprite.positionChangedEvent.addListener(position => this.#onPositionChanged(position));
		this.#nextSceneLoadTimer.timerFinishedEvent.addListener(this.#onNextSceneLoadTimerFinished.bind(this));
		this.#remainingTimeTimer.timerFinishedEvent.addListener(this.#setGameAsOver.bind(this));
		this.#fadeScreenUI.fadeFinishedEvent.addListener(fadeOut => this.#onFadeFinished(fadeOut));
		this.#resetClosestYToDestinationPoints();
	}

	update(deltaTime) {
		this.#playerAnimatedSprite.update(deltaTime);
		this.#nextSceneLoadTimer.update(deltaTime);
		this.#remainingTimeTimer.update(deltaTime);
		this.#vehicles.forEach(vehicle => vehicle.update(deltaTime));
		this.#woodenLogs.forEach(woodenLog => woodenLog.update(deltaTime));
		this.#turtleGroups.forEach(turtle => turtle.update(deltaTime));
		this.#fadeScreenUI.update(deltaTime);
		this.#remainingTimePanelUI.setCurrentValue(this.#remainingTimeTimer.getDuration() - this.#remainingTimeTimer.getCurrentTime());
	}

	draw() {
		this.clearScreen();
		this.#fieldSprite.draw();
		this.#savedFrogs.forEach(savedFrog => savedFrog.draw());
		this.#woodenLogs.forEach(woodenLog => woodenLog.draw());
		this.#turtleGroups.forEach(turtle => turtle.draw());
		this.#playerAnimatedSprite.draw();
		this.#vehicles.forEach(vehicle => vehicle.draw());
		this.#fieldEdgesCover.draw();
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
		this.#playerLivesSpritesGroup.draw();
		this.#remainingTimePanelUI.draw();
		this.#fadeScreenUI.draw();
	}

	processInput(key) {
		this.#playerAnimatedSprite.processInput(key);
	}

	reachedAnyOfLeftDestinationPositions(position) {
		return this.#availableDestinationPositions.some(destinationPosition => this.#positionIsSufficientlyCloseToDestinationPosition(destinationPosition, position));
	}

	playerIsStandingOnHazardousPosition() {
		const playerPosition = this.#playerAnimatedSprite.getPosition();
		const playerIsWithinRiverField = playerPosition.y >= 32 && playerPosition.y <= 64;
		const playerIsStandingOnRiver = playerIsWithinRiverField && !this.playerIntersectsWithAnyWoodenLog() && !this.playerIntersectsWithAnyTurtlesGroup();

		return this.playerIntersectsWithAnyVehicle() || playerIsStandingOnRiver;
	}

	playerIntersectsWithAnyVehicle() {
		return this.#vehicles.some(vehicle => CollisionMethods.rectanglesIntersectWithEachOther(this.#playerAnimatedSprite.getRectangle(), vehicle.getRectangle()));
	}

	playerIntersectsWithAnyWoodenLog() {
		return this.#woodenLogs.some(woodenLog => CollisionMethods.rectanglesIntersectWithEachOther(this.#playerAnimatedSprite.getRectangle(), woodenLog.getRectangle()));
	}

	playerIntersectsWithAnyTurtlesGroup() {
		return this.#turtleGroups.some(turtleGroup => CollisionMethods.rectanglesIntersectWithEachOther(this.#playerAnimatedSprite.getRectangle(), turtleGroup.getRectangle()));
	}

	getObjectOnRiverOnPlayerPositionIfPossible() {
		const objectsOnRiver = this.#woodenLogs.slice();

		this.#turtleGroups.forEach(turtleGroup => objectsOnRiver.push(turtleGroup));
		
		return objectsOnRiver.find(objectOnRiver => CollisionMethods.rectanglesIntersectWithEachOther(this.#playerAnimatedSprite.getRectangle(), objectOnRiver.getRectangle()));
	}

	#onFieldSpriteLoad(image) {
		const x = GAME_WINDOW_WIDTH*0.5 - image.width*0.5;
		const y = GAME_WINDOW_HEIGHT*0.5 - image.height*0.5;
		
		this.#fieldSprite.setPosition(new Point(x, y));

		this.#availableDestinationPositions = [new Point(x + 8, y + 8), new Point(x + 32, y + 8), new Point(x + 56, y + 8), new Point(x + 80, y + 8), new Point(x + 104, y + 8)];
	}

	#setCounterValues() {
		const gameData = FrogGuy.getData();

		this.#playerScoreIntCounterGroupUI.setCounterValue(gameData.getPlayerScore());
		this.#highScoreIntCounterGroupUI.setCounterValue(gameData.getHighScore());
	}

	#onDestinationReached(position) {
		const availableDestinationPosition = this.#availableDestinationPositions.find(destinationPosition => this.#positionIsSufficientlyCloseToDestinationPosition(destinationPosition, position));

		if(typeof(availableDestinationPosition) === "undefined") {
			return;
		}

		this.#savedFrogs.push(new SavedFrogSprite(availableDestinationPosition));
		this.#playerScoreIntCounterGroupUI.increaseCounterValue(POINTS_FOR_REACHING_DESTINATION_POINT);
		ListMethods.removeElementByReferenceIfPossible(this.#availableDestinationPositions, availableDestinationPosition);
		this.#resetClosestYToDestinationPoints();
		this.#remainingTimeTimer.startTimer();
		this.#checkIfWonGame();
	}

	#positionIsSufficientlyCloseToDestinationPosition(destinationPosition, position) {
		const differenceInPositionXIsSufficientlySmall = Math.abs(destinationPosition.x - position.x) <= DESTINATION_POSITION_X_THRESHOLD;

		return differenceInPositionXIsSufficientlySmall && destinationPosition.y == position.y;
	}

	#resetClosestYToDestinationPoints() {
		this.#closestYToDestinationPoints = this.#playerAnimatedSprite.getPosition().y;
	}

	#checkIfWonGame() {
		if(this.#availableDestinationPositions.length > 0) {
			return;
		}

		this.gameWonEvent.invoke();
		this.#nextSceneLoadTimer.startTimer();
	}

	#onLivesChanged(lives) {
		this.#playerLivesSpritesGroup.setNumberOfSprites(lives);
	
		if(lives <= 0) {
			this.#setGameAsOver();
		}
	}

	#onPositionChanged(position) {
		if(position.y >= this.#closestYToDestinationPoints) {
			return;
		}
		
		this.#closestYToDestinationPoints = position.y;
			
		this.#playerScoreIntCounterGroupUI.increaseCounterValue(POINTS_FOR_STEP_CLOSER_TO_DESTINATION_POSITIONS);
		this.#updateHighScoreIfNeeded();
	}

	#updateHighScoreIfNeeded() {
		const currentPlayerScore = this.#playerScoreIntCounterGroupUI.getCounterValue();
		const currentHighScore = this.#highScoreIntCounterGroupUI.getCounterValue();

		if(currentPlayerScore > currentHighScore) {
			this.#highScoreIntCounterGroupUI.setCounterValue(currentPlayerScore);
		}
	}

	#setGameAsOver() {
		this.#nextSceneKey = MAIN_MENU_SCENE_NAME_KEY;

		this.#nextSceneLoadTimer.startTimer();
	}

	#onNextSceneLoadTimerFinished() {
		this.#updateGameData();
		this.#startFading();
	}

	#updateGameData() {
		const gameData = FrogGuy.getData();

		gameData.setPlayerScore(this.#playerScoreIntCounterGroupUI.getCounterValue());
		gameData.setHighScore(this.#highScoreIntCounterGroupUI.getCounterValue());
	}

	#startFading() {
		this.#fadeScreenUI.setFadeOut(false);
		this.#fadeScreenUI.startFading();
	}

	#onFadeFinished(fadeOut) {
		if(!fadeOut) {
			FrogGuy.getSceneManager().switchScene(this.#nextSceneKey);
		}
	}
}