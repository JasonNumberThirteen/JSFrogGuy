class CanvasContext {
	#context;
	#gameLogo;
	#creditsText;

	constructor(canvas) {
		this.#context = canvas.getContext("2d");
		this.#context.font = GAME_FONT_SIZE + GAME_FONT_UNIT + " '" + GAME_FONT + "'";

		this.#gameLogo = new Image();
		this.#gameLogo.src = "assets/sprites/gameLogo.png";

		this.#creditsText = new TextUI("© JASON 2025", new Point(BASE_GAME_WINDOW_WIDTH*0.5, BASE_GAME_WINDOW_HEIGHT - 8), BLACK_COLOR, "center");
	}

	clear() {
		this.#context.fillStyle = PALE_YELLOW_COLOR;

		this.#context.fillRect(0, 0, BASE_GAME_WINDOW_WIDTH, BASE_GAME_WINDOW_HEIGHT);
		this.#context.drawImage(this.#gameLogo, BASE_GAME_WINDOW_WIDTH*0.5 - this.#gameLogo.width*0.5, BASE_GAME_WINDOW_HEIGHT*0.5 - this.#gameLogo.height*0.5);
		this.drawLabel(this.#creditsText.getLabel());
	}

	drawLabel(label) {
		this.#context.fillStyle = label.fillStyle;
		this.#context.textAlign = label.alignment;

		this.#context.fillText(label.text, label.position.x, label.position.y);
	}
}