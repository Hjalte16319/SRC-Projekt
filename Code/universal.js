function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

function boxCollided(point, boxIndex){
	let collided = false;
	for(let i = 0; i < boxIndex.length; i++){

		if(point[1] > boxIndex[i][0] && point[1] < boxIndex[i][1] && point[0] > boxIndex[i][2] && point[0] < boxIndex[i][3]){
			collided = true;
			return(collided)
		}
	}
	return(collided)
}

function drawHitbox(box){

	H = box[1] - box[0]
	W = box[3] - box[2]
	x = box[2]
	y = box[0]

	fill(0,255,0)
	rect(x,y,W,H)
	noFill()
}

function moveTowards(object, point ){
	let xmod = 1
	let ymod = 1

	if(object.x - point[0] > 0){
		xmod = -1
	}
	if(object.y - point[1] > 0){
		ymod = -1
	}

	let dx = Math.abs(object.x - point[0])
	let dy = Math.abs(object.y - point[1])
	
	let dirX = dx/(dx+dy) * object.speed * xmod
	let dirY = dy/(dx+dy) * object.speed * ymod

	return([dirX,dirY])
}

function dirVal(pointA, pointB ){
	let xmod = 1
	let ymod = 1

	if(pointA[0] - pointB[0] > 0){
		xmod = -1
	}
	if(pointA[1] - pointB[1] > 0){
		ymod = -1
	}

	let dx = Math.abs(pointA[0] - pointB[0])
	let dy = Math.abs(pointA[1] - pointB[1])
	
	let dirX = dx/(dx+dy) * xmod
	let dirY = dy/(dx+dy) * ymod

	return([dirX,dirY])
}

function ortogDirVal(dirX, dirY){
	let ortogX = dirY * -1
	let ortogY = dirX
	return([ortogX, ortogY])
}

function distance(p1, p2){
	let dx = Math.abs(p1[0] - p2[0])
	let dy = Math.abs(p1[1] - p2[1])

	let dist = Math.sqrt(dx**2 + dy**2)
	return(dist)
}

function calcVol(max, x, y, dist){
	dist = 40 * scaleFactor

	let vol = 1 - (Math.sqrt(Math.abs(player.x - x)**2 + Math.abs(player.y - y)**2)  / dist)
	if(vol > max){
		vol = max
	}
	else if(vol < 0){
		vol = 0
	}
	return vol
}


function soundFade(vol1, vol2, sound1, sound2, fadeSpeed, maxvol){
	vol1 -= fadeSpeed
	vol2 += fadeSpeed
	
	sound1.setVolume(vol1)
	sound2.setVolume(vol2)

	if(vol1 <= 1-maxvol){
		sound1.stop()
		callrelaxed = false
	}

	if(!sound2.isPlaying() && sound2){
		sound2.loop();
	}
}


function drawQuadBezier(p0, p1, p2, p3) {
    let curve = [];
    for (let t = 0; t <= 1.00001; t += 0.01) { 
        let A1 = lerp(p0[0], p1[0], t);
        let A2 = lerp(p0[1], p1[1], t);
        let B1 = lerp(p1[0], p2[0], t);
        let B2 = lerp(p1[1], p2[1], t);
        let C1 = lerp(p2[0], p3[0], t);
        let C2 = lerp(p2[1], p3[1], t);

        let D1 = lerp(A1, B1, t);
        let D2 = lerp(A2, B2, t);
        let E1 = lerp(B1, C1, t);
        let E2 = lerp(B2, C2, t);

        let F1 = lerp(D1, E1, t);
        let F2 = lerp(D2, E2, t);

        curve.push([F1, F2]);
    }

    // Draw the curve
    for (let p = 1; p < curve.length; p++) {
        let last = p - 1;
        stroke(0, 0, 0);
        strokeWeight(3);
        line(curve[p][0], curve[p][1], curve[last][0], curve[last][1]);
    }
}

