class CanvasMethods {
	static fillRect(context, color, rectangle) {
		const position = rectangle.getPosition();
		const size = rectangle.getSize();

		if(VariableMethods.variableIsDefined(color)) {
			context.fillStyle = color;
		}

		context.fillRect(position.x, position.y, size.x, size.y);
	}

	static fillText(context, text, position, color, alignment) {
		if(VariableMethods.variableIsDefined(color)) {
			context.fillStyle = color;
		}

		if(VariableMethods.variableIsDefined(alignment)) {
			context.textAlign = alignment;
		}

		context.fillText(text, position.x, position.y);
	}
}