
initGame();

function initGame(){
    alert("Hey salut vous !\nBienvenu sur le jeu du pendu de Jules !");
    showRules();
}

function gameLoop(wordArr){
    let life = 7;
    console.log(wordArr.join(""));
    let answerArr = wordArr.map(x => x = "_"); // Hidding word 
    while (life > 0 && answerArr.includes(("_"))){ // IT WORKS FINALLY !!!!!
        let input = takeInput(getRegex(),answerArr,life);
        life = compareInput(input,wordArr,answerArr,life);
    }
    gameOver(life,wordArr.join(""));
}

function getRegex(){
    return /^[a-z|é|è|à|ù|â|ê]$/i; // in doubt i added french caracters to add french words to the game. Edit : removed word with accent to ease gameplay. 
}

function showRules(){
    let input = prompt(`Choisissez une option :\n"J" pour lancer une partie. "R" pour afficher les règles. "Q" pour quitter`);
    switch(input.toUpperCase()){
        case "J":
            chooseWord()
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

async function chooseWord(){
    fetch('./wordList.json').then(function(response){
        response.json().then(function(data){
           let wordArr = data[Math.floor(Math.random() * data.length)].toLocaleLowerCase().split(""); // Return random word from list.
           gameLoop(wordArr);
        });
    }); 
}

function takeInput(inputRegex,answerArr,life){
    let playerInput = prompt(`Entrez une lettre :\n${answerArr.join(" ")}\nIl vous reste ${life} essaies.`);
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
    return life; // life is always returned to avoid bug.
}

function gameOver(life,wordArr){
    let message = "";
    console.log(life);
    (life > 1) ? message = `Bien joué ! Vous avez trouvé le mot ${wordArr.toUpperCase()} !` : message = "Dommage, vous n'avez pas trouvé le mot...";
    confirm(`${message}\nVoulez vous rejouer une partie ?`) ? showRules() : window.close() ;
}