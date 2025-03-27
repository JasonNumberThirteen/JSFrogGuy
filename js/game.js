class Game {
	#canvas;
	#input;
	#previousTimeStamp = 0;

	constructor() {
		this.#canvas = new Canvas();
		this.#input = new Input();

		this.#input.keyPressedEvent.addListener(this.#onKeyPressed.bind(this));
		this.#refresh();
	}

	#update(timeStamp) {
		const milliseconds = 1000 / GAME_FPS;
		const timeStampsDifference = timeStamp - this.#previousTimeStamp;
		const deltaTime = timeStampsDifference*0.001;

		if(timeStampsDifference >= milliseconds) {
			this.#previousTimeStamp = timeStamp;

			this.#canvas.update(deltaTime);
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