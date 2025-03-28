class SceneManager {
	#currentScene;
	#scenes = {
		MAIN_MENU: new MainMenuScene(),
		GAME: new GameScene()
	};

	switchScene(key) {
		this.#currentScene = this.#scenes[key];

		this.#currentScene.init();
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

	getSceneByKey(key) {
		return this.#scenes[key];
	}
}