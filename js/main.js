
initGame();

function initGame(){
    alert("Hello there ! Welcome to Jules's Hangman Game !")
    showRules(getRegex());
}

function gameLoop(){
    let life = 7;
    let wordArr = chooseWord().toLocaleLowerCase().split("");
    console.log(wordArr.join(""));
    let answerArr = hideWord(wordArr);
    while (life > 0){
        checkWord(answerArr,wordArr,life);
        let input = takeInput(getRegex(),answerArr,life);
        life = compareInput(input,wordArr,answerArr,life);
    }
    gameOver(life,wordArr.join(""));
}

function getRegex(){
    return /^[a-z|é|è|à|ù]$/i; // in doubt i added french caracters to add french words to the game 
}

function hideWord(wordArr){
    return wordArr.map(x => x = "_"); // We get the array containing the word and replace every letters by an underscore
}

function returnWordArray(){
    return ["manger","épée","anticonstitutionnellement","marine","union","soviétique","kebab"];
}

function showRules(inputRegex){
    let input = prompt(`Choose an option :\n"S" to start a game. "R" to see game's rule. "Q" to quit`);
    if (inputRegex.test(input)){
        switch(input.toUpperCase()){
            case "S":
                gameLoop()
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

function takeInput(inputRegex,answerArr,life){
    let playerInput = prompt(`Enter a letter:\n${answerArr.join(" ")}\nYou have ${life} attempts left.`);
    // Make sure input is a letter and only a letter
    if (inputRegex.test(playerInput)){
        return playerInput.toLocaleLowerCase();
    } else {
        takeInput();
    }
}

function compareInput(input,wordArr,answerArr,life){
    let hasFoundAnswer = false;
    // Replace hidden chars by corresponding letters 
    for (let i = 0; i < wordArr.length; i++){
        if (wordArr[i] === input.toLowerCase()){
          answerArr[i] = input.toUpperCase();
          hasFoundAnswer = true;
        }
      }
    if (!hasFoundAnswer){
        return life-1;
    }
    return life;
}

function checkWord(answerArr,wordArr,life){
    (answerArr.join("").toLocaleLowerCase() === wordArr.join("").toLocaleLowerCase()) ? gameOver(life,wordArr.join("")) : false;
}

function replay(){
    gameLoop();
}

function gameOver(life,wordArr){
    let message = "";
    console.log(life);
    (life > 1) ? message = `Congratulation you found the word ${wordArr}!` : message = "Too bad, you didn't found the word...";
    confirm(`${message}\nDo you want to play again ?`) ? replay() : window.close() ;
}