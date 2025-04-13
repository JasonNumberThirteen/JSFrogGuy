class ObjectsGenerator {
	createVehicles() {
		const vehicles = new FieldObjectsGroup(FieldObjectsGroupType.Vehicles);

		for (let i = 0; i < 3; ++i) {
			vehicles.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124 + 40*i, 112), 0, VEHICLE_SPRITES_DIMENSIONS[0], 7, false));
		}

		for (let i = 0; i < 3; ++i) {
			vehicles.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(160 + 32*i, 104), 1, VEHICLE_SPRITES_DIMENSIONS[1], 8, true));
		}

		for (let i = 0; i < 3; ++i) {
			vehicles.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(80 + 32*i, 96), 2, VEHICLE_SPRITES_DIMENSIONS[2], 9, false));
		}

		for (let i = 0; i < 1; ++i) {
			vehicles.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(68 + 32*i, 88), 3, VEHICLE_SPRITES_DIMENSIONS[3], 10, true));
		}

		for (let i = 0; i < 2; ++i) {
			vehicles.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124 + 40*i, 80), 2, VEHICLE_SPRITES_DIMENSIONS[4], 12, false));
		}

		return vehicles;
	}

	createWoodenLogs() {
		const woodenLogGroups = new FieldObjectsGroup(FieldObjectsGroupType.WoodenLogs);

		for (let i = 0; i < 3; ++i) {
			woodenLogGroups.push(new WoodenLogMovingSlicedSpritesGroup(new Point(8 + 48*i, 56), 10, 1));
		}

		for (let i = 0; i < 1; ++i) {
			woodenLogGroups.push(new WoodenLogMovingSlicedSpritesGroup(new Point(24 + 48*i, 48), 20, 3));
		}

		for (let i = 0; i < 3; ++i) {
			woodenLogGroups.push(new WoodenLogMovingSlicedSpritesGroup(new Point(24 + 48*i, 32), 18, 2));
		}

		return woodenLogGroups;
	}

	createTurtles() {
		const turtleGroups = new TurtlesFieldObjectsGroup();

		turtleGroups.push(new TurtlesMovingSlicedSpritesGroup(new Point(128, 64), 20));
		turtleGroups.push(new TurtlesMovingSlicedSpritesGroup(new Point(128, 40), 30));

		return turtleGroups;
	}
}