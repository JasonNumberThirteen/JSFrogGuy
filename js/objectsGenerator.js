class ObjectsGenerator {
	createVehicles() {
		const vehicles = [];

		for (let i = 0; i < 3; ++i) {
			vehicles.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124 + 40*i, 112), 0, 8, 8, 7, false));
		}

		for (let i = 0; i < 3; ++i) {
			vehicles.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(160 + 32*i, 104), 1, 8, 8, 8, true));
		}

		for (let i = 0; i < 3; ++i) {
			vehicles.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(80 + 32*i, 96), 2, 8, 8, 9, false));
		}

		for (let i = 0; i < 1; ++i) {
			vehicles.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(68 + 32*i, 88), 3, 8, 8, 10, true));
		}

		for (let i = 0; i < 2; ++i) {
			vehicles.push(new VehicleMovingSlicedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124 + 40*i, 80), 2, 16, 8, 12, false));
		}

		return vehicles;
	}

	createWoodenLogGroups() {
		const woodenLogGroups = [];

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

	createTurtleGroups() {
		const turtleGroups = [];

		turtleGroups.push(new TurtlesMovingSlicedSpritesGroup(new Point(128, 64), 20));
		turtleGroups.push(new TurtlesMovingSlicedSpritesGroup(new Point(128, 40), 30));

		return turtleGroups;
	}
}