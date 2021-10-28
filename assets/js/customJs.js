const textWrapper = document.querySelector('.text-wrapper');
const testArea = document.querySelector('#test-area');
const originText = document.querySelector('#origin-text p').innerHTML;
const reserBtn = document.querySelector('#reset');
const theTimer = document.querySelector('.timer');
const main = document.querySelector('.main');

let timer = [0, 0, 0, 0];
let timerRunning = false;
let interval;
let error = 0;
let point = 0;

let spa = document.querySelectorAll('.result span');

function leadingZero(time) {
	if (time < 9) {
		time = `0${time}`;
	}
	return time;
}

function runTimer() {
	let currentTime = leadingZero(timer[2]) + ':' + leadingZero(timer[1]) + ':' + leadingZero(timer[0])

	theTimer.textContent = currentTime;
	timer[3]++;
	timer[0] = Math.floor((timer[3] / 100) / 60);
	timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
	timer[2] = Math.floor((timer[3] - (timer[1] * 100)) - timer[0] * 6000);
}

function spellcheck() {
	let textEntered = testArea.value;
	let lasttextEntered = textEntered.slice(-1).toUpperCase();
	let keys = [...document.querySelectorAll('.iso ul li a')];
	keys.forEach(key => {
		let keyed = key.textContent;
		key.style.backgroundColor = '#fff';
		key.style.color = '#2626';
		if (keyed == lasttextEntered) {
			setTimeout(() => {
				key.style.backgroundColor = 'red';
				key.style.color = '#fff';
			}, 300)



		}

	});



	let originTextMatch = originText.substring(0, textEntered.length);
	console.log(`${textEntered} = ${originTextMatch} \\ ${originText}`);
	if (textEntered == originText) {
		clearInterval(interval);
		//success
		main.style.backgroundColor = '#0ae657b4';


		spa[0].innerHTML = `<p>error ${error}</p>`;
		spa[1].innerHTML = `<p>points ${point}</p>`;

	} else {
		if (textEntered == originTextMatch) {
			//continue
			main.style.backgroundColor = '#e6a00a92';
			point++;


		} else {
			//error
			main.style.backgroundColor = 'rgba(253, 26, 26, 0.422)';
			error++;
		}
	}
}

function start() {
	// console.log('key',key)
	let textEnteredLength = testArea.value.length;
	if (textEnteredLength === 0 && !timerRunning) {
		timerRunning = true;
		interval = setInterval(runTimer, 10);
	}
	console.log(textEnteredLength);
}

function reset() {
	clearInterval(interval);
	alert(`great job, you had ${point} point ${error} and error`);
	interval = null;
	timer = [0, 0, 0, 0];
	timerRunning = false;
	testArea.value = '';
	point = 0;
	error = 0;
	let keys = [...document.querySelectorAll('.iso ul li a')];
	keys.forEach(key=>{
		key.style.backgroundColor = '#fff';
		key.style.color = '#2626';
	})

	theTimer.innerHTML = '00:00:00';
	main.style.transition = '1s';
	main.style.backgroundColor = 'transparent';
	textWrapper.style.borderColor = 'grey';
	spa[0].innerHTML = `<p>error ${error}</p>`;
	spa[1].innerHTML = `<p>points ${point}</p>`;
}

testArea.addEventListener('keyup', spellcheck, false);
testArea.addEventListener('keypress', start, false);
reserBtn.addEventListener('click', reset, false);