class LevelTimerPanelUI {
	#headerText;
	#progressBarUI;

	constructor() {
		const position = new Point(HALF_OF_GAME_WINDOW_WIDTH + 8, GAME_WINDOW_HEIGHT - 12);
		const size = new Point(80, 8);
		
		this.#progressBarUI = new ProgressBarUI(position, size, YELLOW_COLOR, REMAINING_TIME_PROGRESS_BAR_UI_BORDER_THICKNESS, LEVEL_TIME, LEVEL_TIME);
		this.#headerText = new TextUI(TIME_TEXT, new Point(position.x + size.x + 4, position.y + 8), YELLOW_COLOR, TEXT_ALIGNED_TO_LEFT_KEY);
	}

	setCurrentValue(value) {
		this.#progressBarUI.setCurrentValue(value);
	}

	setMaxValue(value) {
		this.#progressBarUI.setMaxValue(value);
	}

	draw() {
		this.#headerText.draw();
		this.#progressBarUI.draw();
	}
}