class FieldObjectsContainer {
	#playerSlicedSprite;
	#flySprite;
	#vehicles;
	#woodenLogGroups;
	#turtleGroups;
	#fieldEdgesCover;

	constructor(field) {
		const objectsGenerator = new ObjectsGenerator();
		
		this.#playerSlicedSprite = new PlayerSlicedSprite(field);
		this.#flySprite = new FlySprite();
		this.#vehicles = objectsGenerator.createVehicles();
		this.#woodenLogGroups = objectsGenerator.createWoodenLogGroups();
		this.#turtleGroups = objectsGenerator.createTurtleGroups();
		this.#fieldEdgesCover = new FieldEdgesCover(field);
	}

	update(deltaTime) {
		this.#playerSlicedSprite.update(deltaTime);
		this.#flySprite.update(deltaTime);
		this.#vehicles.forEach(vehicle => vehicle.update(deltaTime));
		this.#woodenLogGroups.forEach(woodenLogGroup => woodenLogGroup.update(deltaTime));
		this.#turtleGroups.forEach(turtle => turtle.update(deltaTime));
	}

	draw() {
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

	getVehicles() {
		return this.#vehicles;
	}

	getWoodenLogGroups() {
		return this.#woodenLogGroups;
	}

	getTurtleGroups() {
		return this.#turtleGroups;
	}
}