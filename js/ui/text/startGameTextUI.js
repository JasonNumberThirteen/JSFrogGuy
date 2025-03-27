class StartGameTextUI extends TextUI {
	#initialColor;
	#blinkTimer;
	
	constructor() {
		super(START_GAME_TEXT, new Point(GAME_WINDOW_WIDTH*0.5, GAME_WINDOW_HEIGHT - 32), BLACK_COLOR, CENTER_KEY);

		this.#initialColor = this.getFillStyle();
		this.#blinkTimer = new Timer(START_GAME_TEXT_UI_BLINK_DELAY);

		this.#blinkTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
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
		
		this.setFillStyle(textHasInitialColor ? ORANGE_COLOR : this.#initialColor);
	}
}