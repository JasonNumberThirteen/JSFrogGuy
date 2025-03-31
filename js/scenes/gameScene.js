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
	#nextLevelTimer;
	#nextSceneKey = GAME_SCENE_NAME_KEY;
	#closestYToDestinationPoints;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		const that = this;
		
		this.#fieldSprite = new Sprite(FIELD_SPRITE_FILENAME, new Point());
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#playerAnimatedSprite = new PlayerAnimatedSprite();
		this.#playerLivesSpritesGroup = new PlayerLivesSpritesGroup(this.#playerAnimatedSprite.getLives());
		this.#fadeScreenUI = new FadeScreenUI(true, true);
		this.#savedFrogs = [];
		this.#closestYToDestinationPoints = this.#playerAnimatedSprite.getPosition().y;

		this.#fieldSprite.getImage().onload = function() {
			const x = GAME_WINDOW_WIDTH*0.5 - that.#fieldSprite.getImage().width*0.5;
			const y = GAME_WINDOW_HEIGHT*0.5 - that.#fieldSprite.getImage().height*0.5;
			
			that.#fieldSprite.setPosition(new Point(x, y));

			that.#availableDestinationPositions = [new Point(x + 8, y + 8), new Point(x + 32, y + 8), new Point(x + 56, y + 8), new Point(x + 80, y + 8), new Point(x + 104, y + 8)];
		};

		this.#playerAnimatedSprite.destinationReachedEvent.addListener((position) => this.#onDestinationReached(position));
		this.#playerAnimatedSprite.livesChangedEvent.addListener((lives) => this.#onLivesChanged(lives));
		this.#playerAnimatedSprite.positionChangedEvent.addListener((position) => this.#onPositionChanged(position));

		this.#nextLevelTimer = new Timer(1, false);

		this.#nextLevelTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		this.#fadeScreenUI.fadeFinishedEvent.addListener((fadeOut) => this.#onFadeFinished(fadeOut));
		this.#highScoreIntCounterGroupUI.setCounterValue(FrogGuy.getData().getHighScore());
	}

	update(deltaTime) {
		this.#nextLevelTimer.update(deltaTime);
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

	#onDestinationReached(position) {
		const availableDestinationPosition = this.#availableDestinationPositions.find(destinationPosition => destinationPosition.x == position.x && destinationPosition.y == position.y);

		if(typeof(availableDestinationPosition) !== "undefined") {
			this.#savedFrogs.push(new SavedFrogSprite(availableDestinationPosition));
			this.#playerScoreIntCounterGroupUI.increaseCounterValue(POINTS_FOR_REACHING_DESTINATION_POINT);

			var index = this.#availableDestinationPositions.indexOf(availableDestinationPosition);

			if(index !== -1) {
				this.#availableDestinationPositions.splice(index, 1);
			}
			
			if(this.#availableDestinationPositions.length === 0) {
				this.gameWonEvent.invoke();
				this.#nextLevelTimer.startTimer();
			}
		}
	}

	#onLivesChanged(lives) {
		this.#playerLivesSpritesGroup.setNumberOfSprites(lives);
	
		if(lives <= 0) {
			this.#setGameAsOver();
		}
	}

	#onPositionChanged(position) {
		if(position.y < this.#closestYToDestinationPoints) {
			this.#closestYToDestinationPoints = position.y;
			
			this.#playerScoreIntCounterGroupUI.increaseCounterValue(POINTS_FOR_STEP_CLOSER_TO_DESTINATION_POSITIONS);

			const currentPlayerScore = this.#playerScoreIntCounterGroupUI.getCounterValue();

			if(this.#highScoreIntCounterGroupUI.getCounterValue() < currentPlayerScore) {
				this.#highScoreIntCounterGroupUI.setCounterValue(currentPlayerScore);
			}
		}
	}

	#setGameAsOver() {
		this.#nextSceneKey = MAIN_MENU_SCENE_NAME_KEY;

		this.#nextLevelTimer.startTimer();
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