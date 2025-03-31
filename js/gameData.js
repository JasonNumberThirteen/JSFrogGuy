class GameData {
	#playerScore = 0;
	#highScore = 0;

	constructor() {
		this.#highScore = INITIAL_HIGH_SCORE;
	}

	setPlayerScore(score) {
		this.#playerScore = score;
	}

	setHighScore(score) {
		this.#highScore = score;
	}

	getPlayerScore() {
		return this.#playerScore;
	}

	getHighScore() {
		return this.#highScore;
	}
}