class TiledFieldArea extends FieldArea {
	constructor(field, index, fieldAreaType, tileDimensions, sizeInTiles) {
		super(field, index, fieldAreaType, tileDimensions, sizeInTiles);
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
		const sprite = this.#getSpriteByFieldAreaType();

		if(!VariableMethods.variableIsDefined(sprite)) {
			return;
		}

		const spriteSize = sprite.getSize();
		const spritePosition = new Point(spriteSize.x*columnIndex, spriteSize.y*rowIndex);
		
		sprite.setPosition(spritePosition);
		this.getSprites().push(sprite);
	}

	#getSpriteByFieldAreaType() {
		switch(this.getAreaType()) {
			case FieldAreaType.Water:
				return new WaterFieldTileSlicedSprite();
			case FieldAreaType.Walkway:
				return new WalkwayFieldTileSlicedSprite();
			case FieldAreaType.Street:
				return new StreetFieldTileSlicedSprite();
		}
		
		return undefined;
	}
}