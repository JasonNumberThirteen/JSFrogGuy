class LevelTimerPanelUI {
	#progressBarUI;
	#headerText;

	constructor() {
		const progressBarUIPosition = new Point(HALF_OF_GAME_WINDOW_WIDTH + 8, GAME_WINDOW_HEIGHT - LEVEL_TIMER_PANEL_UI_HEIGHT - LEVEL_TIMER_PANEL_UI_OFFSET_FROM_BOTTON_SCREEN_EDGE);
		const progressBarUISize = new Point(LEVEL_TIMER_PANEL_UI_WIDTH, LEVEL_TIMER_PANEL_UI_HEIGHT);
		const headerTextPosition = new Point(progressBarUIPosition.x + progressBarUISize.x + 4, progressBarUIPosition.y + GAME_FONT_SIZE);
		
		this.#progressBarUI = new ProgressBarUI(progressBarUIPosition, progressBarUISize, YELLOW_COLOR, LEVEL_TIMER_PANEL_UI_PROGRESS_BAR_BORDER_THICKNESS, LEVEL_TIME, LEVEL_TIME);
		this.#headerText = new TextUI(TIME_TEXT, headerTextPosition, YELLOW_COLOR, TEXT_ALIGNED_TO_LEFT_KEY);
	}

	setCurrentValue(value) {
		this.#progressBarUI.setCurrentValue(value);
	}

	setMaxValue(value) {
		this.#progressBarUI.setMaxValue(value);
	}

	draw() {
		this.#progressBarUI.draw();
		this.#headerText.draw();
	}
}