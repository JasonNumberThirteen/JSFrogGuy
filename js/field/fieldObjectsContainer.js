class FieldObjectsContainer {
	#player;
	#flySprite;
	#vehicles;
	#woodenLogGroups;
	#turtleGroups;
	#fieldEdgesCover;

	constructor(field) {
		const objectsGenerator = new ObjectsGenerator();
		
		this.#player = new Player(field);
		this.#flySprite = new FlySprite();
		this.#vehicles = objectsGenerator.createVehicles();
		this.#woodenLogGroups = objectsGenerator.createWoodenLogGroups();
		this.#turtleGroups = objectsGenerator.createTurtleGroups();
		this.#fieldEdgesCover = new FieldEdgesCover(field);
	}

	update(deltaTime) {
		this.#player.update(deltaTime);
		this.#flySprite.update(deltaTime);
		this.#vehicles.forEach(vehicle => vehicle.update(deltaTime));
		this.#woodenLogGroups.forEach(woodenLogGroup => woodenLogGroup.update(deltaTime));
		this.#turtleGroups.forEach(turtle => turtle.update(deltaTime));
	}

	draw() {
		this.#woodenLogGroups.forEach(woodenLogGroup => woodenLogGroup.draw());
		this.#turtleGroups.forEach(turtle => turtle.draw());
		this.#player.draw();
		this.#flySprite.draw();
		this.#vehicles.forEach(vehicle => vehicle.draw());
		this.#fieldEdgesCover.draw();
	}

	getPlayer() {
		return this.#player;
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