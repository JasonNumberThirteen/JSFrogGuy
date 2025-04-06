class GameData {
	#playerScore;
	#highScore;
	#currentLevelNumber;

	constructor() {
		const savedPlayerScore = localStorage.getItem(PLAYER_SCORE_VALUE_KEY);
		const savedHighScore = localStorage.getItem(HIGH_SCORE_VALUE_KEY);

		this.#playerScore = savedPlayerScore ? parseInt(savedPlayerScore) : 0;
		this.#highScore = savedHighScore ? parseInt(savedHighScore) : INITIAL_HIGH_SCORE;
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

	saveValues() {
		localStorage.setItem(PLAYER_SCORE_VALUE_KEY, this.#playerScore);
		localStorage.setItem(HIGH_SCORE_VALUE_KEY, this.#highScore);
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