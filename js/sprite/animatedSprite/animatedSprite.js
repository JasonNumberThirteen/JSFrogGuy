class AnimatedSprite extends Sprite {
	#frameWidth;
	#frameHeight;
	#currentRowIndex = 0;
	#currentColumnIndex = 0;
	
	constructor(filename, position, frameWidth, frameHeight) {
		super(filename, position);

		this.#frameWidth = frameWidth;
		this.#frameHeight = frameHeight;
	}

	setCurrentRowIndex(index) {
		this.#currentRowIndex = index;
	}

	setCurrentColumnIndex(index) {
		this.#currentColumnIndex = index;
	}

	draw() {
		if(!this.isActive()) {
			return;
		}
		
		const frameWidth = this.#frameWidth;
		const frameHeight = this.#frameHeight;
		const position = this.getPosition();

		this.getCanvasContext().drawImage(this.getImage(), this.#currentColumnIndex*frameWidth, this.#currentRowIndex*frameHeight, frameWidth, frameHeight, position.x, position.y, frameWidth, frameHeight);
	}
}