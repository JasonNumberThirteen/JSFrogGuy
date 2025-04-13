class TurtlesFieldObjectsGroup extends FieldObjectsGroup {
	constructor() {
		super(FieldObjectsGroupType.Turtles);
	}
	
	rectangleIntersectsWithAnyElement(rectangle) {
		return this.getElements().some(element => !element.isHidden() && rectangle.intersectsWith(element.getRectangle()));
	}
}