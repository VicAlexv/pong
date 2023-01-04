var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var teclas = {};

var esquerda = {
	x: 10,
	y: canvas.height / 2 - 60,
	altura: 120,
	largura: 20,
	diry: 0,
	score: 0,
	speed: 10
};

var direita = {
	x: canvas.width - 40,
	y: canvas.height / 2 - 60,
	altura: 120,
	largura: 20,
	diry: 0,
	score: 0,
	speed: 10
};

var bola = {
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 - 15,
    raio: 15,
    dirx: -1,
    diry: 1,
    mod: 0,
    speed: 2
};

document.addEventListener("keydown", function(e) {
	teclas[e.keyCode] = true;
	//alert(e.keyCode);
}, false);

document.addEventListener("keyup", function(e) {
	delete teclas[e.keyCode];
}, false);

function movebloco() {
	if(87 in teclas && esquerda.y > 0)
		esquerda.y -= esquerda.speed;

	else if(83 in teclas && esquerda.y + esquerda.altura < canvas.height)
		esquerda.y += esquerda.speed;

	if(38 in teclas && direita.y > 0)
		direita.y -= direita.speed;

	else if(40 in teclas && direita.y + direita.altura < canvas.height)
		direita.y += direita.speed;
};

function movebola() {
	if(bola.y >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x - bola.raio <= esquerda.x + esquerda.largura) {
		bola.dirx = 1;
		bola.mod += 0.2;
	}

	else if(bola.y + bola.raio >= direita.y && bola.y + bola.raio <= direita.y + direita.altura && bola.x + bola.raio >= direita.x) {
		bola.dirx = -1;
		bola.mod += 0.2;
	}

	if(bola.y - bola.raio <= 0)
		bola.diry = 1;

	else if(bola.y + bola.raio >= canvas.height)
		bola.diry = -1;

	bola.x += (bola.speed + bola.mod) * bola.dirx;
	bola.y += (bola.speed + bola.mod) * bola.diry;

	if(bola.x + bola.raio < esquerda.x + esquerda.largura - 15)
		newgame("player 2");

	else if(bola.x + bola.raio > direita.x + 15)
		newgame("player 1");
};

function newgame(winner) {
	if(winner == "player 1")
		++esquerda.score;
	else
		++direita.score;

	esquerda.y = canvas.height / 2 - esquerda.altura / 2;
	direita.y = esquerda.y;
	bola.y = canvas.height / 2 - bola.raio;
	bola.x = canvas.width / 2 - bola.raio;
	bola.mod = 0;
};

function desenha() {

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	movebloco();
	movebola();

	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(bola.x, bola.y, bola.raio, 0, 2 * Math.PI)
	//ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura);
	ctx.fill();
	ctx.fillStyle = "green";
	ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura);
	ctx.fillStyle = "red";
	ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura);
    
    ctx.fillStyle = "white";
	ctx.font = "20px Arial";
	ctx.fillText("Jogador Verde: " + esquerda.score, 20, 20);
	ctx.fillText("Jogador Vermelho: " + direita.score, canvas.width - 220, 20);
	requestAnimationFrame(desenha);
};

function main(){
    desenha();
};
