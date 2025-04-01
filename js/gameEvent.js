class GameEvent {
	#listeners = [];

	addListener(listener) {
		this.#listeners.push(listener);
	}

	invoke(parameter) {
		this.#listeners.forEach((listener) => listener(parameter));
	}
}