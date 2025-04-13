class ProgressBarUI {
	#position;
	#size;
	#fillColor;
	#borderThickness;
	#currentValue;
	#maxValue;
	#canvasContext;

	constructor(position, size, fillColor, borderThickness, currentValue, maxValue) {
		this.#position = position;
		this.#size = size;
		this.#fillColor = fillColor;
		this.#borderThickness = borderThickness;

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
		const doubledBorderThickness = this.#borderThickness*2;
		const barWidth = (borderSize.x - doubledBorderThickness)*this.#getFillPercent();
		const barHeight = borderSize.y - doubledBorderThickness;
		const barFillPosition = PositionMethods.getSumOf(borderPosition, new Point(this.#borderThickness, this.#borderThickness));
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