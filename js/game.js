class Game {
	#canvas;
	#previousTimeStamp = 0;

	constructor() {
		this.#canvas = new Canvas();
		
		this.#refresh();
	}

	#update(timeStamp) {
		const ms = 1000 / GAME_FPS;
		const timeStampsDifference = timeStamp - this.#previousTimeStamp;
		let dt = timeStampsDifference*0.001;

		if(timeStampsDifference >= ms) {
			this.#previousTimeStamp = timeStamp;

			this.#canvas.update(dt);
		}

		this.#refresh();
	}

	#refresh() {
		window.requestAnimationFrame(this.#update.bind(this));
	}
}