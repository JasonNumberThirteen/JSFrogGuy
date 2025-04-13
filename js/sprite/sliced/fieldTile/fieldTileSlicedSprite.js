class FieldTileSlicedSprite extends SlicedSprite {
	#offset = new Point();
	
	constructor(frameDimensions) {
		super(TILESET_SPRITE_SHEET_FILENAME, new Point(), frameDimensions);
	}

	getOffset() {
		return this.#offset;
	}

	setOffset(offset) {
		this.#offset = offset;
	}

	getPosition() {
		return PositionMethods.getSumOf(super.getPosition(), this.#offset);
	}
}