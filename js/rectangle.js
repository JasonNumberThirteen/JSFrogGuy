class Rectangle {
	#position;
	#size;

	constructor(position, size) {
		this.#position = position;
		this.#size = size;
	}

	getPosition() {
		return this.#position;
	}

	getSize() {
		return this.#size;
	}
}