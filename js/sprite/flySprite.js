class FlySprite extends Sprite {
	flyWasEatenByPlayer = new GameEvent();
	
	#appearanceSwitchTimer = new Timer(FLY_DISAPPEARANCE_DURATION);
	#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
	#gameManager = this.#gameScene.getGameManager();
	#levelStateManager = this.#gameScene.getLevelStateManager();
	
	constructor() {
		super(FLY_SPRITE_FILENAME);
		this.setActive(false);
		this.#gameManager.fieldDestinationTaken.addListener(this.#onFieldDestinationTaken.bind(this));
		this.#levelStateManager.levelStateChangedEvent.addListener(this.#onLevelStateChanged.bind(this));
		this.#appearanceSwitchTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		this.activeStateChangedEvent.addListener(isActive => this.#onActiveStateChanged(isActive));
	}

	update(deltaTime) {
		this.#appearanceSwitchTimer.update(deltaTime);
	}

	#onFieldDestinationTaken(fieldDestination) {
		const fieldDestinationRectangle = fieldDestination.getRectangle();
		const flyIsStandingOnTheSameFieldDestination = this.isActive() && fieldDestinationRectangle.intersectsWith(this.getRectangle());

		if(!flyIsStandingOnTheSameFieldDestination) {
			return;
		}

		this.setActive(false);
		this.flyWasEatenByPlayer.invoke();
	}

	#onLevelStateChanged(levelState) {
		if(levelState === LevelState.Won) {
			this.#appearanceSwitchTimer.setAsFinished(true);
		}
	}

	#onTimerFinished() {
		this.setActive(!this.isActive());
	}

	#onActiveStateChanged(isActive) {
		if(isActive) {
			this.#setPositionInRandomFreeDestination();
		}
		
		this.#appearanceSwitchTimer.startTimerWithSetDuration(isActive ? FLY_APPEARANCE_DURATION : FLY_DISAPPEARANCE_DURATION);
	}

	#setPositionInRandomFreeDestination() {
		const field = this.#gameScene.getField();
		const frogLocationFieldArea = field.getFrogLocationFieldArea();
		const randomFreeDestination = ListMethods.getRandomElement(frogLocationFieldArea.getFreeFrogLocations());

		if(VariableMethods.variableIsDefined(randomFreeDestination)) {
			this.setPosition(randomFreeDestination.getDestination().getPosition());
		}
	}
}