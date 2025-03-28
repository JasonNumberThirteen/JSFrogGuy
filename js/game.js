class Game {
	#canvas;
	#input;
	#currentTimeStamp = 0;
	#previousTimeStamp = 0;
	#sceneManager;

	constructor() {
		this.#canvas = new Canvas();
		this.#input = new Input();
		this.#sceneManager = new SceneManager();

		this.#input.keyPressedEvent.addListener(this.#onKeyPressed.bind(this));
		this.#refresh();
	}

	init() {
		this.#sceneManager.switchScene("MAIN_MENU");
	}

	getCurrentTime() {
		return this.#currentTimeStamp*0.001;
	}

	getCanvas() {
		return this.#canvas;
	}

	getCanvasContext() {
		return this.#canvas.getContext();
	}

	getSceneManager() {
		return this.#sceneManager;
	}

	#update(timeStamp) {
		this.#currentTimeStamp = timeStamp;
		
		const milliseconds = 1000 / GAME_FPS;
		const timeStampsDifference = this.#currentTimeStamp - this.#previousTimeStamp;
		const deltaTime = timeStampsDifference*0.001;

		if(timeStampsDifference >= milliseconds) {
			this.#previousTimeStamp = this.#currentTimeStamp;

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