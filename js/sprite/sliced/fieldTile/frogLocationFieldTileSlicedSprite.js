class FrogLocationFieldTileSlicedSprite extends FieldTileSlicedSprite {
	#destination = new FieldDestination(new Point(8, 8));
	
	constructor() {
		super(FROG_LOCATION_SPRITE_DIMENSIONS);
		this.setCurrentRowIndex(0.5);

		this.positionChangedEvent.addListener(this.#onPositionChanged.bind(this));
	}

	setAsTaken(taken) {
		this.#destination.setAsTaken(taken);
	}

	isTaken() {
		return this.#destination.isTaken();
	}

	getDestination() {
		return this.#destination;
	}

	draw() {
		super.draw();
		
		if(this.isActive()) {
			this.#destination.draw();
		}
	}

	#onPositionChanged(position) {
		const localPosition = PositionMethods.getSumOf(position, this.#destination.getLocalPosition());
		
		this.#destination.setLocalPosition(localPosition);
	}
}