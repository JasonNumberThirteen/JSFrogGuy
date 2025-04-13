class FieldObjectsGroup {
	#groupType;
	#elements = [];

	constructor(groupType) {
		this.#groupType = groupType;
	}

	getGroupType() {
		return this.#groupType;
	}

	getElements() {
		return this.#elements;
	}

	push(element) {
		this.#elements.push(element);
	}

	update(deltaTime) {
		this.#elements.forEach(element => element.update(deltaTime));
	}

	draw() {
		this.#elements.forEach(element => element.draw());
	}

	rectangleIntersectsWithAnyElement(rectangle) {
		return this.#elements.some(element => rectangle.intersectsWith(element.getRectangle()));
	}
}