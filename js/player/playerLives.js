class PlayerLives {
	livesChangedEvent = new GameEvent();
	
	#additionalLifePointsThreshold = this.#getAdditionalLifePointsThreshold();
	#soundManager = FrogGuy.getSoundManager();
	#lives;

	constructor(lives) {
		this.setLives(lives);
		FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getScoreManager().playerScoreChangedEvent.addListener(this.#onPlayerScoreChanged.bind(this));
	}

	getLives() {
		return this.#lives;
	}

	addLivesBy(lives) {
		this.setLives(this.#lives + lives);
	}

	reduceLivesBy(lives) {
		this.setLives(this.#lives - lives);
	}

	setLives(lives) {
		if(this.#lives === lives) {
			return;
		}

		const previousNumberOfLives = this.#lives;
		
		this.#lives = lives;

		this.livesChangedEvent.invoke({lives: this.#lives, numberOfLivesWasIncreased: previousNumberOfLives < this.#lives});
	}

	#getAdditionalLifePointsThreshold() {
		let threshold = PLAYER_ADDITIONAL_LIFE_POINTS_THRESHOLD;
		const currentPlayerScore = FrogGuy.getData().getPlayerScore();

		while (threshold <= currentPlayerScore) {
			threshold += PLAYER_ADDITIONAL_LIFE_POINTS_THRESHOLD;
		}

		return threshold;
	}

	#onPlayerScoreChanged(score) {
		if(score < this.#additionalLifePointsThreshold) {
			return;
		}

		let lives = 0;

		while (this.#additionalLifePointsThreshold <= score) {
			this.#additionalLifePointsThreshold += PLAYER_ADDITIONAL_LIFE_POINTS_THRESHOLD;
			++lives;
		}
		
		this.addLivesBy(lives);
		this.#soundManager.playSoundOfType(SoundType.GainingAdditionalLifeByPlayer);
	}
}