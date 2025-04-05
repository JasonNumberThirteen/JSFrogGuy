class CurrentLevelTextUI extends TextUI {
	constructor() {
		super(LEVEL_TEXT + " " + FrogGuy.getData().getCurrentLevelNumber(), new Point(HALF_OF_GAME_WINDOW_WIDTH, GAME_FONT_SIZE + 4), SEA_GREEN_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);
	}
}