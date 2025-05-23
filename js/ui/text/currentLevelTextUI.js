class CurrentLevelTextUI extends TextUI {
	#fadeDelayTimer = new Timer(CURRENT_LEVEL_TEXT_UI_FADE_START_DELAY);
	#fadeTimer = new Timer(CURRENT_LEVEL_TEXT_UI_FADE_DURATION, false);
	#gameManager = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getGameManager();
	
	constructor() {
		super(LEVEL_TEXT + " " + FrogGuy.getData().getCurrentLevelNumber(), new Point(HALF_OF_GAME_WINDOW_WIDTH, GAME_FONT_SIZE + CURRENT_LEVEL_TEXT_UI_OFFSET_FROM_TOP_SCREEN_EDGE), SEA_GREEN_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);
		this.#setFillStyleWithAlpha(0);
		this.#fadeDelayTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
	}

	update(deltaTime) {
		this.#fadeDelayTimer.update(deltaTime);
		this.#fadeTimer.update(deltaTime);

		if(this.#fadeTimer.timerWasStarted()) {
			this.#setFillStyleWithAlpha(this.#fadeTimer.getProgressPercent());
		}
	}

	draw() {
		if(!this.#gameManager.gameIsOver()) {
			super.draw();
		}
	}

	#onTimerFinished() {
		this.#fadeTimer.startTimer();
	}

	#setFillStyleWithAlpha(alpha) {
		this.setFillStyle(ColorMethods.hexToRGBA(SEA_GREEN_COLOR, alpha));
	}
}