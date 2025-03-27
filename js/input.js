class Input {
	keyPressedEvent = new GameEvent();
	
	constructor() {
		document.addEventListener("keydown", this.#onKeyDown.bind(this), false);
	}

	#onKeyDown(event) {
		this.keyPressedEvent.invoke({key : event.key.toLowerCase()});
	}
}