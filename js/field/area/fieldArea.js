class FieldArea {
	#field;
	#index;
	#areaType;
	#sprites = [];
	
	constructor(field, index, areaType) {
		this.#field = field;
		this.#index = index;
		this.#areaType = areaType;

		this.#field.areaAddedEvent.addListener(this.#onAreaAdded.bind(this));
		this.#field.positionChangedEvent.addListener(this.#onPositionChanged.bind(this));
	}

	draw() {
		this.#sprites.forEach(sprite => sprite.draw());
	}

	getPosition() {
		return this.#sprites[0].getPosition();
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
		const spritesOffset = new Point(parameters.position.x, parameters.position.y + this.#getOffsetY(parameters.areasList));

		this.#sprites.forEach(sprite => sprite.setOffset(spritesOffset));
	}

	#getOffsetY(areasList) {
		let offsetY = 0;

		for (let i = 0; i < this.#index; ++i) {
			offsetY += areasList[i].getSize().y;
		}

		return offsetY;
	}
}