let player = {
    x: 0,
    y: 0,
    speed: 5,
    size: 30,
    
}


canvasWidth = 1200
canvasHeight = 800

//top, bund, højre, venstre
walls = [[]]


function setup()
{
    
    createCanvas(canvasWidth, canvasHeight);
	frameRate(90)
    

}

function draw()
{
    clear()
    background(150)
    

    if (keyIsDown(65)) {
        player.x -= player.speed
    }
    
    if (keyIsDown(68)) {
       player.x += player.speed
    }
    
    if (keyIsDown(87)) {
        player.y -= player.speed
    }
    
    if (keyIsDown(83)) {
        player.y += player.speed
    }

    fill(200,0,0)
    circle(player.x, player.y, player.size)
    console.log("x"+player.x)
    console.log("y"+player.y)

}


function grapple(){

}
