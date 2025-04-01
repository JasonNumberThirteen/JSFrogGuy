class PlayerInputKeyData {
	#inputKey;
	#movementDirection;
	#animationIndex;

	constructor(inputKey, movementDirection, animationIndex) {
		this.#inputKey = inputKey;
		this.#movementDirection = movementDirection;
		this.#animationIndex = animationIndex;
	}

	getInputKey() {
		return this.#inputKey;
	}

	getMovementDirection() {
		return this.#movementDirection;
	}

	getAnimationIndex() {
		return this.#animationIndex;
	}
}