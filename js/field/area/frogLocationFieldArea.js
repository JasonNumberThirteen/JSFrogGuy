class FrogLocationFieldArea extends FieldArea {
	constructor(field, index, numberOfLocations) {
		super(field, index, FieldAreaType.FrogLocation);
		this.#addTiles(numberOfLocations);
	}

	getSize() {
		return new Point(this.getSprites().length*24, 16);
	}

	getFreeFrogLocations() {
		return this.getSprites().filter(sprite => !sprite.isTaken());
	}

	#addTiles(numberOfLocations) {
		for (let i = 0; i < numberOfLocations; ++i) {
			this.#addTile(i);
		}
	}

	#addTile(columnIndex) {
		const sprite = new FrogLocationFieldTileSlicedSprite();
		
		sprite.setX(sprite.getWidth()*columnIndex);
		this.getSprites().push(sprite);
	}
}