class IntCounterTextUI extends TextUI {
	#value = 0;
	
	constructor(position, fillStyle, alignment) {
		super((0).toString(), position, fillStyle, alignment);
	}

	getValue() {
		return this.#value;
	}

	increaseBy(value) {
		this.setTo(this.#value + value);
	}

	setTo(value) {
		this.#value = value;

		this.setText(this.#getFormattedText());
	}

	#getFormattedText() {
		return this.#value === 0 ? "00" : this.#value.toString();
	}
}