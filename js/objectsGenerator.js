class ObjectsGenerator {
	createVehicles() {
		const vehicles = [];

		vehicles.push(new VehicleAnimatedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124, 112), 0, 8, 8, 7, false));
		vehicles.push(new VehicleAnimatedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124, 104), 1, 8, 8, 8, true));
		vehicles.push(new VehicleAnimatedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124, 96), 2, 8, 8, 9, false));
		vehicles.push(new VehicleAnimatedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124, 88), 3, 8, 8, 10, true));
		vehicles.push(new VehicleAnimatedSprite(VEHICLES_SPRITE_SHEET_FILENAME, new Point(124, 80), 2, 16, 8, 12, false));

		return vehicles;
	}
}