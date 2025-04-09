class Point {
	x;
	y;
	
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	equals(point) {
		return this.x === point.x && this.y === point.y;
	}
}