class GameEvent {
	#listeners = [];

	addListener(listener) {
		this.#listeners.push(listener);
	}

	invoke(parameters) {
		this.#listeners.forEach((listener) => listener(parameters));
	}
}