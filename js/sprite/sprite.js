class Sprite {
	activeStateChangedEvent = new GameEvent();
	
	#image;
	#position;
	#isActive = true;
	#canvasContext;

	constructor(filename, position, onload) {
		this.setImage(filename, onload);
		this.setPosition(position);
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

	getPosition() {
		return this.#position;
	}

	getSize() {
		const image = this.#image;
		
		return new Point(image.width, image.height);
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
			this.#image.onload = () => onload(this.#image);
		}
	}

	setPosition(position) {
		this.#position = position;
	}

	setActive(active) {
		this.#isActive = active;

		this.activeStateChangedEvent.invoke(this.#isActive);
	}
}