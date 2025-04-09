class WoodenLogSlicedSpritesGroup extends SlicedSpritesGroup {
	constructor(position, movementSpeed, numberOfMiddleSegments) {
		super(position, movementSpeed, true);
		
		this.#createAndAddSegment(position, movementSpeed, 0);

		for (let i = 1; i <= numberOfMiddleSegments; ++i) {
			this.#createAndAddSegment(new Point(position.x + 8*i, position.y), movementSpeed, 1);
		}

		this.#createAndAddSegment(new Point(position.x + 8*(numberOfMiddleSegments + 1), position.y), movementSpeed, 2);
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
}