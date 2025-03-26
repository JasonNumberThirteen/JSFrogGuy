class SpriteUI {
	#image;
	#position;

	constructor(filename, position) {
		this.#image = new Image();
		this.#image.src = filename;
		
		this.setPosition(position);
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
}