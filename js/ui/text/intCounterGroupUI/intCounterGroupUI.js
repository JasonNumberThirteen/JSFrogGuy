class IntCounterGroupUI {
	#headerTextUI;
	#intCounterTextUI;

	constructor(headerText, counterText, headerPosition, alignment) {
		this.#headerTextUI = new TextUI(headerText, new Point(headerPosition.x, headerPosition.y + 8), BRIGHT_RED_COLOR, alignment);
		this.#intCounterTextUI = new TextUI(counterText, new Point(headerPosition.x + 8, headerPosition.y + 16), BRIGHT_BLUE_COLOR, alignment);
	}

	draw() {
		this.#headerTextUI.draw();
		this.#intCounterTextUI.draw();
	}
}