class WoodenLogSprite extends Sprite {
	#movementSpeed;
	
	constructor(position, movementSpeed) {
		super(WOODEN_LOG_SPRITE_SHEET_FILENAME, position);

		this.#movementSpeed = movementSpeed;
	}

	update(deltaTime) {
		const position = this.getPosition();
		const leftSide = 68;
		const rightSide = 188;
		const width = this.getSize().x;

		position.x += this.#movementSpeed*deltaTime;

		if(position.x > rightSide) {
			position.x = leftSide - width*2;
		}

		this.setPosition(position);
	}
}