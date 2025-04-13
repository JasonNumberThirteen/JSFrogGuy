class Player {
	#lives;
	#sprite;
	#field;
	#gameScene;

	constructor(field) {
		this.#lives = new PlayerLives(PLAYER_INITIAL_LIVES);
		this.#sprite = new PlayerSlicedSprite(this, field);
		this.#field = field;
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
	}

	getLives() {
		return this.#lives;
	}

	getSprite() {
		return this.#sprite;
	}

	update(deltaTime) {
		this.#sprite.update(deltaTime);
	}

	draw() {
		this.#sprite.draw();
	}

	isStandingOnHazardousPosition() {
		return this.positionIsHazardous(this.getSprite().getRectangle());
	}

	positionIsHazardous(rectangle) {
		const fieldObjectsGroups = this.#gameScene.getFieldObjectsContainer().getFieldObjectsGroups();
		const playerIsStandingOnWater = this.#field.positionIsWithinAreaOfType(rectangle.getPosition(), FieldAreaType.WATER) && !fieldObjectsGroups.rectangleIntersectsWithGroupOfType(FieldObjectsGroupType.WoodenLogs, rectangle) && !fieldObjectsGroups.rectangleIntersectsWithGroupOfType(FieldObjectsGroupType.Turtles, rectangle);

		return fieldObjectsGroups.rectangleIntersectsWithGroupOfType(FieldObjectsGroupType.Vehicles, rectangle) || playerIsStandingOnWater;
	}

	getObjectOnRiverOnPlayerPositionIfPossible() {
		const fieldObjectsGroups = this.#gameScene.getFieldObjectsContainer().getFieldObjectsGroups();
		const objectsOnWater = fieldObjectsGroups.getGroupOfType(FieldObjectsGroupType.WoodenLogs).getElements().slice();
		const playerSpriteRectangle = this.getSprite().getRectangle();

		fieldObjectsGroups.getGroupOfType(FieldObjectsGroupType.Turtles).getElements().forEach(element => objectsOnWater.push(element));

		return objectsOnWater.find(objectOnWater => playerSpriteRectangle.intersectsWith(objectOnWater.getRectangle()));
	}
}