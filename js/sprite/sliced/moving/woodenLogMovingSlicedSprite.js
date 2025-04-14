class WoodenLogMovingSlicedSprite extends MovingSlicedSprite {
	constructor(position, movementSpeed, frameIndex) {
		super(WOODEN_LOG_SPRITE_SHEET_FILENAME, position, frameIndex, WOODEN_LOG_SPRITE_DIMENSIONS, movementSpeed, true);
		this.setCollisionRectangleOffset(new Rectangle(new Point(1, 1), new Point(-4, -1)));
	}
}