class IntCounterGroupUI {
	#headerTextUI;
	#intCounterTextUI;

	constructor(headerText, counterValue, headerPosition, alignment) {
		this.#headerTextUI = new TextUI(headerText, new Point(headerPosition.x, headerPosition.y + 8), BRIGHT_RED_COLOR, alignment);
		this.#intCounterTextUI = new IntCounterTextUI(counterValue, new Point(headerPosition.x + this.#getIntCounterTextUIPositionOffset(alignment), headerPosition.y + 16), BRIGHT_BLUE_COLOR, alignment);
	}

	draw() {
		this.#headerTextUI.draw();
		this.#intCounterTextUI.draw();
	}

	getCounterValue() {
		return this.#intCounterTextUI.getValue();
	}

	setCounterValue(value) {
		this.#intCounterTextUI.setTo(value);
	}

	increaseCounterValue(value) {
		this.#intCounterTextUI.increaseBy(value);
	}

	#getIntCounterTextUIPositionOffset(alignment) {
		switch(alignment) {
			case TEXT_ALIGNED_TO_LEFT_KEY:
				return 8;
			case TEXT_ALIGNED_TO_RIGHT_KEY:
				return -8;
		}
	}
}