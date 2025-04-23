class Timer {
	timerFinishedEvent = new GameEvent();
	
	#duration = 0;
	#currentTime = 0;
	#timerWasStarted = false;
	#timerWasFinished = false;
	#isPaused = false;

	constructor(duration, startImmediately) {
		duration = duration || 0;
		startImmediately = VariableMethods.variableIsDefined(startImmediately) ? startImmediately : true;
		
		if(startImmediately) {
			this.startTimerWithSetDuration(duration);
		} else {
			this.setDuration(duration);
		}
	}

	startTimerWithSetDuration(duration) {
		this.setDuration(duration);
		this.startTimer();
	}

	startTimer() {
		this.setAsFinished(false);
	}

	update(deltaTime) {
		if(!this.#timerWasStarted || this.#isPaused) {
			return;
		}

		if(this.#currentTime < this.#duration) {
			this.#currentTime = MathMethods.clamp(this.#currentTime + deltaTime, 0, this.#duration);
		} else if(!this.#timerWasFinished) {
			this.#finish();
		}
	}

	setAsFinished(finished) {
		this.#currentTime = finished ? this.#duration : 0;
		this.#timerWasStarted = !finished;
		this.#timerWasFinished = finished;

		this.setAsPaused(false);
	}

	setDuration(duration) {
		this.#duration = duration;
	}

	setAsPaused(isPaused) {
		this.#isPaused = isPaused;
	}

	getDuration() {
		return this.#duration;
	}

	getCurrentTime() {
		return this.#currentTime;
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