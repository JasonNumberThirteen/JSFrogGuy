class Player {
	#input;
	#lives;
	#sprite;
	#field;
	#gameScene;

	constructor(field) {
		this.#input = new PlayerInput(this);
		this.#lives = new PlayerLives(PLAYER_INITIAL_LIVES);
		this.#sprite = new PlayerSlicedSprite(this, field);
		this.#field = field;
		this.#gameScene = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY);
	}

	isActive() {
		return this.#sprite.isActive();
	}

	getInput() {
		return this.#input;
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

	processInput(key) {
		this.#input.processInput(key);
	}

	isStandingOnHazardousPosition() {
		return this.positionIsHazardous(this.getSprite().getCollisionRectangle());
	}

	positionIsHazardous(rectangle) {
		const fieldObjectsGroups = this.#gameScene.getFieldObjectsContainer().getFieldObjectsGroups();
		const playerIsStandingOnWater = this.#field.positionIsWithinAreaOfType(rectangle.getPosition(), FieldAreaType.WATER) && !fieldObjectsGroups.rectangleIntersectsWithGroupOfType(FieldObjectsGroupType.WoodenLogs, rectangle) && !fieldObjectsGroups.rectangleIntersectsWithGroupOfType(FieldObjectsGroupType.Turtles, rectangle);

		return fieldObjectsGroups.rectangleIntersectsWithGroupOfType(FieldObjectsGroupType.Vehicles, rectangle) || playerIsStandingOnWater;
	}

	getObjectOnRiverOnPlayerPositionIfPossible() {
		const fieldObjectsGroups = this.#gameScene.getFieldObjectsContainer().getFieldObjectsGroups();
		const objectsOnWater = fieldObjectsGroups.getGroupOfType(FieldObjectsGroupType.WoodenLogs).getElements().slice();
		const playerSpriteRectangle = this.getSprite().getCollisionRectangle();

		fieldObjectsGroups.getGroupOfType(FieldObjectsGroupType.Turtles).getElements().forEach(element => objectsOnWater.push(element));

		return objectsOnWater.find(objectOnWater => playerSpriteRectangle.intersectsWith(objectOnWater.getCollisionRectangle()));
	}
}