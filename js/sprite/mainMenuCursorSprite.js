class MainMenuCursorSprite extends Sprite {
	#initialX = 0;
	
	constructor() {
		super(MAIN_MENU_CURSOR_SPRITE_FILENAME);
	}

	update(deltaTime) {
		this.setX(this.#initialX + this.#getOffset());
	}

	setInitialX(x) {
		this.#initialX = x;
	}

	#getOffset() {
		const currentTime = FrogGuy.getCurrentTime();
		const angularFrequency = 2*Math.PI*currentTime;
		const sinus = Math.sin(angularFrequency / MAIN_MENU_CURSOR_MOVEMENT_TIME);

		return sinus*MAIN_MENU_CURSOR_MOVEMENT_AMPLITUDE;
	}
}