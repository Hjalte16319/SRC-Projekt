let p0 = [100, 300]
let p1 = [200, 100]
let p2 = [250, 100]
let p3 = [300, 300]

let t = 0

let A1
let A2

let curve = []

let PointVal = 0

function setup() 
{
	createCanvas(400, 400);
	

}

function draw()
{

	if(keyIsDown(49)){
		PointVal = 0
	}
	if(keyIsDown(50)){
		PointVal = 1
	}
	if(keyIsDown(51)){
		PointVal = 2
	}
	if(keyIsDown(52)){
		PointVal = 3
	}

	if(mouseIsPressed== true){
		if(mouseButton == LEFT){
			if(PointVal == 0){
				p0[0] = mouseX
				p0[1] = mouseY
			}
			if(PointVal == 1){
				p1[0] = mouseX
				p1[1] = mouseY
			}
			if(PointVal == 2){
				p2[0] = mouseX
				p2[1] = mouseY
			}
			if(PointVal == 3){
				p3[0] = mouseX
				p3[1] = mouseY
		
			}
		}
		

	}
	





	background(120)
	
	if(t >= 1){
		t = 0
		curve = []
	}

	t += 0.01

	A1 = lerp(p0[0],p1[0],t)
	A2 = lerp(p0[1],p1[1],t)
	let B1 = lerp(p1[0],p2[0],t)
	let B2 = lerp(p1[1],p2[1],t)
	let C1 = lerp(p2[0],p3[0],t)
	let C2 = lerp(p2[1],p3[1],t)

	let D1 = lerp(A1,B1,t)
	let D2 = lerp(A2,B2,t)
	let E1 = lerp(B1,C1,t)
	let E2 = lerp(B2,C2,t)

	let F1 = lerp(D1,E1,t)
	let F2 = lerp(D2,E2,t)


	fill(0,0,0)
	line(p0[0],p0[1],p1[0],p1[1])
	line(p2[0],p2[1],p1[0],p1[1])
	line(p2[0],p2[1],p3[0],p3[1])

	fill(200,0,0)
	line(A1,A2,B1,B2)
	line(C1,C2,B1,B2)
	
	
	fill(255,0,0)
	circle(A1,A2, 5)
	circle(B1,B2, 5)
	circle(C1,C2, 5)



	fill(0,200,0)
	line(D1,D2,E1,E2)

	fill(0,255,0)
	circle(D1,D2, 5)
	circle(E1,E2, 5)

	fill(0,0,255)
	circle(F1,F2, 5)
	
	curve.push([F1,F2])
	for(let i = 0; i < curve.length; i++){
		if(i > 0){
			last = i-1
		}
		else{
			last = 0
		}
		stroke('yellow')
		line(curve[i][0],curve[i][1], curve[last][0],curve[last][1])
		stroke(0,0,0)
	}










}
