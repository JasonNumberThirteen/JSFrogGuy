class Sound {
	#filename;
	#duration;
	#playWithoutWaitingToFinish;
	#cachedAudio;
	
	constructor(filename, duration, playWithoutWaitingToFinish) {
		playWithoutWaitingToFinish = playWithoutWaitingToFinish || false;

		this.#filename = filename;
		this.#duration = duration;
		this.#playWithoutWaitingToFinish = playWithoutWaitingToFinish;

		if(!this.#playWithoutWaitingToFinish) {
			this.#cachedAudio = new Audio(filename);
		}
	}

	getDuration() {
		return this.#duration;
	}

	playSound() {
		if(this.#playWithoutWaitingToFinish) {
			this.#createAudioInstanceAndPlay();
		} else {
			this.#cachedAudio.play();
		}
	}

	#createAudioInstanceAndPlay() {
		const file = new Audio(this.#filename);

		if(VariableMethods.variableIsDefined(file)) {
			file.play();
		}
	}
}