var selectedWord = "";
var selectedHint ="";
var board ="";
var remainingGuesses = 6;
var words = [{word: "snake", hint: "It's a reptile"}
            ,{word: "monkey", hint: "its a mammal"}
            ,{word: "beetle", hint: "its a bug"}];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


            
window.onload = startGame;
            
function startGame(){
    pickWord();
    initBoard();
    updateBoard();
    createLetters();
}
            
function initBoard(){
    for (var letter in selectedWord){
        board += '_';
    }
}
            
function pickWord(){
    var randomInt =Math.floor(Math.random()*words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}
console.log(words[0]);
            
function updateBoard(){
    $("#word").empty();
                
    for (var letter of board){
        document.getElementById("word").innerHTML += letter + " ";
    }
                
    $("#word").append("<br />");
    
    
}

function initBoard(){
    for (var letter in selectedWord){
        board += '_';
    }
}
            
function createLetters(){
    for(var letter of alphabet){
        $("#letters").append("<button class='letter' id='"+letter+"'>"+letter+"</button>");
    }
                
 $(".letter").click(function(){
    checkLetter($(this).attr("id"));
    disableButton($(this));
});
$(".hintBtn").click(function(){
        $("#word").append("<span class='hint'>HINT: "+selectedHint+"</span>");
        disableButton($(this));
    })
$(".replayBtn").on("click",function(){
    location.reload();
});   
}
            
            
            
function updateWord(positions, letter){
    for(var pos of positions){
        board = replaceAt(board, pos, letter)
    }
    updateBoard();
}
            
function replaceAt(str, index, value){
    return str.substr(0, index)+ value+str.substr(index+value.length);
}
            
function checkLetter(letter){
    var positions = new Array();
                
    for (var i=0; i<selectedWord.length; i++){
        console.log(selectedWord);
        if(letter == selectedWord[i]){
            positions.push(i);
        }
    }
    if(positions.length>0){
        updateWord(positions, letter);
                    
        if(!board.includes('_')){
            endGame(true);
        }
    } else{
        remainingGuesses-=1;
        updateMan();
    }
    if(remainingGuesses<=0){
        endGame(false);
    }
}
            
function updateMan(){
    $("#hangImg").attr("src", "img/stick_"+(6-remainingGuesses)+".png");
}
            
function endGame(win){
    $("#letters").hide();
                
    if(win){
        $('#won').show();
    } else {
        $('#lost').show();
    }
    
            


}
            
function disableButton(btn){
    btn.prop("disabled",true);
    btn.attr("class", "btn btn-danger");
}
            
      