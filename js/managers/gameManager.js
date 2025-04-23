class GameManager {
	fieldDestinationTaken = new GameEvent();
	closestPositionToFieldDestinationsUpdatedEvent = new GameEvent();

	#closestYToFieldDestinations;
	#levelTimer = new LevelTimer();
	#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
	#field;
	#player;
	#levelStateManager;

	init() {
		this.#field = this.#gameScene.getField();
		this.#player = this.#gameScene.getFieldObjectsContainer().getPlayer();
		this.#levelStateManager = this.#gameScene.getLevelStateManager();

		this.#levelTimer.timerFinishedEvent.addListener(this.#setGameAsOverIfNeeded.bind(this));
		this.#resetClosestYToFieldDestinations();
		this.#addListenersToPlayer();
	}

	getLevelTimer() {
		return this.#levelTimer;
	}

	gameIsOver() {
		return this.#levelStateManager.stateIsSetTo(LevelState.Over);
	}
	
	update(deltaTime) {
		this.#levelTimer.update(deltaTime);
	}

	saveScoreData(playerScore, highScore) {
		const gameData = FrogGuy.getData();

		gameData.setPlayerScore(playerScore);
		gameData.setHighScore(highScore);
		gameData.saveValues();
	}

	#addListenersToPlayer() {
		const playerLives = this.#player.getLives();
		const playerSprite = this.#player.getSprite();
		
		playerLives.livesChangedEvent.addListener(parameters => this.#onLivesChanged(parameters));
		playerSprite.destinationReachedEvent.addListener(position => this.#onFieldDestinationReached(position));
		playerSprite.playerMovedFromInputEvent.addListener(position => this.#onPlayerMovedFromInput(position));
	}

	#onLivesChanged(parameters) {
		if(parameters.lives <= 0) {
			this.#setGameAsOverIfNeeded();
		}
	}

	#setGameAsOverIfNeeded() {
		this.#levelStateManager.setStateTo(LevelState.Over);
	}

	#onFieldDestinationReached(position) {
		const field = this.#gameScene.getField();
		const freeFrogLocations = this.#getFreeFrogLocations();
		const availableFieldDestination = freeFrogLocations.find(frogLocation => field.positionIsSufficientlyCloseToFrogLocationDestination(frogLocation.getDestination(), position));
		
		if(VariableMethods.variableIsDefined(availableFieldDestination)) {
			this.#setFieldDestinationAsTaken(availableFieldDestination);
		}
	}

	#setFieldDestinationAsTaken(fieldDestination) {
		fieldDestination.setAsTaken(true);
		this.fieldDestinationTaken.invoke(fieldDestination);
		ListMethods.removeElementByReferenceIfPossible(this.#getFreeFrogLocations(), fieldDestination);
		this.#resetClosestYToFieldDestinations();
		this.#affectLevelTimerDependingOnGameState();
		this.#checkIfWonGame();
	}

	#resetClosestYToFieldDestinations() {
		this.#closestYToFieldDestinations = this.#player.getInitialPosition().y;
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

		this.#levelStateManager.setStateTo(LevelState.Won);
		FrogGuy.getData().increaseCurrentLevelNumberBy(1);
	}

	#allFrogLocationsAreTaken() {
		return this.#getFreeFrogLocations().length === 0;
	}

	#getFreeFrogLocations() {
		return this.#field.getFrogLocationFieldArea().getFreeFrogLocations();
	}

	#onPlayerMovedFromInput(position) {
		if(position.y >= this.#closestYToFieldDestinations || this.#field.positionIsWithinAreaOfType(position, FieldAreaType.Walkway)) {
			return;
		}
		
		this.#closestYToFieldDestinations = position.y;

		this.closestPositionToFieldDestinationsUpdatedEvent.invoke();
	}
}