let board = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];
let num=1000;
function getNum(){
   num=document.getElementById('level').value

if (num=='1') {
num=1000;
} else if (num=='2') {
num=500;
}
}

let canPlay=false
function play() {
  getNum()

  canPlay=!canPlay;
  if (canPlay) {
  game (num)
}
}

function stop() {
  location.reload()
 
}
function pause() {
  alert('pausing state')
 
}

// function which randomly selects fifures of tetris
function f() {
let figures=['z','l','i','o'];
let figure=figures[Math.floor(Math.random()*figures.length)];
if (figure=='z') {
  board[2]=[0,0,0,1,1,0,0,0];
  board[3]=[0,0,0,0,1,1,0,0]
} else if (figure=='o') {
  board[2]=[0,0,0,1,1,0,0,0];
  board[3]=[0,0,0,1,1,0,0,0]
} else if ( figure=='i') {
  board[2] = [0,0,0,1,0,0,0,0]
  board[3] = [0,0,0,1,0,0,0,0]
  board[4] = [0,0,0,1,0,0,0,0]
  board[5] = [0,0,0,1,0,0,0,0]
} else if (figure=='l') {
  board[2] = [0,0,0,1,0,0,0,0]
  board[3] = [0,0,0,1,0,0,0,0]
  board[4] = [0,0,0,1,1,0,0,0]
  
}
}


// function that selected figure draw on the board

function drawBoard() {
    document.getElementById('board').innerHTML = "";
    for(let y=2; y<board.length; y++) {
        for(let x=0; x<board[y].length; x++) {
            if(board[y][x]=== 0){
                document.getElementById('board').innerHTML += "<div id='empty'></div>";
            } else if(board[y][x]=== 1 || board[y][x]=== 2){
                document.getElementById('board').innerHTML += "<div id='square'></div>";
            }
        }
        document.getElementById('board').innerHTML += "<br>";
    }
}


// function moves figure down
function moveDown() {
   let  canMove = true;
    for(let y=board.length-1; y>=2; y--) {
        for(let x=0; x<board[y].length; x++) {
            if(board[y][x] ==1  ){
                if(y === board.length-1 || board[y+1][x] == 2){
                    canMove = false;
                    freeze();
                    gameOver ()
                   
                
            }
        }
    }
  }
    if (canMove) {
        for(let y=board.length-1; y>=2; y--) {
            for(let x=0; x<board[y].length; x++) {
                if(board[y][x] == 1 ){
                   board[y+1][x] = board[y][x];
                    board[y][x] = 0;
                }
            }
        }
        drawBoard();
    }
    checkLines();
    console.log(board)
    
   
}

function gameOver () {

 let y=2;
        for(let x=0; x<board[y].length; x++) {
            if (board[y][x]==1 && board[y+1][x]==1 && board[y+2][x]==2 ) {
              alert('GameOver')
              location.reload()
           
            
            }
            
     
    
    
  
  }
  
  
}
// FUNCTION MOVE FIGURE LEFT

function moveLeft() {
    let canMove = true;
    for(let y=board.length-1; y>=2; y--) {
        for(let x=0; x<board[y].length; x++) {
            if(board[y][x] ==1 ){
                if(x === 0 || board[y][x-1] == 2){
                    canMove = false;
                }
            }
        }
    }
    if (canMove) {
        for(let y=board.length-1; y>=2; y--) {
            for(var x=0; x<board[y].length; x++) {
                if(board[y][x] ==1 ){
                    board[y][x-1] = board[y][x];
                    board[y][x] = 0;
                }
            }
        }
        drawBoard();
    }
}
// MOVING FIGURE RIGHT

function moveRight() {
    let canMove = true;
    for(let y=board.length-1; y>=2; y--) {
        for(let x=0; x<board[y].length; x++) {
            if(board[y][x] ==1 ){
                if(x === 7 || board[y][x+1] ==2){
                    canMove = false;
                }
            }
        }
    }
    if (canMove) {
        for(let y=board.length-1; y>=2; y--) {
            for(let x=board[y].length; x>=0; x--) {
                if(board[y][x]==1 ){
                    board[y][x+1] = board[y][x];
                    board[y][x] = 0;
                }
            }
        }
        drawBoard();
    }
}

// Figure no more can move

function freeze(){
    for(let y=board.length-1; y>=2; y--) {
        for(let x=0; x<board[y].length; x++) {
            if(board[y][x]==1 ){
                board[y][x]=2
            }
        }
    }
    checkLines();
  
    f()
    
}

// delete lines

function checkLines(){
    for(let y=board.length-1; y>=2; y--) {
       let  fullLine = true;
        for(let  x=0; x<board[y].length; x++) {
            if(board[y][x] !=2) {
                fullLine = false;
            }
        }
        if (fullLine) {
            board.splice(y, 1);
            board.splice(0, 0, [0,0,0,0,0,0,0,0])
            //y++;
        }

                   
    
    }
}

document.onkeydown = function(e) {
    
    if (e.keyCode === 37){
        moveLeft(); 
    } else if (e.keyCode === 39){
        moveRight();
    } else if (e.keyCode === 40){
        moveDown();
    }
}

// after given time repeats code 
function gameLoop(){
  
  
    moveDown();
    drawBoard();
   
    setTimeout(gameLoop,num);
}

// execute code 
function game (num) {
  f()                
drawBoard();
gameLoop(num)
}








