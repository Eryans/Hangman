
initGame();

function initGame(){
    alert("Hello there ! Welcome to Jules's Hangman Game !");
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

function showRules(){
    let input = prompt(`Choisissez une option :\n"J" pour lancer une partie. "R" pour afficher les règles. "Q" pour quitter`);
    switch(input.toUpperCase()){
        case "J":
            gameLoop()
            break;
        case "R":
            alert(`Vous disposez de 7 essaies, chaque lettre erroné vous en retirera un.\nLe jeu choissira un mot français dans une liste au hasard.\n`);
            showRules();
            break;
        case "Q":
            alert("A une prochaine fois !");
            window.close();
            break;
        default:
            showRules();
            break;
    }
}

function chooseWord(){
    return returnWordArray()[Math.floor(Math.random() * returnWordArray().length)]; // Return random word from list.
}

function takeInput(inputRegex,answerArr,life){
    let playerInput = prompt(`Enter a letter:\n${answerArr.join(" ")}\nYou have ${life} attempts left.`);
    // Make sure input is a letter and only a letter
    if (inputRegex.test(playerInput)){
        return playerInput.toLocaleLowerCase();
    } else {
        takeInput(inputRegex,answerArr,life);
    }
}

function compareInput(input,wordArr,answerArr,life){
    let hasFoundAnswer = false;
    // Replace hidden chars by corresponding letters if there's a match.
    for (let i = 0; i < wordArr.length; i++){
        if (wordArr[i] === input.toLowerCase()){
          answerArr[i] = input.toUpperCase();
          hasFoundAnswer = true;
        }
      }
    if (!hasFoundAnswer){
        return life-1;
    }
    return life; // life is returned to update score.
}

function checkWord(answerArr,wordArr,life){
    // check for victory conditions
    (answerArr.join("").toLocaleLowerCase() === wordArr.join("").toLocaleLowerCase()) ? gameOver(life,wordArr.join("")) : false;
}

function gameOver(life,wordArr){
    let message = "";
    console.log(life);
    (life > 1) ? message = `Congratulation you found the word ${wordArr.toUpperCase()} !` : message = "Too bad, you didn't found the word...";
    confirm(`${message}\nDo you want to play again ?`) ? gameLoop() : window.close() ;
}