class SlicedSprite extends Sprite {
	#frameDimensions;
	#currentRowIndex = 0;
	#currentColumnIndex = 0;
	
	constructor(filename, position, frameDimensions) {
		super(filename, position);

		this.#frameDimensions = frameDimensions;
	}

	getSize() {
		return this.#frameDimensions;
	}

	getFrameWidth() {
		return this.#frameDimensions.x;
	}

	getFrameHeight() {
		return this.#frameDimensions.y;
	}

	getCurrentRowIndex() {
		return this.#currentRowIndex;
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
		
		const frameWidth = this.#frameDimensions.x;
		const frameHeight = this.#frameDimensions.y;
		const offsetX = this.#currentColumnIndex*frameWidth;
		const offsetY = this.#currentRowIndex*frameHeight;
		const position = this.getPosition();
		
		this.getCanvasContext().drawImage(this.getImage(), offsetX, offsetY, frameWidth, frameHeight, position.x, position.y, frameWidth, frameHeight);
	}
}