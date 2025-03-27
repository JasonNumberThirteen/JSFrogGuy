class Timer {
	timerFinishedEvent = new GameEvent();
	
	#duration;
	#currentTime;
	#timerWasStarted;
	#timerWasFinished;

	constructor(duration) {
		this.startTimerWithSetDuration(duration);
	}

	startTimerWithSetDuration(duration) {
		this.setDuration(duration);
		this.startTimer();
	}

	startTimer() {
		this.setAsFinished(false);
	}

	update(deltaTime) {
		if(!this.#timerWasStarted) {
			return;
		}

		if(this.#currentTime < this.#duration) {
			this.#currentTime += deltaTime;
		} else if(!this.#timerWasFinished) {
			this.#finish();
		}
	}

	setAsFinished(finished) {
		this.#currentTime = finished ? this.#duration : 0;
		this.#timerWasStarted = !finished;
		this.#timerWasFinished = finished;
	}

	setDuration(duration) {
		this.#duration = duration;
	}

	getDuration() {
		return this.#duration;
	}

	getProgressPercent() {
		return this.#duration > 0 ? this.#currentTime / this.#duration : 0;
	}

	timerWasStarted() {
		return this.#timerWasStarted;
	}

	timerWasFinished() {
		return this.#timerWasFinished;
	}

	#finish() {
		this.setAsFinished(true);
		this.timerFinishedEvent.invoke();
	}
}