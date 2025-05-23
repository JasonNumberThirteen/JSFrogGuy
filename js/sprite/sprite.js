class Sprite {
	activeStateChangedEvent = new GameEvent();
	positionChangedEvent = new GameEvent();
	
	#image;
	#position = new Point();
	#isActive = true;
	#collisionRectangleOffset;
	#canvasContext;

	constructor(filename, position, onload) {
		this.setImage(filename, onload);

		if(VariableMethods.variableIsDefined(position)) {
			this.setPosition(position);
		}

		this.setCollisionRectangleOffset(new Rectangle());
	}

	draw() {
		if(!this.isActive()) {
			return;
		}
		
		const position = this.#position;
		
		this.getCanvasContext().drawImage(this.#image, position.x, position.y);
	}

	getImage() {
		return this.#image;
	}
	
	addX(x) {
		this.#position.x += x;
	}

	addY(y) {
		this.#position.y += y;
	}

	getX() {
		return this.#position.x;
	}

	getY() {
		return this.#position.y;
	}

	getPosition() {
		return this.#position;
	}

	getWidth() {
		return this.getSize().x;
	}

	getHeight() {
		return this.getSize().y;
	}

	getSize() {
		const image = this.#image;
		
		return new Point(image.width, image.height);
	}

	getCollisionRectangle() {
		return RectangleMethods.getSumOf(this.getRectangle(), this.#collisionRectangleOffset);
	}

	getCollisionRectangleOffset() {
		return this.#collisionRectangleOffset;
	}

	getRectangle() {
		return new Rectangle(this.getPosition(), this.getSize());
	}

	isActive() {
		return this.#isActive;
	}

	getCanvasContext() {
		this.#canvasContext = this.#canvasContext || FrogGuy.getCanvasContext();

		return this.#canvasContext;
	}

	setImage(filename, onload) {
		this.#image = new Image();
		this.#image.src = filename;

		if(onload) {
			this.#image.onload = () => onload(this);
		}
	}

	setX(x) {
		this.setPosition(new Point(x, this.#position.y));
	}

	setY(y) {
		this.setPosition(new Point(this.#position.x, y));
	}

	setPosition(position) {
		if(VariableMethods.variableIsDefined(this.#position) && this.#position.equals(position)) {
			return;
		}
		
		this.#position = position;

		this.positionChangedEvent.invoke(this.#position);
	}

	setActive(active) {
		this.#isActive = active;

		this.activeStateChangedEvent.invoke(this.#isActive);
	}

	setCollisionRectangleOffset(offset) {
		this.#collisionRectangleOffset = offset;
	}
}