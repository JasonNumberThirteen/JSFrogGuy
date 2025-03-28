class MainMenuCursorSpriteUI extends SpriteUI {
	#initialX;
	
	constructor(position) {
		super(MAIN_MENU_CURSOR_SPRITE_FILENAME, position);

		this.#initialX = position.x;
	}

	update(deltaTime) {
		this.getPosition().x = this.#initialX + this.#getOffset();
	}

	#getOffset() {
		const currentTime = FrogGuy.getCurrentTime();
		const angularFrequency = 2*Math.PI*currentTime;
		const sinus = Math.sin(angularFrequency / MAIN_MENU_CURSOR_MOVEMENT_TIME);

		return sinus*MAIN_MENU_CURSOR_MOVEMENT_AMPLITUDE;
	}
}