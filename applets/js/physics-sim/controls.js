const GLOBAL = {
	particles: 40,
	friction: 0.8,
	damping: 1,
	restitution: 0.3,
	lifeSpan: 1000,
	g: 0.05,
	x : 0,
	y : 0,
	gravity: false,
	attractor: false,
	vectors: true,
	walls: false,
	attraction: false,
	palette: [
		'#FFE74C',
		'#FF5964',
		'#0074F0',
		'#FFF'
	],
	reload() { location.reload() }
};

const params = { ...GLOBAL };
//console.log(params)

const GUI = lil.GUI;
const gui = new GUI();

gui.add(document, 'title').name('Title');

gui.add(params, 'particles', 0, 100, 1).name('No. Particles').onChange(value => {
	w.emitter.max = value;
}); 	// number field
gui.add(params, 'friction', 0, 1, 0.01).name('Friction'); 	// number field
gui.add(params, 'damping', 0, 1, 0.01).name('Damping'); 	// number field
gui.add(params, 'restitution', 0, 1, 0.01).name('Restitution'); 	// number field
gui.add(params, 'g', 0.01, 0.5, 0.01).name('k'); 	// number field
gui.add(params, 'lifeSpan', 100, 1000, 1).name('Particle Lifespan').onChange(value => {
	var v = value;
	if (value > 900)
		v = Infinity;
	w.particleLifespan = v;
}
); 	// number field


gui.add(params, 'vectors').name('Show Vectors').onChange(value => {
	//console.log('Vectors');
	w.showVectors = value;
});

gui.add(params, 'attraction').name('Particle Attraction').onChange(value => {
	//console.log('Attraction Particles');
	w.particleAttraction = value;
});

gui.add(params, 'walls').name('Walls').onChange(value => {
	//console.log('Walls');
	w.walls = value;
});

gui.add(params, 'gravity').name('Gravity').onChange(value => {
	//console.log('Gravity');
	w.gravity = value * 0.3;
});

gui.add(params, 'attractor').name('Central Attractor').onChange(value => {
	//console.log('Attractor');
	w.centralGravity = value;
});

gui.add(params, 'reload').name('Reset');

gui.close();

document.addEventListener('mousemove', (e) =>  {
	GLOBAL.x = e.clientX,
	GLOBAL.y = e.clientY
});

document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        GLOBAL.x = e.touches[0].clientX;
        GLOBAL.y = e.touches[0].clientY;
    }
}, { passive: true }); // Improves performance on mobile

// document.addEventListener('touchmove', (e) => {
//     if (e.touches.length > 0) {
//         GLOBAL.x = e.touches[0].clientX;
//         GLOBAL.y = e.touches[0].clientY;
//     }
// }, { passive: true }); // Improves performance on mobile

// document.addEventListener('click', function(e) {

// 	var x = e.clientX,
// 			y = e.clientY,
// 			o = Particle.create(x, y, 0, 0, 1, 5);

// 	w.objects.push(o);

// });

let ax, ay, bx, by;

// Select the world element
const world = document.querySelector('#world');

// Add event listeners
world.addEventListener('pointerdown', (e) => {
	ax = e.clientX;
	ay = e.clientY;

	clearTimeout(helpModal); // Clears the timeout if dragging starts

	w.startDragHandler(ax, ay);
});

world.addEventListener('pointerup', (e) => {
	bx = e.clientX;
	by = e.clientY;

	w.endDragHandler(bx, by);
});

class ModalSpring {
	constructor(target = 48, start = -48) {
		this.target = target;
		this.start = start;
		this.p = start;
		this.v = 0;
		this.bounce = 0.5;
		this.damping = 0.6;
		this.animationFrame = null;

		this.event = new Event('spring');
	}

	set(start, target) {
		this.start = start;
		this.target = target;
		this.p = start;
		this.v = 0;
	}

	release() {
		if (this.animationFrame) {
			cancelAnimationFrame(this.animationFrame);
		}
		this.animate();
	}

	animate = () => {
		const dist = this.target - this.p;
		const force = this.bounce * dist;
		this.v += force;
		this.v *= this.damping;
		this.p += this.v;

		window.dispatchEvent(this.event);

		if (Math.abs(this.v) > 0.0001 || Math.abs(dist) > 0.0001) {
			this.animationFrame = requestAnimationFrame(this.animate);
		}
	}
}

// Create the modal spring instance
const modalSpring = new ModalSpring();

// Select modal element
const modal = document.querySelector('.modal');

// Update modal position on 'spring' event
window.addEventListener('spring', () => {
	modal.style.top = `${modalSpring.p}px`;
});

// Show modal after 10 seconds
const helpModal = setTimeout(() => {
	modal.classList.remove('hidden');
	modalSpring.set(-150, 48);
	modalSpring.release();

	modal.querySelector('.dismiss').addEventListener('click', () => {
		modal.classList.add('hidden');
		modalSpring.set(48, -150);
		modalSpring.release();
	});
}, 10000);