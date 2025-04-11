class FrogLocationFieldArea extends FieldArea {
	constructor(field, index, numberOfLocations) {
		super(field, index, FieldAreaType.FROG_LOCATION);
		this.#addTiles(numberOfLocations);
	}

	getSize() {
		return new Point(this.getSprites().length*24, 16);
	}

	#addTiles(numberOfLocations) {
		for (let i = 0; i < numberOfLocations; ++i) {
			this.#addTile(i);
		}
	}

	#addTile(columnIndex) {
		const sprite = new FrogLocationFieldTileSlicedSprite();
		
		sprite.setPosition(new Point(sprite.getSize().x*columnIndex, sprite.getPosition().y));
		this.getSprites().push(sprite);
	}
}