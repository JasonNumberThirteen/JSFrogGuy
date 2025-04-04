class GameData {
	#playerScore = 0;
	#highScore = 0;
	#currentLevelNumber = 1;

	constructor() {
		this.#highScore = INITIAL_HIGH_SCORE;
	}

	resetPlayerScore() {
		this.#playerScore = 0;
	}

	resetCurrentLevelNumber() {
		this.#currentLevelNumber = 1;
	}

	setPlayerScore(score) {
		this.#playerScore = score;
	}

	setHighScore(score) {
		this.#highScore = score;
	}

	increaseCurrentLevelNumberBy(value) {
		this.#currentLevelNumber += value;
	}

	getPlayerScore() {
		return this.#playerScore;
	}

	getHighScore() {
		return this.#highScore;
	}

	getCurrentLevelNumber() {
		return this.#currentLevelNumber;
	}
}