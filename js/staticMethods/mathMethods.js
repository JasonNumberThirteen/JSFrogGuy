class MathMethods {
	static clamp(value, min, max) {
		return Math.max(min, Math.min(value, max));
	}
}