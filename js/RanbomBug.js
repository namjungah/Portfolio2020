window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame     ||
		window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
})();

var game = (function(window){

/**
 * Game Core
 */

var pi_by_180 = Math.PI / 350,
	canvas = null,
	ctx = null,
	game_objects = [],
	imgs = {},
	debug = true,
	last_time = 0,
//   count_el,
	W, H;

function init() {
	W = window.innerWidth;
	H = window.innerHeight;
	canvas = document.getElementById("c");
	canvas.width = W;
	canvas.height = H;
	ctx = canvas.getContext('2d');
	back = document.getElementsByClassName("index");
	imgs['bug1'] = new Image;
	imgs['bug1'].src = '../src/bug1.png';
	imgs['bug2'] = new Image;
	imgs['bug2'].src = '../src/bug2.png';
//   count_el = document.querySelector('#js-count');
  	initGame();
	canvas.addEventListener('click', onClicked);
//	canvas.addEventListener('click', onClicked);
	gameLoop();

}

function gameLoop() {
	window.requestAnimFrame(gameLoop);
	update();
	draw();
}
 
function onClicked(e) {
  var x = e.offsetX || e.layerX,
		y = e.offsetY || e.layerY;
 	var bug = new Bug;
  bug.x = x;
  bug.y = y;
  game_objects.push(bug);
  //count_el.textContent = parseInt(count_el.textContent, 10) + 1;
}
  

function update() {
	var current_time = new Date().getTime();
	if(!last_time) last_time = current_time;
	var dt = (current_time - last_time) / 1000;
	last_time = current_time;

	for(var i = game_objects.length; i--;){
		var obj = game_objects[i];
		if(typeof obj.update == 'function'){
			obj.update(dt);
		}
	}
}

function draw() {
	clearScreen(ctx);
	var context = ctx;
	for (var i = 0, l = game_objects.length; i < l; i++){
		var obj = game_objects[i];
		if (typeof obj.draw == 'function' && obj.visible){
			context.save();
			!isNaN(obj.x) && !isNaN(obj.y) && context.translate(obj.x, obj.y); 
			!isNaN(obj.scale_x) && !isNaN(obj.scale_y) && context.scale(obj.scale_x, obj.scale_y); 
			!isNaN(obj.rotation) && context.rotate(obj.rotation * pi_by_180); 
			!isNaN(obj.alpha) && (context.globalAlpha = obj.alpha); 
			obj.draw(context);
			context.restore();
		}
	}
}

function clearScreen(context){
    context.clearRect(0, 0, canvas.width, canvas.height);
}
  
/**
 * Bug class
 */
function Bug() {
	this.type = 'bug';
	this.x = W / 2 + Math.random() * 100;
	this.y = H / 2 + Math.random() * 100;
	this.width = 20;
	this.height = 20;
	this.scale_x = this.scale_y = 0.8;
	this.speed = 80 + Math.random() * 50;
  this.type = ~~(Math.random() * 2) + 1;
  this.visible = true;
	this.rotation = ~~(Math.random() * 360);
}
Bug.prototype.draw = function(context) {
  try {
  context.drawImage(imgs['bug' + this.type], -19, -17);
  } catch (e) {}
}

Bug.prototype.update = function(dt) {
	var theta = this.rotation * pi_by_180,
		dx = Math.cos(theta) * this.speed,
		dy = Math.sin(theta) * this.speed,
		turn = Math.random() * 10;

  // Random turning.
	if(~~(Math.random() * 2)) this.rotation += turn;
	else this.rotation -= turn;

	this.x += dx * dt;
	this.y += dy * dt;

	if(this.x > W || this.x < 0 || this.y < 0 || this.y > H) {
		this.rotation -= 180;
	}
}

function initGame() {
	game_objects.push(new Bug);
}

function resize(e) {
	W = canvas.width = window.innerWidth;
	H = canvas.height = window.innerHeight;
}

// export some stuff
return {
	'init': init,
	'resize': resize
}

})(window);

window.addEventListener('load', game.init);
window.addEventListener('resize', game.resize);