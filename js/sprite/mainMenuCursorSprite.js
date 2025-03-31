class MainMenuCursorSprite extends Sprite {
	_initialX;
	
	constructor() {
		super(MAIN_MENU_CURSOR_SPRITE_FILENAME, new Point());
	}

	setPosition(position) {
		super.setPosition(position);

		this._initialX = this.getPosition().x;
	}

	update(deltaTime) {
		this.getPosition().x = this._initialX + this.#getOffset();
	}

	#getOffset() {
		const currentTime = FrogGuy.getCurrentTime();
		const angularFrequency = 2*Math.PI*currentTime;
		const sinus = Math.sin(angularFrequency / MAIN_MENU_CURSOR_MOVEMENT_TIME);

		return sinus*MAIN_MENU_CURSOR_MOVEMENT_AMPLITUDE;
	}
}