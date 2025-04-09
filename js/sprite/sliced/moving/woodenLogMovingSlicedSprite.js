class WoodenLogMovingSlicedSprite extends MovingSlicedSprite {
	constructor(position, movementSpeed, frameIndex) {
		super(WOODEN_LOG_SPRITE_SHEET_FILENAME, position, frameIndex, 8, 8, movementSpeed, true);
	}

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x + 1, position.y + 1), new Point(size.x - 4, size.y - 1));
	}
}