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
		const canvasContext = this.#getCanvasContext();
		const borderPosition = this.#position;
		const borderSize = this.#size;
		const borderThickness = 1;
		const doubledBorderThickness = borderThickness*2;
		const barWidth = (borderSize.x - doubledBorderThickness)*this.#getFillPercent();
		const barHeight = borderSize.y - doubledBorderThickness;
		const barFillPosition = new Point(borderPosition.x + borderThickness, borderPosition.y + borderThickness);
		const barFillSize = new Point(barWidth, barHeight);
		const barFillRectangle = new Rectangle(barFillPosition, barFillSize);

		CanvasMethods.fillRect(canvasContext, BLACK_COLOR, new Rectangle(borderPosition, borderSize));
		CanvasMethods.fillRect(canvasContext, this.#fillColor, barFillRectangle);
	}

	#getCanvasContext() {
		this.#canvasContext = this.#canvasContext || FrogGuy.getCanvasContext();

		return this.#canvasContext;
	}

	#getFillPercent() {
		return this.#maxValue > 0 ? MathMethods.clamp(this.#currentValue / this.#maxValue, 0, 1) : 0;
	}
}