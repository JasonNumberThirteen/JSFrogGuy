class FieldEdgesCover {
	#fieldSprite;
	#canvasContext;

	constructor() {
		this.#fieldSprite = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getFieldSprite();
	}
	
	draw() {
		const canvasContext = this.#getCanvasContext();
		const fieldPosition = this.#fieldSprite.getPosition();
		const fieldSize = this.#fieldSprite.getSize();

		canvasContext.fillStyle = DARK_BLUE_COLOR;

		canvasContext.fillRect(0, fieldPosition.y, fieldPosition.x, fieldSize.y);
		canvasContext.fillRect(fieldPosition.x + fieldSize.x, fieldPosition.y, fieldPosition.x, fieldSize.y);
	}

	#getCanvasContext() {
		this.#canvasContext = this.#canvasContext || FrogGuy.getCanvasContext();

		return this.#canvasContext;
	}
}