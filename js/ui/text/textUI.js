class TextUI {
	#text;
	#position = new Point();
	#fillStyle;
	#alignment;
	#isActive = true;
	#canvasContext;

	constructor(text, position, fillStyle, alignment) {
		this.setText(text);

		if(VariableMethods.variableIsDefined(position)) {
			this.setPosition(position);
		}

		this.setFillStyle(fillStyle);
		this.setAlignment(alignment);
	}

	draw() {
		if(this.isActive()) {
			CanvasMethods.fillText(this.#getCanvasContext(), this.#text, this.#position, this.#fillStyle, this.#alignment);
		}
	}

	getTextWidth() {
		return this.#text.length*GAME_FONT_SIZE;
	}

	getPosition() {
		return this.#position;
	}

	getFillStyle() {
		return this.#fillStyle;
	}

	getAlignment() {
		return this.#alignment;
	}

	isActive() {
		return this.#isActive;
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

	setActive(active) {
		this.#isActive = active;
	}

	#getCanvasContext() {
		this.#canvasContext = this.#canvasContext || FrogGuy.getCanvasContext();

		return this.#canvasContext;
	}
}