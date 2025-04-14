class MainMenuCursorSprite extends Sprite {
	#initialX;
	
	constructor() {
		super(MAIN_MENU_CURSOR_SPRITE_FILENAME, new Point());
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