class StartGameTextUI extends TextUI {
	#initialColor;
	#colorToBlink;
	#blinkTimer;
	
	constructor() {
		super(START_GAME_TEXT, new Point(GAME_WINDOW_WIDTH*0.5, GAME_WINDOW_HEIGHT - 32), BLACK_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);

		this.#initialColor = this.getFillStyle();
		this.#colorToBlink = ORANGE_COLOR;
		this.#blinkTimer = new Timer(START_GAME_TEXT_UI_BLINK_DELAY, true);

		this.#blinkTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));

		FrogGuy.getSceneManager().getSceneByKey("MAIN_MENU").gameStartedEvent.addListener(this.#onGameStarted.bind(this));
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
		
		this.setFillStyle(textHasInitialColor ? this.#colorToBlink : this.#initialColor);
	}

	#onGameStarted() {
		this.#colorToBlink = RED_COLOR;
		
		this.#blinkTimer.startTimerWithSetDuration(START_GAME_TEXT_UI_BLINK_DELAY_ON_GAME_START);
	}
}