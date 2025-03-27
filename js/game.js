class Game {
	#canvas;
	#input;
	#previousTimeStamp = 0;
	#sceneManager;

	constructor() {
		this.#canvas = new Canvas();
		this.#input = new Input();
		this.#sceneManager = new SceneManager();

		this.#input.keyPressedEvent.addListener(this.#onKeyPressed.bind(this));
		this.#refresh();
	}

	getCanvasContext() {
		return this.#canvas.getContext();
	}

	getSceneManager() {
		return this.#sceneManager;
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
		this.#sceneManager.processInputInScene(parameters.key);
	}
}