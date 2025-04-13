class FieldObjectsContainer {
	#player;
	#flySprite;
	#fieldEdgesCover;
	#fieldObjectsGroups;

	constructor(field) {
		this.#player = new Player(field);
		this.#flySprite = new FlySprite();
		this.#fieldEdgesCover = new FieldEdgesCover(field);
		this.#fieldObjectsGroups = new FieldObjectsGroups();
	}

	update(deltaTime) {
		this.#player.update(deltaTime);
		this.#flySprite.update(deltaTime);
		this.#fieldObjectsGroups.update(deltaTime);
	}

	draw() {
		this.#fieldObjectsGroups.drawGroupOfType(FieldObjectsGroupType.WoodenLogs);
		this.#fieldObjectsGroups.drawGroupOfType(FieldObjectsGroupType.Turtles);
		this.#player.draw();
		this.#flySprite.draw();
		this.#fieldObjectsGroups.drawGroupOfType(FieldObjectsGroupType.Vehicles);
		this.#fieldEdgesCover.draw();
	}

	getPlayer() {
		return this.#player;
	}

	getFlySprite() {
		return this.#flySprite;
	}

	getFieldObjectsGroups() {
		return this.#fieldObjectsGroups;
	}
}