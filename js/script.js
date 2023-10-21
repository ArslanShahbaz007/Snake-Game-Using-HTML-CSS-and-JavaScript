let inputdir = {
    x:0,
    y:0
}
let foodsound = new Audio('../music/food.mp3');
let gameoversound = new Audio('../music/gameover.mp3');
let movesound = new Audio('../music/move.mp3');
let musicsound = new Audio('../music/music.mp3');
let speed = 5;
let lastpainttime = 0;
let snakearr = [
    {x:13, y: 15}
]
let food ={ x:6, y:5}
let Score = 0;




function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastpainttime)/1000 < 1/speed) {
        return;
    }

    lastpainttime = ctime;
    gameEngine();
}
function isCollide(snakearr)
{
   for (let i = 1; i < snakearr.length; i++) {
    if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
        return true;
    }
   }
   if (snakearr[0].x >=18 || snakearr[0].x<=0 || snakearr[0].y >=18 || snakearr[0].y <=0 ) {
       return true; 
   }
}

function gameEngine()
{
    musicsound.play();
    if(isCollide(snakearr)){
        gameoversound.play();
        musicsound.pause();
        inputdir = {x:0, y:0};
        alert('Game over. Press any key to play again');
        snakearr = [{x:13, y:15}];
        musicsound.play();
        score=0;

        }
        
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play();
        Score= Score+1;
        score.innerHTML= 'Score: '+ Score;
        snakearr.unshift({x: snakearr[0].x +inputdir.x, y: snakearr[0].y +inputdir.y});
        let a = 2;
        let b = 16;
        food ={x: Math.round(a+(b-a)* Math.random()), y:Math.round(a+(b-a)* Math.random()) };
    }
     
    for (let i = snakearr.length -2 ; i >= 0 ; i--) {
        snakearr[i+1] = {...snakearr[i]};
    }
    snakearr[0].x +=inputdir.x;
    snakearr[0].y +=inputdir.y;







    // Display the snake
    board.innerHTML = " ";
    snakearr.forEach((e, index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index===0)
    {
        snakeElement.classList.add('head');
        
    }else{
        
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
    })

    //display the food
    
    
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    
}

// mainlogic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputdir = {x:0, y:1};
    movesound.play();
    switch (e.key) {
            case 'ArrowUp':
            inputdir.x = 0;
            inputdir.y = -1;
            break;
            
            case 'ArrowDown':
            inputdir.x = 0;
            inputdir.y = 1;
            
            break;
            
            case 'ArrowLeft':
            inputdir.x = -1;
            inputdir.y = 0;
            
            break;
            case 'ArrowRight':
            inputdir.x = 1;
            inputdir.y = 0;
            
            break;
    
        default:
            break;
    }
})