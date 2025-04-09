class ListMethods {
	static removeElementByReferenceIfPossible(list, element) {
		var index = list.indexOf(element);

		if(index !== -1) {
			list.splice(index, 1);
		}
	}

	static getRandomElement(list) {
		const randomIndex = Math.floor(Math.random()*list.length);
		
		return list[randomIndex];
	}
}