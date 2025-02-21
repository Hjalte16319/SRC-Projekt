let player = { 
    x: 0,
    y: 0,
    speed: 5,
    size: 30,
    
}

let grapHook = { // The grappelinghook object
    start: [],
    end: [],
    lengthVal: 0,
    speed: 35,
    xSpeed: 0,
    ySpeed: 0,
    shot: false,
    hit: false,

    pointAmount: 4,
    points: [],
    hitLength: 0
}

//Global variabels related to the grappeling hook
let grappeling = false
let globStart
let globUx
let globUy
let offsetDist;
let ropePassCounter = 0;
let swingAm = 0

//Variabels for easy change of the canvas width and heigh
canvasWidth = 1200
canvasHeight = 800

//Defining the sides of the walls, for collisions
//Collision box array notation: Top, Bottom, Right, Left
let walls = [[100,150,130,425], [100,150,600,895], [600,650,130,425], [600,650,600,895]]


function setup()
{
    frameRate(60)
    createCanvas(canvasWidth, canvasHeight);
    player.x = canvasWidth/2
    player.y = canvasHeight/2

}

function draw()
{
    //Reset canvas
    clear()
    background(150)
    playerControlls()

    //Grappel check
    if(mouseIsPressed == true && mouseButton == LEFT && grappeling == false){
        grapple()
    }

    //Draw player
    fill(200,0,0)
    circle(player.x, player.y, player.size)

    //Draw walls
    for(let i = 0; i < walls.length; i++){
        drawHitbox(walls[i])
    }

}

function mouseReleased(){ //Resets all grappeling hook variabels to the original state
    grapHook.start = []
    grapHook.end = []
    grapHook.lengthVal = 0
    grapHook.speed = 35
    grapHook.xSpeed = 0
    grapHook.ySpeed = 0
    grapHook.shot = false
    grapHook.hit = false
    grapHook.hitLength = 0
    offsetDist = 0
    ropePassCounter = 0
    swingAm = 0
    
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
    
    grapHook.lengthVal++ //Increase the length of the grappelinghook
    
    //Calculate the new position of the end point on the grappelinghook, with the new length
    let newEnd= [globStart[0] + grapHook.xSpeed * grapHook.lengthVal, globStart[1] + grapHook.ySpeed * grapHook.lengthVal] 
    
    if(!boxCollided(newEnd, walls)){ //Applying the new end point if it is not colliding with the walls
        grapHook.end = newEnd
    }
    else{
        grapHook.lengthVal-- //If the new end point based on the increased length is colliding with a wall, the length is retracted once
        grapHook.hit = true 

        grapHook.end = [globStart[0] + grapHook.xSpeed * (grapHook.lengthVal+1), globStart[1] + grapHook.ySpeed * (grapHook.lengthVal+1)]
        
        let xPos = player.x + dir[0]*3
        let yPos = player.y + dir[1]*3
        if(!boxCollided([xPos, yPos ], walls)){ //Move the player towards the endpoint if the player does not collide with walls
            player.x = xPos 
            player.y = yPos
        }
        if(grapHook.hitLength == 0){ //Noting the initial length of the grappelinghook, when hitting a wall
            grapHook.hitLength = distance(grapHook.start, grapHook.end)
            swingAm = 20 * grapHook.hitLength/100

        }
    }

    grappleAnim()
}


function grappleAnim(){

    //Controlpoints on the line between the player and grappelinghook end point
    let tempPoints = []
    let dir = dirVal(grapHook.start, grapHook.end)

    for(let i = 0; i < grapHook.pointAmount; i++){ 
        
        //Calculate points to make sektions on the line
        let dist = distance(grapHook.start, grapHook.end)
        let xPos = grapHook.start[0] + dir[0] * (i/grapHook.pointAmount) * dist
        let yPos = grapHook.start[1] + dir[1] * (i/grapHook.pointAmount) * dist
        tempPoints.push([xPos, yPos])
       
    }
    grapHook.points = tempPoints
    grapHook.points.push(grapHook.end)

    //Kontrolpoints not on the line between the player and grappelinghook end point
    //Calculates the outer controlpoints based on the previously calculated sections
    let outerPoints = []
    let ortogDir = ortogDirVal(dir[0], dir[1])

    for(let i = 0; i < grapHook.points.length ; i++){
        
        if(i > 0){

            let pStart = grapHook.points[i - 1];
            let pEnd = grapHook.points[i];
            let dist = distance(pStart, pEnd)
            let totalDist = distance(grapHook.start, grapHook.end)

            //calculate how far out the points shall swing from the line between the player and the grappelinghook end point
            if(!grapHook.hit){
                offsetDist =  totalDist/ 3
                if(offsetDist > 200){
                    offsetDist = 200
                }
            }
            //Making the points move in the opposit direction if they swing too far from the middel line
            else if(grapHook.hit){

                if(ropePassCounter == 0){

                    offsetDist -= grapHook.hitLength/200

                    if(offsetDist < -swingAm){
                        ropePassCounter = 1
                    }
                }

                else if(ropePassCounter == 1){
                    offsetDist += grapHook.hitLength/200
                    if(offsetDist > swingAm){
                        ropePassCounter = 0
                    }

                }
                   
            }
            
            //Calculate the offset in opposit direction for every second sektion
            if(i % 2 === 0){
                let xPos1 = (pStart[0] + dir[0] * dist * 0.25) + ortogDir[0] * offsetDist 
                let yPos1 = (pStart[1] + dir[1] * dist * 0.25) + ortogDir[1] * offsetDist
    
                let xPos2 = (pStart[0] + dir[0] * dist * 0.9) + ortogDir[0] * offsetDist
                let yPos2 = (pStart[1] + dir[1] * dist * 0.9) + ortogDir[1] * offsetDist

                outerPoints.push([xPos1, yPos1], [xPos2, yPos2])
            }
            else if(!i % 2 === 0){
                let xPos1 = (pStart[0] + dir[0] * dist * 0.25) - ortogDir[0] * offsetDist
                let yPos1 = (pStart[1] + dir[1] * dist * 0.25) - ortogDir[1] * offsetDist
    
                let xPos2 = (pStart[0] + dir[0] * dist * 0.9) - ortogDir[0] * offsetDist
                let yPos2 = (pStart[1] + dir[1] * dist * 0.9) - ortogDir[1] * offsetDist

                outerPoints.push([xPos1, yPos1], [xPos2, yPos2])
               
            }

        }
      
        
    }

    //save the calculated points
    for(let i = 0; i < outerPoints.length; i++){
        grapHook.points.push([outerPoints[i][0], outerPoints[i][1]])
    }
    

    let bezierPCounter = 0 //Integer counting the number of outer points processed in the following for loop

    //calculate and draw a cubic béxier curve for each segment on the grappeling hook
    for(let i = 1; i < tempPoints.length; i++){
        let p0 = tempPoints[i-1]
        let p3 = tempPoints[i]

        if (bezierPCounter + 1 < outerPoints.length) {
            let p1 = outerPoints[bezierPCounter]
            let p2 = outerPoints[bezierPCounter+1]

            drawQuadBezier(p0, p1, p2, p3)
            bezierPCounter += 2
        }   
    }
   
    //Lower the amount of swing,
    if(swingAm > 5){
        if(swingAm > 50){
            swingAm -= grapHook.hitLength/150
        }
        else{
            swingAm -= Math.abs(swingAm/10)
        }
    }
    else{
        swingAm = 0
    }
    strokeWeight(1);

}

function playerControlls(){
    if(!grapHook.hit){

        //A
        if (keyIsDown(65)) {
            if(!boxCollided([player.x - player.speed, player.y], walls)){
                player.x -= player.speed
            }
        }
        //D
        if (keyIsDown(68)) {
            if(!boxCollided([player.x + player.speed, player.y], walls)){
            player.x += player.speed
            }
        }
        //W
        if (keyIsDown(87)) {
            if(!boxCollided([player.x, player.y - player.speed], walls)){
            player.y -= player.speed
            }
        }
        //S
        if (keyIsDown(83)) {
            if(!boxCollided([player.x, player.y + player.speed], walls)){
            player.y += player.speed
            }
        }
    }

}
