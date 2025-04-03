class ObjectsGenerator {
	createVehicles() {
		const vehicles = [];

		for (let i = 0; i < 3; ++i) {
			vehicles.push(new VehicleAnimatedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124 + 40*i, 112), 0, 8, 8, 7, false));
		}

		for (let i = 0; i < 3; ++i) {
			vehicles.push(new VehicleAnimatedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(160 + 32*i, 104), 1, 8, 8, 8, true));
		}

		for (let i = 0; i < 3; ++i) {
			vehicles.push(new VehicleAnimatedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(80 + 32*i, 96), 2, 8, 8, 9, false));
		}

		for (let i = 0; i < 1; ++i) {
			vehicles.push(new VehicleAnimatedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(68 + 32*i, 88), 3, 8, 8, 10, true));
		}

		for (let i = 0; i < 2; ++i) {
			vehicles.push(new VehicleAnimatedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124 + 40*i, 80), 2, 16, 8, 12, false));
		}

		return vehicles;
	}

	createWoodenLogs() {
		const woodenLogs = [];

		woodenLogs.push(new WoodenLogSprite(new Point(128, 56), 10));
		woodenLogs.push(new WoodenLogSprite(new Point(128, 48), 16));
		woodenLogs.push(new WoodenLogSprite(new Point(128, 32), 18));

		return woodenLogs;
	}

	createTurtleGroups() {
		const turtleGroups = [];

		turtleGroups.push(new TurtlesAnimatedSpritesGroup(new Point(128, 64), 20));
		turtleGroups.push(new TurtlesAnimatedSpritesGroup(new Point(128, 40), 30));

		return turtleGroups;
	}
}