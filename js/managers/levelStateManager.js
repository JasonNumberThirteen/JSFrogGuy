class LevelStateManager {
	levelStateChangedEvent = new GameEvent();
	
	#state = LevelState.Active;

	setStateTo(levelState) {
		if(this.stateIsSetTo(levelState)) {
			return;
		}

		this.#state = levelState;

		this.levelStateChangedEvent.invoke(this.#state);
	}

	stateIsSetTo(levelState) {
		return this.#state === levelState;
	}
}