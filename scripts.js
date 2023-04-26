window.onload = turnCard(mtestet);

function getHomePage()
{
	document.getElementById('mainpage').innerHTML = ""
	var mainPage = document.getElementById('mainpage')
	var h1 = document.createElement('h1');
	h1.innerText = "Main Page";
	mainPage.appendChild(h1);
}

function getMemoryGame()
{
	var mobile = false;
	if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
	{
		mobile = true;
	}
	let firstcard;
	let secondcard;
	var p = 0;
	document.getElementById('mainpage').innerHTML = ""
	var mainPage = document.getElementById('mainpage')
	var pointArea = document.createElement('div');
	pointArea.id = "pointarea";
	mainPage.appendChild(pointArea);
	
	var points = document.createElement('h1');
	points.id = "points";
	points.innerText = p;
	pointArea.appendChild(points);
	var getpoints = document.getElementById('points');
	var gameArea = document.createElement('div');
	gameArea.id = "gamearea";
	gameArea.style.margin = "50px auto";
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
	
	var updatetime = document.createElement('p');
	updatetime.innerText = "Last update 26/04/2023 23:00";
	updatetime.style.margin = "20px";
	mainPage.appendChild(updatetime);
	
	
	const mcard_inside_array = [];
	const choosen_cards = [];
	const choosen_boxes = [];
	
	for (var i = 0; i <= 29; i++)
	{
		mcard_inside_array.push(i);
	}
	
	const mixedcards = mcard_inside_array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
	
	for (var i = 0; i <= 29; i++)
		{
			mcard = document.createElement('button');
			mcard.id = "memorycard" + i;
			if (mobile === true)
			{
				mcard.style.width = "55px";
				mcard.style.height = "55px";
			}
			else
			{
				mcard.style.width = "70px";
				mcard.style.height = "70px";
			}
			mcard.style.float = "left";
			mcard.style.backgroundImage = "url('box.jpg')";
			const mcard_string = "memorycard" + i;
			const mcard_inside = mixedcards[i];
			mcard.onclick = function() {turnCard(mcard_string, mcard_inside)};
			gameArea.appendChild(mcard);
		}
	
	
	function turnCard(mcard_s, mcard_inside_s)
	{
		var box = document.getElementById(mcard_s);
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
		
		if (countchoose == 2 && firstcard == secondcard)
		{
			p++;
			document.getElementById('points').innerHTML = p;
			choosenbox2.disabled = true;
			choosenbox1.disabled = true;
		}
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
		if (countchoose == 3 && firstcard !== secondcard)
		{
			choosenbox1.style.backgroundImage = "url('box.jpg')";
			choosenbox2.style.backgroundImage = "url('box.jpg')";
			var removeFromIndex = [0,1];
			for (var i = removeFromIndex.length -1; i >= 0; i--)
			{
				choosen_boxes.splice(removeFromIndex[i],1);
				choosen_cards.splice(removeFromIndex[i],1);
			}
		}
		if (p == 15)
		{
			document.getElementById('mainpage').innerHTML = "";
			var mainPage = document.getElementById('mainpage');
			var winText = document.createElement('h1');
			winText.id = "wintext";
			winText.innerText = "You won!";
			mainPage.appendChild(winText);
		}
	}	
}

