let player = {
    x: 0,
    y: 0,
    speed: 5,
    size: 30,
    
}

let grapHook = {
    start: [],
    end: [],
    lengthVal: 0,
    speed: 30,
    xSpeed: 0,
    ySpeed: 0,
    shot: false,
    hit: false,

    pointAmount: 5,
    points: [],
    
}

let grappeling = false
let globStart
let globUx
let globUy

canvasWidth = 1200
canvasHeight = 800

//top, bund, højre, venstre
let walls = [[100,150,130,425], [100,150,600,895], [600,650,130,425], [600,650,600,895]]


function setup()
{
    frameRate(60);
    createCanvas(canvasWidth, canvasHeight);
    player.x = canvasWidth/2
    player.y = canvasHeight/2

}

function draw()
{
    clear()
    background(150)
    playerControlls()

    if(mouseIsPressed == true && mouseButton == LEFT && grappeling == false){
        grapple()
        line(grapHook.start[0], grapHook.start[1], grapHook.end[0], grapHook.end[1])

    }

    fill(200,0,0)
    circle(player.x, player.y, player.size)

    for(let i = 0; i < walls.length; i++){
        drawHitbox(walls[i])
    }


}

function mouseReleased(){
    grapHook.start = []
    grapHook.end = []
    grapHook.lengthVal = 0
    grapHook.xSpeed = 0
    grapHook.ySpeed = 0
    grapHook.shot = false
    grapHook.hit = false
}


function grapple(){
    
    grapHook.start = [player.x, player.y]
    let dir = moveTowards(player, grapHook.end)

    if(grapHook.shot == false){
        globStart = [player.x, player.y]
        let dx = mouseX - player.x;
        let dy = mouseY - player.y;
        
        
        // Normalize direction vector
        let length = Math.sqrt(dx * dx + dy * dy);
        ux = dx / length;
        uy = dy / length;
        
        // Apply speed
        grapHook.xSpeed = ux * grapHook.speed;
        grapHook.ySpeed = uy * grapHook.speed;
        grapHook.shot = true
    }
        
    grapHook.lengthVal++
    
    let newEnd= [globStart[0] + grapHook.xSpeed * grapHook.lengthVal, globStart[1] + grapHook.ySpeed * grapHook.lengthVal]
    
    if(!boxCollided(newEnd, walls)){
        grapHook.end = newEnd
    }
    else{
        grapHook.lengthVal--
        grapHook.hit = true
        grapHook.end = [globStart[0] + grapHook.xSpeed * (grapHook.lengthVal+1), globStart[1] + grapHook.ySpeed * (grapHook.lengthVal+1)]
        
        let xPos = player.x + dir[0]*2.5
        let yPos = player.y + dir[1]*2.5
        if(!boxCollided([xPos, yPos ], walls)){
            player.x = xPos
            player.y = yPos
        }
    
    }

    grappleAnim()
    
    
}


function grappleAnim(){

    //linePoints
    let tempPoints = []
    let dir = dirVal(grapHook.start, grapHook.end)
    
    for(let i = 0; i < grapHook.pointAmount; i++){
        let dist = distance(grapHook.start, grapHook.end)
        let xPos = grapHook.start[0] + dir[0] * (i/grapHook.pointAmount) * dist
        let yPos = grapHook.start[1] + dir[1] * (i/grapHook.pointAmount) * dist
        tempPoints.push([xPos, yPos])
    }
    grapHook.points = tempPoints
    //console.log(grapHook.points)
   
    //bezier outer points
    let outerPoints = []
    let ortogDir = ortogDirVal(dir[0], dir[1])

    for(let i = 0; i < grapHook.points.length; i++){
        if(i > 0){
            let pStart = grapHook.points[i - 1];
            let pEnd = grapHook.points[i];
            let xPos = (pStart[0] + pEnd[0])/2 +


            outerPoints.push()
        }
        else if(i == 0){

        }
    }

    // draw the points
    for(let i = 0; i < grapHook.points.length; i++){
        circle(grapHook.points[i][0], grapHook.points[i][1], 10)
    }
    circle(grapHook.end[0], grapHook.end[1], 10)



    
}





function playerControlls(){
    if(!grapHook.hit){
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
    }

}
