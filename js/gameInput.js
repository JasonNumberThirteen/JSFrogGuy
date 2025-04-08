class GameInput {
	keyPressedEvent = new GameEvent();
	
	constructor() {
		document.addEventListener(KEYDOWN_KEY, this.#onKeyDown.bind(this), false);
	}

	#onKeyDown(event) {
		this.keyPressedEvent.invoke(event.key.toLowerCase());
	}
}