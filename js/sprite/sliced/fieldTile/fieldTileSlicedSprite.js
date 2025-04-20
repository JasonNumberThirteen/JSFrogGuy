class FieldTileSlicedSprite extends SlicedSprite {
	#offset = new Point();
	
	constructor(frameDimensions) {
		super(TILESET_SPRITE_SHEET_FILENAME, undefined, frameDimensions);
	}

	getOffset() {
		return this.#offset;
	}

	setOffsetX(x) {
		this.#offset.x = x;
	}

	setOffsetY(y) {
		this.#offset.y = y;
	}

	setOffset(offset) {
		this.#offset = offset;
	}

	getPosition() {
		return PositionMethods.getSumOf(super.getPosition(), this.#offset);
	}
}