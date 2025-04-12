class FieldDestination {
	#field;
	#localPosition;
	#isTaken = false;
	#savedFrogSprite;

	constructor(localPosition) {
		this.#localPosition = localPosition;
		this.#savedFrogSprite = new SavedFrogSprite(this.getPosition());
	}

	setLocalPosition(localPosition) {
		this.#localPosition = localPosition;

		this.#updateSavedFrogPosition();
	}

	setAsTaken(taken) {
		this.#isTaken = taken;
	}

	isTaken() {
		return this.#isTaken;
	}

	getPosition() {
		const fieldPosition = this.#getField().getPosition();
		const globalPosition = new Point(fieldPosition.x + this.#localPosition.x, fieldPosition.y + this.#localPosition.y);
		
		return globalPosition;
	}

	getRectangle() {
		return new Rectangle(this.getPosition(), new Point(8, 8));
	}

	draw() {
		if(this.#isTaken) {
			this.#savedFrogSprite.draw();
		}
	}

	#getField() {
		const fieldWasUndefined = !VariableMethods.variableIsDefined(this.#field);
		
		this.#field = this.#field || FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getField();

		if(fieldWasUndefined && this.#field) {
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