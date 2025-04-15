class WalkwayFieldArea extends FieldArea {
	constructor(field, index, sizeInTiles) {
		super(field, index, FieldAreaType.Walkway, WALKWAY_SPRITE_DIMENSIONS, sizeInTiles);
		this.#addTiles();
	}

	#addTiles() {
		const heightInTiles = this.getHeightInTiles();
		const widthInTiles = this.getWidthInTiles();
		
		for (let y = 0; y < heightInTiles; ++y) {
			for (let x = 0; x < widthInTiles; ++x) {
				this.#addTile(y, x);
			}
		}
	}

	#addTile(rowIndex, columnIndex) {
		const sprite = new WalkwayFieldTileSlicedSprite();
		const spriteSize = sprite.getSize();
		const spritePosition = new Point(spriteSize.x*columnIndex, spriteSize.y*rowIndex);
		
		sprite.setPosition(spritePosition);
		this.getSprites().push(sprite);
	}
}