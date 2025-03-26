class StartGameTextUI extends TextUI {
	#blinkTimer;
	#initialColor;
	
	constructor() {
		super("START GAME", new Point(BASE_GAME_WINDOW_WIDTH*0.5, BASE_GAME_WINDOW_HEIGHT - 32), BLACK_COLOR, "center");

		this.#initialColor = this.getFillStyle();
		this.#blinkTimer = new Timer(START_GAME_TEXT_UI_BLINK_DELAY);

		this.#blinkTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
	}

	update(dt) {
		this.#blinkTimer.update(dt);
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