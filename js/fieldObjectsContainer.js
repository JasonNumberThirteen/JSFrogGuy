class FieldObjectsContainer {
	#fieldSprite;
	#playerSlicedSprite;
	#flySprite;
	#availableFieldDestinations;
	#savedFrogs;
	#vehicles;
	#woodenLogGroups;
	#turtleGroups;
	#fieldEdgesCover;

	constructor() {
		const objectsGenerator = new ObjectsGenerator();
		
		this.#fieldSprite = new Sprite(FIELD_SPRITE_FILENAME, new Point(), this.#onFieldSpriteLoad.bind(this));
		this.#playerSlicedSprite = new PlayerSlicedSprite();
		this.#flySprite = new FlySprite();
		this.#savedFrogs = [];
		this.#vehicles = objectsGenerator.createVehicles();
		this.#woodenLogGroups = objectsGenerator.createWoodenLogGroups();
		this.#turtleGroups = objectsGenerator.createTurtleGroups();
		this.#fieldEdgesCover = new FieldEdgesCover(this.#fieldSprite);
	}

	update(deltaTime) {
		this.#playerSlicedSprite.update(deltaTime);
		this.#flySprite.update(deltaTime);
		this.#vehicles.forEach(vehicle => vehicle.update(deltaTime));
		this.#woodenLogGroups.forEach(woodenLogGroup => woodenLogGroup.update(deltaTime));
		this.#turtleGroups.forEach(turtle => turtle.update(deltaTime));
	}

	draw() {
		this.#fieldSprite.draw();
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

	#onFieldSpriteLoad(sprite) {
		const image = sprite.getImage();
		const x = HALF_OF_GAME_WINDOW_WIDTH - image.width*0.5;
		const y = HALF_OF_GAME_WINDOW_HEIGHT - image.height*0.5;
		
		this.#fieldSprite.setPosition(new Point(x, y));

		this.#availableFieldDestinations = [new FieldDestination(new Point(x + 8, y + 8)), new FieldDestination(new Point(x + 32, y + 8)), new FieldDestination(new Point(x + 56, y + 8)), new FieldDestination(new Point(x + 80, y + 8)), new FieldDestination(new Point(x + 104, y + 8))];
	}
}