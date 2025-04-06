class BonusPointsTextUI extends TextUI {
	#displayTimer;
	
	constructor() {
		super("", new Point(), YELLOW_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);
		this.setActive(false);

		this.#displayTimer = new Timer(3, false);

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