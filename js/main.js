/* ----------------------Variables--------------------- */
let life = 0;
let input = "";
let inputRegex = /^[a-z|é|è|à|ù]$/i; // in doubt i added french caracters to add french words to the game
let wordArr = chooseWord().toLocaleLowerCase().split("");
let answerArr = wordArr.map(x => x = "_"); 

gameLoop();

function gameLoop(){
    alert("Hello there ! Welcome to Jules's Hangman Game !")
    showRules();
    while (life > 0){
        checkWord();
        input = takeInput();
        compareInput(input);
        showResult();    
    }
    gameOver();
}

function returnWordArray(){
    return ["manger","épée","anticonstitutionnellement","marine","union","soviétique","kebab"];
}

function showRules(){
    let input = prompt(`Choose an option :\n"S" to start a game. "R" to see game's rule. "Q" to quit`);
    if (inputRegex.test(input)){
        switch(input.toUpperCase()){
            case "S":
                life = 7;
                break;
            case "R":
                alert(`You have 7 life, each time you enter a wrong letter you lose one.\n
The game will choose a random french word.\n
letter with an accent and the ones without are not considered the same.`);
                showRules();
                break;
            case "Q":
                alert("See you soon !");
                window.close();
                break;
            default:
                showRules();
                break;
        }
    } else {
        showRules();
    }
}

function chooseWord(){
    return returnWordArray()[Math.floor(Math.random() * returnWordArray().length)];
}

function takeInput(){
    let playerInput = prompt("Enter a letter :");
    // Make sure input is a letter and only a letter
    if (inputRegex.test(playerInput)){
        return playerInput.toLocaleLowerCase();
    } else {
        takeInput();
    }
}

function compareInput(input){
    let hasFoundAnswer = false;
    // Replace hidden chars by corresponding letters 
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

function checkWord(){
    (answerArr.join("").toLocaleLowerCase() === wordArr.join("").toLocaleLowerCase()) ? win() : false;
}

function showResult(){
    alert(`${answerArr.join(" ")}\nYou have ${life} attempts left.`);
}

function replay(){
    life = 7;
}

function gameOver(){
    confirm("Sorry you lose !\nDo you want to play again ?") ? replay() : window.close() ;
}

function win(){
    confirm("Congratulation you win !\nDo you want to play again ?") ? replay() : window.close() ;
}