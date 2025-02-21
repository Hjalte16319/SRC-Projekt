function arraysEqual(a, b) { // calculates if two arrayes are the same
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

function boxCollided(point, boxIndex){ //Calculate if a point is inside a box, with the box parimiters being: [top, bottom, right, left]
	let collided = false;
	for(let i = 0; i < boxIndex.length; i++){

		if(point[1] > boxIndex[i][0] && point[1] < boxIndex[i][1] && point[0] > boxIndex[i][2] && point[0] < boxIndex[i][3]){
			collided = true;
			return(collided)
		}
	}
	return(collided)
}

function drawHitbox(box){ //Draws a rectangel based on a box with the sides notation: [top, bottom, right, left]

	H = box[1] - box[0]
	W = box[3] - box[2]
	x = box[2]
	y = box[0]

	fill(0,255,0)
	rect(x,y,W,H)
	noFill()
}

function moveTowards(object, point ){ //Calculates a direction for an object to move towards a point, where the object and point has an x and y coordinate value
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

function dirVal(pointA, pointB ){ //Calculates a direction for a point to move towards another point, where the points has an x and y coordinate value
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

function ortogDirVal(dirX, dirY){ // calculates the ortogonal direction vector, of another direction vector
	let ortogX = dirY * -1
	let ortogY = dirX
	return([ortogX, ortogY])
}

function distance(p1, p2){ //calculates the distance between two points
	let dx = Math.abs(p1[0] - p2[0])
	let dy = Math.abs(p1[1] - p2[1])

	let dist = Math.sqrt(dx**2 + dy**2)
	return(dist)
}

function drawQuadBezier(p0, p1, p2, p3) { // calculates and draws a quadrotic bézier curve using de casteljau's algorithm
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

