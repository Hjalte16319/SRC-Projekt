let player = {
    x: 0,
    y: 0,
    speed: 5,
    size: 30,
    
}

function setup()
{
    


}

function draw()
{
    if (keyIsDown(LEFT_ARROW)) {
        player.x -= player.speed
    }
    
    if (keyIsDown(RIGHT_ARROW)) {
       player.x += player.speed
    }
    
    if (keyIsDown(UP_ARROW)) {
        player.y -= player.speed
    }
    
    if (keyIsDown(DOWN_ARROW)) {
        player.y += player.speed
    }

    fill(100,100,100)
    circle(player.x, player.y, player.size)

}