class RectangleMethods {
	static getSumOf(rectangleA, rectangleB) {
		const position = PositionMethods.getSumOf(rectangleA.getPosition(), rectangleB.getPosition());
		const size = PositionMethods.getSumOf(rectangleA.getSize(), rectangleB.getSize());
		
		return new Rectangle(position, size);
	}
}