class TurtlesFieldObjectsGroup extends FieldObjectsGroup {
	constructor() {
		super(FieldObjectsGroupType.Turtles);
	}
	
	collisionRectangleIntersectsWithAnyElement(rectangle) {
		return this.getElements().some(element => !element.isHidden() && rectangle.intersectsWith(element.getCollisionRectangle()));
	}
}