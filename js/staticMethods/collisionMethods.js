class CollisionMethods {
	static rectanglesIntersectWithEachOther(rectangleA, rectangleB) {
		const rectangleAPosition = rectangleA.getPosition();
		const rectangleASize = rectangleA.getSize();
		const rectangleBPosition = rectangleB.getPosition();
		const rectangleBSize = rectangleB.getSize();

		return rectangleAPosition.x <= (rectangleBPosition.x + rectangleBSize.x) && (rectangleAPosition.x + rectangleASize.x) >= rectangleBPosition.x &&
		rectangleAPosition.y <= (rectangleBPosition.y + rectangleBSize.y) && (rectangleAPosition.y + rectangleASize.y) >= rectangleBPosition.y;
	}
}