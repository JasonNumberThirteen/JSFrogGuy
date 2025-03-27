class SceneManager {
	#currentScene;
	#scenes = {
		MAIN_MENU: new MainMenuScene()
	};

	constructor() {
		this.switchScene("MAIN_MENU");
	}

	switchScene(key) {
		this.#currentScene = this.#scenes[key];
	}

	updateScene(deltaTime) {
		this.#currentScene.update(deltaTime);
	}

	drawScene() {
		this.#currentScene.draw();
	}

	processInputInScene(key) {
		this.#currentScene.processInput(key);
	}
}