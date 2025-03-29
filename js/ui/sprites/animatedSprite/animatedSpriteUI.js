class AnimatedSpriteUI extends SpriteUI {
	#frameWidth;
	#frameHeight;
	
	constructor(filename, position, frameWidth, frameHeight) {
		super(filename, position);

		this.#frameWidth = frameWidth;
		this.#frameHeight = frameHeight;
	}

	draw() {
		const currentFrameIndex = 0;
		const frameWidth = this.#frameWidth;
		const frameHeight = this.#frameHeight;
		const position = this.getPosition();

		this.getCanvasContext().drawImage(this.getImage(), currentFrameIndex*frameWidth, currentFrameIndex*frameHeight, frameWidth, frameHeight, position.x, position.y, frameWidth, frameHeight);
	}
}