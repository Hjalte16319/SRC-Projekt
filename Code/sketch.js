let player = {
    x: 0,
    y: 0,
    speed: 5,
    size: 30,
    
}


canvasWidth = 1200
canvasHeight = 800

//top, bund, højre, venstre
let walls = [[100,150,130,425], [100,150,600,895], [600,650,130,425], [600,650,600,895]]


function setup()
{
    
    createCanvas(canvasWidth, canvasHeight);

}

function draw()
{
    clear()
    background(150)
    
    if (keyIsDown(65)) {

        if(!boxCollided([player.x - player.speed, player.y], walls)){
            player.x -= player.speed
        }
        
    }
    
    if (keyIsDown(68)) {

        if(!boxCollided([player.x + player.speed, player.y], walls)){
        player.x += player.speed
        }
    }
    
    if (keyIsDown(87)) {
        if(!boxCollided([player.x, player.y - player.speed], walls)){
        player.y -= player.speed
        }
    }
    
    if (keyIsDown(83)) {
        if(!boxCollided([player.x, player.y + player.speed], walls)){
        player.y += player.speed
        }
    }

    fill(200,0,0)
    circle(player.x, player.y, player.size)

    for(let i = 0; i < walls.length; i++){
        drawHitbox(walls[i])
    }
}


function grapple(){


}
