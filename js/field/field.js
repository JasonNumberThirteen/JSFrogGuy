class Field {
	areaAddedEvent = new GameEvent();
	positionChangedEvent = new GameEvent();
	
	#areas = [];
	#position = new Point();
	#frogLocationFieldArea;

	constructor() {
		this.#frogLocationFieldArea = new FrogLocationFieldArea(this, 0, NUMBER_OF_FROG_LOCATIONS);
		
		this.#addArea(this.#frogLocationFieldArea);
		this.#addArea(new WaterFieldArea(this, 1, NUMBER_OF_FROG_LOCATIONS*3, 5));
		this.#addArea(new WalkwayFieldArea(this, 2, NUMBER_OF_FROG_LOCATIONS*3));
		this.#addArea(new StreetFieldArea(this, 3, NUMBER_OF_FROG_LOCATIONS*3, 5));
		this.#addArea(new WalkwayFieldArea(this, 4, NUMBER_OF_FROG_LOCATIONS*3));
		this.setPosition(new Point(HALF_OF_GAME_WINDOW_WIDTH - this.#frogLocationFieldArea.getSize().x*0.5, HALF_OF_GAME_WINDOW_HEIGHT - this.getSize().y*0.5));
	}

	positionIsWithinAreaOfType(position, areaType) {
		const area = this.#areas.find(area => area.getAreaType() === areaType);

		if(typeof(area) === "undefined") {
			return false;
		}

		const areaPosition = area.getPosition();
		const areaSize = area.getSize();

		return position.x >= areaPosition.x && position.x < areaPosition.x + areaSize.x && position.y >= areaPosition.y && position.y < areaPosition.y + areaSize.y;
	}

	getFrogLocationFieldArea() {
		return this.#frogLocationFieldArea;
	}

	draw() {
		this.#areas.forEach(area => area.draw());
	}

	setPosition(position) {
		if(this.#position.equals(position)) {
			return;
		}
		
		this.#position = position;

		this.positionChangedEvent.invoke({position: this.#position, areasList: this.#areas});
	}

	getPosition() {
		return this.#position;
	}

	getSize() {
		const lastArea = this.#areas[this.#areas.length - 1];
		
		return new Point(this.#frogLocationFieldArea.getSize().x, lastArea ? (lastArea.getPosition().y + lastArea.getSize().y) : 0);
	}

	#addArea(area) {
		this.#areas.push(area);
		this.areaAddedEvent.invoke(this.#areas);
	}
}