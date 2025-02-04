let player = {
    x: 0,
    y: 0,
    speed: 5,
    size: 30,
    
}

function setup()
{
    
    createCanvas(700, 700);
	frameRate(60)

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

}


function grapple(){
    
}