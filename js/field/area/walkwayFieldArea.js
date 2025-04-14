class WalkwayFieldArea extends FieldArea {
	#widthInTiles;
	
	constructor(field, index, widthInTiles) {
		super(field, index, FieldAreaType.WALKWAY);

		this.#widthInTiles = widthInTiles;
		
		this.#addTiles();
	}

	getSize() {
		return new Point(this.#widthInTiles*8, 8);
	}

	#addTiles() {
		for (let i = 0; i < this.#widthInTiles; ++i) {
			this.#addTile(i);
		}
	}

	#addTile(columnIndex) {
		const sprite = new WalkwayFieldTileSlicedSprite();
			
		sprite.setX(sprite.getWidth()*columnIndex);
		this.getSprites().push(sprite);
	}
}