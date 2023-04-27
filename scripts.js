function getMemoryGame()
{
	/* Check for mobile */
	var mobile = false;
	if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
	{
		mobile = true;
	}
	/* Variable declaration */
	let firstcard;
	let secondcard;
	var p = 0;
	var seconds = 0;
	var minutes = 0;
	var result;
	/* Make empty page and add area for points and timer */
	document.getElementById('mainpage').innerHTML = ""
	var mainPage = document.getElementById('mainpage')
	var pointArea = document.createElement('div');
	pointArea.id = "pointarea";
	mainPage.appendChild(pointArea);
	
	var points = document.createElement('h1');
	points.id = "points";
	points.innerText = p;
	pointArea.appendChild(points);
	
	var timerArea = document.createElement('div');
	timerArea.id = "timerArea";
	mainPage.appendChild(timerArea);
	var timer = document.createElement('h1');
	timer.id = "timer";
	
	timer.innerText = minutes + " min " + seconds + " sec"
	timerArea.appendChild(timer);
	
	function timerFunction() {
		seconds += 1;
		timer.innerText = minutes + " min " + seconds + " sec";
		if (seconds == 60)
		{
			minutes += 1;
			seconds = 0;
		}
	}
	var stoptimer = setInterval(timerFunction, 1000);
	var getpoints = document.getElementById('points');
	/* Make game area */
	var gameArea = document.createElement('div');
	gameArea.id = "gamearea";
	gameArea.style.margin = "50px auto";
	/* Resize game area conforming for mobile and desctop */
	if (mobile === true)
	{
		gameArea.style.width = "330px";
		gameArea.style.height = "275px";
	}
	else
	{
		gameArea.style.width = "420px";
		gameArea.style.height = "350px";
	}
	mainPage.appendChild(gameArea);
	
	/* Make arrays for game functionality */
	const mcard_inside_array = [];
	const choosen_cards = [];
	const choosen_boxes = [];
	
	for (var i = 0; i <= 29; i++)
	{
		mcard_inside_array.push(i);
	}
	/* Mix all cards in game */
	const mixedcards = mcard_inside_array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
	/* Make 30 boxes in game area */
	for (var i = 0; i <= 29; i++)
		{
			mcard = document.createElement('button');
			mcard.id = "memorycard" + i;
			if (mobile === true)
			{
				mcard.style.width = "55px";
				mcard.style.height = "55px";
				mcard.style.backgroundImage = "url('box_mobile.jpg')";
			}
			else
			{
				mcard.style.width = "70px";
				mcard.style.height = "70px";
				mcard.style.backgroundImage = "url('box.jpg')";
			}
			mcard.style.float = "left";
			const mcard_string = "memorycard" + i;
			const mcard_inside = mixedcards[i];
			mcard.onclick = function() {turnCard(mcard_string, mcard_inside)};
			gameArea.appendChild(mcard);
		}
	/* Turn card function */
	function turnCard(mcard_s, mcard_inside_s)
	{
		var box = document.getElementById(mcard_s);
		/* Choose card image for mobile and dectop version */
		if (mobile === true)
		{
			box.style.backgroundImage = "url('cards_mobile/" + mcard_inside_s + ".jpg')";
		}
		else
		{
			box.style.backgroundImage = "url('cards/" + mcard_inside_s + ".jpg')";
		}
		choosen_cards.push(mcard_inside_s);
		choosen_boxes.push(mcard_s);
		var choosenbox1 = document.getElementById(choosen_boxes[0]);
		var choosenbox2 = document.getElementById(choosen_boxes[1]);
		if (choosen_cards[0] < 15)
		{
			firstcard = choosen_cards[0];
			secondcard = choosen_cards[1] - 15;
		}
		else
		{
			firstcard = choosen_cards[0] - 15;
			secondcard = choosen_cards[1];
		}
		var countchoose = choosen_boxes.length
		/* Add point when two cards are same */
		if (countchoose == 2 && firstcard == secondcard)
		{
			p++;
			document.getElementById('points').innerHTML = p;
			choosenbox2.disabled = true;
			choosenbox1.disabled = true;
		}
		if (countchoose == 2 && firstcard !== secondcard)
		{
			choosenbox2.disabled = true;
			choosenbox1.disabled = true;
		}
		/* Change card color to black when two card are same and user click on third card */
		if (countchoose == 3 && firstcard == secondcard)
		{
			choosenbox1.style.backgroundImage = "url('closed.jpg')";
			choosenbox2.style.backgroundImage = "url('closed.jpg')";
			var removeFromIndex = [0,1];
			for (var i = removeFromIndex.length -1; i >= 0; i--)
			{
				choosen_boxes.splice(removeFromIndex[i],1);
				choosen_cards.splice(removeFromIndex[i],1);
			}
		}
		/* Turn back cards if they are not same */
		if (countchoose == 3 && firstcard !== secondcard)
		{
			choosenbox2.disabled = false;
			choosenbox1.disabled = false;
			if (mobile === true)
			{
				choosenbox1.style.backgroundImage = "url('box_mobile.jpg')";
				choosenbox2.style.backgroundImage = "url('box_mobile.jpg')";
			}
			else
			{
				choosenbox1.style.backgroundImage = "url('box.jpg')";
				choosenbox2.style.backgroundImage = "url('box.jpg')";
			}
			var removeFromIndex = [0,1];
			for (var i = removeFromIndex.length -1; i >= 0; i--)
			{
				choosen_boxes.splice(removeFromIndex[i],1);
				choosen_cards.splice(removeFromIndex[i],1);
			}
		}
		/* Display score when game is done */
		if (p == 15)
		{
			result = document.getElementById('timer').innerHTML;
			document.getElementById('mainpage').innerHTML = "";
			var mainPage = document.getElementById('mainpage');
			var winText = document.createElement('h1');
			winText.id = "wintext";
			winText.innerText = "You won!";
			mainPage.appendChild(winText);
			var br10 = document.createElement('br');
			mainPage.appendChild(br10);
			var showresult = document.createElement('h1');
			showresult.innerText = "Score: " + result;
			mainPage.appendChild(showresult);
			var br11 = document.createElement('br');
			mainPage.appendChild(br10);
			var playagain1 = document.createElement('button');
			playagain1.innerText = "Play again";
			playagain1.style.background = "black";
			playagain1.style.color = "white";
			playagain1.style.fontWeight = 'bold';
			playagain1.style.borderRadius = "10px";
			playagain1.style.position = "absolute";
			playagain1.style.left = "50%";
			playagain1.style.transform = "translateX(-50%)";
			playagain1.style.width = "120px";
			playagain1.style.height = "50px";
			playagain1.style.bold 
			playagain1.onclick = function() {getMemoryGame()};
			mainPage.appendChild(playagain1);
		}
	}	
}

