/* ----------------------Variables--------------------- */
let word = "Allohéahadidou";
let life = 0;
let input = "";
let inputRegex = /^[a-z|é|è|à|ù]$/i; // in doubt i added french caracters to add french words to the game
let wordArr = word.toLocaleLowerCase().split("");
let answerArr = wordArr.map(x => x = "_"); 

/* -----------------------Logic------------------------ */

alert("Hello there ! Welcome to Jules's Hangman Game !")
showRules();
//chooseWord();
while (!gameOver()){
    input = takeInput();
    checkWord(input);
    showResult();    
}

/* -----------------------Functions------------------------ */

function showRules(){
    let input = prompt(`Choose an option :\n"S" to start a game. "R" to see game's rule. "Q" to quit`);
    if (inputRegex.test(input)){
        switch(input.toUpperCase()){
            case "S":
                life = 7;
                break;
            case "R":
                alert("Todo : Write game's rules");
                showRules();
                break;
            case "Q":
                alert("See you soon !");
                window.close();
        }
    }
}

function chooseWord(){}

function takeInput(){
    let playerInput = prompt("Enter a letter :");
    if (inputRegex.test(playerInput)){
        return playerInput.toLocaleLowerCase();
    } else {
        takeInput();
    }
}

function checkWord(input){
    let hasFoundAnswer = false;
    for (let i = 0; i < wordArr.length; i++){
        if (wordArr[i] === input.toLowerCase()){
          answerArr[i] = input.toUpperCase();
          hasFoundAnswer = true;
        }
      }
    if (!hasFoundAnswer){
        life--;
    }
}

function showResult(){
    alert(`${answerArr.join(" ")}`);
}

function replay(){}

function gameOver(){
    return (life > 0) ? false : true;
}

function loseRound(){}
