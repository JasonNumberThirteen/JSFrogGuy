class FlySprite extends Sprite {
	#appearanceSwitchTimer;
	#gameScene;
	
	constructor() {
		super(FLY_SPRITE_FILENAME);
		this.setActive(false);

		this.#appearanceSwitchTimer = new Timer(FLY_DISAPPEARANCE_DURATION);
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);

		this.#gameScene.getGameManager().getLevelStateManager().levelStateChangedEvent.addListener(this.#onLevelStateChanged.bind(this));
		this.#appearanceSwitchTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		this.activeStateChangedEvent.addListener(isActive => this.#onActiveStateChanged(isActive));
	}

	update(deltaTime) {
		this.#appearanceSwitchTimer.update(deltaTime);
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
			const availableFrogLocation = ListMethods.getRandomElement(this.#gameScene.getField().getFrogLocationFieldArea().getFreeFrogLocations());

			if(VariableMethods.variableIsDefined(availableFrogLocation)) {
				const destinationPosition = availableFrogLocation.getDestination().getPosition();
			
				this.setPosition(destinationPosition);
			}
		}

		this.#appearanceSwitchTimer.startTimerWithSetDuration(isActive ? FLY_APPEARANCE_DURATION : FLY_DISAPPEARANCE_DURATION);
	}
}