class GameManager {
	frogSavedEvent = new GameEvent();
	gameWonEvent = new GameEvent();
	gameLostEvent = new GameEvent();
	closestPositionToFieldDestinationsUpdatedEvent = new GameEvent();

	#levelTimer;
	#closestYToFieldDestinations;
	#player;
	#gameIsOver = false;
	#gameScene;
	#soundManager;

	init() {
		this.#levelTimer = new LevelTimer();
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
		this.#soundManager = FrogGuy.getSoundManager();
		this.#player = this.#gameScene.getFieldObjectsContainer().getPlayer();

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

	#addListenersToPlayer() {
		const playerSprite = this.#player.getSprite();
		
		playerSprite.destinationReachedEvent.addListener(position => this.#onFieldDestinationReached(position));
		this.#player.getLives().livesChangedEvent.addListener(parameters => this.#onLivesChanged(parameters));
		playerSprite.playerMovedFromInputEvent.addListener(position => this.#onPlayerMovedFromInput(position));
	}

	#onLivesChanged(parameters) {
		if(parameters.lives <= 0) {
			this.#setGameAsOverIfNeeded();
		}
	}

	#onFieldDestinationReached(position) {
		const field = this.#gameScene.getField();
		const availableFieldDestination = field.getFrogLocationFieldArea().getFreeFrogLocations().find(frogLocation => field.positionIsSufficientlyCloseToFrogLocationDestination(frogLocation.getDestination(), position));

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
		this.#soundManager.playSoundOfType(playerIntersectsWithFly ? SoundType.EatingFlyByPlayer : SoundType.ReachingFieldDestinationByPlayer);
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

	#onPlayerMovedFromInput(position) {
		this.#soundManager.playSoundOfType(SoundType.PlayerMovement);
		
		if(position.y >= this.#closestYToFieldDestinations || this.#gameScene.getField().positionIsWithinAreaOfType(position, FieldAreaType.Walkway)) {
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
		this.#closestYToFieldDestinations = this.#gameScene.getFieldObjectsContainer().getPlayer().getInitialPosition().y;
	}
}