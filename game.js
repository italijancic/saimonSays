$(document).ready(() => {

	// Global vars
	var buttonColors = ['red', 'blue', 'green', 'yellow'];
	var gamePattern = [];
	var userClickPattern = [];
	var level = 0;
	var keyPressed = false;

	$(document).on('keydown', (event) => {

		if (!keyPressed) {
			keyPressed = true;
			$('h1').html('Level ' + level);
			nextSequence();
		}
	});

	// Function to create a New Pattern
	function nextSequence() {

		userClickPattern = [];
		var randomNumber = Math.floor(Math.random()*4);
		var randomChosenColor = buttonColors[randomNumber];

		// Add rnd color to rnd secuence game
		gamePattern.push(randomChosenColor);

		// Apply efect on button
		$(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

		// Play sound of color
		playSound(`./sounds/${randomChosenColor}.mp3`);

		level++;
		$('h1').html('Level ' + level);
	}

	// btn click event handler
	$('.btn').on('click', (event) => {

		var userChosenColour = event.target.id;
		userClickPattern.push(userChosenColour);
		playSound(`./sounds/${userChosenColour}.mp3`);
		animatePress(userChosenColour);
		checkAnswer(userClickPattern.length - 1);
	});

	// Function to play audio
	function playSound(soundName) {
		var audio = new Audio(soundName);
		audio.play();
	}

	// Function to animate pressed button
	function animatePress(currentColour) {
		$(`#${currentColour}`).addClass('pressed');
		setTimeout(() => {
			$(`#${currentColour}`).removeClass('pressed');
		}, 100);
	}

	// Function to check user answer
	function checkAnswer(currentLevel) {

		if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
			if (userClickPattern.length === gamePattern.length){
				setTimeout(() => {
					nextSequence();
				}, 1000);
			}
		} else {
			var audio = new Audio('./sounds/wrong.mp3');
			audio.play();

			$('body').addClass('game-over');
			setTimeout(() => {
				$('body').removeClass('game-over');
				$('h1').html('Game Over, Press Any Key to Restart');
				startOver();
			}, 200);
		}
	}

	// Function to restart game
	function startOver() {
		keyPressed = false;
		level = 0;
		gamePattern = [];
	}

});
