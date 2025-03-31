class PlayerLivesSpritesGroup {
	#group = [];
	
	constructor(numberOfSprites) {
		for (let i = numberOfSprites; i >= 1; --i) {
			this.#addSpriteToGroup(i);
		}
	}

	draw() {
		this.#group.forEach(sprite => sprite.draw());
	}

	setNumberOfSprites(numberOfSprites) {
		const difference = this.#group.length - numberOfSprites;

		if(difference > 0) {
			this.#group.splice(difference - 1, difference);
		}
	}

	#addSpriteToGroup(ordinalNumber) {
		const x = 12*(ordinalNumber - 1) + 4;
		const y = GAME_WINDOW_HEIGHT - 12;
		const position = new Point(x, y);
		const sprite = new Sprite(PLAYER_LIFE_SPRITE_FILENAME, position);
		
		this.#group.push(sprite);
	}
}