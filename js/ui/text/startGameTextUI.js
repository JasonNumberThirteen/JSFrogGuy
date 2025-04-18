class StartGameTextUI extends TextUI {
	#initialColor;
	#colorToBlink;
	#blinkTimer;
	
	constructor() {
		super(START_GAME_TEXT, new Point(HALF_OF_GAME_WINDOW_WIDTH, GAME_WINDOW_HEIGHT - 32), BLACK_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);

		this.#initialColor = this.getFillStyle();
		this.#colorToBlink = ORANGE_COLOR;
		this.#blinkTimer = new Timer(START_GAME_TEXT_UI_BLINK_DELAY);

		this.#blinkTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
		FrogGuy.getSceneManager().getSceneByKey(MAIN_MENU_SCENE_NAME_KEY).gameStartedEvent.addListener(this.#onGameStarted.bind(this));
	}

	update(deltaTime) {
		this.#blinkTimer.update(deltaTime);
	}

	#onTimerFinished() {
		this.#switchColor();
		this.#blinkTimer.startTimer();
	}

	#switchColor() {
		const textHasInitialColor = this.getFillStyle() === this.#initialColor;
		const colorToSwitch = textHasInitialColor ? this.#colorToBlink : this.#initialColor;
		
		this.setFillStyle(colorToSwitch);
	}

	#onGameStarted() {
		this.#colorToBlink = RED_COLOR;
		
		this.#blinkTimer.startTimerWithSetDuration(START_GAME_TEXT_UI_BLINK_DELAY_ON_GAME_START);
	}
}