class TextUI {
	#text;
	#position;
	#fillStyle;
	#alignment;

	constructor(text, position, fillStyle, alignment) {
		this.setText(text);
		this.setPosition(position);
		this.setFillStyle(fillStyle);
		this.setAlignment(alignment);
	}

	setText(text) {
		this.#text = text;
	}

	setPosition(position) {
		this.#position = position;
	}

	setFillStyle(fillStyle) {
		this.#fillStyle = fillStyle;
	}

	setAlignment(alignment) {
		this.#alignment = alignment;
	}

	getPosition() {
		return this.#position;
	}

	getWidth() {
		return this.#text.length*GAME_FONT_SIZE;
	}

	getFillStyle() {
		return this.#fillStyle;
	}

	getLabel() {
		return {text: this.#text, position: this.#position, fillStyle: this.#fillStyle, alignment: this.#alignment};
	}
}