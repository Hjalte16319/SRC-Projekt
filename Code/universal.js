function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}

// boundary = arrey[[top, bund, venstreSide, højreSide], [top, bund, venstreSide, højreSide], [...]]
function Colission(newX, newY, Boundary,){
	
	for(let i = 0; i < Boundary.length; i++){
		
		if(newX > Boundary[i][2] && newX < Boundary[i][3] && newY > Boundary[i][0] && newY < Boundary[i][1]){
			if(currenEnemies[i] && currenEnemies[i].HP > 0){
				Hitvictim = i
			}
			return true
		}
	}
	return false
} 


function drawHitbox(box){

	H = box[1] - box[0]
	W = box[3] - box[2]
	x = box[2]
	y = box[0]

	fill(255,0,0)
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

