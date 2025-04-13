class GameManager {
	frogSavedEvent = new GameEvent();
	gameWonEvent = new GameEvent();
	gameLostEvent = new GameEvent();
	closestPositionToFieldDestinationsUpdatedEvent = new GameEvent();

	#levelTimer;
	#closestYToFieldDestinations;
	#gameIsOver = false;
	#gameScene;

	init() {
		this.#levelTimer = new LevelTimer();
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);

		this.#levelTimer.timerFinishedEvent.addListener(this.#setGameAsOverIfNeeded.bind(this));
		this.#resetClosestYToFieldDestinations();
		this.#addListenersToPlayer();
	}

	getLevelTimer() {
		return this.#levelTimer;
	}

	gameIsOver() {
		return this.#gameIsOver;
	}
	
	update(deltaTime) {
		this.#levelTimer.update(deltaTime);
	}

	updateGameData(playerScore, highScore) {
		const gameData = FrogGuy.getData();

		gameData.setPlayerScore(playerScore);
		gameData.setHighScore(highScore);
		gameData.saveValues();
	}

	positionIsSufficientlyCloseToFrogLocationDestination(destination, position) {
		const destinationPosition = destination.getPosition();
		const differenceInPositionXIsSufficientlySmall = Math.abs(destinationPosition.x - position.x) <= DESTINATION_POSITION_X_THRESHOLD;

		return differenceInPositionXIsSufficientlySmall && destinationPosition.y === position.y;
	}

	#addListenersToPlayer() {
		const player = this.#gameScene.getFieldObjectsContainer().getPlayer();
		const playerSprite = player.getSprite();
		
		playerSprite.destinationReachedEvent.addListener(position => this.#onFieldDestinationReached(position));
		player.getLives().livesChangedEvent.addListener(lives => this.#onLivesChanged(lives));
		playerSprite.positionChangedEvent.addListener(position => this.#onPositionChanged(position));
	}

	#onLivesChanged(lives) {
		if(lives <= 0) {
			this.#setGameAsOverIfNeeded();
		}
	}

	#onFieldDestinationReached(position) {
		const field = this.#gameScene.getField();
		const availableFieldDestination = field.getFrogLocationFieldArea().getFreeFrogLocations().find(frogLocation => this.positionIsSufficientlyCloseToFrogLocationDestination(frogLocation.getDestination(), position));

		if(!VariableMethods.variableIsDefined(availableFieldDestination)) {
			return;
		}

		const availableFieldDestinationRectangle = availableFieldDestination.getRectangle();
		const flySprite = this.#gameScene.getFieldObjectsContainer().getFlySprite();
		const playerIntersectsWithFly = flySprite.isActive() && availableFieldDestinationRectangle.intersectsWith(flySprite.getRectangle());

		if(playerIntersectsWithFly) {
			const availableFieldDestinationPosition = availableFieldDestinationRectangle.getPosition();
			const availableFieldDestinationSize = availableFieldDestinationRectangle.getSize();
			const bonusPointsTextUIPosition = PositionMethods.getSumOf(availableFieldDestinationPosition, new Point(availableFieldDestinationSize.x*0.5, availableFieldDestinationSize.y));
			
			flySprite.setActive(false);
			this.#gameScene.getPanelUI().getBonusPointsTextUI().display(bonusPointsTextUIPosition, POINTS_FOR_EATING_FLY.toString());
		}

		availableFieldDestination.setAsTaken(true);
		this.frogSavedEvent.invoke(playerIntersectsWithFly ? POINTS_FOR_REACHING_FIELD_DESTINATION + POINTS_FOR_EATING_FLY : POINTS_FOR_REACHING_FIELD_DESTINATION);
		ListMethods.removeElementByReferenceIfPossible(field.getFrogLocationFieldArea().getFreeFrogLocations(), availableFieldDestination);
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
		FrogGuy.getData().increaseCurrentLevelNumberBy(1);
	}

	#allFrogLocationsAreTaken() {
		return this.#gameScene.getField().getFrogLocationFieldArea().getFreeFrogLocations().length === 0;
	}

	#onPositionChanged(position) {
		if(position.y >= this.#closestYToFieldDestinations || this.#gameScene.getField().positionIsWithinAreaOfType(position, FieldAreaType.WALKWAY)) {
			return;
		}
		
		this.#closestYToFieldDestinations = position.y;

		this.closestPositionToFieldDestinationsUpdatedEvent.invoke();
	}

	#setGameAsOverIfNeeded() {
		if(this.#gameIsOver) {
			return;
		}
		
		this.#gameIsOver = true;

		this.gameLostEvent.invoke();
	}

	#resetClosestYToFieldDestinations() {
		this.#closestYToFieldDestinations = PLAYER_INITIAL_Y;
	}
}