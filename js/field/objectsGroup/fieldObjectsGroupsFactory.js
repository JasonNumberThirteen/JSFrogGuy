class FieldObjectsGroupsFactory {
	#field;

	constructor(field) {
		this.#field = field;
	}
	
	createVehicles() {
		const vehiclesGroup = new FieldObjectsGroup(FieldObjectsGroupType.Vehicles);
		const fieldPositionX = this.#field.getX();

		for (let i = 1; i <= 2; ++i) {
			vehiclesGroup.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(fieldPositionX + 64 + 48*(i - 1), 80), 2, VEHICLE_SPRITES_DIMENSIONS[4], 12, false));
		}

		for (let i = 1; i <= 1; ++i) {
			vehiclesGroup.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(fieldPositionX - 8 + 48*(i - 1), 88), 3, VEHICLE_SPRITES_DIMENSIONS[3], 10, true));
		}

		for (let i = 1; i <= 3; ++i) {
			vehiclesGroup.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(fieldPositionX + 48 + 32*(i - 1), 96), 2, VEHICLE_SPRITES_DIMENSIONS[2], 9, false));
		}

		for (let i = 1; i <= 3; ++i) {
			vehiclesGroup.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(fieldPositionX + 48 + 32*(i - 1), 104), 1, VEHICLE_SPRITES_DIMENSIONS[1], 8, true));
		}

		for (let i = 1; i <= 3; ++i) {
			vehiclesGroup.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(fieldPositionX + 40 + 36*(i - 1), 112), 0, VEHICLE_SPRITES_DIMENSIONS[0], 7, false));
		}

		return vehiclesGroup;
	}

	createWoodenLogs() {
		const woodenLogsGroup = new FieldObjectsGroup(FieldObjectsGroupType.WoodenLogs);
		const fieldPositionX = this.#field.getX();

		for (let i = 1; i <= 3; ++i) {
			woodenLogsGroup.push(new WoodenLogMovingSlicedSpritesGroup(new Point(fieldPositionX + 2 + 46*(i - 1), 32), 18, 2));
		}

		for (let i = 1; i <= 2; ++i) {
			woodenLogsGroup.push(new WoodenLogMovingSlicedSpritesGroup(new Point(fieldPositionX + 12 + 72*(i - 1), 48), 20, 4));
		}

		for (let i = 1; i <= 3; ++i) {
			woodenLogsGroup.push(new WoodenLogMovingSlicedSpritesGroup(new Point(fieldPositionX + 20 + 48*(i - 1), 56), 10, 1));
		}

		return woodenLogsGroup;
	}

	createTurtles() {
		const turtleGroup = new TurtlesFieldObjectsGroup();
		const fieldPositionX = this.#field.getX();

		for (let i = 1; i <= 4; ++i) {
			turtleGroup.push(new TurtlesMovingSlicedSpritesGroup(new Point(fieldPositionX + 24 + 32*(i - 1), 40), 30, 2));
		}

		for (let i = 1; i <= 4; ++i) {
			turtleGroup.push(new TurtlesMovingSlicedSpritesGroup(new Point(fieldPositionX + 32*(i - 1), 64), 20, 3));
		}

		return turtleGroup;
	}
}