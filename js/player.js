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

	playerIsStandingOnHazardousPosition(position) {
		const playerPosition = position || this.getSprite().getPosition();
		const playerIsStandingOnWater = this.#field.positionIsWithinAreaOfType(playerPosition, FieldAreaType.WATER) && !this.playerIntersectsWithAnyWoodenLogGroup(position) && !this.playerIntersectsWithAnyTurtlesGroup(position);

		return this.playerIntersectsWithAnyVehicle(position) || playerIsStandingOnWater;
	}

	playerIntersectsWithAnyVehicle(position) {
		const rectangle = this.getSprite().getRectangle();

		if(VariableMethods.variableIsDefined(position)) {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#gameScene.getFieldObjectsContainer().getVehicles().some(vehicle => rectangle.intersectsWith(vehicle.getRectangle()));
	}

	playerIntersectsWithAnyWoodenLogGroup(position) {
		const rectangle = this.getSprite().getRectangle();

		if(VariableMethods.variableIsDefined(position)) {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#gameScene.getFieldObjectsContainer().getWoodenLogGroups().some(woodenLogGroup => rectangle.intersectsWith(woodenLogGroup.getRectangle()));
	}

	playerIntersectsWithAnyTurtlesGroup(position) {
		const rectangle = this.getSprite().getRectangle();

		if(VariableMethods.variableIsDefined(position)) {
			rectangle.getPosition().x = position.x;
			rectangle.getPosition().y = position.y;
		}
		
		return this.#gameScene.getFieldObjectsContainer().getTurtleGroups().some(turtleGroup => !turtleGroup.isHidden() && rectangle.intersectsWith(turtleGroup.getRectangle()));
	}

	getObjectOnRiverOnPlayerPositionIfPossible() {
		const fieldObjectsContainer = this.#gameScene.getFieldObjectsContainer();
		const objectsOnRiver = fieldObjectsContainer.getWoodenLogGroups().slice();

		fieldObjectsContainer.getTurtleGroups().forEach(turtleGroup => objectsOnRiver.push(turtleGroup));
		
		return objectsOnRiver.find(objectOnRiver => this.getSprite().getRectangle().intersectsWith(objectOnRiver.getRectangle()));
	}
}