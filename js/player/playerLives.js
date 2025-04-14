class PlayerLives {
	livesChangedEvent = new GameEvent();
	
	#lives;

	constructor(lives) {
		this.setLives(lives);
	}

	getLives() {
		return this.#lives;
	}

	reduceLivesBy(lives) {
		this.setLives(this.#lives - lives);
	}

	setLives(lives) {
		if(this.#lives === lives) {
			return;
		}
		
		this.#lives = lives;

		this.livesChangedEvent.invoke(this.#lives);
	}
}