class WoodenLogSprite extends Sprite {
	#movementSpeed;
	#movementDirection = 1;
	#initialMovementSpeed;
	
	constructor(position, movementSpeed) {
		super(WOODEN_LOG_SPRITE_SHEET_FILENAME, position);

		this.#initialMovementSpeed = movementSpeed;
		this.#movementSpeed = this.#initialMovementSpeed + (this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_LEVEL*(FrogGuy.getData().getCurrentLevelNumber() - 1));

		FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).frogSavedEvent.addListener(this.#onFrogSaved.bind(this));
	}

	update(deltaTime) {
		const position = this.getPosition();
		const leftSide = 68;
		const rightSide = 188;
		const width = this.getSize().x;

		position.x += this.#movementSpeed*this.#movementDirection*deltaTime;

		if(position.x > rightSide) {
			position.x = leftSide - width*2;
		}

		this.setPosition(position);
	}

	getMovementSpeed() {
		return this.#movementSpeed;
	}

	getMovementDirection() {
		return this.#movementDirection;
	}

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x + 1, position.y + 1), new Point(size.x - 4, size.y - 1));
	}

	#onFrogSaved() {
		this.#movementSpeed += this.#initialMovementSpeed*OBJECTS_MOVEMENT_SPEED_GROWTH_MULTIPLIER_PER_SAVED_FROG;
	}
}