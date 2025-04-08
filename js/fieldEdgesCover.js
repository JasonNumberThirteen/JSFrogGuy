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