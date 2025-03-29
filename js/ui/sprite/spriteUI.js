class SpriteUI {
	#image;
	#position;
	#canvasContext;

	constructor(filename, position) {
		this.#image = new Image();
		this.#image.src = filename;
		
		this.setPosition(position);
	}

	draw() {
		const position = this.#position;
		
		this.getCanvasContext().drawImage(this.#image, position.x, position.y);
	}

	setPosition(position) {
		this.#position = position;
	}

	getImage() {
		return this.#image;
	}

	getPosition() {
		return this.#position;
	}

	getCanvasContext() {
		if(typeof(this.#canvasContext) === "undefined") {
			this.#canvasContext = FrogGuy.getCanvasContext();
		}

		return this.#canvasContext;
	}
}