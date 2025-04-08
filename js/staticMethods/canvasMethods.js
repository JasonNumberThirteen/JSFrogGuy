class CanvasMethods {
	static fillRect(context, color, rectangle) {
		const position = rectangle.getPosition();
		const size = rectangle.getSize();

		if(typeof(color) !== "undefined") {
			context.fillStyle = color;
		}

		context.fillRect(position.x, position.y, size.x, size.y);
	}
}