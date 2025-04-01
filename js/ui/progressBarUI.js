class ProgressBarUI {
	#position;
	#size;
	#fillColor;
	#currentValue;
	#maxValue;
	#canvasContext;

	constructor(position, size, fillColor, currentValue, maxValue) {
		this.#position = position;
		this.#size = size;
		this.#fillColor = fillColor;

		this.setCurrentValue(currentValue || 0);
		this.setMaxValue(maxValue || 0);
	}

	setCurrentValue(value) {
		this.#currentValue = value;
	}

	setMaxValue(value) {
		this.#maxValue = value;
	}

	draw() {
		var canvasContext = this.#getCanvasContext();
		var position = this.#position;
		var size = this.#size;
		var borderThickness = 1;
		var fillPercent = this.#getFillPercent();
		var barWidth = (size.x - borderThickness*2)*fillPercent;
		
		canvasContext.fillStyle = BLACK_COLOR;

		canvasContext.fillRect(position.x, position.y, size.x, size.y);

		canvasContext.fillStyle = this.#fillColor;

		canvasContext.fillRect(position.x + borderThickness, position.y + borderThickness, barWidth, size.y - borderThickness*2);
	}

	#getCanvasContext() {
		this.#canvasContext = this.#canvasContext || FrogGuy.getCanvasContext();

		return this.#canvasContext;
	}

	#getFillPercent() {
		return this.#maxValue > 0 ? MathMethods.clamp(this.#currentValue / this.#maxValue, 0, 1) : 0;
	}
}