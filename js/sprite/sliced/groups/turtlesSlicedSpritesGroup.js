class TurtlesSlicedSpritesGroup extends SlicedSpritesGroup {
	constructor(position, movementSpeed) {
		super(position, movementSpeed, false);
		
		const sprites = this.getSprites();
		const isHiding = Math.random() < CHANCE_FOR_HIDING_TURTLES_GROUP;
		
		for (let i = 0; i < 3; ++i) {
			sprites.push(new TurtleSlicedSprite(new Point(position.x + i*8, position.y), movementSpeed, isHiding));
		}
	}

	isHidden() {
		return this.getSprites().some(turtle => turtle.isHidden());
	}

	getRectangle() {
		const position = this.getPosition();
		const size = this.getSize();
		
		return new Rectangle(new Point(position.x + 1, position.y + 1), new Point(size.x - 2, size.y - 2));
	}
}