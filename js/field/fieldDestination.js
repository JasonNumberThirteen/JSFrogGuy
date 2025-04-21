class FieldDestination {
	#isTaken = false;
	#localPosition;
	#savedFrogSprite;
	#field;

	constructor(localPosition) {
		this.#localPosition = localPosition;
		this.#savedFrogSprite = new SavedFrogSprite(this.getPosition());
	}

	setAsTaken(taken) {
		this.#isTaken = taken;
	}

	setLocalPosition(localPosition) {
		this.#localPosition = localPosition;

		this.#updateSavedFrogPosition();
	}

	isTaken() {
		return this.#isTaken;
	}

	getPosition() {
		return PositionMethods.getSumOf(this.#getField().getPosition(), this.#localPosition);
	}

	getRectangle() {
		return new Rectangle(this.getPosition(), SINGLE_TILE_DIMENSIONS);
	}

	draw() {
		if(this.#isTaken) {
			this.#savedFrogSprite.draw();
		}
	}

	#getField() {
		const fieldWasUndefined = !VariableMethods.variableIsDefined(this.#field);
		
		this.#field = this.#field || FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getField();

		if(fieldWasUndefined && VariableMethods.variableIsDefined(this.#field)) {
			this.#field.positionChangedEvent.addListener(this.#onPositionChanged.bind(this));
		}

		return this.#field;
	}

	#onPositionChanged(parameters) {
		this.#updateSavedFrogPosition();
	}

	#updateSavedFrogPosition() {
		this.#savedFrogSprite.setPosition(this.getPosition());
	}
}