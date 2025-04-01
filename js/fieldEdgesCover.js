class FieldEdgesCover {
	#canvasContext;
	
	draw() {
		const canvasContext = this.#getCanvasContext();
		const y = 32;
		const width = 68;
		const height = 96;

		canvasContext.fillStyle = DARK_BLUE_COLOR;

		canvasContext.fillRect(0, y, width, height);
		canvasContext.fillRect(width + 120, y, width, height);
	}

	#getCanvasContext() {
		this.#canvasContext = this.#canvasContext || FrogGuy.getCanvasContext();

		return this.#canvasContext;
	}
}