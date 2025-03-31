class IntCounterTextUI extends TextUI {
	#value = 0;
	
	constructor(initialValue, position, fillStyle, alignment) {
		super(initialValue.toString(), position, fillStyle, alignment);

		this.#value = initialValue;
	}

	increaseBy(value) {
		this.#value += value;

		this.setText(this.#value.toString());
	}
}