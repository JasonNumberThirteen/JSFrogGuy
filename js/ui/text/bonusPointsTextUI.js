class BonusPointsTextUI extends TextUI {
	#displayTimer;
	#flySprite;
	
	constructor() {
		super(EMPTY_STRING, undefined, YELLOW_COLOR, TEXT_ALIGNED_TO_CENTER_KEY);
		this.setActive(false);

		this.#displayTimer = new Timer(BONUS_POINTS_TEXT_UI_DISPLAY_DURATION, false);
		
		this.#displayTimer.timerFinishedEvent.addListener(this.#onTimerFinished.bind(this));
	}

	init() {
		this.#flySprite = FrogGuy.getSceneManager().getSceneByKey(GAME_SCENE_NAME_KEY).getFieldObjectsContainer().getFlySprite();

		this.#flySprite.flyWasEatenByPlayer.addListener(this.#onFlyWasEatenByPlayer.bind(this));
	}

	update(deltaTime) {
		this.#displayTimer.update(deltaTime);
	}

	display(position, text) {
		this.setActive(true);
		this.setPosition(position);
		this.setText(text);
		this.#displayTimer.startTimer();
	}

	#onTimerFinished() {
		this.setActive(false);
	}

	#onFlyWasEatenByPlayer() {
		const flyPosition = this.#flySprite.getPosition();
		const flySize = this.#flySprite.getSize();
		const position = PositionMethods.getSumOf(flyPosition, new Point(flySize.x*0.5, flySize.y));
		
		this.display(position, POINTS_FOR_EATING_FLY.toString());
	}
}