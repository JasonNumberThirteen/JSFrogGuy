class ListMethods {
	static removeElementByReferenceIfPossible(list, element) {
		var index = list.indexOf(element);

		if(index !== -1) {
			list.splice(index, 1);
		}
	}
}