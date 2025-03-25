class CanvasContext {
	#context;
	#creditsText;

	constructor(canvas) {
		this.#context = canvas.getContext("2d");
		this.#context.font = GAME_FONT_SIZE + GAME_FONT_UNIT + " '" + GAME_FONT + "'";
		this.#creditsText = new TextUI("© JASON 2025", new Point(GAME_WIDTH*0.5, GAME_HEIGHT - 8), BLACK_COLOR, "center");
	}

	clear() {
		this.#context.fillStyle = GAME_BACKGROUND_COLOR;

		this.#context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
		this.drawLabel(this.#creditsText.getLabel());
	}

	drawLabel(label) {
		this.#context.fillStyle = label.fillStyle;
		this.#context.textAlign = label.alignment;

		this.#context.fillText(label.text, label.position.x, label.position.y);
	}
}