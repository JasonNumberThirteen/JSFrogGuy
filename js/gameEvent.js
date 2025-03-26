class GameEvent {
	#listeners = [];

	addListener(listener) {
		this.#listeners.push(listener);
	}

	invoke() {
		this.#listeners.forEach((listener) => listener());
	}
}