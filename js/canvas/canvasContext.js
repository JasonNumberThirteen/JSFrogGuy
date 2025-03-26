class CanvasContext {
	#context;
	#gameLogo;
	#startGameText;
	#creditsText;

	constructor(canvas) {
		this.#context = canvas.getContext("2d");
		this.#context.font = GAME_FONT_SIZE + GAME_FONT_UNIT + " '" + GAME_FONT + "'";

		this.#gameLogo = new SpriteUI("assets/sprites/gameLogo.png", new Point());
		this.#startGameText = new StartGameTextUI();
		this.#creditsText = new TextUI("© JASON 2025", new Point(BASE_GAME_WINDOW_WIDTH*0.5, BASE_GAME_WINDOW_HEIGHT - 8), BLACK_COLOR, "center");

		this.#gameLogo.setPosition(new Point(BASE_GAME_WINDOW_WIDTH*0.5 - this.#gameLogo.getImage().width*0.5, BASE_GAME_WINDOW_HEIGHT*0.5 - this.#gameLogo.getImage().height*0.5));
	}

	update(dt) {
		this.#startGameText.update(dt);
	}

	draw() {
		this.#context.fillStyle = PALE_YELLOW_COLOR;

		this.#context.fillRect(0, 0, BASE_GAME_WINDOW_WIDTH, BASE_GAME_WINDOW_HEIGHT);
		this.drawImage(this.#gameLogo);
		this.drawLabel(this.#startGameText.getLabel());
		this.drawLabel(this.#creditsText.getLabel());
	}

	drawImage(image) {
		const position = image.getPosition();
		
		this.#context.drawImage(image.getImage(), position.x, position.y);
	}

	drawLabel(label) {
		this.#context.fillStyle = label.fillStyle;
		this.#context.textAlign = label.alignment;

		this.#context.fillText(label.text, label.position.x, label.position.y);
	}
}