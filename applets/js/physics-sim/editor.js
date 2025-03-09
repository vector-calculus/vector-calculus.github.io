const gui = new GUI();

const GLOBAL = {
	particles: 40,
	vectors: true,
	walls: false,
	attraction: false,
	friction: 0.8,
	damping: 1,
	restitution: 0.3,
	lifeSpan: 1000,
	g: 0.05,
	gravity: false,
	attractor: false,
	palette: [
		'#FFE74C',
		'#FF5964',
		'#0074F0',
		'#FFF'
	],
	reload() { location.reload() }
}

//gui.add( document, 'title' );

gui.add(GLOBAL, 'particles', 0, 100, 1).onChange(value => {
	w.emitter.max = value;
}); 	// number field
gui.add(GLOBAL, 'friction', 0, 1, 0.01); 	// number field
gui.add(GLOBAL, 'damping', 0, 1, 0.01); 	// number field
gui.add(GLOBAL, 'restitution', 0, 1, 0.01); 	// number field
gui.add(GLOBAL, 'g', 0.01, 0.5, 0.01).name('K'); 	// number field
gui.add(GLOBAL, 'lifeSpan', 100, 1000, 1).name('Particle Lifespan').onChange(value => {
	var v = value;
	if (value > 900)
		v = Infinity;
	w.particleLifespan = v;
}
); 	// number field


gui.add(GLOBAL, 'vectors').onChange(value => {
	console.log('Vectors');
	w.showVectors = value;
});

gui.add(GLOBAL, 'attraction').onChange(value => {
	console.log('Attraction Particles');
	w.particleAttraction = value;
});

gui.add(GLOBAL, 'walls').onChange(value => {
	console.log('Walls');
	w.walls = value;
});


gui.add(GLOBAL, 'gravity').onChange(value => {
	console.log('Gravity');
	w.gravity = value * 0.3;
});

gui.add(GLOBAL, 'attractor').onChange(value => {
	console.log('Attractor');
	w.centralGravity = value;
});

gui.add( GLOBAL, 'reload' ).name( 'Reset' );

gui.close();

// document.addEventListener('click', function(e) {

// 	var x = e.clientX,
// 			y = e.clientY,
// 			o = Particle.create(x, y, 0, 0, 1, 5);

// 	w.objects.push(o);

// });

let ax, ay, bx, by, dragging;

document.querySelector('#world').addEventListener('mousedown', function (e) {
	ax = e.clientX;
	ay = e.clientY;

	clearTimeout(helpModal)

	w.startDragHandler(ax, ay);
});

document.querySelector('#world').addEventListener('mouseup', function (e) {
	bx = e.clientX;
	by = e.clientY;

	w.endDragHandler(bx, by);
});

//document.querySelector('#k').addEventListener('input', function (e) {
//	CONST.g = parseFloat(this.value);
//});

//document.querySelector('#damping').addEventListener('input', function (e) {
//	CONST.damping = 1 - parseFloat(this.value);
//});

//document.querySelector('#friction').addEventListener('input', function (e) {
//	CONST.friction = 1 - parseFloat(this.value);
//});

//document.querySelector('#restitution').addEventListener('input', function (e) {
//	CONST.restitution = parseFloat(this.value);
//});

//document.querySelector('#numParticles').addEventListener('input', function (e) {
//	w.emitter.max = this.value;
//});

//document.querySelector('#connectors').addEventListener('change', function(e) {
//	w.showRanges = this.checked;
//});

//document.querySelector('#vectors').addEventListener('change', function (e) {
//	w.showVectors = this.checked;
//});

//document.querySelector('#smbh').addEventListener('change', function (e) {
//	w.centralGravity = this.checked;
//});

//document.querySelector('#lifespan').addEventListener('change', function (e) {
//	var v = this.value;
//	if (this.value > 900)
//		v = Infinity;
//	w.particleLifespan = v;
//});

//document.querySelector('#walls').addEventListener('change', function (e) {
//	w.walls = this.checked;
//})

//document.querySelector('#random').addEventListener('change', function (e) {
//	w.emitter.randomSpawn = this.checked;
//})

//document.querySelector('#clear').addEventListener('click', function (e) {
//	e.preventDefault();
//	w.objects = [];
//});

//document.querySelector('#particleGravity').addEventListener('change', function (e) {
//	w.particleAttraction = this.checked;
//})

//document.querySelector('#verticalGravity').addEventListener('change', function (e) {
//	w.gravity = this.checked * 0.3;
//})

var ModalSpring = {
	target: 48,
	start: -48,
	p: 0,
	v: 0,
	bounce: 0.5,
	damping: 0.6,

	e: new Event('spring'),

	set: function (start, target) {
		window.clearInterval();
		this.start = start;
		this.target = target;
		this.p = start;
	},

	release: function () {
		this.tick();
		window.setInterval(function () {
			if (ModalSpring.v > 0.0001 || Math.abs(ModalSpring.target - ModalSpring.p) > 0.0001) {
				ModalSpring.tick();
			} else {
				this.clearInterval();
			}
		}, 16);
	},

	tick: function () {
		var dist = this.target - this.p;
		var force = this.bounce * dist;
		this.v += force;
		this.v *= this.damping;
		this.p += this.v;

		window.dispatchEvent(this.e)
	}
}

let modal = document.querySelector('.modal');

window.addEventListener('spring', function (e) {
	modal.style.top = ModalSpring.p + 'px';
});

var helpModal = window.setTimeout(function () {
	modal.classList.remove('hidden');
	ModalSpring.set(-150, 48);
	ModalSpring.release();

	modal.querySelector('.dismiss').addEventListener('click', function (e) {
		modal.classList.add('hidden');
		ModalSpring.set(48, -150);
		ModalSpring.release();
	});

}, 1500)

