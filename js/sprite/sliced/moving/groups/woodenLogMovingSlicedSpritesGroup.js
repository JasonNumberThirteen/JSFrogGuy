class WoodenLogMovingSlicedSpritesGroup extends MovingSlicedSpritesGroup {
	constructor(position, movementSpeed, numberOfMiddleSegments) {
		super(position, movementSpeed, true);
		
		this.#createAndAddSegment(position, movementSpeed, 0);

		for (let i = 1; i <= numberOfMiddleSegments; ++i) {
			this.#createAndAddSegment(this.#getPositionOfSegment(position, i), movementSpeed, 1);
		}

		this.#createAndAddSegment(this.#getPositionOfSegment(position, numberOfMiddleSegments + 1), movementSpeed, 2);
	}

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x + 1, position.y + 1), new Point(size.x - 4, size.y - 1));
	}

	#createAndAddSegment(position, movementSpeed, frameIndex) {
		const segment = new WoodenLogMovingSlicedSprite(position, movementSpeed, frameIndex);

		this.getSprites().push(segment);
	}

	#getPositionOfSegment(basePosition, offsetInTiles) {
		return PositionMethods.getSumOf(basePosition, new Point(WOODEN_LOG_SPRITE_DIMENSIONS.x*offsetInTiles, 0))
	}
}