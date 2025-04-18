class PlayerLivesPanelUI {
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
		} else if(difference < 0) {
			this.#group.forEach(sprite => sprite.setX(sprite.getX() + 12));

			for (let i = numberOfSprites - this.#group.length; i >= 1; --i) {
				this.#addSpriteToGroup(i);
			}
		}
	}

	#addSpriteToGroup(ordinalNumber) {
		const sprite = new Sprite(PLAYER_LIFE_SPRITE_FILENAME, undefined, sprite => this.#onSpriteLoad(sprite, ordinalNumber));

		this.#group.push(sprite);
	}

	#onSpriteLoad(sprite, ordinalNumber) {
		const image = sprite.getImage();
		const offsetBetweenSprites = image.width + PLAYER_LIVES_SPRITES_GROUP_PANEL_UI_OFFSET_BETWEEN_SPRITES;
		const x = PLAYER_LIVES_SPRITES_GROUP_PANEL_UI_OFFSET_FROM_EDGES + offsetBetweenSprites*(ordinalNumber - 1);
		const y = GAME_WINDOW_HEIGHT - image.height - PLAYER_LIVES_SPRITES_GROUP_PANEL_UI_OFFSET_FROM_EDGES;
		
		sprite.setPosition(new Point(x, y));
	}
}