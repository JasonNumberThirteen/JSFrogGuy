class TurtlesMovingSlicedSpritesGroup extends MovingSlicedSpritesGroup {
	constructor(position, movementSpeed, numberOfTurtles) {
		super(position, movementSpeed, false);
		this.setCollisionRectangleOffset(new Rectangle(new Point(1, 1), new Point(-2, -2)));
		
		const sprites = this.getSprites();
		const isHiding = Math.random() < CHANCE_FOR_HIDING_TURTLES_GROUP;
		
		for (let i = 0; i < numberOfTurtles; ++i) {
			sprites.push(new TurtleMovingSlicedSprite(new Point(position.x + i*8, position.y), movementSpeed, isHiding));
		}
	}

	isHidden() {
		return this.getSprites().some(turtle => turtle.isHidden());
	}
}