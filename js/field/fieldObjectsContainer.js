class FieldObjectsContainer {
	#field;
	#playerSlicedSprite;
	#flySprite;
	#availableFieldDestinations = [];
	#savedFrogs;
	#vehicles;
	#woodenLogGroups;
	#turtleGroups;
	#fieldEdgesCover;

	constructor() {
		const objectsGenerator = new ObjectsGenerator();
		
		this.#field = new Field();
		this.#playerSlicedSprite = new PlayerSlicedSprite();
		this.#flySprite = new FlySprite();
		this.#savedFrogs = [];
		this.#vehicles = objectsGenerator.createVehicles();
		this.#woodenLogGroups = objectsGenerator.createWoodenLogGroups();
		this.#turtleGroups = objectsGenerator.createTurtleGroups();
		this.#fieldEdgesCover = new FieldEdgesCover(this.#field);

		this.#addFieldDestinations();
	}

	update(deltaTime) {
		this.#playerSlicedSprite.update(deltaTime);
		this.#flySprite.update(deltaTime);
		this.#vehicles.forEach(vehicle => vehicle.update(deltaTime));
		this.#woodenLogGroups.forEach(woodenLogGroup => woodenLogGroup.update(deltaTime));
		this.#turtleGroups.forEach(turtle => turtle.update(deltaTime));
	}

	draw() {
		this.#field.draw();
		this.#savedFrogs.forEach(savedFrog => savedFrog.draw());
		this.#woodenLogGroups.forEach(woodenLogGroup => woodenLogGroup.draw());
		this.#turtleGroups.forEach(turtle => turtle.draw());
		this.#playerSlicedSprite.draw();
		this.#flySprite.draw();
		this.#vehicles.forEach(vehicle => vehicle.draw());
		this.#fieldEdgesCover.draw();
	}

	getPlayerSlicedSprite() {
		return this.#playerSlicedSprite;
	}

	getFlySprite() {
		return this.#flySprite;
	}

	getSavedFrogs() {
		return this.#savedFrogs;
	}

	getVehicles() {
		return this.#vehicles;
	}

	getWoodenLogGroups() {
		return this.#woodenLogGroups;
	}

	getTurtleGroups() {
		return this.#turtleGroups;
	}

	getAvailableFieldDestinations() {
		return this.#availableFieldDestinations;
	}

	#addFieldDestinations() {
		const fieldPosition = this.#field.getPosition();

		this.#availableFieldDestinations.length = 0;

		for (let i = 0; i < NUMBER_OF_FROG_LOCATIONS; ++i) {
			const fieldDestinationPosition = new Point(fieldPosition.x + 8 + 24*i, fieldPosition.y + 8);
			
			this.#availableFieldDestinations.push(new FieldDestination(fieldDestinationPosition));
		}
	}
}