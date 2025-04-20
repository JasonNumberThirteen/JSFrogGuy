class FieldObjectsGroups {
	#groups = [];

	constructor(field) {
		const fieldObjectsGroupsFactory = new FieldObjectsGroupsFactory(field);
		
		this.#groups.push(fieldObjectsGroupsFactory.createVehicles());
		this.#groups.push(fieldObjectsGroupsFactory.createWoodenLogs());
		this.#groups.push(fieldObjectsGroupsFactory.createTurtlesGroups());
	}

	getGroupOfType(groupType) {
		return this.#groups.find(group => group.getGroupType() === groupType);
	}

	rectangleIntersectsWithGroupOfType(groupType, rectangle) {
		const group = this.getGroupOfType(groupType);

		return VariableMethods.variableIsDefined(group) && group.collisionRectangleIntersectsWithAnyElement(rectangle);
	}

	update(deltaTime) {
		this.#groups.forEach(group => group.update(deltaTime));
	}

	drawGroupOfType(groupType) {
		const group = this.getGroupOfType(groupType);

		if(VariableMethods.variableIsDefined(group)) {
			group.draw();
		}
	}
}