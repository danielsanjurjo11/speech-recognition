const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

getRandomNumber(){
    return Math.floor(Math.random()* 100) + 1;
}
//console.log("Number: ", randomNum);


// Initialize a speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// create a variable to work with the speech recognition object
let recognition = new window.SpeechRecognition();

// start the game 
recognition.start();

// listen for result event 
recognition.addEventListener('result', onSpeak);

// create on speak function 
function onSpeak(e){
    const msg = e.results[0][0].transcript;
    console.log (msg);

 writeMessage(msg);
 //checkNumber(msg);
}

//diplay message to the screen
function writeMessage(msg){
    msgEl.innerHTML = `
    <div> You Said: </div>
    <span> class="box"> ${msg} </span>
    `;
}

// check the msg against the number
function checkNumber(msg){
    const num = +msg;
    //check if a valid number
    if(Number.isNaN(num)){
        msgEl.innerHTML += '<div> that is not a valid number </div>';
        return;
    }
    //check if number is in range 
    if(num > 100 || num< 1){
        msgEl.innerHTML += '<div> that is not a valid number </div>';
        return;
    }
    //check number against randomly generated number
    if (num === randomNum){
        document.body.innerHTML = `
        <h2>Congrats! You guessed the number <br><br> It was ${num}</h2>
        <button class="play-again" id="play-again"> Play again </button>
        `;
    }else if (num > randomNum){
        msgEl.innerHTML += '<div> GO LOWER </div>';
    } else {
        msgEl.innerHTML += '<div> GO HIGHER </div>';
    }
}

