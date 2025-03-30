class GameScene extends Scene {
	#fieldSpriteUI;
	#playerScoreIntCounterGroupUI;
	#highScoreIntCounterGroupUI;
	#playerAnimatedSpriteUI;
	#fadeScreenUI;
	#destinationPositions;

	constructor() {
		super(DARK_BLUE_COLOR);
	}

	init() {
		const that = this;
		
		this.#fieldSpriteUI = new SpriteUI(FIELD_SPRITE_FILENAME, new Point());
		this.#playerScoreIntCounterGroupUI = new PlayerScoreIntCounterGroupUI();
		this.#highScoreIntCounterGroupUI = new HighScoreIntCounterGroupUI();
		this.#playerAnimatedSpriteUI = new PlayerAnimatedSpriteUI();
		this.#fadeScreenUI = new FadeScreenUI(true, true);

		this.#fieldSpriteUI.getImage().onload = function() {
			const x = GAME_WINDOW_WIDTH*0.5 - that.#fieldSpriteUI.getImage().width*0.5;
			const y = GAME_WINDOW_HEIGHT*0.5 - that.#fieldSpriteUI.getImage().height*0.5;
			
			that.#fieldSpriteUI.setPosition(new Point(x, y));

			that.#destinationPositions = [new Point(x + 8, y + 8), new Point(x + 32, y + 8), new Point(x + 56, y + 8), new Point(x + 80, y + 8), new Point(x + 104, y + 8)];
		};
	}

	update(deltaTime) {
		this.#fadeScreenUI.update(deltaTime);
	}

	draw() {
		this.clearScreen();
		this.#fieldSpriteUI.draw();
		this.#playerScoreIntCounterGroupUI.draw();
		this.#highScoreIntCounterGroupUI.draw();
		this.#playerAnimatedSpriteUI.draw();
		this.#fadeScreenUI.draw();
	}

	processInput(key) {
		this.#playerAnimatedSpriteUI.processInput(key);
	}

	reachedAnyOfLeftDestinationPositions(position) {
		return this.#destinationPositions.some(destinationPosition => destinationPosition.x == position.x && destinationPosition.y == position.y);
	}
}