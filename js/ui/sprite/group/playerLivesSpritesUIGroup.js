class PlayerLivesSpritesUIGroup {
	#group = [];
	
	constructor(numberOfSprites) {
		for (let i = numberOfSprites - 1; i >= 0; --i) {
			const sprite = new SpriteUI(PLAYER_LIFE_SPRITE_FILENAME, new Point(4 + 12*i, GAME_WINDOW_HEIGHT - 12));
			
			this.#group.push(sprite);
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
}