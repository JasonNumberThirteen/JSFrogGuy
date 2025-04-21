class PlayerLivesPanelUI {
	#sprites = [];
	
	constructor(numberOfSprites) {
		this.#addSprites(numberOfSprites);
	}

	draw() {
		this.#sprites.forEach(sprite => sprite.draw());
	}

	setNumberOfSprites(numberOfSprites) {
		const difference = this.#sprites.length - numberOfSprites;

		if(difference > 0) {
			this.#sprites.splice(difference - 1, difference);
		} else if(difference < 0) {
			this.#shiftSprites(Math.abs(difference));
			this.#addSprites(numberOfSprites - this.#sprites.length);
		}
	}

	#shiftSprites(numberOfSlots) {
		this.#sprites.forEach(sprite => {
			const spriteX = sprite.getX();
			const offset = numberOfSlots*this.#getOffsetBetweenSprites(sprite.getImage());
			
			sprite.setX(spriteX + offset);
		});
	}

	#addSprites(numberOfSprites) {
		for (let i = numberOfSprites; i >= 1; --i) {
			this.#addSprite(i);
		}
	}

	#addSprite(ordinalNumber) {
		const sprite = new Sprite(PLAYER_LIFE_SPRITE_FILENAME, undefined, sprite => this.#onSpriteLoad(sprite, ordinalNumber));

		this.#sprites.push(sprite);
	}

	#onSpriteLoad(sprite, ordinalNumber) {
		const image = sprite.getImage();
		const offsetBetweenSprites = this.#getOffsetBetweenSprites(image)*(ordinalNumber - 1);
		const x = PLAYER_LIVES_PANEL_UI_OFFSET_FROM_EDGES + offsetBetweenSprites;
		const y = GAME_WINDOW_HEIGHT - image.height - PLAYER_LIVES_PANEL_UI_OFFSET_FROM_EDGES;
		
		sprite.setPosition(new Point(x, y));
	}

	#getOffsetBetweenSprites(image) {
		return image.width + PLAYER_LIVES_PANEL_UI_OFFSET_BETWEEN_SPRITES
	}
}