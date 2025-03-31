class GameScene extends Scene {
	gameWonEvent = new GameEvent();
	
	#fieldSpriteUI;
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#playerAnimatedSpriteUI;
	#playerLivesSpritesUIGroup;
	#fadeScreenUI;
	#availableDestinationPositions;
	#savedFrogs;
	#nextLevelTimer;
	#nextSceneKey = "GAME";
	#closestYToDestinationPoints;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		const that = this;
		
		this.#fieldSpriteUI = new SpriteUI(FIELD_SPRITE_FILENAME, new Point());
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#playerAnimatedSpriteUI = new PlayerAnimatedSpriteUI();
		this.#playerLivesSpritesUIGroup = new PlayerLivesSpritesUIGroup(this.#playerAnimatedSpriteUI.getLives());
		this.#fadeScreenUI = new FadeScreenUI(true, true);
		this.#savedFrogs = [];
		this.#closestYToDestinationPoints = this.#playerAnimatedSpriteUI.getPosition().y;

		this.#fieldSpriteUI.getImage().onload = function() {
			const x = GAME_WINDOW_WIDTH*0.5 - that.#fieldSpriteUI.getImage().width*0.5;
			const y = GAME_WINDOW_HEIGHT*0.5 - that.#fieldSpriteUI.getImage().height*0.5;
			
			that.#fieldSpriteUI.setPosition(new Point(x, y));

			that.#availableDestinationPositions = [new Point(x + 8, y + 8), new Point(x + 32, y + 8), new Point(x + 56, y + 8), new Point(x + 80, y + 8), new Point(x + 104, y + 8)];
		};

		this.#playerAnimatedSpriteUI.destinationReachedEvent.addListener((position) => this.#onDestinationReached(position));
		this.#playerAnimatedSpriteUI.livesChangedEvent.addListener((lives) => this.#onLivesChanged(lives));
		this.#playerAnimatedSpriteUI.positionChangedEvent.addListener((position) => this.#onPositionChanged(position));

		this.#nextLevelTimer = new Timer(1, false);

		this.#nextLevelTimer.timerFinishedEvent.addListener(this.#startFading.bind(this));
		this.#fadeScreenUI.fadeFinishedEvent.addListener((fadeOut) => this.#onFadeFinished(fadeOut));
	}

	update(deltaTime) {
		this.#nextLevelTimer.update(deltaTime);
		this.#fadeScreenUI.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#fieldSpriteUI.draw();
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
		this.#playerAnimatedSpriteUI.draw();
		this.#playerLivesSpritesUIGroup.draw();
		this.#savedFrogs.forEach(savedFrog => savedFrog.draw());
		this.#fadeScreenUI.draw();
	}

	processInput(key) {
		this.#playerAnimatedSpriteUI.processInput(key);
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
			this.#savedFrogs.push(new SavedFrogSpriteUI(availableDestinationPosition));
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
		this.#playerLivesSpritesUIGroup.setNumberOfSprites(lives);
	
		if(lives <= 0) {
			this.#setGameAsOver();
		}
	}

	#onPositionChanged(position) {
		if(position.y < this.#closestYToDestinationPoints) {
			this.#closestYToDestinationPoints = position.y;
			
			this.#playerScoreIntCounterGroupUI.increaseCounterValue(POINTS_FOR_STEP_CLOSER_TO_DESTINATION_POSITIONS);
		}
	}

	#setGameAsOver() {
		this.#nextSceneKey = "MAIN_MENU";

		this.#nextLevelTimer.startTimer();
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