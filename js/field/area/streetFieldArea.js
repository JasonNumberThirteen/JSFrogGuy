class StreetFieldArea extends FieldArea {
	#widthInTiles;
	#heightInTiles;
	
	constructor(field, index, widthInTiles, heightInTiles) {
		super(field, index, FieldAreaType.Street);

		this.#widthInTiles = widthInTiles;
		this.#heightInTiles = heightInTiles;

		this.#addTiles();
	}

	getSize() {
		return new Point(this.#widthInTiles*8, this.#heightInTiles*8);
	}

	#addTiles() {
		for (let y = 0; y < this.#heightInTiles; ++y) {
			for (let x = 0; x < this.#widthInTiles; ++x) {
				this.#addTile(y, x);
			}
		}
	}

	#addTile(rowIndex, columnIndex) {
		const sprite = new StreetFieldTileSlicedSprite();
		const spriteSize = sprite.getSize();
		const spritePosition = new Point(spriteSize.x*columnIndex, spriteSize.y*rowIndex);
		
		sprite.setPosition(spritePosition);
		this.getSprites().push(sprite);
	}
}