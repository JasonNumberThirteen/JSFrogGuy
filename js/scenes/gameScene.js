class GameScene extends Scene {
	frogSavedEvent = new GameEvent();
	gameWonEvent = new GameEvent();
	
	#fieldSprite;
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#playerAnimatedSprite;
	#flySprite;
	#playerLivesPanelUI;
	#levelTimerPanelUI;
	#currentLevelTextUI;
	#gameOverTextUI;
	#bonusPointsTextUI;
	#fadeScreenUI;
	#availableFieldDestinations;
	#savedFrogs;
	#vehicles;
	#woodenLogGroups;
	#turtleGroups;
	#fieldEdgesCover;
	#nextSceneLoadTimer;
	#remainingTimeTimer;
	#nextSceneKey = GAME_SCENE_NAME_KEY;
	#closestYToFieldDestinations;
	#gameIsOver;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		const objectsGenerator = new ObjectsGenerator();
		
		this.#fieldSprite = new Sprite(FIELD_SPRITE_FILENAME, new Point(), this.#onFieldSpriteLoad.bind(this));
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#playerAnimatedSprite = new PlayerAnimatedSprite();
		this.#flySprite = new FlySprite();
		this.#playerLivesPanelUI = new PlayerLivesPanelUI(this.#playerAnimatedSprite.getLives());
		this.#levelTimerPanelUI = new LevelTimerPanelUI();
		this.#currentLevelTextUI = new CurrentLevelTextUI();
		this.#gameOverTextUI = new GameOverTextUI();
		this.#bonusPointsTextUI = new BonusPointsTextUI();
		this.#fadeScreenUI = new FadeScreenUI(true, true);
		this.#savedFrogs = [];
		this.#vehicles = objectsGenerator.createVehicles();
		this.#woodenLogGroups = objectsGenerator.createWoodenLogGroups();
		this.#turtleGroups = objectsGenerator.createTurtleGroups();
		this.#fieldEdgesCover = new FieldEdgesCover();
		this.#nextSceneLoadTimer = new Timer(NEXT_SCENE_LOAD_IN_GAME_SCENE_DELAY);
		this.#remainingTimeTimer = new Timer(LEVEL_TIME, true);
		this.#gameIsOver = false;
		
		this.#setCounterValues();
		this.#playerAnimatedSprite.destinationReachedEvent.addListener(position => this.#onFieldDestinationReached(position));
		this.#playerAnimatedSprite.livesChangedEvent.addListener(lives => this.#onLivesChanged(lives));
		this.#playerAnimatedSprite.positionChangedEvent.addListener(position => this.#onPositionChanged(position));
		this.#nextSceneLoadTimer.timerFinishedEvent.addListener(this.#onNextSceneLoadTimerFinished.bind(this));
		this.#remainingTimeTimer.timerFinishedEvent.addListener(this.#setGameAsOverIfNeeded.bind(this));
		this.#fadeScreenUI.fadeFinishedEvent.addListener(fadeOut => this.#onFadeFinished(fadeOut));
		this.#resetClosestYToFieldDestinations();
	}

	update(deltaTime) {
		this.#playerAnimatedSprite.update(deltaTime);
		this.#flySprite.update(deltaTime);
		this.#nextSceneLoadTimer.update(deltaTime);

		if(!this.#gameIsOver) {
			this.#remainingTimeTimer.update(deltaTime);
		}

		this.#currentLevelTextUI.update(deltaTime);
		this.#bonusPointsTextUI.update(deltaTime);
		this.#vehicles.forEach(vehicle => vehicle.update(deltaTime));
		this.#woodenLogGroups.forEach(woodenLogGroup => woodenLogGroup.update(deltaTime));
		this.#turtleGroups.forEach(turtle => turtle.update(deltaTime));
		this.#fadeScreenUI.update(deltaTime);
		this.#levelTimerPanelUI.setCurrentValue(this.#remainingTimeTimer.getDuration() - this.#remainingTimeTimer.getCurrentTime());
	}

	draw() {
		this.clearScreen();
		this.#fieldSprite.draw();
		this.#savedFrogs.forEach(savedFrog => savedFrog.draw());
		this.#woodenLogGroups.forEach(woodenLogGroup => woodenLogGroup.draw());
		this.#turtleGroups.forEach(turtle => turtle.draw());
		this.#playerAnimatedSprite.draw();
		this.#flySprite.draw();
		this.#vehicles.forEach(vehicle => vehicle.draw());
		this.#fieldEdgesCover.draw();
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
		this.#playerLivesPanelUI.draw();
		this.#levelTimerPanelUI.draw();

		if(this.#gameIsOver) {
			this.#gameOverTextUI.draw();
		} else {
			this.#currentLevelTextUI.draw();
		}
		
		this.#bonusPointsTextUI.draw();
		this.#fadeScreenUI.draw();
	}

	processInput(key) {
		this.#playerAnimatedSprite.processInput(key);
	}

	gameIsOver() {
		return this.#gameIsOver;
	}

	getRandomAvailableDestination() {
		const randomIndex = Math.floor(Math.random() * this.#availableFieldDestinations.length);
		
		return this.#availableFieldDestinations[randomIndex];
	}

	reachedAnyOfAvailableFieldDestinations(position) {
		return this.#availableFieldDestinations.some(fieldDestination => this.#positionIsSufficientlyCloseToFieldDestination(fieldDestination, position));
	}

	playerIsStandingOnHazardousPosition(position) {
		const playerPosition = position || this.#playerAnimatedSprite.getPosition();
		const playerIsWithinRiverField = playerPosition.y >= 32 && playerPosition.y <= 64;
		const playerIsStandingOnRiver = playerIsWithinRiverField && !this.playerIntersectsWithAnyWoodenLogGroup(position) && !this.playerIntersectsWithAnyTurtlesGroup(position);

		return this.playerIntersectsWithAnyVehicle(position) || playerIsStandingOnRiver;
	}

	playerIntersectsWithAnyVehicle(position) {
		const rectangle = this.#playerAnimatedSprite.getRectangle();

		if(typeof(position) !== "undefined") {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#vehicles.some(vehicle => rectangle.intersectsWith(vehicle.getRectangle()));
	}

	playerIntersectsWithAnyWoodenLogGroup(position) {
		const rectangle = this.#playerAnimatedSprite.getRectangle();

		if(typeof(position) !== "undefined") {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#woodenLogGroups.some(woodenLogGroup => rectangle.intersectsWith(woodenLogGroup.getRectangle()));
	}

	playerIntersectsWithAnyTurtlesGroup(position) {
		const rectangle = this.#playerAnimatedSprite.getRectangle();

		if(typeof(position) !== "undefined") {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#turtleGroups.some(turtleGroup => !turtleGroup.isHidden() && rectangle.intersectsWith(turtleGroup.getRectangle()));
	}

	getObjectOnRiverOnPlayerPositionIfPossible() {
		const objectsOnRiver = this.#woodenLogGroups.slice();

		this.#turtleGroups.forEach(turtleGroup => objectsOnRiver.push(turtleGroup));
		
		return objectsOnRiver.find(objectOnRiver => this.#playerAnimatedSprite.getRectangle().intersectsWith(objectOnRiver.getRectangle()));
	}

	getFieldSprite() {
		return this.#fieldSprite;
	}

	#onFieldSpriteLoad(sprite) {
		const image = sprite.getImage();
		const x = HALF_OF_GAME_WINDOW_WIDTH - image.width*0.5;
		const y = HALF_OF_GAME_WINDOW_HEIGHT - image.height*0.5;
		
		this.#fieldSprite.setPosition(new Point(x, y));

		this.#availableFieldDestinations = [new FieldDestination(new Point(x + 8, y + 8)), new FieldDestination(new Point(x + 32, y + 8)), new FieldDestination(new Point(x + 56, y + 8)), new FieldDestination(new Point(x + 80, y + 8)), new FieldDestination(new Point(x + 104, y + 8))];
	}

	#setCounterValues() {
		const gameData = FrogGuy.getData();

		this.#playerScoreIntCounterGroupUI.setCounterValue(gameData.getPlayerScore());
		this.#highScoreIntCounterGroupUI.setCounterValue(gameData.getHighScore());
	}

	#onFieldDestinationReached(position) {
		const availableFieldDestination = this.#availableFieldDestinations.find(fieldDestination => this.#positionIsSufficientlyCloseToFieldDestination(fieldDestination, position));

		if(typeof(availableFieldDestination) === "undefined") {
			return;
		}

		const availableFieldDestinationRectangle = availableFieldDestination.getRectangle();
		const playerIntersectsWithFly = availableFieldDestinationRectangle.intersectsWith(this.#flySprite.getRectangle());
		const points = playerIntersectsWithFly ? POINTS_FOR_REACHING_FIELD_DESTINATION + POINTS_FOR_EATING_FLY : POINTS_FOR_REACHING_FIELD_DESTINATION;

		if(playerIntersectsWithFly) {
			const availableFieldDestinationPosition = availableFieldDestinationRectangle.getPosition();
			const availableFieldDestinationSize = availableFieldDestinationRectangle.getSize();
			
			this.#flySprite.setActive(false);
			this.#bonusPointsTextUI.display(new Point(availableFieldDestinationPosition.x + availableFieldDestinationSize.x*0.5, availableFieldDestinationPosition.y + availableFieldDestinationSize.y), POINTS_FOR_EATING_FLY.toString());
		}

		this.#savedFrogs.push(new SavedFrogSprite(availableFieldDestination.getPosition()));
		this.frogSavedEvent.invoke();
		this.#playerScoreIntCounterGroupUI.increaseCounterValue(points);
		ListMethods.removeElementByReferenceIfPossible(this.#availableFieldDestinations, availableFieldDestination);
		this.#resetClosestYToFieldDestinations();
		this.#remainingTimeTimer.startTimer();
		this.#checkIfWonGame();
	}

	#positionIsSufficientlyCloseToFieldDestination(destination, position) {
		const destinationPosition = destination.getPosition();
		const differenceInPositionXIsSufficientlySmall = Math.abs(destinationPosition.x - position.x) <= DESTINATION_POSITION_X_THRESHOLD;

		return differenceInPositionXIsSufficientlySmall && destinationPosition.y == position.y;
	}

	#resetClosestYToFieldDestinations() {
		this.#closestYToFieldDestinations = this.#playerAnimatedSprite.getPosition().y;
	}

	#checkIfWonGame() {
		if(this.#availableFieldDestinations.length > 0) {
			return;
		}

		this.gameWonEvent.invoke();
		this.#nextSceneLoadTimer.startTimer();
		FrogGuy.getData().increaseCurrentLevelNumberBy(1);
	}

	#onLivesChanged(lives) {
		this.#playerLivesPanelUI.setNumberOfSprites(lives);
	
		if(lives <= 0) {
			this.#setGameAsOverIfNeeded();
		}
	}

	#onPositionChanged(position) {
		if(position.y >= this.#closestYToFieldDestinations) {
			return;
		}
		
		this.#closestYToFieldDestinations = position.y;
			
		this.#playerScoreIntCounterGroupUI.increaseCounterValue(POINTS_FOR_STEP_CLOSER_TO_FIELD_DESTINATIONS);
		this.#updateHighScoreIfNeeded();
	}

	#updateHighScoreIfNeeded() {
		const currentPlayerScore = this.#playerScoreIntCounterGroupUI.getCounterValue();
		const currentHighScore = this.#highScoreIntCounterGroupUI.getCounterValue();

		if(currentPlayerScore > currentHighScore) {
			this.#highScoreIntCounterGroupUI.setCounterValue(currentPlayerScore);
		}
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

		gameData.setPlayerScore(this.#playerScoreIntCounterGroupUI.getCounterValue());
		gameData.setHighScore(this.#highScoreIntCounterGroupUI.getCounterValue());
		gameData.saveValues();
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