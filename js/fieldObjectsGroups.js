class FieldObjectsGroups {
	#groups = [];

	constructor() {
		const objectsGenerator = new ObjectsGenerator();
		
		this.#groups.push(objectsGenerator.createVehicles());
		this.#groups.push(objectsGenerator.createWoodenLogs());
		this.#groups.push(objectsGenerator.createTurtles());
	}

	getGroupOfType(groupType) {
		return this.#groups.find(group => group.getGroupType() === groupType);
	}

	rectangleIntersectsWithGroupOfType(groupType, rectangle) {
		const group = this.getGroupOfType(groupType);

		return VariableMethods.variableIsDefined(group) && group.rectangleIntersectsWithAnyElement(rectangle);
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