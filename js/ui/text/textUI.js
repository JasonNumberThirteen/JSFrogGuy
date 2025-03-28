class TextUI {
	#text;
	#position;
	#fillStyle;
	#alignment;
	#canvasContext;

	constructor(text, position, fillStyle, alignment) {
		this.setText(text);
		this.setPosition(position);
		this.setFillStyle(fillStyle);
		this.setAlignment(alignment);
	}

	draw() {
		var canvasContext = this.#getCanvasContext();
		var label = this.#getLabel();
		
		canvasContext.fillStyle = label.fillStyle;
		canvasContext.textAlign = label.alignment;

		canvasContext.fillText(label.text, label.position.x, label.position.y);
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

	#getLabel() {
		return {text: this.#text, position: this.#position, fillStyle: this.#fillStyle, alignment: this.#alignment};
	}

	#getCanvasContext() {
		if(typeof(this.#canvasContext) === "undefined") {
			this.#canvasContext = FrogGuy.getCanvasContext();
		}

		return this.#canvasContext;
	}
}