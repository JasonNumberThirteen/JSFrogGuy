class PlayerAnimatedSpriteUI extends AnimatedSpriteUI {
	constructor() {
		super(PLAYER_SPRITE_FILENAME, new Point(GAME_WINDOW_WIDTH*0.5 - 4, GAME_WINDOW_HEIGHT - 12), 8, 8);
	}
}