class Game {
	#canvas;
	
	constructor() {
		this.#canvas = new Canvas();
		
		this.#refresh();
	}

	#update(timeStamp) {
		this.#canvas.update(timeStamp);
		this.#refresh();
	}

	#refresh() {
		window.requestAnimationFrame(this.#update.bind(this));
	}
}