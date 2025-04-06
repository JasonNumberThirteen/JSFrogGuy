class TextUI {
	#text;
	#position;
	#fillStyle;
	#alignment;
	#isActive = true;
	#canvasContext;

	constructor(text, position, fillStyle, alignment) {
		this.setText(text);
		this.setPosition(position);
		this.setFillStyle(fillStyle);
		this.setAlignment(alignment);
	}

	draw() {
		if(!this.isActive()) {
			return;
		}
		
		var canvasContext = this.#getCanvasContext();
		var position = this.#position;
		
		canvasContext.fillStyle = this.#fillStyle;
		canvasContext.textAlign = this.#alignment;

		canvasContext.fillText(this.#text, position.x, position.y);
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