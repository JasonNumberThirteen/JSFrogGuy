class FrogLocationFieldArea extends FieldArea {
	constructor(field, index, numberOfLocations) {
		super(field, index, FieldAreaType.FrogLocation, FROG_LOCATION_SPRITE_DIMENSIONS, new Point(numberOfLocations, 1));
		this.#addTiles(numberOfLocations);
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