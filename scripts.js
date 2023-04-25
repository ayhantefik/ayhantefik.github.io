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
	let firstcard;
	let secondcard;
	var p = 0;
	document.getElementById('mainpage').innerHTML = ""
	var mainPage = document.getElementById('mainpage')
	var points = document.createElement('h1');
	points.id = "points";
	points.innerText = p;
	mainPage.appendChild(points);
	var getpoints = document.getElementById('points');
	var br = document.createElement('br');
	mainPage.appendChild(br);
	var br1 = document.createElement('br');
	mainPage.appendChild(br1);
	var gameArea = document.createElement('div');
	gameArea.id = "gamearea";
	mainpage.appendChild(gameArea);
	var gameArea2 = document.createElement('div');
	gameArea2.id = "gamearea2";
	mainpage.appendChild(gameArea2);
	
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
			mcard.style.width = "70px";
			mcard.style.height = "70px";
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
		box.style.backgroundImage = "url('cards/" + mcard_inside_s + ".jpg')";
		choosen_cards.push(mcard_inside_s);
		choosen_boxes.push(mcard_s);
		
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
		
		/*if (firstcard == secondcard)
		{
			p++;
			document.getElementById('points').innerHTML = p;
		}*/
		if (countchoose == 3 && firstcard == secondcard)
		{
			p++;
			document.getElementById('points').innerHTML = p;
			var choosenbox1 = document.getElementById(choosen_boxes[0]);
			var choosenbox2 = document.getElementById(choosen_boxes[1]);
			choosenbox1.style.backgroundImage = "url('closed.jpg')";
			choosenbox2.style.backgroundImage = "url('closed.jpg')";
			choosenbox2.disabled = true;
			choosenbox1.disabled = true;
			choosen_boxes.shift();
			choosen_boxes.shift();
			choosen_cards.shift();
			choosen_cards.shift();
		}
		if (countchoose == 3 && firstcard !== secondcard)
		{
			var choosenbox1 = document.getElementById(choosen_boxes[0]);
			var choosenbox2 = document.getElementById(choosen_boxes[1]);
			choosenbox1.style.backgroundImage = "url('box.jpg')";
			choosenbox2.style.backgroundImage = "url('box.jpg')";
			choosen_boxes.shift();
			choosen_boxes.shift();
			choosen_cards.shift();
			choosen_cards.shift();
		}
	}	
}

