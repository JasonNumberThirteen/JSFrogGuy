class FieldObjectsGroupsFactory {
	#field;
	#vehiclesGroup;
	#woodenLogsGroup;
	#turtlesGroups;

	constructor(field) {
		this.#field = field;
	}
	
	createVehicles() {
		this.#vehiclesGroup = new FieldObjectsGroup(FieldObjectsGroupType.Vehicles);
		
		this.#createVehiclesRow(0, 2, 8, 6, 2, 4, 12, false);
		this.#createVehiclesRow(1, 1, -1, 6, 3, 3, 10, true);
		this.#createVehiclesRow(2, 3, 6, 4, 2, 2, 9, false);
		this.#createVehiclesRow(3, 3, 6, 4, 1, 1, 8, true);
		this.#createVehiclesRow(4, 3, 5, 4.5, 0, 0, 7, false);

		return this.#vehiclesGroup;
	}

	createWoodenLogs() {
		this.#woodenLogsGroup = new FieldObjectsGroup(FieldObjectsGroupType.WoodenLogs);
		
		this.#createWoodenLogsRow(0, 3, 2, 0.25, 5.75, 18);
		this.#createWoodenLogsRow(2, 2, 4, 1.5, 9, 20);
		this.#createWoodenLogsRow(3, 3, 1, 2.5, 6, 10);

		return this.#woodenLogsGroup;
	}

	createTurtlesGroups() {
		this.#turtlesGroups = new TurtlesFieldObjectsGroup();

		this.#createTurtlesGroupRow(1, 4, 2, 3, 4, 30);
		this.#createTurtlesGroupRow(4, 4, 3, 0, 4, 20);

		return this.#turtlesGroups;
	}

	#createVehiclesRow(offsetInRows, numberOfVehicles, offsetFromLeftSideInTiles, offsetPerVehicleInTiles, animationColumnIndex, spriteSheetIndex, movementSpeed, isMovingRight) {
		const streetFieldArea = this.#field.getAreaOfType(FieldAreaType.Street);

		if(!VariableMethods.variableIsDefined(streetFieldArea)) {
			return;
		}

		for (let i = 1; i <= numberOfVehicles; ++i) {
			const tileWidth = streetFieldArea.getTileWidth();
			const offsetPerVehicle = tileWidth*offsetPerVehicleInTiles;
			const x = streetFieldArea.getX() + offsetFromLeftSideInTiles*tileWidth + offsetPerVehicle*(i - 1);
			const position = new Point(x, streetFieldArea.getY(offsetInRows));
			const sprite = new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, position, animationColumnIndex, VEHICLE_SPRITES_DIMENSIONS[spriteSheetIndex], movementSpeed, isMovingRight);

			this.#vehiclesGroup.push(sprite);
		}
	}

	#createWoodenLogsRow(offsetInRows, numberOfWoodenLogsInRow, numberOfMiddleSegments, offsetFromLeftSideInTiles, offsetPerWoodenLogInTiles, movementSpeed) {
		const waterFieldArea = this.#field.getAreaOfType(FieldAreaType.Water);

		if(!VariableMethods.variableIsDefined(waterFieldArea)) {
			return;
		}

		for (let i = 1; i <= numberOfWoodenLogsInRow; ++i) {
			const tileWidth = waterFieldArea.getTileWidth();
			const offsetPerWoodenLog = tileWidth*offsetPerWoodenLogInTiles;
			const x = waterFieldArea.getX() + offsetFromLeftSideInTiles*tileWidth + offsetPerWoodenLog*(i - 1);
			const position = new Point(x, waterFieldArea.getY(offsetInRows));
			
			this.#woodenLogsGroup.push(new WoodenLogMovingSlicedSpritesGroup(position, movementSpeed, numberOfMiddleSegments));
		}
	}

	#createTurtlesGroupRow(offsetInRows, numberOfTurtleGroupsInRow, numberOfTurtlesInGroup, offsetFromLeftSideInTiles, offsetPerTurtleGroupInTiles, movementSpeed) {
		const waterFieldArea = this.#field.getAreaOfType(FieldAreaType.Water);

		if(!VariableMethods.variableIsDefined(waterFieldArea)) {
			return;
		}

		for (let i = 1; i <= numberOfTurtleGroupsInRow; ++i) {
			const tileWidth = waterFieldArea.getTileWidth();
			const offsetPerTurtleGroup = tileWidth*offsetPerTurtleGroupInTiles;
			const x = waterFieldArea.getX() + offsetFromLeftSideInTiles*tileWidth + offsetPerTurtleGroup*(i - 1);
			const position = new Point(x, waterFieldArea.getY(offsetInRows));
			
			this.#turtlesGroups.push(new TurtlesMovingSlicedSpritesGroup(position, movementSpeed, numberOfTurtlesInGroup));
		}
	}
}