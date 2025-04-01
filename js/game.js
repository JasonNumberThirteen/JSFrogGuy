class Game {
	#canvas;
	#input;
	#gameData;
	#sceneManager;
	#currentTimeStamp = 0;
	#previousTimeStamp = 0;

	constructor() {
		this.#canvas = new Canvas();
		this.#input = new Input();
		this.#gameData = new GameData();
		this.#sceneManager = new SceneManager();

		this.#input.keyPressedEvent.addListener(this.#onKeyPressed.bind(this));
		this.#refresh();
	}

	init() {
		this.#sceneManager.switchScene(MAIN_MENU_SCENE_NAME_KEY);
	}

	getCurrentTime() {
		return TimeMethods.millisecondsToSeconds(this.#currentTimeStamp);
	}

	getCanvas() {
		return this.#canvas;
	}

	getCanvasContext() {
		return this.#canvas.getContext();
	}

	getData() {
		return this.#gameData;
	}

	getSceneManager() {
		return this.#sceneManager;
	}

	#update(timeStamp) {
		this.#currentTimeStamp = timeStamp;
		
		this.#updateCanvasIfPossible();
		this.#refresh();
	}

	#updateCanvasIfPossible() {
		const timeStampsDifference = this.#currentTimeStamp - this.#previousTimeStamp;
		const milliseconds = 1000 / GAME_FPS;

		if(timeStampsDifference < milliseconds) {
			return;
		}

		const deltaTime = TimeMethods.millisecondsToSeconds(timeStampsDifference);

		this.#previousTimeStamp = this.#currentTimeStamp;

		this.#canvas.update(deltaTime);
	}

	#refresh() {
		window.requestAnimationFrame(this.#update.bind(this));
	}

	#onKeyPressed(key) {
		this.#sceneManager.processInputInScene(key);
	}
}