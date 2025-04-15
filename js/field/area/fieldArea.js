class FieldArea {
	#field;
	#index;
	#areaType;
	#tileSize;
	#sizeInTiles;
	#sprites = [];
	
	constructor(field, index, areaType, tileSize, sizeInTiles) {
		this.#field = field;
		this.#index = index;
		this.#areaType = areaType;
		this.#tileSize = tileSize;
		this.#sizeInTiles = sizeInTiles;

		this.#field.areaAddedEvent.addListener(this.#onAreaAdded.bind(this));
		this.#field.positionChangedEvent.addListener(this.#onPositionChanged.bind(this));
	}

	draw() {
		this.#sprites.forEach(sprite => sprite.draw());
	}

	getX(offsetInTiles) {
		const tileWidth = this.getTileWidth();
		
		offsetInTiles = offsetInTiles || 0;
		
		if(offsetInTiles >= tileWidth) {
			return undefined;
		}
		
		return this.getPosition().x + offsetInTiles*tileWidth;
	}

	getY(offsetInTiles) {
		const tileHeight = this.getTileHeight();
		
		offsetInTiles = offsetInTiles || 0;
		
		if(offsetInTiles >= tileHeight) {
			return undefined;
		}
		
		return this.getPosition().y + offsetInTiles*tileHeight;
	}

	getPosition() {
		return this.#sprites[0].getPosition();
	}

	getWidth() {
		return this.getSize().x;
	}

	getHeight() {
		return this.getSize().y;
	}

	getSize() {
		return PositionMethods.getMultiplicationOf(this.#tileSize, this.#sizeInTiles);
	}

	getWidthInTiles() {
		return this.getSizeInTiles().x;
	}

	getHeightInTiles() {
		return this.getSizeInTiles().y;
	}

	getSizeInTiles() {
		return this.#sizeInTiles;
	}

	getTileWidth() {
		return this.getTileSize().x;
	}

	getTileHeight() {
		return this.getTileSize().y;
	}

	getTileSize() {
		return this.#tileSize;
	}

	getAreaType() {
		return this.#areaType;
	}

	getSprites() {
		return this.#sprites;
	}

	#onAreaAdded(areasList) {
		const spritesOffsetY = this.#getOffsetY(areasList);
		
		this.#sprites.forEach(sprite => sprite.getOffset().y = spritesOffsetY);
	}

	#onPositionChanged(parameters) {
		const spritesOffset = PositionMethods.getSumOf(parameters.position, new Point(0, this.#getOffsetY(parameters.areasList)));

		this.#sprites.forEach(sprite => sprite.setOffset(spritesOffset));
	}

	#getOffsetY(areasList) {
		let offsetY = 0;

		for (let i = 0; i < this.#index; ++i) {
			offsetY += areasList[i].getHeight();
		}

		return offsetY;
	}
}