class Rectangle {
	#position;
	#size;

	constructor(position, size) {
		this.#position = position;
		this.#size = size;
	}

	intersectsWith(rectangle) {
		const thisRectanglePosition = this.getPosition();
		const thisRectangleSize = this.getSize();
		const thisRectangleTopRightCorner = thisRectanglePosition.x + thisRectangleSize.x;
		const thisRectangleBottomLeftCorner = thisRectanglePosition.y + thisRectangleSize.y;
		const otherRectanglePosition = rectangle.getPosition();
		const otherRectangleSize = rectangle.getSize();
		const otherRectangleTopRightCorner = otherRectanglePosition.x + otherRectangleSize.x;
		const otherRectangleBottomLeftCorner = otherRectanglePosition.y + otherRectangleSize.y;

		return thisRectanglePosition.x <= otherRectangleTopRightCorner && thisRectangleTopRightCorner >= otherRectanglePosition.x && thisRectanglePosition.y <= otherRectangleBottomLeftCorner && thisRectangleBottomLeftCorner >= otherRectanglePosition.y;
	}

	getPosition() {
		return this.#position;
	}

	getSize() {
		return this.#size;
	}
}