class GameScene extends Scene {
	gameWonEvent = new GameEvent();
	
	#fieldSprite;
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#playerAnimatedSprite;
	#playerLivesSpritesGroup;
	#fadeScreenUI;
	#availableDestinationPositions;
	#savedFrogs;
	#nextSceneLoadTimer;
	#nextSceneKey = GAME_SCENE_NAME_KEY;
	#closestYToDestinationPoints;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		this.#fieldSprite = new Sprite(FIELD_SPRITE_FILENAME, new Point(), this.#onFieldSpriteLoad.bind(this));
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#playerAnimatedSprite = new PlayerAnimatedSprite();
		this.#playerLivesSpritesGroup = new PlayerLivesSpritesGroup(this.#playerAnimatedSprite.getLives());
		this.#fadeScreenUI = new FadeScreenUI(true, true);
		this.#savedFrogs = [];
		this.#nextSceneLoadTimer = new Timer(NEXT_SCENE_LOAD_IN_GAME_SCENE_DELAY, false);
		
		this.#playerAnimatedSprite.destinationReachedEvent.addListener(position => this.#onDestinationReached(position));
		this.#playerAnimatedSprite.livesChangedEvent.addListener(lives => this.#onLivesChanged(lives));
		this.#playerAnimatedSprite.positionChangedEvent.addListener(position => this.#onPositionChanged(position));
		this.#nextSceneLoadTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		this.#fadeScreenUI.fadeFinishedEvent.addListener(fadeOut => this.#onFadeFinished(fadeOut));
		this.#highScoreIntCounterGroupUI.setCounterValue(FrogGuy.getData().getHighScore());
		this.#resetClosestYToDestinationPoints();
	}

	update(deltaTime) {
		this.#nextSceneLoadTimer.update(deltaTime);
		this.#fadeScreenUI.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#fieldSprite.draw();
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
		this.#playerAnimatedSprite.draw();
		this.#playerLivesSpritesGroup.draw();
		this.#savedFrogs.forEach(savedFrog => savedFrog.draw());
		this.#fadeScreenUI.draw();
	}

	processInput(key) {
		this.#playerAnimatedSprite.processInput(key);
	}

	reachedAnyOfLeftDestinationPositions(position) {
		return this.#availableDestinationPositions.some(destinationPosition => destinationPosition.x == position.x && destinationPosition.y == position.y);
	}

	positionIsHazardous(position) {
		return position.y >= 32 && position.y <= 64;
	}

	#onFieldSpriteLoad(image) {
		const x = GAME_WINDOW_WIDTH*0.5 - image.width*0.5;
		const y = GAME_WINDOW_HEIGHT*0.5 - image.height*0.5;
		
		this.#fieldSprite.setPosition(new Point(x, y));

		this.#availableDestinationPositions = [new Point(x + 8, y + 8), new Point(x + 32, y + 8), new Point(x + 56, y + 8), new Point(x + 80, y + 8), new Point(x + 104, y + 8)];
	}

	#onDestinationReached(position) {
		const availableDestinationPosition = this.#availableDestinationPositions.find(destinationPosition => destinationPosition.x == position.x && destinationPosition.y == position.y);

		if(typeof(availableDestinationPosition) === "undefined") {
			return;
		}

		this.#savedFrogs.push(new SavedFrogSprite(availableDestinationPosition));
		this.#playerScoreIntCounterGroupUI.increaseCounterValue(POINTS_FOR_REACHING_DESTINATION_POINT);
		ListMethods.removeElementByReferenceIfPossible(this.#availableDestinationPositions, availableDestinationPosition);
		this.#resetClosestYToDestinationPoints();
		this.#checkIfWonGame();
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

	#onTimerFinished() {
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