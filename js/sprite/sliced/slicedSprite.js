class SlicedSprite extends Sprite {
	#frameWidth;
	#frameHeight;
	#currentRowIndex = 0;
	#currentColumnIndex = 0;
	
	constructor(filename, position, frameWidth, frameHeight) {
		super(filename, position);

		this.#frameWidth = frameWidth;
		this.#frameHeight = frameHeight;
	}

	getFrameWidth() {
		return this.#frameWidth;
	}

	getSize() {
		return new Point(this.#frameWidth, this.#frameHeight);
	}

	getCurrentColumnIndex() {
		return this.#currentColumnIndex;
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
		const offsetX = this.#currentColumnIndex*frameWidth;
		const offsetY = this.#currentRowIndex*frameHeight;
		const position = this.getPosition();
		
		this.getCanvasContext().drawImage(this.getImage(), offsetX, offsetY, frameWidth, frameHeight, position.x, position.y, frameWidth, frameHeight);
	}
}