class ColorMethods {
	static hexToRGBA(hex, alpha) {
		hex = hex.replace(/^#([a-f\d])([a-f\d])([a-f\d])$/i, "#$1$1$2$2$3$3");
	
		const hexNumericValue = parseInt(hex.substring(1), 16);
		const r = (hexNumericValue >> 16) & 255;
		const g = (hexNumericValue >> 8) & 255;
		const b = hexNumericValue & 255;
	
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}
}