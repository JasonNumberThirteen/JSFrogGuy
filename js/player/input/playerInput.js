class PlayerInput {
	keyPressedEvent = new GameEvent();
	
	#inputKeyData = [
		new PlayerInputKeyData(PLAYER_UP_MOVEMENT_KEY, new Point(0, -1), 0),
		new PlayerInputKeyData(PLAYER_DOWN_MOVEMENT_KEY, new Point(0, 1), 1),
		new PlayerInputKeyData(PLAYER_LEFT_MOVEMENT_KEY, new Point(-1, 0), 2),
		new PlayerInputKeyData(PLAYER_RIGHT_MOVEMENT_KEY, new Point(1, 0), 3)
	];
	#player;
	#levelStateManager;

	constructor(player) {
		this.#player = player;
		this.#levelStateManager = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getLevelStateManager();
	}
	
	processInput(key) {
		if(!this.#player.isActive() || this.#levelStateManager.stateIsSetTo(LevelState.Over)) {
			return;
		}

		const inputKeyData = this.#inputKeyData.find(inputKeyData => inputKeyData.getInputKey() === key);

		if(VariableMethods.variableIsDefined(inputKeyData)) {
			this.keyPressedEvent.invoke(inputKeyData);
		}
	}
}