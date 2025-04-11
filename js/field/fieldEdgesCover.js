class FieldEdgesCover {
	#field;
	#canvasContext;

	constructor(field) {
		this.#field = field;
	}
	
	draw() {
		const canvasContext = this.#getCanvasContext();
		const fieldPosition = this.#field.getPosition();
		const fieldSize = this.#field.getSize();
		const leftHalfOfCoverPosition = new Point(0, fieldPosition.y);
		const rightHalfOfCoverPosition = new Point(fieldPosition.x + fieldSize.x, fieldPosition.y);
		const rectangleSize = new Point(fieldPosition.x, fieldSize.y);

		CanvasMethods.fillRect(canvasContext, DARK_BLUE_COLOR, new Rectangle(leftHalfOfCoverPosition, rectangleSize));
		CanvasMethods.fillRect(canvasContext, undefined, new Rectangle(rightHalfOfCoverPosition, rectangleSize));
	}

	#getCanvasContext() {
		this.#canvasContext = this.#canvasContext || FrogGuy.getCanvasContext();

		return this.#canvasContext;
	}
}