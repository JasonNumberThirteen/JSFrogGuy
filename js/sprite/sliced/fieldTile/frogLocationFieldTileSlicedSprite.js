class FrogLocationFieldTileSlicedSprite extends FieldTileSlicedSprite {
	#destination;
	
	constructor() {
		super(24, 16);
		this.setCurrentRowIndex(0.5);

		this.#destination = new FieldDestination(new Point(8, 8));

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
		this.#destination.setLocalPosition(new Point(position.x + 8, position.y + 8));
	}
}