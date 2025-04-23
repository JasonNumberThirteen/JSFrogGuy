class SoundManager {
	#gameStartSound = new Sound(GAME_START_SOUND_FILENAME, 1.4);
	#gameOverSound = new Sound(GAME_OVER_SOUND_FILENAME, 1.5);
	#playerMovementSound = new Sound(PLAYER_MOVEMENT_SOUND_FILENAME, 0.2, true);
	#playerHitByVehicleSound = new Sound(PLAYER_HIT_BY_VEHICLE_SOUND_FILENAME, 0.8, true);
	#fallingIntoWaterByPlayerSound = new Sound(FALLING_INTO_WATER_BY_PLAYER_SOUND_FILENAME, 1.5);
	#reachingFieldDestinationByPlayerSound = new Sound(REACHING_FIELD_DESTINATION_BY_PLAYER_SOUND_FILENAME, 0.5);
	#levelCompletionSound = new Sound(LEVEL_COMPLETION_SOUND_FILENAME, 4.2);
	#eatingFlyByPlayerSound = new Sound(EATING_FLY_BY_PLAYER_SOUND_FILENAME, 0.5);
	#gainingAdditionalLifeByPlayer = new Sound(GAINING_ADDITIONAL_LIFE_BY_PLAYER_SOUND_FILENAME, 1.2);

	playSoundDependingOnHazardousObjectType(hazardousObjectType) {
		if(!VariableMethods.variableIsDefined(hazardousObjectType)) {
			return;
		}

		switch (hazardousObjectType) {
			case HazardousObjectType.Water:
				this.playSoundOfType(SoundType.FallingIntoWaterByPlayer);
				break;
			
			case HazardousObjectType.Vehicle:
				this.playSoundOfType(SoundType.PlayerHitByVehicle);
				break;
		}
	}

	playSoundOfType(soundType) {
		const soundFile = this.getSoundOfType(soundType);

		if(VariableMethods.variableIsDefined(soundFile)) {
			soundFile.playSound();
		}
	}

	getSoundOfType(soundType) {
		switch(soundType) {
			case SoundType.GameStart:
				return this.#gameStartSound;
			case SoundType.GameOver:
				return this.#gameOverSound;
			case SoundType.PlayerMovement:
				return this.#playerMovementSound;
			case SoundType.PlayerHitByVehicle:
				return this.#playerHitByVehicleSound;
			case SoundType.FallingIntoWaterByPlayer:
				return this.#fallingIntoWaterByPlayerSound;
			case SoundType.ReachingFieldDestinationByPlayer:
				return this.#reachingFieldDestinationByPlayerSound;
			case SoundType.EatingFlyByPlayer:
				return this.#eatingFlyByPlayerSound;
			case SoundType.LevelCompletion:
				return this.#levelCompletionSound;
			case SoundType.GainingAdditionalLifeByPlayer:
				return this.#gainingAdditionalLifeByPlayer;
		}

		return undefined;
	}
}