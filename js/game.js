class Game {
	#canvas;
	#previousTimeStamp = 0;
	#input;

	constructor() {
		this.#canvas = new Canvas();
		this.#input = new Input();

		this.#input.keyPressedEvent.addListener(this.#onKeyPressed.bind(this));
		this.#refresh();
	}

	#update(timeStamp) {
		const ms = 1000 / GAME_FPS;
		const timeStampsDifference = timeStamp - this.#previousTimeStamp;
		let dt = timeStampsDifference*0.001;

		if(timeStampsDifference >= ms) {
			this.#previousTimeStamp = timeStamp;

			this.#canvas.update(dt);
		}

		this.#refresh();
	}

	#refresh() {
		window.requestAnimationFrame(this.#update.bind(this));
	}

	#onKeyPressed(parameters) {
		if(parameters.key === GAME_START_KEY) {
			console.log("Game is started!");
		}
	}
}