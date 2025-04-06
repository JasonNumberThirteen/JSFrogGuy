class Destination {
	#position;

	constructor(position) {
		this.#position = position;
	}

	getPosition() {
		return this.#position;
	}

	getRectangle() {
		return new Rectangle(this.getPosition(), new Point(8, 8));
	}
}