class BonusPointsTextUI extends TextUI {
	#displayTimer;
	
	constructor() {
		super(EMPTY_STRING, new Point(), YELLOW_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);
		this.setActive(false);

		this.#displayTimer = new Timer(BONUS_POINTS_TEXT_UI_DISPLAY_DURATION, false);

		this.#displayTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
	}

	update(deltaTime) {
		this.#displayTimer.update(deltaTime);
	}

	display(position, text) {
		this.setActive(true);
		this.setPosition(position);
		this.setText(text);
		this.#displayTimer.startTimer();
	}

	#onTimerFinished() {
		this.setActive(false);
	}
}