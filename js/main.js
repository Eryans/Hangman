let input = "a";
let word = "Allohahadidou";
let life = 7;

let wordArr = word.split("");
let answerArr = wordArr.map(x => x = "_"); 

function checkWord(){
    let hasFoundAnswer = false;
    for (let i = 0; i < wordArr.length; i++){
        if (wordArr[i].toLowerCase() === input.toLowerCase()){
          answerArr[i] = input.toUpperCase();
          hasFoundAnswer = true;
        }
      }
    if (!hasFoundAnswer){
        life--;
    }
}
