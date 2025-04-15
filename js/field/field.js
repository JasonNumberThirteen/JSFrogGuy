class Field {
	areaAddedEvent = new GameEvent();
	positionChangedEvent = new GameEvent();
	
	#areas = [];
	#position = new Point();
	#frogLocationFieldArea;

	init() {
		this.#frogLocationFieldArea = new FrogLocationFieldArea(this, 0, NUMBER_OF_FROG_LOCATIONS);
		
		this.#addArea(this.#frogLocationFieldArea);
		this.#addArea(new WaterFieldArea(this, 1, new Point(NUMBER_OF_FROG_LOCATIONS*3, 5)));
		this.#addArea(new WalkwayFieldArea(this, 2, new Point(NUMBER_OF_FROG_LOCATIONS*3, 1)));
		this.#addArea(new StreetFieldArea(this, 3, new Point(NUMBER_OF_FROG_LOCATIONS*3, 5)));
		this.#addArea(new WalkwayFieldArea(this, 4, new Point(NUMBER_OF_FROG_LOCATIONS*3, 1)));
		this.setPosition(new Point(HALF_OF_GAME_WINDOW_WIDTH - this.#frogLocationFieldArea.getWidth()*0.5, HALF_OF_GAME_WINDOW_HEIGHT - this.getHeight()*0.5));
	}

	getAreaOfType(areaType, skips) {
		return this.#areas.filter(area => area.getAreaType() === areaType)[skips || 0];
	}

	positionIsWithinAreaOfType(position, areaType) {
		const area = this.#areas.find(area => area.getAreaType() === areaType);

		if(!VariableMethods.variableIsDefined(area)) {
			return false;
		}

		const areaPosition = area.getPosition();
		const areaSize = area.getSize();

		return position.x >= areaPosition.x && position.x < areaPosition.x + areaSize.x && position.y >= areaPosition.y && position.y < areaPosition.y + areaSize.y;
	}

	reachedAnyOfAvailableDestinations(position) {
		return this.getFrogLocationFieldArea().getFreeFrogLocations().some(frogLocation => this.positionIsSufficientlyCloseToFrogLocationDestination(frogLocation.getDestination(), position));
	}

	positionIsSufficientlyCloseToFrogLocationDestination(destination, position) {
		const destinationPosition = destination.getPosition();
		const differenceInPositionXIsSufficientlySmall = Math.abs(destinationPosition.x - position.x) <= DESTINATION_POSITION_X_THRESHOLD;

		return differenceInPositionXIsSufficientlySmall && destinationPosition.y === position.y;
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

	getX() {
		return this.getPosition().x;
	}

	getY() {
		return this.getPosition().y;
	}

	getPosition() {
		return this.#position;
	}

	getWidth() {
		return this.getSize().x;
	}

	getHeight() {
		return this.getSize().y;
	}

	getSize() {
		const lastArea = this.#areas[this.#areas.length - 1];
		
		return new Point(this.#frogLocationFieldArea.getWidth(), lastArea ? (lastArea.getY() + lastArea.getHeight()) : 0);
	}

	#addArea(area) {
		this.#areas.push(area);
		this.areaAddedEvent.invoke(this.#areas);
	}
}