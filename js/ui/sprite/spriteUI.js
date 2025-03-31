class SpriteUI {
	#image;
	#position;
	#isActive = true;
	#canvasContext;

	constructor(filename, position) {
		this.setImage(filename);
		this.setPosition(position);
	}

	draw() {
		if(!this.#isActive()) {
			return;
		}
		
		const position = this.#position;
		
		this.getCanvasContext().drawImage(this.#image, position.x, position.y);
	}

	getImage() {
		return this.#image;
	}

	getPosition() {
		return this.#position;
	}

	isActive() {
		return this.#isActive;
	}

	getCanvasContext() {
		this.#canvasContext = this.#canvasContext || FrogGuy.getCanvasContext();

		return this.#canvasContext;
	}

	setImage(filename) {
		this.#image = new Image();
		this.#image.src = filename;
	}

	setPosition(position) {
		this.#position = position;
	}

	setActive(active) {
		this.#isActive = active;
	}
}