const boxes=document.querySelectorAll(".box")
const gameInfo=document.querySelector(".game-info")
const newGameBtn=document.querySelector(".btn")

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//function that creates game intialization

function initGame(){
    currentPlayer="x";
    gameGrid=["","","","","","","","",""]
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all"
        box.classList=`box box${index+1}`
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`
    
}
initGame();

function swapTurn()
{
    if(currentPlayer=="x")
    {
        currentPlayer="o"
    }

    else{
        currentPlayer="x";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    // newGameBtn.classList.add("active");
    let answer="";

    winningPositions.forEach((position)=>
    {
        if( (gameGrid[position[0]] !=="" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !=="" )
            && (gameGrid[position[0]]===gameGrid[position[1]]) 
                &&(gameGrid[position[1]]===gameGrid[position[2]]))
        {
            if(gameGrid[position[0]]=="x")
            {
                answer="x";
            }
            else
            {
                answer="o";
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

             boxes[position[0]].classList.add("win");
             boxes[position[1]].classList.add("win");
             boxes[position[2]].classList.add("win");
        }

        // if((gameGrid)[position[0]]!="" )
    })

    if(answer !== "")
    {
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box !="")
            fillcount++;
    });

    if(fillcount===9)
    {
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }
}

function handleC(index){
    if(gameGrid[index]==="" ){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{handleC(index)})
})

newGameBtn.addEventListener("click",initGame);