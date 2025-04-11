class FieldTileSlicedSprite extends SlicedSprite {
	#offset = new Point();
	
	constructor(frameWidth, frameHeight) {
		super(TILESET_SPRITE_SHEET_FILENAME, new Point(), frameWidth, frameHeight);
	}

	getOffset() {
		return this.#offset;
	}

	setOffset(offset) {
		this.#offset = offset;
	}

	getPosition() {
		const position = super.getPosition();

		return new Point(position.x + this.#offset.x, position.y + this.#offset.y);
	}
}