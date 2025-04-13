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
		const position = super.getPosition();

		return new Point(position.x + this.#offset.x, position.y + this.#offset.y);
	}
}